//image array
var arrayOfImages=["heart","heart-black","left","right","ring","ring-2","star","star-red","heart","heart-black","left","right","ring","ring-2","star","star-red"];
//storing memory when element is clicked;
var memory=[];
//storing id fo each clicked card
var cardId=[];
//storing cards that are flipped;
var fliped_card=0;
//storing moves that player has made
var moveCounter=0;
//shufle method
Array.prototype.shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
//creating board for better look and showing which cards have been used
function makeBoard(){
  var output='';
  for(var i = 0; i < arrayOfImages.length; i++){
    output +='<div class="cardbox"><div id="card'+i+'" class="card1" "><div class="back"><img src="img/'+arrayOfImages[i]+'.jpg"></div><div class="front"><h1>?</h1></div></div></div>';
  }
document.getElementById('memory_board').innerHTML = output;
}

//starting Game and replacying show off board with functional one
function startGame(){
var fliped_card = 0;//number of open cards
var output='';
  arrayOfImages.shuffle();
	for(var i = 0; i < arrayOfImages.length; i++){
    output +='<div class="cardbox"><div id="card'+i+'" class="card" onclick="flipCard(this,\''+arrayOfImages[i]+'\')"><div class="back"><img src="img/'+arrayOfImages[i]+'.jpg"></div><div class="front"><h1>?</h1></div></div></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
}
//filp card function
function flipCard(card,val){
  // checking how if memory have more then 2 elelments
  if(memory.length<2){
    card.style.transform="rotateY(180deg)";//fliping card
      if(memory.length==0){//if memory has no elements push val and id of element
      memory.push(val);
      cardId.push(card.id);
      }
        else if(memory.length==1){//and if memor has one element
          moveCounter++;//start counter
          var counter=moveCounter.toString();//turn number to string
          document.getElementById('counter').innerHTML=counter;//grabing area for placying output
          memory.push(val);//pushing val and id of 2 card
          cardId.push(card.id);
          console.log(cardId);
          console.log(memory);
          //checking memory has 2 uniq cards and content of each is same.
          if(memory[0]===memory[1]&&cardId[0]!==cardId[1]){
          fliped_card+=2;//adding amount of card that has been cleared
          memory=[];//clearingmemory and id arrays
          cardId=[];
          console.log(fliped_card);
          //checking if the board is cleared
          if(fliped_card===arrayOfImages.length){
            //if it is for each number of moves player earned medal if it is too much moves try again
           if (moveCounter<16){
              alert("Well Done! You have finished game in "+moveCounter+" moves and You have earned Gold Medal!");
              moveCounter=0;//reseting counter
              document.getElementById('counter').innerHTML="";//clearing counter area
              document.getElementById('memory_board').innerHTML="";//clearing memory board
              fliped_card=0;//reseting number of flipped
              makeBoard();//making show board
              }
           else if (moveCounter<18) {
              alert("Well Done! You have finished game in "+moveCounter+" moves and You have earned Silver Medal!");
               moveCounter=0;
               document.getElementById('counter').innerHTML="";
               document.getElementById('memory_board').innerHTML="";
               fliped_card=0;
               makeBoard();
          }
           else if (moveCounter<20) {
                alert("Well Done! You have finished game in "+moveCounter+" moves and You have earned Bronze Medal!");
                moveCounter=0;
                document.getElementById('counter').innerHTML="";
                document.getElementById('memory_board').innerHTML="";
                fliped_card=0;
                makeBoard();
              }
            else {
              alert("Sorry you didn't get the medal");
              moveCounter=0;
              document.getElementById('counter').innerHTML="";
              document.getElementById('memory_board').innerHTML="";
              fliped_card=0;
              makeBoard();
            }
          }
      }
      //if the card is not guessed turn cards back to original position
        else{
          function flipBack(){
            document.getElementById(cardId[0]).style.transform="rotateY(0)";
            document.getElementById(cardId[1]).style.transform="rotateY(0)";
            memory=[];//clearing memory and id arrays to prevent storing values
            cardId=[];
          }
          setTimeout(flipBack,650);//adding wait time of 0,65sec
        }
      }
    }
}
