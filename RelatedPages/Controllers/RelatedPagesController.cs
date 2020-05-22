using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using RelatedPages.Models;

namespace RelatedPages.Controllers
{
    [Route("api/[controller]")]
    public class RelatedPagesController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Title> getTitlesForTheDay(int publishDate)
        {
            var con = new DBCon();
            var l = new List<Title>();

            var result = con.ExecuteSelect($"SELECT * FROM Titles WHERE publishDate = @publishDate;", new Dictionary<string, object[]> { { "@publishDate", new object[2] { SqlDbType.Int, publishDate } } });

            result.ForEach((e) =>
            {
                var title = new Title();
                title.publishDate = (int)e["publishDate"];
                title.titleId = (int)e["titleId"];
                title.title = (string)e["title"];

                l.Add(title);
            });

            return l;
        }

        [HttpGet("[action]")]
        public IEnumerable<Page> getPagesForTitle(int titleId)
        {
            var con = new DBCon();
            var l = new List<Page>();

            var result = con.ExecuteSelect($"SELECT * FROM Pages WHERE titleId = @titleId;", new Dictionary<string, object[]> { { "@titleId", new object[2] { SqlDbType.Int, titleId } } });

            result.ForEach((e) =>
            {
                var page = new Page();
                page.titleId = (int)e["titleId"];
                page.link = (string)e["link"];
                page.pageName = (string)e["pageName"];
                page.explanation = (string)e["explanation"];

                l.Add(page);
            });

            return l;
        }
    }
}
