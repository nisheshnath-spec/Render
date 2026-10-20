import { useState } from 'react';
import './App.css';

const NUM_SQUARES = 9;

// randomly picks who goes first
function randomTurn() {
  if (Math.random() < 0.5)
    return "X";
  else
    return "O";
}

function App() {
  const [squares, setSquares] = useState(Array(NUM_SQUARES).fill(""));
  const [turn, setTurn] = useState(randomTurn);
  const [gameOn, setGameOn] = useState(true);
  const [winMessage, setWinMessage] = useState("");

  // clears the board and randomly picks who goes first
  function startGame() {
    setSquares(Array(NUM_SQUARES).fill(""));
    setWinMessage("");
    setTurn(randomTurn());
    setGameOn(true);
  }

  // the one handler for all squares - i is the square that was clicked
  function squareClicked(i) {
    // only works if the game is not over and the square is empty
    if (gameOn && squares[i] === "") {
      let newSquares = squares.slice();
      newSquares[i] = turn;
      setSquares(newSquares);
      checkGame(newSquares);
    }
  }

  // looks at the board to see if there is a win or a stalemate
  function checkGame(board) {
    // moves has the value in each square, with a hyphen for an empty square
    let moves = board.map(function(square) {
      if (square === "")
        return "-";
      else
        return square;
    });
    // ways a player can win
    let winConditions = [
      moves[0] + moves[1] + moves[2],
      moves[3] + moves[4] + moves[5],
      moves[6] + moves[7] + moves[8],
      moves[0] + moves[3] + moves[6],
      moves[1] + moves[4] + moves[7],
      moves[2] + moves[5] + moves[8],
      moves[0] + moves[4] + moves[8],
      moves[2] + moves[4] + moves[6]
    ];

    let winner = "";
    for (let i = 0; i < winConditions.length; i++) {
      if (winConditions[i] === "XXX")
        winner = "X";
      else if (winConditions[i] === "OOO")
        winner = "O";
    }

    if (winner !== "") {
      setWinMessage(winner + " wins!");
      setGameOn(false);
    }
    // if the no -'s are left then  that means board is full and no winner so stalemate
    else if (moves.indexOf("-") === -1) {
      setWinMessage("Stalemate");
      setGameOn(false);
    }
    else {
      if (turn === "X")
        setTurn("O");
      else
        setTurn("X");
    }
  }

  return (
    <div id="game">
      <h1>Tic Tac Toe Game</h1>

      <input type="button" id="startBtn" value="Start Game" onClick={startGame} />

      <div id="status">{turn}'s turn</div>

      <div id="board">
        {squares.map((square, i) => (
          <div className="square" id={"sq" + i} key={i} onClick={() => squareClicked(i)}>
            {square}
          </div>
        ))}
      </div>

      <div id="winMessage">{winMessage}</div>
    </div>
  );
}

export default App;
