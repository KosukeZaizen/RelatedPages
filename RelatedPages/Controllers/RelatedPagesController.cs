using System.Collections.Generic;
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
            var l = new List<Title>();

            var title1 = new Title();
            title1.publishDate = 20150522;
            title1.titleId = 1;
            title1.title = "dog and cat";

            var title2 = new Title();
            title2.publishDate = 20150522;
            title2.titleId = 2;
            title2.title = "bird and car";

            l.Add(title1);
            l.Add(title2);

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
