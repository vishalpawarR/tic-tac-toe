import { useState } from 'react';
import './App.css';
import Cell from './components/Cell';

const gridSize = 6;
const PLAYERS = ['X', 'Y', 'O'];

function App() {

  const handleClick = (e) => {
    console.log(e.target)
  }

  const [currentlayer, setCurrentPlayer] = useState(PLAYERS[0]);
  const [winner, setWinner] = useState('');

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
        <p>Next player turn: {currentlayer}</p>
        <div className="board-container w-[440px] h-[440px] border border-gray-400 flex flex-wrap border-box justify-center items-center">
          {renderCells()}
        </div>
      </div>
    </>
  );
}

export default App;
