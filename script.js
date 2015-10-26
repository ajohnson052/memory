var numberOfRows = {
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
  16: 'coral',
  18: 'gold',
  20: 'orangeRed',
  22: 'orange',
  24: 'yellowGreen',
  26: 'springGreen',
  28: 'seaGreen',
  30: 'pale',
  32: 'olive',
  34: 'darkOliveGreen',
  36: 'darkCyan',
  38: 'lightCyan',
  40: 'cornFlowerBlue',
  42: 'deepSkyBlue',
  44: 'royalBlue',
  46: 'midnightBlue',
  48: 'darkMagenta',
  50: 'darkOrchid',
  52: 'indigo',
  54: 'slateBlue',
  56: 'orchid',
  58: 'crimson',
  60: 'darkRed',
  62: 'indianRed',
  64: 'moccasin',
};
var array = [];
var clickCounter = 0
var boardColor = $('#board').css('background')
var cardColor = ''

var getLevel = function(){
  level = parseInt(prompt('Pick a level 1-3'));
}

var makeBoard = function(){
  for(i=0; i<numberOfRows[level]; i++){
      $('#board').append('<tr class = r'+i+'></tr>');
      for(j=0; j<numberOfRows[level]; j++){
        $('.r'+i).append('<td id = ' +i+j+'></td>');
      }
  }
}

var getRandomInt = function(upperBound){
  return Math.floor(Math.random()*upperBound);
}

var makeRandomArray = function(){
  var nextInt = getRandomInt($('td').length);
  (array.indexOf(nextInt) === -1) ? array.push(nextInt) : makeRandomArray();
}

var getRandomAssignments = function(){
  for(i=0; i<$('td').length; i++){
    makeRandomArray();
  }
  for(index in array){
    if(array[index]%2!=0){
      array[index]= array[index]-1;
    }
  }
  for(i=0; i<$('td').length; i++){
    $('td').eq(i).attr('color', colors[array[i]]);
  }
}

var revealColor = function(e){
  $(e.target).css('background', $(e.target).attr('color'));
}

var hideColors = function(){
  $('td').css('background', cardColor)
}

var endTurn = function(){
  clickCounter = 0;
  hideColors();
}

var alternateTurns = function(){
    if(clickCounter<2){
      clickCounter++;
      console.log(clickCounter);
    }
    else{
      endTurn();
  }
}

var cardsRemaining = function(){
  for(i=0; i<$('td').length; i++){
    if($('td').eq(i).css('background') === 'rgb(47, 79, 79)'){ //background===cardColor
      return true;
      break;
    }
    else if(i === $('td').length -1){
      return false;
    }
  }
}

var playGame = function(){
  getLevel();
  makeBoard();
  getRandomAssignments();
  $('td').on('click', revealColor)
  $('td').on('click', alternateTurns)
}

playGame();
