import { useState } from "react";

function Square({value, handleSquareLink}) {

  return <button 
    className="square"
    onClick={handleSquareLink}
    >
      {value}
    </button>;
}

export default function Board() {
  const [XisNext, setXisNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) return

    const newSquareState = squares.slice()
    newSquareState[i] = XisNext? 'X' : 'O'

    setXisNext(!XisNext)
    setSquares(newSquareState)
  }

  const winner = calculateWinner(squares)
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (XisNext ? "X" : "O");
    }

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} handleSquareLink = {() => handleClick(0)}/>
      <Square value={squares[1]} handleSquareLink = {() => handleClick(1)}/>
      <Square value={squares[2]} handleSquareLink = {() => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} handleSquareLink = {() => handleClick(3)}/>
      <Square value={squares[4]} handleSquareLink = {() => handleClick(4)}/>
      <Square value={squares[5]} handleSquareLink = {() => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} handleSquareLink = {() => handleClick(6)}/>
      <Square value={squares[7]} handleSquareLink = {() => handleClick(7)}/>
      <Square value={squares[8]} handleSquareLink = {() => handleClick(8)}/>
    </div>
  </>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}