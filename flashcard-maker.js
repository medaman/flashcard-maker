var basicCard = require("./BasicCard");
var clozeCard = require("./ClozeCard");

var fs = require("fs");

var inquirer = require("inquirer");

var score = 0;

var start = function() {
  inquirer.prompt({
    name:"action",
    message: "What would you like to do?",
    choices: [{name: "1. Make a new card", value:1},
              {name: "2. Take a random quiz", value:2},
              {name: "3. Quit", value:3}],
    type: "list"
  }).then(function(answer) {
    if (answer.action === 1) {
      addCard();
    } else if (answer.action === 2) {
      quiz();
    } else if (answer.action === 3) {
      console.log("Goodbye!");
    }
  })
}

var addCard = function() {
  inquirer.prompt({
    name: "type",
    message: "What kind of card would you like to make?",
    choices: [{name:"1. Basic Card", value:1}, {name:"2. Cloze Card", value:2}],
    type: "list"
  }).then(function(answer) {
    if (answer.type === 1) {
      inquirer.prompt([
      {
        name: "front",
        message: "Please enter text on the front of the card: ", 
      },
      {
        name: "back",
        message: "Please enter text on the back of the card: ", 
      }
      ]).then(function(answer){
        var newCard = basicCard(answer.front, answer.back)
        console.log("Question: " + newCard.front);
        console.log("Answer: " + newCard.back);
        start();
      })
    } else if (answer.type === 2) {
      inquirer.prompt([
      {
        name: "text",
        message: "Please enter the full text: ", 
      },
      {
        name: "cloze",
        message: "Please enter the cloze text: ", 
      }
      ]).then(function(answer){
        var newCard = clozeCard(answer.text, answer.cloze)
        console.log("Question: " + newCard.partial);
        console.log("Answer: " + newCard.cloze);
        start();
      })
    }
  })
}

var askQuestion = function(error, data) {
  if (error) {
    return console.log(error)
  }
  var arr = data.split("\n");
  arr.pop();
  var rand = Math.floor(Math.random() * arr.length);
  console.log("Question: " + arr[rand].split(",")[0]);
  inquirer.prompt({
    name: "answer",
    message: "Answer: "
  }).then(function(answer) {
    if (answer.answer === arr[rand].split(",")[1]) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Wrong!");
      score--;
    }
    console.log("Score: " + score);
    start();
  })
}

var quiz = function() {
  inquirer.prompt({
    name: "type",
    message: "Which cards would you like to use: ",
    choices: [{name:"1. Basic Cards", value:1}, {name:"2. Cloze Cards", value:2}],
    type: "list"
  }).then(function(answer) {
    if(answer.type === 1) {
      fs.readFile("basic.csv", "utf8", function(error, data) {
        askQuestion(error, data);
      })
    } else if (answer.type === 2) {
        fs.readFile("cloze.csv", "utf8", function(error, data) {
        askQuestion(error, data);
      })
    }
  })
}

start();

/*var firstPresident = basic("Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 

var firstPresidentCloze = cloze("George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial);

// "George Washington was the first president of the United States.
console.log(firstPresidentCloze.fullText);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = cloze("This doesn't work", "oops");*/