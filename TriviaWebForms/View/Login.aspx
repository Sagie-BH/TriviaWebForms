<%@ Page Title="" Language="C#" MasterPageFile="~/TriviaMasterPage.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="TriviaWebForms.View.Login" %>


<asp:Content ContentPlaceHolderID="loginHead" runat="server">
    <script src="../Script/login.js" defer="defer"></script>
    <link href="../Style/LoginStyle.css" rel="stylesheet" />
</asp:Content>


<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div id="login-body">
        <input type="hidden" id="_ispostback" value="<%=Page.IsPostBack.ToString()%>" />
        <!-- Main Container-->
        <div id="submit-grid" class="form-container main-grid animated bounceInLeft  ">
            <img id="login-joker" class="joker" src="https://freepngimg.com/save/9886-batman-joker-smile-vector-png/500x500" alt="">
            <!--Register Check Box -->
            <div id="checkBox-container">
                <label for="isRegister">Register? </label>
                <asp:CheckBox ClientIDMode="Static" runat="server" ID="isRegister"/>
            </div>
            <!--Header-->
            <div id="header-container">
                <h1 id="login-header">Joker Trivia</h1>
            </div>
            <hr>
            <!--User Form -->
            <div id="contact-form" class="animated">
                <!--Full Name Div -->
                <div class="register hide">
                    <label>Full Name</label>
                    <asp:TextBox ID="userFullName" runat="server" TextMode="SingleLine"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="nameRequiredFieldValidator" runat="server" CssClass="validators"
                        ErrorMessage="Name is required" ControlToValidate="userFullName" Enabled="false" ></asp:RequiredFieldValidator>
                </div>
                <!--Email Div -->
                <div>
                    <label>Email Adress</label>
                    <asp:TextBox ID="userEmail" runat="server" TextMode="Email"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="emailRequiredFieldValidator" runat="server" CssClass="validators"
                        ErrorMessage="Email is required" ControlToValidate="userEmail"></asp:RequiredFieldValidator>
                </div>
                <!--Password Div -->
                <div>
                    <label>Password</label>
                    <asp:TextBox ID="userPassword" runat="server" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="passwordRequiredFieldValidator" runat="server" CssClass="validators"
                        ErrorMessage="Password is required" ControlToValidate="userPassword"></asp:RequiredFieldValidator>
                </div>
                <!--Confirm Password Div -->
                <div class="register hide">
                    <label>Confirm Password</label>
                    <asp:TextBox ID="userRePass" runat="server" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="repassRequiredFieldValidator" runat="server" CssClass="validators"
                        ErrorMessage="Confirmation is required" ControlToValidate="userRePass" Enabled="false"></asp:RequiredFieldValidator>
                </div>
            </div>
            <hr>
            <asp:Label CssClass="login-message" ID="loginMsg" runat="server"></asp:Label>
            <!-- Submit Button-->
            <div id="submit-container">
            <asp:Button ID="submitBtn" OnClick="submitBtn_Click" Text="Submit" runat="server" CssClass="triviaBtn" ClientIDMode="Static" />
            </div>
        </div>
    </div>
</asp:Content>
