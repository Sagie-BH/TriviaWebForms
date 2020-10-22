using DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;

namespace TriviaWebForms
{
    /// <summary>
    /// Summary description for ScoreHandler
    /// </summary>
    public class ScoreHandler : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string emailCookie = context.Request.Cookies["jokerCookie"].Value;
            User user = Repository<User>.Instance.Get(emailCookie);

            if (context.Request.Cookies["jokerCookie"].Value != null)
            {
                user.Email = context.Request.Cookies["jokerCookie"].Value;
            }

            Stream body = context.Request.InputStream;
            Encoding encoding = context.Request.ContentEncoding;
            StreamReader reader = new StreamReader(body, encoding);

            int score = Convert.ToInt32(JsonConvert.DeserializeObject(reader.ReadToEnd()));

            Repository<Quiz>.Instance.Add(new Quiz { UserEmail= user.Email, Score = score });
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}