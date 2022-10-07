let randomNr = Math.floor(Math.random() * 100) + 1; // skapar ett random nummer mellan 1 och 100 och ger det till variabeln

let guessCount = 1;     // skapar variabeln och ger den 1
let tryAgainButton;     // deklarerar variabeln
let guessRemaining;     // deklarerar variabeln

const guesses = document.querySelector('.guesses'); //skapar variabler som kopplas till paragrafer/knappar/fält i index.html 
const guessSubmit = document.querySelector('.guessSubmit');     //---------^
const textField = document.querySelector('.textField');         //---------^
const lastResult = document.querySelector('.lastResult');       //---------^
const highLow = document.querySelector('.highLow');             //---------^


const checkGuess = () => {
    const userGuess = Number(textField.value);              //deklarerar & sätter variabelns värde till värdet i textfältet, använder Number() så att värdet alltid är ett nummer.
    guessRemaining = 10 - guessCount;                       // skapar variabeln och ger den värde av 10 minus guessCount
    guesses.textContent = `Antal Gissningar kvar: (${guessRemaining}) Senaste gissning: `; 
    guesses.textContent += `${userGuess} `;                 //lägger till nuvarande gissning till slutet på guesses text + ett blanksteg

    if (userGuess === randomNr) {                           //om nuvarande gissning är rätt
        lastResult.textContent = `GRATTIS TILL VINSTEN JOAKIM! Det tog bara ${guessCount} försök!`; //ger text till variabeln
        lastResult.style.backgroundColor = 'green';         //ger bakgrundsfärg till texten
        highLow.textContent = '';                           //tömmer texten i variabeln
        highLow.style.backgroundColor = 'white';            //ändrar bakgrunden till vit
        gameOver();                                         //kör den funktionen
    } else if (guessCount === 10) {                         //annars, om det är sista försöket
        lastResult.textContent = `GAME OVER! - Du har försökt ${guessCount} gånger!`; //ger text till variabeln
        highLow.textContent = '';                           //tömmer texten i variabeln
        highLow.style.backgroundColor = 'white';            //ändrar bakgrunden till vit
        gameOver();                                         //kör den funktionen
    } else {                                            //annars
        lastResult.textContent = 'FEL! BÄTTRE KAN DU JOAKIM!';  //ger text till variabeln
        lastResult.style.backgroundColor = 'red';               //ger bakgrundsfärg till texten i variabeln
        highLow.style.backgroundColor = 'red';                  //ger bakgrundsfärg till texten i variabeln
        if (userGuess < randomNr) {                             //om gissning var mindre än rätt svar
            highLow.textContent = 'FÖR LÅGT NUMMER!';           //ger text till variabeln
        } else if (userGuess > randomNr) {                      //annars, om gissning var större än rätt svar
            highLow.textContent = 'FÖR HÖGT NUMMER!';           //ger text till variabeln
        }
    }
    guessCount++;                               //lägger till 1 till variabeln så att spelarens tur försvinner
    textField.value = '';                       //tömmer textfältets värde/text
    textField.focus();                          //fokuserar textfältet
}
guessSubmit.addEventListener('click', checkGuess);

function gameOver() {
    textField.disabled = true;                           //stänger av textfältet
    guessSubmit.disabled = true;                         //stänger av knappen
    tryAgainButton = document.createElement('button');   //skapar ny knapp
    tryAgainButton.classList.add('tryAgain');            //ger en klass till knappen så man kan styla
    tryAgainButton.textContent = 'Försök Igen';          //get knappen text
    document.body.append(tryAgainButton);                //lägger knappen längst ner i body
    tryAgainButton.addEventListener('click', resetGame); //skapar eventlistener som kör funktion resetGame vid ett klick

}

function resetGame() {
    guessCount = 1;                     // sätter gissningar till 1 igen
  
    const resetPara = document.querySelectorAll('.paragraphs p');    //skapar resetPara och kopplar ihop den
                                                                     //med div klassen i index.html
    for (const resetPara2 of resetPara) {                       // loopar igenom sig själv, alltså de tre <p> i divklassen
      resetPara2.textContent = '';//tömmer all text
    }
  
    tryAgainButton.parentNode.removeChild(tryAgainButton);          // tar bort "försök igen"-knappen 
  
    textField.disabled = false;             //sätter på textfältet
    guessSubmit.disabled = false;           //sätter på knappen
    textField.value = '';                   //tömmer textfältet på text
    textField.focus();                      //fokuserar textfältet
  
    lastResult.style.backgroundColor = 'white';     //sätter bakgrundsfärgen till vit
  
    randomNr = Math.floor(Math.random() * 100) + 1; //skapar ett nytt random nummer
  }