<%@ Page Title="" Language="C#" MasterPageFile="~/TriviaMasterPage.Master" AutoEventWireup="true" CodeBehind="TriviaPage.aspx.cs" Inherits="TriviaWebForms.View.TriviaPage" %>


<asp:Content ContentPlaceHolderID="triviaHead" runat="server">
    <link href="../Style/TriviaStyle.css" rel="stylesheet" />
    <script src="../Script/Trivia.js" defer="defer" type="module"></script>
</asp:Content>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div id="login-body">
        <div id="quiz-grid" class="main-grid animated fadeInDown">
            <div id="header-container">
                <h1 id="login-header">Joker Trivia</h1>
            </div>
            <img id="login-joker" class="joker" src="https://freepngimg.com/save/9886-batman-joker-smile-vector-png/500x500" alt="">

            <hr>
            <div id="trivia-form">
                <label for="trivia-amount">Number of Questions:</label>
                <input type="number" id="trivia-amount" class="form-control" min="1" max="50" value="10">
                <label for="trivia-category">Select Category: </label>
                <select id="trivia-category" class="form-control">
                    <option value="any">Any Category</option>
                </select>

                <label for="trivia-difficulty">Select Difficulty: </label>
                <select id="trivia-difficulty" class="form-control">
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label for="trivia-type">Select Type: </label>
                <select id="trivia-type" class="form-control">
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
                <hr>

                <div id="start-container">
                    <asp:Button ID="startBtn" Text="Start" runat="server" CssClass="triviaBtn" ClientIDMode="Static" />
                </div>
            </div>

            <div id="final-grid"></div>

            <div id="sendBack" class="hide">
                <label id="noUserWarning" class="warning-label">No User Was Found... Please Login Or Register</label>
                <button id="sendBackBtn" class="nav-buttons">Back</button>
            </div>


            <div id="trivia-container" class="hide">
                <div id="question-area">
                    <p id="question"></p>
                    <span id="answer"></span>
                    <br />
                    <div id="btn-grid" class="buttons"></div>
                </div>
                <footer id="progress-area">
                    <hr>
                    <p id="progress">Progress</p>
                    <div class="nav-buttons" id="goBack">Back</div>
                    <div class="nav-buttons" id="goNext">Next</div>
                </footer>
            </div>
        </div>
    </div>


</asp:Content>
