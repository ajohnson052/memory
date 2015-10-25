var level = parseInt(prompt('Pick a level 1-3'))
var numRows = {
  1:4,
  2:6,
  3:8
}

for(i=0; i<numRows[level]; i++){
    $('#board').append('<tr class = r'+i+'></tr>');
    for(j=0; j<numRows[level]; j++){
      $('.r'+i).append('<td></td>');
    }
}
