let arrayOfImages = ["heart", "heart-black", "left", "right", "ring", "ring-2", "star", "star-red", "heart", "heart-black", "left", "right", "ring", "ring-2", "star", "star-red"];
//storing memory when element is clicked;
let memory = [];
//storing id fo each clicked card
let cardId = [];
//storing cards that are flipped;
let fliped_card = [];
//storing moves that player has made
let moveCounter = 0;
//incrementor
let timeCounter=0;
//setTimeout
let t;
//storing time
let time;
//shufle method
let output="";
Array.prototype.shuffle = function() {
    let i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};
//creating board for better look and showing which cards have been used
function makeBoard() {
    resetTime();
     output = '';
    moveCounter=0;
    document.getElementById('counter').innerHTML="";
    document.getElementById('score').innerHTML="";
    for (let i = 0; i < arrayOfImages.length; i++) {
        output += '<div class="cardbox"><div id="card' + i + '" class="card1" "><div class="back"><img src="img/' + arrayOfImages[i] + '.jpg"></div><div class="front"><h1>?</h1></div></div></div>';
    }
    document.getElementById('memory_board').innerHTML = output;

}

//starting Game and replacying show off board with functional one
function startGame() {
    fliped_card =[ ]; //reseting number of open cards
    output = '';
    arrayOfImages.shuffle();
    for (let i = 0; i < arrayOfImages.length; i++) {
        output += '<div class="cardbox"><div id="card' + i + '" class="card" onclick="flipCard(this,\'' + arrayOfImages[i] + '\')"><div class="back"><img src="img/' + arrayOfImages[i] + '.jpg"></div><div class="front"><h1>?</h1></div></div></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
    startCount();
}

//incrementing
function startCount(){
      t= setTimeout(function(){
      timeCounter++;
      let min=Math.floor(timeCounter/10/60);
      let sec=Math.floor(timeCounter/10%60);
      if(min<10){
        min="0"+min;
      }
      if(sec<10){
        sec="0"+sec;
      }
      let ten=timeCounter%10;
      document.getElementById('timer').innerHTML=min+":"+sec+":0"+ten;
      time=min+":"+sec+":0"+ten;
      startCount();
    },100)
}
//resetTime
function resetTime(){
  clearTimeout(t);
  timeCounter=0;
  document.getElementById('timer').innerHTML="";
}
//filp card function
function flipCard(card, val) {
    // checking  if memory have more then 2 elelments
    if (memory.length < 2) {
        if (memory.length === 0 && fliped_card.includes(card.id)=== false) { //if memory has no elements push val and id of element
            memory.push(val);
            cardId.push(card.id);
            card.style.transform = "rotateY(180deg)"; //fliping card
        } else if (memory.length == 1 &&cardId[0]!==card.id&&fliped_card.includes(card.id)=== false) { //and if memory has one element and that element does not have same id as first one.
            moveCounter++; //start counter
            let counter = moveCounter.toString(); //turn number to string
            document.getElementById('counter').innerHTML = counter; //grabing area for placying output
            memory.push(val); //pushing val and id of 2 card
            cardId.push(card.id);
            card.style.transform = "rotateY(180deg)"; //fliping card
            if (moveCounter<15){
              document.getElementById('score').innerHTML="Gold Position";
            }
            else if (moveCounter>16){
              document.getElementById('score').innerHTML="Silver Position";
            }  else if (moveCounter>18){
                document.getElementById('score').innerHTML="Bronze Position";
              }  else if (moveCounter>19){
                  document.getElementById('score').innerHTML="Bannana";
                }
            //checking memory has 2 uniq cards and content of each is same.
            if (memory[0] === memory[1] && cardId[0] !== cardId[1]) {
                fliped_card.push(cardId[0]);
                fliped_card.push(cardId[1]); //adding amount of card that has been cleared
                memory = []; //clearing memory and id arrays
                cardId = [];
                //checking if the board is cleared
                if (fliped_card.length === arrayOfImages.length) {
                    //if it is for each number of moves player earned medal if it is too much moves try again
                    if (moveCounter < 15) {
                        alert("Well Done! You have finished game in "+time+" and you had " + moveCounter + " moves.This is Gold Medal!Respect! ;)");
                    } else if (moveCounter < 17) {
                        alert("Well Done! You have finished game in "+time+" and you had " + moveCounter + " moves. You have earned Silver Medal!Do you wanna try for Gold");
                    } else if (moveCounter < 19) {
                        alert("Well Done! You have finished game in "+time+" and you had " + moveCounter + " moves that is Bronze Medal!Not bad it almost looks like Gold!Try again maybe you will be better next time.");
                    } else {
                        alert("Hmm Sorry but you suck!Huh sombody needs to tell you, but wait!! look on bright side you can always try again :) ");
                      }
                        moveCounter = 0;
                        document.getElementById('counter').innerHTML = "";
                        document.getElementById('memory_board').innerHTML = "";
                        fliped_card = 0;
                        document.getElementById('score').innerHTML="";
                        makeBoard();

                }
            }
            //if the card is not guessed turn cards back to original position
            else {
                function flipBack() {
                  if(cardId[0]!==cardId[1]){
                    document.getElementById(cardId[0]).style.transform = "rotateY(0)";
                    document.getElementById(cardId[1]).style.transform = "rotateY(0)";
                    memory = []; //clearing memory and id arrays to prevent storing values
                    cardId = [];
                  }
                }
                setTimeout(flipBack, 650); //adding wait time of 0,65sec
            }
        }
    }
}
