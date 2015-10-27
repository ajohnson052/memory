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
  30: 'moccasin',
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
};
var array = [];
var clickCounter = 0
var boardColor = $('#board').css('background-color')
var cardColor = ''
var numberOfCards = 0

var getLevel = function(){
  var level = parseInt(prompt('Pick a level 1-3'));
  return level;
}

var makeBoard = function(level){
  for(i=0; i<numberOfRows[level]; i++){
      $('#board').append('<tr class = r'+i+'></tr>');
      for(j=0; j<numberOfRows[level]; j++){
        $('.r'+i).append('<td id = ' +i+j+'></td>');
      }
  }
  cardColor = $('td').css('background-color');
  $('td').fadeIn(1000);
  numberOfCards = $('td').length;
}

var getRandomInt = function(upperBound){
  return Math.floor(Math.random()*upperBound);
}

var makeRandomArray = function(){
  var nextInt = getRandomInt(numberOfCards);
  (array.indexOf(nextInt) === -1) ? array.push(nextInt) : makeRandomArray();
}

var getRandomAssignments = function(){
  for(i=0; i<numberOfCards; i++){
    makeRandomArray();
  }
  for(index in array){
    if(array[index]%2!=0){
      array[index]= array[index]-1;
    }
  }
  for(i=0; i<numberOfCards; i++){
    $('td').eq(i).attr('color', colors[array[i]]);
  }
}

var revealColor = function(e){
  $(e.target).css('background-color', $(e.target).attr('color'));
}

var hideColors = function(){
  for(i=0; i<numberOfCards; i++){
    if($('td').eq(i).attr('class')!='found'){
      $('td').eq(i).css('background-color', cardColor);
    }
  }
}

var endTurn = function(){
  clickCounter = 1;
  hideColors();
}

var alternateTurns = function(e){
  if(clickCounter<2 && $(e.target).css('background-color')===cardColor){
    revealColor(e);
    removeMatches(e);
    if(allFound()){
      celebrate();
    }
    clickCounter++;
  }
  else{
    endTurn();
    revealColor(e);
    removeMatches(e);
    if(allFound()){
      celebrate();
    }
  }
}

var cardsRemaining = function(){
  for(i=0; i<numberOfCards; i++){
    if($('td').eq(i).css('background-color') === cardColor){
      return true;
      break;
    }
    else if(i === numberOfCards -1){
      return false;
    }
  }
}

var checkbackground= function(){
  return $('td').eq(i).css('background-color')
}

var removeMatches = function(e){
  var curBack = $(e.target).css('background-color');
  var curId = $(e.target).attr('id');
  for(i=0; i<numberOfCards; i++){
    if(curBack === $('td').eq(i).css('background-color') && curId!=$('td').eq(i).attr('id')){
      $(e.target).attr('class', 'found')
      $('td').eq(i).attr('class', 'found')
    }
  }
}

var allFound = function(){
  for(i=0; i<numberOfCards; i++){
    if ($('td').eq(i).attr('class')!='found'){
      return false;
      break;
    }
    else if(i === numberOfCards - 1){
      return true
    }
  }
}

var fadeOutColumn = function(i){
  var j=$('tr').length;
  setInterval(function(){
    if(j>=0){
      j--;
      $('#'+i+j).fadeOut(600);
    }
    else{
      j = $('tr').length;
    }
  }, 200)
}

var fadeInColumn = function(i){
  var j=$('tr').length;
  setInterval(function(){
    if(j>=0){
      j--;
      $('#'+i+j).fadeIn(600);
    }
    else{
      j = $('tr').length;
    }
  }, 200)
}

var bounceWinner = function(){
  var leftBorder = 0;
  var rightBorder = window.innerWidth - $('.winner').width();
  var currentX = leftBorder;
  var slidingRight = true;
  var moveWinner = function(){
    if(slidingRight === true){
      currentX += 2;
    }
    else{
      currentX -= 2;
    }
    $('.winner').offset({top:0, left:currentX});
    if(currentX <= leftBorder || currentX >= rightBorder){
      slidingRight = !(slidingRight);
    }
  }
  setInterval(moveWinner,1);
}


var celebrate = function(){
  $('.winner').toggle()
  bounceWinner();
  for(i=0; i<$('tr').length; i++){
    fadeOutColumn(i);
    fadeInColumn(i);
  }
}

var activateReset = function(){
  $('td').css('background-color', cardColor);
  array = []
  getRandomAssignments();
  $('td').on('click', alternateTurns)
}

var playGame = function(){
  makeBoard(getLevel());
  getRandomAssignments();
  $('#reset').on('click', activateReset)
  $('td').on('click', alternateTurns)

}

playGame();
