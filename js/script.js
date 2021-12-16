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

let rightGuesses = 0;
let wrongGuesses = 0;


// ===== Function that takes a random word from "words" and then split that word in to an array =====
function randomWord() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    wordArray = randomWord.split("");
}
// ===== Adds eventListener to startBt. Waits for click on the startBtn then it calls both createPH and randomword =====
startBtn.addEventListener("click", placeholders);
randomWord();

/* ===== Function that creates place holders for the current word to be guessed. For each letter in the word it 
         creates an empty li and place them in the ul in HTML that is marked with the class currentWord. If the 
         "word" includes a space it takes away the styling for it.
         Then removes eventlistener to prevent multiple word at the same time. Makes buttons visible*/
function placeholders() {
    wordArray.forEach(item => {
        const li = document.createElement("li");
        if(item === " ") {
            li.style.borderBottom = "none";
        }
        currentWord.appendChild(li);
        startBtn.removeEventListener("click", placeholders);
        letterBtn.style.visibility = "visible";
    })      
}

// ===== Adds eventlistener to letterBtn. When clicked on it calls the function compare =====
letterBtn.addEventListener("click", compare);

/* ===== Function wich checks if clicked element is a button and compares it's content in wordArray. 
         Calls different functions depending on if it's included or not ===== */
function compare(e) {
    if (e.target.nodeName == ("BUTTON")) {
        if(wordArray.includes(e.target.textContent)) {
            for(let i = 0; i < wordArray.length; i++) {
                if(wordArray[i] === e.target.textContent) {
                    currentWord.children[i].innerHTML = e.target.textContent;
                    rightGuesses++;
                    win();
                }
            }
        } else {
            wrongGuesses++;
            hangmanImg.src = `images/hm${wrongGuesses}.png`; 
            loose();
        }            
    }  
 // ===== Disables buttons after beeing clicked =====
    e.target.disabled = true;
}

/* ===== Function that displays winning messages when rightGuesses is equal to the length of wordArray.
         If the word includes a space it counts wordArray -1 ===== */
function win() {
    if(wordArray.includes(" ")) {
        if(rightGuesses === wordArray.length -1) {
            message.innerHTML = "The force is strong with you!";
            letterBtn.style.visibility = "hidden"; 
            startOverBtn();
        } 
    } else if(!wordArray.includes(" ")) {
            if(rightGuesses === wordArray.length) {
                message.innerHTML = "The force is strong with you!";
                letterBtn.style.visibility = "hidden"; 
                startOverBtn();
            }
    }
}

/* ===== Displays different messages when player has one guess left and if the player looses.
         And the startOverBtn function is called ===== */
function loose() {
    if(wrongGuesses === 5) {
        message.innerHTML = "One more wrong and you're done...";
    } else if(wrongGuesses === 6) {                
        message.innerHTML = "Jabba the Hutt will be so pleased with his new pet, YOU!";
        letterBtn.style.visibility = "hidden";              
        startOverBtn();                
    }
}

// ===== Function that changes the text in the startBtn and adds an eventlistener and calls function starOverF =====
function startOverBtn() {
    startBtn.textContent = "Start over";
    startBtn.addEventListener("click", startOver);
}

/* ===== Function that resets the game. Change the button text back to "Start Game", empties the word container, 
         resets the counters and image, enables buttons ===== */
function startOver() {
    startBtn.textContent = "Start Game";
    randomWord();
    startBtn.addEventListener("click", placeholders);
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
