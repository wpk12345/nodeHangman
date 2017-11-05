var inquirer = require("inquirer");
var word = require("./word.js");
var lettersGuessed = [];
var lettersInChosenWord = [];
var blanksAndSuccesses = [];
var numBlanks = 0;
var wordsList = ["Let it be", "Helter Skelter", "I want to hold your hand", "The fool on the hill", "Hey Jude", "Yesterday", "Blackbird", "Penny Lane", "Come together", "Get back"];
var chosenWord = "";

function chooseWord() {
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
}
chooseWord();

lettersInChosenWord = chosenWord.split("");
numBlanks = lettersInChosenWord.length;

var displaySpaces = function () {
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
    // Populate the blanksAndSuccesses with every instance of the letter.
    if (chosenWord[i] === " ") {
      // Here we set the specific space in blanks and letter equal to the letter when there is a match.
      blanksAndSuccesses[i] = " ";
    }
  }
  console.log(blanksAndSuccesses.join(" "));
}
displaySpaces();
var guessWord = function (guesses) {

  if (guesses > 0) {
    inquirer.prompt([{
      name: "guess",
      message: "Guess a Letter",
      validate: function (value) {
        if (lettersGuessed.indexOf(value) > -1) {
          console.log("\nYou already guessed that letter!");
          return false;
        } else if (value.length > 1) {
          console.log("\nPlease choose only one letter at a time.");
          return false;
        } else if (blanksAndSuccesses.indexOf(value) > -1) {
          console.log("\nYou already guessed that letter!");
          return false;
        } else if (lettersGuessed.indexOf(value) < 0) {
          return true;
        }
      }
    }]).then(function (answers) {
      if (lettersInChosenWord.indexOf(answers.guess) == -1) {
        lettersGuessed.push(answers.guess);
        console.log("Letters already guessed")
        console.log(lettersGuessed);
        guesses--;
        if (guesses == 1) {
          console.log("\nINCORRECT!!! \n" + guesses + " guess remaining!");
          console.log(blanksAndSuccesses.join(" "));
          guessWord(guesses);
        } else {
          console.log("\nINCORRECT!!! \n" + guesses + " guesses remaining!");
          console.log(blanksAndSuccesses.join(" "));
          guessWord(guesses);
        }
        debugger;
      } else {
        for (var i = 0; i < numBlanks; i++) {
          if (answers.guess == lettersInChosenWord[i]) {
            var correctLetter = lettersInChosenWord[i];
            blanksAndSuccesses[i] = correctLetter;
          }
        }
        console.log(blanksAndSuccesses.join(" "));
        if (blanksAndSuccesses.indexOf("_") == -1) {
          correct();
        } else {
          guessWord(guesses);
        }
      }
    });
  } else {
    console.log("The answer is: " + lettersInChosenWord.join(""));
    inquirer.prompt([{
      type: "confirm",
      name: "again",
      message: "You're all out of guesses, would you like to play again?",
    }]).then(function (answer) {
      if (answer.again) {
        replay();
      } else {
        console.log("Thanks for playing!");
        return;
      }
    });
  }
};
guessWord(5);

function correct() {
  console.log("You got it right!");
  inquirer.prompt([{
    type: "confirm",
    name: "again",
    message: "Would you like to play again?",
  }]).then(function (answer) {
    if (answer.again) {
      console.log("Good luck!");
      replay();
    } else {
      console.log("Come back soon!");
      return;
    }
  });
}

function replay() {
  lettersGuessed = [];
  lettersInChosenWord = [];
  blanksAndSuccesses = [];
  correctGuessed = [];
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  displaySpaces();
  guessWord(5);
};