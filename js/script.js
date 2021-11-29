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


