// ===== Global variabel with an array including all the words for the game =====
const words = ["STORMTROOPER", "JEDI", "YODA", "DROID", "LIGHTSABER", "SANDPEOPLE", 
"DEATH STAR", "PADME", "CHEWBACCA", "WOOKIEE", "JAWA", "JAR JAR BINKS",
"HAN SOLO", "ANAKIN SKYWALKER", "LUKE SKYWALKER", "DARTH VADER", "DARTH MAUL", "THE FORCE",
"LEIA"];
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
         creates an empty li and place them in the ul in HTML that is marked with the class currentWord. If the 
         "word" includes a space it takes away the styling for it.
         Then removes eventlistener to prevent multiple word at the same time */
function createPH() {
    wordArray.forEach(item => {
        const li = document.createElement("li");
        if(item === " ") {
            li.style.borderBottom = "none";
        }
        currentWord.appendChild(li);
        startBtn.removeEventListener("click", createPH);
    })    
}

// ===== Adds eventlistener to letterBtn. When clicked on it calls the function compmare =====
letterBtn.addEventListener("click", compare);

/* ===== Function wich first checks if clicked element is a button. Then it listens to the click if you click a button
         in wordArray*/
function compare(e) {
    if (e.target.nodeName == ("BUTTON")) {
        if(wordArray.includes(e.target.textContent)) {
            for(let i = 0; i < wordArray.length; i++) {
                if(wordArray[i] === e.target.textContent) {
                    currentWord.children[i].innerHTML = e.target.textContent;
                    rightGuesses++;
                     
                    /* ===== If the word includes a space than it compares right guesses to the word array -1
                             so you can win the game without filling every place holder =====*/
                    if(wordArray.includes(" ")) {
                        if(rightGuesses === wordArray.length -1) {
                            message.innerHTML = "The force is strong with you!"
                            startOverBtn();
                        } 
                    /* ===== When the rightGuesses is equal to the length of the word you win and get a message. And 
                              the startOverBtn function is called =====*/
                    } else if(!wordArray.includes(" ")) {
                        if(rightGuesses === wordArray.length) {
                            message.innerHTML = "The force is strong with you!"
                            startOverBtn();
                        }
                    }
                }
            }
            /* ===== Every time wrongGuesses increases the png changes with it. For exempel when wrongGuesses has
                     increased by 2 the img hm2 will show. Differnt messages when wrongGuesses reaches 5 or 6 nad then
                     starOvertBtn is called ===== */
        } else { 
            wrongGuesses++;
            hangmanImg.src = `images/hm${wrongGuesses}.png`;

            if(wrongGuesses === 5) {
                message.innerHTML = "One more wrong and you're done...";
            }

            if(wrongGuesses === 6) {
                message.innerHTML = "Jabba the Hutt will be so pleased with his new pet, YOU!";
                startOverBtn();
            }
        }
        // ===== Disables buttons after beeing clicked =====
        e.target.disabled = true;
    }
}

// ===== Function that changes the text in the startBtn and adds an eventlistener and calls function starOverF =====
function startOverBtn() {
    startBtn.textContent = "Start over";
    startBtn.addEventListener("click", startOverF);
}

/* ===== Function that resets the game. Change the button text back to "Start Game", empties the word container, 
         resets the counters and image, enables buttons ===== */
function startOverF() {
    startBtn.textContent = "Start Game";
    randomWord();
    startBtn.addEventListener("click", createPH);
    currentWord.innerHTML = "";
    rightGuesses = 0;
    wrongGuesses = 0;
    hangmanImg.src = "images/hm0.png";
    message.innerHTML = "";
    const enableBtns = document.getElementsByTagName("button");
        for (let i = 0; i < enableBtns.length; i++) {
            enableBtns[i].disabled = false;
        }
}
