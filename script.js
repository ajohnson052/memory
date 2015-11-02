var numberOfRows = {
  1:4,
  2:6,
  3:8
};
var numberOfTurns = {  // jsm: Could maybe use arrays here and above
  1:10,
  2:30,
  3:60,
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
var randomArray = [];
var clickCounter = 0
var boardColor = $('#board').css('background-color')
var cardColor = ''
var numberOfCards = 0
var fadeOutInterval = []
var fadeInInterval = []
var turnCounter = 0 // jsm: well structured!

var setLevel = function(){
  var level = parseInt(prompt('Pick a level 1-3'));
  turnCounter = numberOfTurns[level];
  $('#turn').text(turnCounter);
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
} // jsm: I really like this function. When did you write it?

var makeRandomArray = function(){
  var nextInt = getRandomInt(numberOfCards);
  (randomArray.indexOf(nextInt) === -1) ? randomArray.push(nextInt) : makeRandomArray();
}

var getRandomAssignments = function(){
  for(i=0; i<numberOfCards; i++){
    makeRandomArray();
  }
  for(index in randomArray){
    if(randomArray[index]%2!=0){
      randomArray[index]= randomArray[index]-1;
    }
  }
  for(i=0; i<numberOfCards; i++){
    $('td').eq(i).attr('color', colors[randomArray[i]]);
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
  if(turnCounter === 0){
    $('#tryAgain').toggle()
    bounceResult('tryAgain');
  }
  else if(clickCounter<2 && $(e.target).css('background-color')===cardColor){
    revealColor(e);
    removeMatches(e);
    if(allFound()){
      celebrate();
    }
    clickCounter++;
  }
  else if(clickCounter<2){}
  else{
    endTurn();
    turnCounter--;
    $('#turn').text(turnCounter);
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
  fadeOutInterval[i] = setInterval(function(){
    if(j>=0){
      j--;
      $('#'+i+j).fadeOut(800);
    }
    else{
      j = $('tr').length;
    }
  }, 300)
}

var fadeInColumn = function(i){
  var j=$('tr').length;
  fadeInInterval[i] = setInterval(function(){
    if(j>=0){
      j--;
      $('#'+i+j).fadeIn(800);
    }
    else{
      j = $('tr').length;
    }
  }, 300)
}

var bounceResult = function(element){
  var leftBorder = 0;
  var rightBorder = window.innerWidth - $('#'+element).width();
  var currentX = leftBorder;
  var slidingRight = true;
  var moveResult = function(){
    if(slidingRight === true){
      currentX += 2;
    }
    else{
      currentX -= 2;
    }
    $('.endGame').offset({top:0, left:currentX});
    if(currentX <= leftBorder || currentX >= rightBorder){
      slidingRight = !(slidingRight);
    }
  }
  setInterval(moveResult,1);
}


var celebrate = function(){
  $('#winner').toggle()
  bounceResult('winner');
  for(i=0; i<$('tr').length; i++){
    fadeOutColumn(i);
    fadeInColumn(i);
  }
}

var activateReset = function(){
  $('.endGame').css('display', 'none');
  for(i=0; i<$('tr').length; i++){
    window.clearInterval(fadeOutInterval[i]);
    window.clearInterval(fadeInInterval[i]);
  }
  turnCounter = numberOfTurns[level];
  $('#turn').text(turnCounter);
  $('td').css('background-color', cardColor);
  $('td').css('opacity', 1);
  randomArray = []
  getRandomAssignments();
  $('td').on('click', alternateTurns)
}

var getNewLevel = function(e){
  level = $(e.target).attr('level')
  $('.endGame').css('display', 'none');
  for(i=0; i<$('tr').length; i++){
    window.clearInterval(fadeOutInterval[i]);
    window.clearInterval(fadeInInterval[i]);
  }
  turnCounter = numberOfTurns[level];
  $('#turn').text(turnCounter);
  $('#board').empty();
  randomArray = []
  makeBoard(level);
  getRandomAssignments();
  $('td').on('click', alternateTurns)
}

var playGame = function(){
  makeBoard(setLevel());
  getRandomAssignments();
  $('#reset').on('click', activateReset)
  $('td').on('click', alternateTurns)
  for(i=1; i<=3; i++){
    $('#level'+i).on('click', getNewLevel)
  }
}

playGame(); //jsm: Nice! Really did a great job breaking tasks into modular functions
