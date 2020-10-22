<%@ Page Title="" Language="C#" MasterPageFile="~/TriviaMasterPage.Master" AutoEventWireup="true" CodeBehind="Error.aspx.cs" Inherits="TriviaWebForms.View.Error" %>


<asp:Content ContentPlaceHolderID="Oops" runat="server">
    <link href="../Style/ErrorStyle.css" rel="stylesheet" />
</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="error-body">
        <div id='error-grid' class="main-grid">
            <label id="err-lbl">Error</label>
            <img id="jail-gif" src="https://media.giphy.com/media/AwoDg0wJImOjK/giphy.gif" alt="Gif Image" />
            <label id="err-message">404 - Page not found</label>
        </div>
    </div>

</asp:Content>
