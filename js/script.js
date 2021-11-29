// ===== Global variabel with an array including all the words for the game =====
const words = ["STORMTROOPER", "JEDI", "YODA", "DROID", "LIGHTSABER", "SANPEOPLE", 
"DEATH STAR", "PADME", "CHEWBACCA", "WOOKIEE", "OBI-WAN KENOBI", "JAWA", "JAR JAR BINKS", "MILLENIUM FALCON",
"HAN SOLO", "ANAKIN SKYWALKER", "LUKE SKYWALKER", "DARTH VADER", "DARTH MAUL", "THE FORCE", "THE DARK SIDE",
"PRINCESS LEIA"];
let wordArray;

// ===== Global variabels that's conected to different elements in index.html by classes =====
const startBtn = document.querySelector(".startBtn");
const currentWord = document.querySelector(".currentWord");
const letterBtn = document.querySelector(".letterContainer");
let hangmanImg = document.querySelector(".hangman");
const message = document.querySelector(".message");

// ===== Global variables that counts right and wrong guesses =====
let rightGuesses = 0;
let wrongGuesses = 0;

// ===== Function that takes a random word from "words" and then split that word in to an array =====
function randomWord() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    wordArray = randomWord.split("");
}
// ===== Adds eventListener to startBt. Waits for click on the startBtn then it calls both createPH and randomword =====
startBtn.addEventListener("click", createPH);
console.log(startBtn);
randomWord();

/* ===== Function that creates place holders for the current word to be guessed. For each letter in the word it 
         creates an empty li and place them in the ul in HTML that is marked with the class currentWord.
         Then removes eventlistener to prevent multiple word at the same time */
function createPH() {
    wordArray.forEach(item => {
        const li = document.createElement("li");
        currentWord.appendChild(li);
        startBtn.removeEventListener("click", createPH);
    })
}