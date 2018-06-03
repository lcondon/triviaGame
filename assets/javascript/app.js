var gameCount = 0;
var lossCount = 0;
var winCount = 0;
var unanswered = 0;
var timeCount = $("#timeRemaining");
var timerSpan = $("#timer");
var questionDiv = $("#questionDiv");
var answerDisplay = $("#answerSection");

var questionGroup = [
    {
        question: "What is Earth's largest continent?",
        answers: ["Antarctica", "Africa", "Asia", "South America"],
        correctAnswer: 2,
        explanation: "Asia is Earth's largest continent",
        imgUrl: "<img src='./assets/images/asia.png' class='img-fluid'>"
    },
    {
        question: "What river runs through Baghdad?",
        answers: ["Karun", "Jordan", "Euphrates", "Tigris"],
        correctAnswer: 3,
        explanation: "The Tigris River runs through Baghdad",
        imgUrl: "<img src='./assets/images/baghdad.jpg' class='img-fluid'>"
    },
    {
        question: "What is the oldest city in the world?",
        answers: ["Damascus", "Athens", "Jerusalem", "Jericho"],
        correctAnswer: 0,
        explanation: "Damscus is the oldest city in the world",
        imgUrl: "<img src='./assets/images/damscus.jpg'>"
    },
    {
        question: "What are the only landlocked countries in South America?",
        answers: ["Peru and Colombia", "Paraguay and Bolivia", "Uruguay and Suriname", "Brazil and Argentina"],
        correctAnswer: 1,
        explanation: "Paraguay and Bolivia are the only landlocked countries in South America",
        imgUrl: "<img src='./assets/images/bolPar.jpg'>"
    },
    {
        question: "What is the least populated U.S. State?",
        answers: ["Montana", "Idaho", "Wyoming", "South Dakota"],
        correctAnswer: 2,
        explanation: "Wyoming is the least populated U.S. State",
        imgUrl: "<img src='./assets/images/wyoming.jpg'>"
    },
    {
        question: "What is the longest river in the U.K.?",
        answers: ["Severn", "Tay", "Bann", "Thames"],
        correctAnswer: 0,
        explanation: "The River Severn is the longest river in the U.K.",
        imgUrl: "<img src='./assets/images/severn.jpg'>"
    },
    {
        question: "Which African country has the most pyramids?",
        answers: ["Sudan", "Egypt", "Libya", "Algeria"],
        correctAnswer: 0,
        explanation: "Sudan has the most pyramids out of all African countries",
        imgUrl: "<img src='./assets/images/sudan.jpg'>"
    },
    {
        question: "Which waterway connects the Mediterranean Sea to the Atlantic Ocean?",
        answers: ["Strait of Hormuz", "Strait of Gibraltar", "Strait of Malacca", "Strait of Magellan"],
        correctAnswer: 1,
        explanation: "The Strait of Gibraltar connects the Mediterranean Sea to the Atlantic Ocean",
        imgUrl: "<img src='./assets/images/gibraltar.jpg'>"
    },
    {
        question: "What is the only country in Africa where Spanish is an official language?",
        answers: ["Guinea", "Mali", "Cabo Verde", "Equatorial Guinea"],
        correctAnswer: 3,
        explanation: "Equatorial Guinea is the only country in Africa where Spanish is an official language",
        imgUrl: "<img src='./assets/images/equaG.jpg'>"
    },
    {
        question: "Which is the largest of the Caribbean islands?",
        answers: ["Barbados", "Cuba", "Jamaica", "Trinidad"],
        correctAnswer: 1,
        explanation: "Cuba is the largest of the Caribbean Islands",
        imgUrl: "<img src='./assets/images/carib.jpg'>"
    }
]

console.log(questionGroup[0].answers[questionGroup[0].correctAnswer]);

$(document).ready(function () {
    var startBtn = $("<button type='button' class='btn btn-outline-secondary btn-lg' id='startBtn'>");
    startBtn.text("Start Game");
    questionDiv.append(startBtn);
    $("#startBtn").on("click", poseQuestion);




    function poseQuestion() {
        startBtn.remove();
        questionDiv.empty();
        answerDisplay.empty();

        var count = 10;
        var counter = setInterval(timer, 1000);
        timeCount.html("You have " + count + " seconds remaining");

        function timer() {
            count = count - 1;
            if (count <= 0) {
                clearInterval(counter);
                gameCount++;
                timesUp();
                return;
            }
            timeCount.html("You have " + count + " seconds remaining");
        }


        var currentQ = questionGroup[gameCount].question;
        questionDiv.append(currentQ);
        for (var i = 0; i < questionGroup[gameCount].answers.length; i++) {
            var answer = $("<button type='button' class='btn btn-outline-secondary btn-lg align-self-start answers'>").text(questionGroup[gameCount].answers[i]);
            answerDisplay.append(answer);
            if (i == questionGroup[gameCount].correctAnswer) {
                answer.attr("rightAnswer", true);
            }
        };
        $(".answers").on("click", function () {
            gameCount++;
            if (this.hasAttribute("rightAnswer")) {
                rightAnswer();
                clearInterval(counter);
            } else {
                wrongAnswer();
                clearInterval(counter);
            }
        })
    }

    function timesUp() {
        timeCount.empty();
        questionDiv.html("Think faster!");
        answerDisplay.html(questionGroup[gameCount - 1].imgUrl + "<br><h2>" + questionGroup[gameCount - 1].explanation + "</h2>");
        unanswered++;
        if (gameCount < 10) {
            setTimeout(poseQuestion, 5000);
        } else {
            questionDiv.html("Here's how you did.");
            answerDisplay.html("<p>Correct answers: " + winCount + "</p><br><p>Incorrect answers: " + lossCount + "</p><br><p>Unanswered: " + unanswered + "</p>");
            gameCount = 0;
            lossCount = 0;
            winCount = 0;
            unanswered = 0;
            var startBtn = $("<button type='button' class='btn btn-outline-secondary btn-lg' id='startBtn'>");
            startBtn.text("Start Game");
            answerDisplay.append(startBtn);
            $("#startBtn").on("click", poseQuestion);
        }
    }

    function wrongAnswer() {
        timeCount.empty();
        questionDiv.html("That is so wrong!");
        answerDisplay.html(questionGroup[gameCount - 1].imgUrl + "<br><h2>" + questionGroup[gameCount - 1].explanation + "</h2>");
        lossCount++;
        if (gameCount < 10) {
            setTimeout(poseQuestion, 5000);
        } else {
            questionDiv.html("Here's how you did.");
            answerDisplay.html("<p>Correct answers: " + winCount + "</p><br><p>Incorrect answers: " + lossCount + "</p><br><p>Unanswered: " + unanswered + "</p>");
            gameCount = 0;
            lossCount = 0;
            winCount = 0;
            unanswered = 0;
            var startBtn = $("<button type='button' class='btn btn-outline-secondary btn-lg' id='startBtn'>");
            startBtn.text("Start Game");
            answerDisplay.append(startBtn);
            $("#startBtn").on("click", poseQuestion);
        }
    }

    function rightAnswer() {
        timeCount.empty();
        questionDiv.html("You got it!");
        answerDisplay.html(questionGroup[gameCount - 1].imgUrl + "<br><h2>" + questionGroup[gameCount - 1].explanation + "</h2>");
        winCount++;
        if (gameCount < 10) {
            setTimeout(poseQuestion, 5000);
        } else {
            questionDiv.html("Here's how you did.");
            answerDisplay.html("<p>Correct answers: " + winCount + "</p><br><p>Incorrect answers: " + lossCount + "</p><br><p>Unanswered: " + unanswered + "</p>");
            gameCount = 0;
            lossCount = 0;
            winCount = 0;
            unanswered = 0;
            var startBtn = $("<button type='button' class='btn btn-outline-secondary btn-lg' id='startBtn'>");
            startBtn.text("Start Game");
            answerDisplay.append(startBtn);
            $("#startBtn").on("click", poseQuestion);
        }
    }

})
