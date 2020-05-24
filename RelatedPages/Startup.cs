using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RelatedPages.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RelatedPages
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            var options = new RewriteOptions().AddRedirect("(.*)/$", "$1");
            app.UseRewriter(options);


            app.Use(async (context, next) =>
            {
                string url = context.Request.Path.Value;
                if (url.EndsWith("sitemap.xml"))
                {
                    var domain = "https://pages.lingual-ninja.com";
                    var lstSitemap = new List<Dictionary<string, string>>();

                    IEnumerable<string> allDates = getAllDates().Select(d => ((DateTime)d.publishDate).ToString("yyyy-MM-dd"));

                    //top page
                    var dic1 = new Dictionary<string, string>();
                    dic1["loc"] = domain;
                    dic1["lastmod"] = allDates.Max();
                    lstSitemap.Add(dic1);

                    //date page
                    foreach (var date in allDates) {
                        var dic2 = new Dictionary<string, string>();
                        int intDate = int.Parse(date.Replace("-", ""));
                        dic2["loc"] = domain + "/date/" + date;
                        dic2["lastmod"] = date;
                        lstSitemap.Add(dic2);

                        var titles = getTitlesForTheDay(intDate);

                        //theme page
                        foreach (var title in titles)
                        {
                            var dic3 = new Dictionary<string, string>();
                            dic3["loc"] = domain + "/theme/" + title.titleId;
                            dic3["lastmod"] = date;

                            lstSitemap.Add(dic3);
                        }

                    }

                    string resultXML = await RegisterSitemap(lstSitemap);

                    await context.Response.WriteAsync(resultXML);
                }
                else
                {
                    await next.Invoke();
                }
            });

                app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        public async Task<string> RegisterSitemap(IEnumerable<Dictionary<string, string>> sitemapItems)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            sb.Append("\n");
            sb.Append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">");
            sb.Append("\n");

            foreach (var item in sitemapItems)
            {
                sb.Append("  <url>");
                sb.Append("\n");

                sb.Append("    <loc>");
                sb.Append(item["loc"]);
                sb.Append("</loc>");
                sb.Append("\n");

                sb.Append("    <lastmod>");
                sb.Append(item["lastmod"]);
                sb.Append("</lastmod>");
                sb.Append("\n");

                sb.Append("  </url>");
                sb.Append("\n");
            }
            sb.Append("</urlset>");

            return sb.ToString();
        }

        public IEnumerable<dynamic> getAllDates()
        {
            var con = new DBCon();
            var l = new List<object>();

            var result = con.ExecuteSelect($"SELECT publishDate, count(titleId) as cnt FROM Titles GROUP BY publishDate ORDER BY publishDate desc;");

            result.ForEach((e) =>
            {
                var publishDate = DateTime.ParseExact(((int)e["publishDate"]).ToString(), "yyyyMMdd", null);
                var cnt = (int)e["cnt"];

                var dates = new { publishDate, cnt };
                l.Add(dates);
            });

            return l;
        }

        public IEnumerable<Title> getTitlesForTheDay(int publishDate)
        {
            var con = new DBCon();
            var l = new List<Title>();

            string sql = @"
select t.publishDate, t.title, t.titleId, p.cnt from (
SELECT * FROM Titles WHERE publishDate = @publishDate
) as t inner join (
SELECT count(*) as cnt, titleId from Pages GROUP BY titleId
) as p on t.titleId = p.titleId;
";

            var result = con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@publishDate", new object[2] { SqlDbType.Int, publishDate } } });

            result.ForEach((e) =>
            {
                var title = new Title();
                title.publishDate = DateTime.ParseExact(((int)e["publishDate"]).ToString(), "yyyyMMdd", null);
                title.titleId = (int)e["titleId"];
                title.title = (string)e["title"];
                title.cnt = (int)e["cnt"];

                l.Add(title);
            });

            return l;
        }
    }
}
