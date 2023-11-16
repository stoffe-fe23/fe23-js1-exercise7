//////////////////////////////////////////////////////////////////////////////////
// MINISPEL - HÖGSTA NUMRET
/*
UPPGIFT: 
Skapa ett spel där en användare tävlar mot datorn. Målet är att få högst nummer.

När användaren klickar knappen ska två heltal från 0 till 100 genereras. Ett för användaren och ett för datorn. 
Den som har det högsta numret av de två vinner ett poäng. 

Först till 10 poäng vinner. Visa på valfritt sätt i DOM:en vem som vann. 
När någon har vunnit ska poängen resetas så att spelet börjar om.
*/

let scorePlayer = 0;
let scoreComp = 0;

const rollButton = document.querySelector("#numberbox button");

rollButton.addEventListener("click", (evt) => {
    const rollboxPlayer = document.querySelector("#number-player");
    const rollboxComp = document.querySelector("#number-computer");

    // Spelet är över, starta ny omgång
    if ((scorePlayer >= 10) || (scoreComp >= 10)) {
        resetGame();
    }
    else {
        rollDice();
    }
});

// Generera nummer och visa för spelaren
function rollDice() {
    const rollboxPlayer = document.querySelector("#number-player");
    const rollboxComp = document.querySelector("#number-computer");

    const playerNumber = Math.floor(Math.random() * 101);
    const compNumber = Math.floor(Math.random() * 101);

    rollboxPlayer.innerText = playerNumber;
    rollboxComp.innerText = compNumber;
    
    // Spelaren vinner
    if (playerNumber > compNumber) {
        rollboxPlayer.style.color = "green";
        rollboxPlayer.style.fontWeight = "bold";
        rollboxPlayer.style.fontSize = "2em";
        
        rollboxComp.style.color = "red";
        rollboxComp.style.fontWeight = "400";
        rollboxComp.style.fontSize = "1em";

        scorePlayer++;
        updateScoreBoard();
    }
    // Datorn vinner
    else if (compNumber > playerNumber) {
        rollboxPlayer.style.color = "red";
        rollboxPlayer.style.fontWeight = "400";
        rollboxPlayer.style.fontSize = "1em";
        
        rollboxComp.style.color = "green";
        rollboxComp.style.fontWeight = "bold";
        rollboxComp.style.fontSize = "2em";

        scoreComp++;
        updateScoreBoard();
    }
    // Oavgjort
    else {
        rollboxPlayer.style.color = "red";
        rollboxPlayer.style.fontWeight = "400";
        rollboxPlayer.style.fontSize = "1em";
        
        rollboxComp.style.color = "red";
        rollboxComp.style.fontWeight = "400";   
        rollboxComp.style.fontSize = "1em";
    }
}


// Uppdatera den visade poängställningen och hantera vinst/förlust
function updateScoreBoard() {
    const scoreboxPlayer = document.querySelector("#score-player");
    const scoreboxComp = document.querySelector("#score-computer");
    const gameOverBox = document.querySelector("#gameover");

    scoreboxPlayer.innerText = scorePlayer;
    scoreboxComp.innerText = scoreComp;

    // Ledaren grönfärgad, andra rödfärgad. Ingen färg om f.n. oavgjort
    if (scorePlayer > scoreComp) {
        scoreboxPlayer.style.color = "green";
        scoreboxComp.style.color = "red";
    }
    else if (scoreComp > scorePlayer) {
        scoreboxPlayer.style.color = "red";
        scoreboxComp.style.color = "green";
    }
    else {
        scoreboxPlayer.style.removeProperty('color');
        scoreboxComp.style.removeProperty('color');
    }

    // Spelaren vinner omgången
    if (scorePlayer >= 10) {
        gameOverBox.innerText = "Victory!";
        gameOverBox.style.display = "block";
        gameOverBox.style.backgroundColor = "green";
        rollButton.innerText = "New game";
    }
    // Datorn vinner omgången
    else if (scoreComp >= 10) {
        gameOverBox.innerText = "You lost...";
        gameOverBox.style.display = "block";
        gameOverBox.style.backgroundColor = "red";
        rollButton.innerText = "New game";
    }
}

// Nollställ spelet och starta ny omgång
function resetGame() {
    const rollboxPlayer = document.querySelector("#number-player");
    const rollboxComp = document.querySelector("#number-computer");
    const gameOverBox = document.querySelector("#gameover");

    scorePlayer = 0;
    scoreComp = 0;

    gameOverBox.style.removeProperty('display');

    rollboxPlayer.innerText = "-";
    rollboxComp.innerText = "-";
    rollboxPlayer.style.removeProperty('color');
    rollboxComp.style.removeProperty('color');
    rollboxPlayer.style.removeProperty('font-size');
    rollboxComp.style.removeProperty('font-size');

    rollButton.innerText = "Roll dice";

    updateScoreBoard();
}

//////////////////////////////////////////////////////////////////////////////////
// MINISPEL - GISSA FÄRG

/*
UPPGIFT: 
Gissa färg
Skapa ett spel där en användare ska gissa vilken färg datorn tänker på. 

Användaren ska skriva en färg i textinputen.
När användaren klickar på knappen eller trycker enter ska en random färg från arrayen väljas ut. 
Om användaren har matat in samma färg som den som valdes ut ska bakgrundsfärgen på bodyn ändras till den färgen.
Användaren ska även få 1 poäng som ska visas i h1-elementet. 
*/

let currentScore = 0;
let currentRound = 0;

const colors = ["hotpink", "skyblue", "violet", "lightgreen",  "orange"];

const colorScore = document.querySelector("#color-score");
const colorResult = document.querySelector("#color-result");
const colorForm = document.querySelector("#color-form");
const colorButton = document.querySelector("#color-button");
const colorReset =  document.querySelector("#color-reset");
const colorList = document.createElement("datalist");

colorList.id = "color-list";
colorForm.appendChild(colorList);

for (let i = 0; i < colors.length; i++) {
    const colorOpt = document.createElement("option");
    colorOpt.value = colors[i];
    colorList.appendChild(colorOpt);
}

colorButton.addEventListener("click", (evt) => {
    const playerColorPicker = document.querySelector("#color-picker");
    const playerColor = playerColorPicker.value;
    
    const idx = Math.floor(Math.random() * colors.length );

    if (playerColor.toLowerCase() == colors[idx]) {
        document.body.style.backgroundColor = colors[idx];
        currentScore++;
        colorResult.innerText = `Correct! The color is ${colors[idx]}.`;
        colorResult.style.color = colors[idx];
    }
    else {
        document.body.style.removeProperty("background-color");
        colorResult.innerText = `Wrong! You guessed ${playerColor} but the color is ${colors[idx]}...`;
        colorResult.style.color = colors[idx];
    }

    console.log(playerColor.toLowerCase(), colors[idx]);
    
    currentRound++;

    colorScore.innerText = `Your score: ${currentScore} of ${currentRound}`;

    playerColorPicker.focus();
    playerColorPicker.value = "";
    evt.preventDefault();
});

colorReset.addEventListener("click", (evt) => {
    currentRound = 0;
    currentScore = 0;
    document.body.style.removeProperty("background-color");
    colorResult.innerText = "";
    colorScore.innerText = "";
});

