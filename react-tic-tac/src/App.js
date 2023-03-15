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
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    const newSquareState = squares.slice()
    newSquareState[i] = 'X'
    setSquares(newSquareState)
  }

  return (
    <>
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