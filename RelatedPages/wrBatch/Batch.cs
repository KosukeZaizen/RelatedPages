using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace RelatedPages.wrBatch
{
    public class Batch
    {
        public static async void runAsync()
        {
            while (true)
            {
                try
                {
                    //バッチサーバーの生存確認
                    string[] urls = {
                    "https://thinker2.azurewebsites.net/",
                    "https://wiki-bat.azurewebsites.net/",
                    "https://wiki-bat-jp.azurewebsites.net/"
                };
                    using (var client = new HttpClient())
                    {
                        foreach (string url in urls)
                        {
                            try{
                                var response = await client.GetAsync(url);
                                var result = await response.Content.ReadAsStringAsync();
                                System.Console.Write("{0} ", result);
                                await Task.Delay(1000 * 10);//10秒待機
                            }
                            catch (Exception ex) {
                                System.Console.Write("{0} ", ex.Message);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Console.Write("{0} ", ex.Message);
                }
                await Task.Delay(1000 * 60 * 15);//15分待機
            }
        }
    }
}