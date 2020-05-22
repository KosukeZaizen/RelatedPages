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
            var l = new List<Page>();

            var page1 = new Page();
            page1.titleId = 1;
            page1.pageName = "information about dog and cat | wikipedia";
            page1.link = "https://aaa/aaa/dogAndCat";
            page1.explanation = "This page is about them.";

            var page2 = new Page();
            page2.titleId = 1;
            page2.pageName = "information about dog and cat | dictionary";
            page2.link = "https://bbb/bbb/dogAndCat";
            page2.explanation = "This page is about them!!!!!!!!!!!!!";

            l.Add(page1);
            l.Add(page2);

            return l;
        }
    }
}
