var numberOfRows = {
  1:4,
  2:6,
  3:8
};
var numberOfTurns = {
  1:16,
  2:36,
  3:64
};
var colors = {
  0: 'lightSalmon',
  2: 'springGreen',
  4: 'darkGoldenRod',
  6: 'aquamarine',
  8: 'moccasin',
  10: 'purple',
  12: 'darkSlateBlue',
  14: 'cornFlowerBlue',
  16: 'coral',
  18: 'gold',
  20: 'orangeRed',
  22: 'orange',
  24: 'darkSeaGreen',
  26: 'orchid',
  28: 'seaGreen',
  30: 'yellowGreen',
  32: 'rosyBrown',
  34: 'darkOliveGreen',
  36: 'darkCyan',
  38: 'lightCyan',
  40: 'deepSkyBlue',
  42: 'chocolate',
  44: 'royalBlue',
  46: 'midnightBlue',
  48: 'grey',
  50: 'darkOrchid',
  52: 'indigo',
  54: 'slateBlue',
  56: 'gainsboro',
  58: 'crimson',
  60: 'darkRed',
  62: 'indianRed',
};
var randomArray = [];
var clickCounter = 0;
var boardColor = $('#board').css('background-color');
var cardColor = '';
var numberOfCards = 0;
var fadeOutInterval = [];
var fadeInInterval = [];
var endResult
var turnCounter = 0;
var level = 0;

var setLevel = function(){
  level = parseInt(prompt('Pick a level 1-3','1, 2, or 3'));
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
}

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
  console.log(clickCounter)
  hideColors();
}

var getResult = function(){
  if(allFound()){
    celebrate();
  }
  else if(turnCounter < 1){
    $('#tryAgain').toggle()
    bounceResult('tryAgain');
    $('td').off();
  }
}

var alternateTurns = function(e){
  if (clickCounter < 2 && $(e.target).css('background-color')===cardColor){
    revealColor(e);
    removeMatches(e);
    getResult();
    clickCounter++;
    console.log(clickCounter);
  } else if ($(e.target).attr('class')!='found' && clickCounter ===2 ) {
    getResult();
    endTurn();
    turnCounter--;
    $('#turn').text(turnCounter);
    revealColor(e);
    removeMatches(e);
  }
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
  endResult = setInterval(moveResult,1);
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
  clearAnimation();
  $('td').off();
  clickCounter = 0;
  turnCounter = numberOfTurns[level];
  $('td').removeClass('found');
  $('#turn').text(turnCounter);
  $('td').css('background-color', cardColor);
  randomArray = [];
  getRandomAssignments();
  $('td').on('click', alternateTurns)
}

var getNewLevel = function(e){
  level = $(e.target).attr('level')
  $('#board').empty();
  makeBoard(level);
  activateReset();
}

var clearAnimation = function(){
  $('.endGame').css('display', 'none');
  $('.endGame').css('top', '0');
  $('.endGame').css('left',  '0');
  window.clearInterval(endResult);
  for(i=0; i<$('tr').length; i++){
    window.clearInterval(fadeOutInterval[i]);
    window.clearInterval(fadeInInterval[i]);
  }
  $('td').css('opacity', 1);
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

playGame();
// for(i=0; i<numberOfCards; i++){
//   $('td').eq(i).css('background',$('td').eq(i).attr('color'))
// }
