var level = parseInt(prompt('Pick a level 1-3'));
var numRows = {
  1:4,
  2:6,
  3:8
};
var colors = {
  0: 'darkSalmon',
  2: 'blueViolet',
  4: 'darkGoldenRod',
  6: 'aquamarine',
  8: 'darkSeaGreen',
  10: 'purple',
  12: 'darkSlateBlue',
  14: 'dodgerBlue',
};
var squareId = {};
var squareContent = [];
var array = [];

//make board
for(i=0; i<numRows[level]; i++){
    $('#board').append('<tr class = r'+i+'></tr>');
    for(j=0; j<numRows[level]; j++){
      $('.r'+i).append('<td id = ' +i+j+'></td>');
    }
}


//get random
var getRandomInt = function(upperBound){
  return Math.floor(Math.random()*upperBound);
}

//make random array


var makeRandomArray = function(){
  var nextInt = getRandomInt($('td').length);
  (array.indexOf(nextInt) === -1) ? array.push(nextInt) : makeRandomArray();
}

for(i=0; i<$('td').length; i++){
  makeRandomArray();
}
for(index in array){
  if(array[index]%2!=0){
    array[index]= array[index]-1;
  }
}
//set click change
for(i=0; i<$('td').length; i++){
  $('td').eq(i).attr('color', colors[array[i]]);
  $('td').eq(i).on('click', function(e){
    $(this).css('background', $(this).attr('color'));
  })
}
