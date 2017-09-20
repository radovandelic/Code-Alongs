var shipData = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, "X", "X", "X", null, null, null, "X", null, null],
  [null, null, null, null, null, null, null, "X", null, null],
  [null, null, null, null, null, null, null, "X", null, null],
  [null, null, "X", "X", "X", "X", "X", null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, "X", null],
  [null, null, null, null, null, null, null, null, "X", null],
  [null, null, null, null, null, null, null, null, "X", null],
  [null, "X", "X", null, null, null, null, null, "X", null]
];

var gameState = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null]
];

/* Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/

function createGameBoard() {
  var gameBoard = document.getElementById("gameBoard");
  for (var i = 0; i < 10; i++) {
    var tableRow = document.createElement("tr");
    tableRow.setAttribute("row", i);
    for (var j = 0; j < 10; j++) {
      var tableData = document.createElement("td");
      tableData.setAttribute("col", j);
      tableData.setAttribute("onclick", "play(this)");
      tableData.innerHTML = shipData[i][j];
      tableRow.appendChild(tableData);
    }
    gameBoard.appendChild(tableRow);
  }
}

function populateGameBoard(gameState) {
  var gameBoard = document.getElementById("gameBoard");
  for (var k = 0; k < gameState.length; k++) {
    var row = gameBoard.children[k];
    console.log(row);
    for (var l = 0; l < gameState[k].length; l++) {
      var col = row.children[l];
      console.log(col);
      col.innerHTML = gameState[k][l];
    }
  }
}

function play(cell) {
  var col = cell.getAttribute("col");
  var row = cell.parentElement.getAttribute("row");

  if (gameState[row][col] == null) {
    if (shipData[row][col] == "X") {
      alert("Hit!");
      gameState[row][col] = "X";
    } else {
      alert("You hit water!");
      gameState[row][col] = "O";
    }
  } else {
    alert("You've already tried this one!");
  }
  populateGameBoard(gameState);
}

window.onload = function() {
  createGameBoard();
};

var startButton = document.getElementById("startButton");
startButton.onclick = function() {
  // alert("I clicked the button");
  populateGameBoard(gameState);
};
