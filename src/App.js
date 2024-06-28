import { createElement, useState } from 'react';
import './App.css';
import Cell from './components/Cell';

const gridSize = 6;
const PLAYERS = ['X', 'Y', 'O'];

function App() {
  
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');

  const handleClick = (e) => {
    if(e.target.childNodes.length === 0) {
      const span = document.createElement("span");
      span.innerText = currentPlayer;
      e.target.appendChild(span);
      setCurrentPlayer(PLAYERS[(PLAYERS.indexOf(currentPlayer) + 1) % PLAYERS.length])
    }
    return
  }

  const renderCells = () => {
    const cells = [];
    for(let i=1; i<=gridSize; i++) {
      for(let j=1; j<=gridSize; j++) {
        cells.push(<Cell key={`${i}${j}`} id={`${i}${j}`} onClick={handleClick} />)
      }
    }
    return cells;
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className='text-2xl font-semibold'>Welcome to Tic Tac Toe</h1>
        <p>Next player turn: {currentPlayer}</p>
        <div className="board-container w-[440px] h-[440px] border border-gray-400 flex flex-wrap border-box justify-center items-center">
          {renderCells()}
        </div>
      </div>
    </>
  );
}

export default App;
