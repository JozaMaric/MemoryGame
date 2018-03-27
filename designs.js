$(document).ready(function(){
  console.log('window loaded');
  for(i=1;i<=8;i++){
  $('#container').append('<tr id=card'+i+'></tr>');
    for(n=1;n<=8;n++){
      $('#card'+i).append('<td id=box'+n+'>?</td>');
    }
  }
});
