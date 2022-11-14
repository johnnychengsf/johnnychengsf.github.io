

let questions = [];
questions.push(["Commonly used data types DO Not Include:",
                    "strings","booleans","alerts*","number"]);
questions.push(["The condition in an if / else statement is enclosed with _____.",
                    "quotes","curly* brackets","parenthesis","square brackets"]);
questions.push(["Arrays in JavaScript can be used to store _____.",
                    "numbers and strings","other arrays","booleans","all of the above*"]);
questions.push(["String values must be enclosed within _____ when being assigned to variables.",
                    "commas","curly brackets","quotes*","parenthesis"]);
questions.push(["A very useful tool used during development and debugging for printing content to the debugger is:",
                    "JavaScript","terminal/bash","for loops","console.log*"]);

let setCountDown = 75;
let startQ = [];
let isFinishQuiz = false;
let highScores = [];

window.addEventListener('DOMContentLoaded', (event) => {
  let introQuiz = document.querySelector("#introQuiz");
  let finalScore = document.querySelector("#finalScore");
  let dialogBox = document.querySelector("#dialogBox");

  let countDown = document.querySelector("#countDown");
  let btnStart = document.querySelector("#btnStart");
  let quizTitle = document.querySelector("#quizTitle");
  let choicesGroup = document.querySelector("#choicesGroup");
  let ansResult = document.querySelector("#ansResult");
  let textResult = document.querySelector("#textResult");

  let intScore = document.querySelector("#intScore");

  let textInitals = document.querySelector("#textInitals");
  let btnFinalScore = document.querySelector("#btnFinalScore");

  let pageID = document.querySelector("#pageID");
  let timerContainer = document.querySelector("#timerContainer");
  let btnGoBack = document.querySelector("#btnGoBack");
  let btnClearHighScores = document.querySelector("#btnClearHighScores");

  resetAll();

  btnStart.addEventListener("click", function() {
    startQuiz();
  });

  textInitals.addEventListener("keypress",function() {
    ansResult.style.display = "none";
  });

  textInitals.addEventListener("keyup", function() {
    this.value = this.value.toUpperCase();
  });

  btnClearHighScores.addEventListener("click", function() {
    localStorage.clear();
    resetAll();
  });

  btnFinalScore.addEventListener("click", function() {
    if (textInitals.value.length > 0) {
      tmpScore = parseInt(0 + localStorage.getItem(textInitals.value));
      console.log(textInitals.value + " " + tmpScore.toString() + " ~ " + intScore.textContent);
      if (parseInt(intScore.textContent) >= tmpScore) {
        localStorage.setItem(textInitals.value, parseInt(intScore.textContent));
      }
    }
    endQuiz();
  });

  btnGoBack.addEventListener("click", function() {
    resetAll();
  });
});

function resetAll() {
  startQ = [].concat(questions);
  countDown.textContent = 0;
  intScore.textContent = 0;
  isFinishQuiz = false;
  textInitals.value = "";
  introQuiz.style.display = "";
  dialogBox.style.display = "none";
  ansResult.style.display = "none";
  finalScore.style.display = "none";
  endQuizBox.style.display = "none";

  endDescription.textContent = "";

  pageID.style.display = "";
  timerContainer.style.display = "";
}
function endQuiz() {
  finalScore.style.display = "none";
  ansResult.style.display = "none";
  endQuizBox.style.display = "block";
  pageID.style.display = "none";
  timerContainer.style.display = "none";

  keys = Object.keys(localStorage);
  let textHighScores = "";
  keys.forEach(function(item, index) {
    //textHighScores += (index + 1).toString() + " " + item + " - " + localStorage.getItem(item).toString() + document.createElement("br");

    textHighScores += "<div>" + (index + 1).toString() + ". " + item + " - " + localStorage.getItem(item).toString() + "</div>";
  });
  //endDescription.innerHTML = textHighScores.slice(0, textHighScores.length - 5);
  endDescription.innerHTML = textHighScores;
}
function finalQuiz() {
  dialogBox.style.display = "none";
  finalScore.style.display = "block"; 
}
function nextQuiz() {
  choices = [].concat(startQ.shift());
  quizTitle.textContent = choices.shift();
  choicesGroup.innerHTML = "";
  textLength = 18;
  
  choices.forEach(function(item) {
    if (item.length > textLength) {
      textLength = item.length;
    }
  });

  var btnWidth = "268px";
  if (textLength > 18) {
    btnWidth = (textLength * 18).toString() + "px";
  }
  
  choices.forEach(function(item,index) {
    buttonAdd(index, item, btnWidth);
  });
}
function buttonAdd(index, textContent, btnWidth) {
  let btnChoice = document.createElement("button");
  let pButtonText = document.createElement("p");

  pButtonText.textContent = (index+1).toString() + ". " + textContent.replace(/\*/g, "");
  btnChoice.className = "btnAnswer";
  pButtonText.className = "btnText";
  btnChoice.appendChild(pButtonText);

  btnChoice.style.width = btnWidth; 
  choicesGroup.appendChild(btnChoice);

  btnChoice.addEventListener("click", function() {
    if (textContent.indexOf("*") >= 0) {
      intScore.textContent = parseInt(intScore.textContent) + 11;
      textResult.textContent = "Correct!";
    } else {
      countDown.textContent -= 15;
      textResult.textContent = "Wrong!";
    }
    isFinishQuiz = !(startQ.length > 0);
    if (!isFinishQuiz) {
      ansResult.style.display = "block";
      nextQuiz();
    } else {
      //countDown.textContent = 0;
      finalQuiz();
    }
  });
  

}

function startQuiz() {
  countDown.textContent = setCountDown;
  dialogBox.style.display = "block";
  introQuiz.style.display = "none";
  finalScore.style.display = "none";
  setTime();
  nextQuiz();
}

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    countDown.textContent--;
    if(countDown.textContent <= 0 || isFinishQuiz) {
      //countDown.textContent = 0;
      finalQuiz();
      clearInterval(timerInterval);
    }
  }, 1000);
}