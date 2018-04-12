

var arrayOfImages=["heart","heart-black","left","right","ring","ring-2","star","star-red","heart","heart-black","left","right","ring","ring-2","star","star-red"];
var memory=[];
var cardId=[];
var fliped_card=0;
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
            alert("Congratulation you have won the game");
            document.getElementById('memory_board').innerHTML="";
          }
        }
        else{
          function flipBack(){
            document.getElementById(cardId[0]).style.transform="rotateY(0)";
            document.getElementById(cardId[1]).style.transform="rotateY(0)";
            memory=[];
            cardId=[];
          }
          setTimeout(flipBack,500);
        }
      }
    }
}
