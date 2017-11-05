// requiring our Student module exported from student.js
var Letter = require("./letter");

// constructor function for creating classroom objects
var Word = function (word, spaces, guesses) {
    // this.students will hold all of our student objects
    var winCounter = 0;
    var lossCounter = 0;
    this.lettersGuessed = [];
    var correctGuessed = [];
    // Solution will be held here.
    var chosenWord = "";
    // This will break the solution into individual letters to be stored in array.
    var lettersInChosenWord = [];
    // This will be the number of blanks we show based on the solution
    var numBlanks = 0;
    // Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
    var blanksAndSuccesses = [];
    // Holds all of the wrong guesses
    var wrongGuesses = [];
//starts game
    this.startGame = function () {
        // Reset the guesses back to 0.

        // Solution is chosen randomly from wordList.
        chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
        // The word is broken into individual letters.
        lettersInChosenWord = chosenWord.split("");
        // We count the number of letters in the word.
        numBlanks = lettersInChosenWord.length;

        // We print the solution in console (for testing).
        console.log(chosenWord);
        // CRITICAL LINE - Here we *reset* the guess and success array at each round.
        blanksAndSuccesses = [];
        // CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
        wrongGuesses = [];
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

    function checkLetters(letter) {
        var letterInWord = false;

        // Check if a letter exists inside the array at all.
        for (var i = 0; i < numBlanks; i++) {
            if (chosenWord[i] === letter) {
                // If the letter exists then toggle this boolean to true. This will be used in the next step.
                letterInWord = true;
            }
        }
        // If the letter exists somewhere in the word, then figure out exactly where (which indices).
        if (letterInWord) {
            // Loop through the word.
            for (var j = 0; j < numBlanks; j++) {

                // Populate the blanksAndSuccesses with every instance of the letter.
                if (chosenWord[j] === letter) {
                    // Here we set the specific space in blanks and letter equal to the letter when there is a match.
                    blanksAndSuccesses[j] = letter;
                }
            }
            // Logging for testing.
            console.log(blanksAndSuccesses);
        }
        // If the letter doesn't exist at all...
        else {
            // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
            wrongGuesses.push(letter);
            numGuesses--;
        }
    }

};

// exporting our Classroom constructor. We will require it in main.js
module.exports = Word;

