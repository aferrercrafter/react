import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let rows = [];
  for(let i = 0; i < 3; i++){
    let squaresComponent = [];
    for(let j = 0; j < 3; j++){
      let square =  i * 3 + j;
      squaresComponent.push(<Square key={square} value={squares[square]} onSquareClick={() => handleClick(square)} />)
    }
    rows.push(<div key={i} className="board-row">{squaresComponent}</div>)
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isSorted, setIsSorted] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSorting() {
    setIsSorted(!isSorted);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = 'Go to move #' + move;
    }
    else
    {
      description = 'Go to game start';
    }

    if(move === currentMove)
      return (
        <li key={move}>
          {'You are at move #' + move}
        </li>
        )
    else
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li> 
      )
  });

  const sortDescription = isSorted ? 'Sort Moves Ascending' : 'Sort Moves Descending';
  const sortedMoves = isSorted ? moves.slice().reverse() : moves;

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleSorting}>{sortDescription}</button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
