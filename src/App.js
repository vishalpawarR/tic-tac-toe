import { useState } from 'react';
import './App.css';
import Cell from './components/Cell';

const gridSize = 6;
const PLAYERS = ['X', 'Y', 'O'];

const winningCombinations = [
  [11, 12, 13, 14, 15], [12, 13, 14, 15, 16],
  [21, 22, 23, 24, 25], [22, 23, 24, 25, 26],
  [31, 32, 33, 34, 35], [32, 33, 34, 35, 36],
  [41, 42, 43, 44, 45], [42, 43, 44, 45, 46],
  [51, 52, 53, 54, 55], [52, 53, 54, 55, 56],
  [61, 62, 63, 64, 65], [62, 63, 64, 65, 66],

  [11, 21, 31, 41, 51], [21, 31, 41, 51, 61],
  [12, 22, 32, 42, 52], [22, 32, 42, 52, 62],
  [13, 23, 33, 43, 53], [23, 33, 43, 53, 63],
  [14, 24, 34, 44, 54], [24, 34, 44, 54, 64],
  [15, 25, 35, 45, 55], [25, 35, 45, 55, 65],
  [16, 26, 36, 46, 56], [26, 36, 46, 56, 66],

  [11, 22, 33, 44, 55], [12, 23, 34, 45, 56],
  [21, 32, 43, 54, 65], [22, 33, 44, 55, 66],

  [51, 42, 33, 24, 15], [61, 52, 43, 34, 25],
  [52, 43, 34, 25, 16], [62, 53, 44, 35, 26]
];

function App() {
  
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winnerMessage, setWinnerMessage] = useState(false);

  const handleClick = (e) => {
    if(winnerMessage) {
      return
    }
    else if(e.target.childNodes.length === 0) {
      const span = document.createElement("span");
      span.innerText = currentPlayer;
      e.target.appendChild(span);
      getWinner(currentPlayer);
      setCurrentPlayer(PLAYERS[(PLAYERS.indexOf(currentPlayer) + 1) % PLAYERS.length])
    }
  }

  function checkWinner(arr, currentPlayer) {
    return arr.every(element => element === currentPlayer);
  }

  function getWinner(currentPlayer) {
    for (const combination of winningCombinations) {
      let proceccedArray = combination.map(element => document.getElementById(element)?.innerText)
      if(checkWinner(proceccedArray, currentPlayer)) {
        setWinnerMessage(`Player ${currentPlayer} wins!`);
        return;
      }
    }

    winningCombinations.forEach((combination, index) => {
      let arrayVals = []
      // console.log(`Combination ${index + 1}:`);
      combination.forEach(element => {
          const getText = document.getElementById(element)?.innerText;
            arrayVals.push(getText);
        });
        setWinnerMessage(checkWinner(arrayVals, currentPlayer, winnerMessage))
    });
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
        <h1 className='text-3xl font-semibold'>Welcome to Tic Tac Toe</h1>
        <div>
          <h2 className='text-xl font-semibold underline text-center'>Game instructions</h2>
          <ol className='list-decimal list-inside space-y-2'>
            <li>3 users can play this game</li>
            <li>Win criteria : Continuous 5 cells to win the game</li>
          </ol>
        </div>
        <p className='font-semibold'>{ winnerMessage || `Current player: ${currentPlayer}`}</p>
        <div className="board-container w-[440px] h-[440px] border border-gray-400 flex flex-wrap border-box justify-center items-center">
          {renderCells()}
        </div>
      </div>
    </>
  );
}

export default App;
