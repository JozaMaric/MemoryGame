var arrayOfImages=["heart","heart-black","left","right","ring","ring-2","star","star-red","heart","heart-black","left","right","ring","ring-2","star","star-red"];
var memory=[];
var cardId=[];
var fliped_card=0;
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
function makeBoard(){
  var output='';
  for(var i = 0; i < arrayOfImages.length; i++){
    output +='<div class="cardbox"><div id="card'+i+'" class="card1" "><div class="back"><img src="img/'+arrayOfImages[i]+'.jpg"></div><div class="front"><h1>?</h1></div></div></div>';
  }
document.getElementById('memory_board').innerHTML = output;
}

//starting Game
function startGame(){
var fliped_card = 0;//number of open cards
var output='';
  arrayOfImages.shuffle();
	for(var i = 0; i < arrayOfImages.length; i++){
    output +='<div class="cardbox"><div id="card'+i+'" class="card" onclick="flipCard(this,\''+arrayOfImages[i]+'\')"><div class="back"><img src="img/'+arrayOfImages[i]+'.jpg"></div><div class="front"><h1>?</h1></div></div></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
}
function flipCard(card,val){
  if(memory.length<2){
    card.style.transform="rotateY(180deg)";
      if(memory.length==0){
      memory.push(val);
      cardId.push(card.id);
      }
        else if(memory.length==1){
          moveCounter++;
          var counter=moveCounter.toString();
          document.getElementById('counter').innerHTML=counter;
          memory.push(val);
          cardId.push(card.id);
          console.log(cardId);
          console.log(memory);
          if(memory[0]===memory[1]){
          fliped_card+=2;
          memory=[];
          cardId=[];
          console.log(fliped_card);
          if(fliped_card===arrayOfImages.length){
           if (moveCounter<16){
              alert("Well Done! You have finished game in "+moveCounter+" moves and You have earned Gold Medal!");
              moveCounter=0;
              document.getElementById('counter').innerHTML="";
              document.getElementById('memory_board').innerHTML="";
              fliped_card=0;
              makeBoard();
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
        else{
          function flipBack(){
            document.getElementById(cardId[0]).style.transform="rotateY(0)";
            document.getElementById(cardId[1]).style.transform="rotateY(0)";
            memory=[];
            cardId=[];
          }
          setTimeout(flipBack,600);
        }
      }
    }
}
