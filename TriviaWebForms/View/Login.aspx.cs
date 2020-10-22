using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TriviaWebForms.View
{
    public partial class Login : Page
    {
        public User CurrentUser = new User();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Cookies["jokerCookie"] != null)
            {
                string authValue = Request.Cookies["jokerCookie"].Value;
                CurrentUser = Repository<User>.Instance.Get(authValue);
                if (CurrentUser != null)
                {
                    Response.Redirect("~/View/TriviaPage.aspx");
                }
            }
        }

        protected void submitBtn_Click(object sender, EventArgs e)
        {
            if (!isRegister.Checked)
            {
                if (Page.IsValid)
                {
                    CurrentUser = Repository<User>.Instance.Get(userEmail.Text);
                    if (CurrentUser != null)
                    {
                        if (CurrentUser.Password == userPassword.Text)
                        {
                            Response.Cookies["jokerCookie"].Value = CurrentUser.Email;
                            Response.Redirect("~/View/TriviaPage.aspx");
                        }
                        else
                        {
                            loginMsg.Text = "Wrong password...";
                        }
                    }
                    else
                    {
                        loginMsg.Text = "Can't find user... Check Email.";
                    }
                }
            }
            else
            {
                nameRequiredFieldValidator.Enabled = true;
                repassRequiredFieldValidator.Enabled = true;
                if (Page.IsValid)
                {
                    if (userPassword.Text == userRePass.Text)
                    {
                        User newUser = new User
                        {
                            FullName = userFullName.Text,
                            Email = userEmail.Text,
                            Password = userPassword.Text
                        };
                        if (Repository<User>.Instance.Get(newUser.Email) == null)
                        {
                            try
                            {
                                Repository<User>.Instance.Add(newUser);
                                Response.Cookies["jokerCookie"].Value = CurrentUser.Email;
                                Response.Redirect("~/View/TriviaPage.aspx");
                            }
                            catch (Exception ex)
                            {
                                loginMsg.Text = ex.Message;
                            }
                        }
                        else
                        {
                            loginMsg.Text = "Email already exists...";
                        }
                    }
                    else
                    {
                        loginMsg.Text = "Passwords don't match";
                    }
                }
            }
        }
    }
}
