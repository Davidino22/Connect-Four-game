import React, { useEffect, useState } from 'react';
import './Table.css';
import Timer from './Timer';
import WinningNotification from './WinningNotification';
import { BsFillEmojiSmileFill } from 'react-icons/bs';

export default function Table() {
  const [table, setTable] = useState({
    table: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
  });

  const [seconds, setSeconds] = useState(30);

  const [player, setPlayer] = useState(true);

  const [showNotification, setShowNotification] = useState(false);

  const [winnerColor, setWinnerColor] = useState(null);

  const [winningPlayerOne, setWinningPlayerOne] = useState(0);
  const [winningPlayerTwo, setWinningPlayerTwo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (showNotification === false) {
        setSeconds((seconds) => seconds - 1);
      } else {
        setSeconds((seconds) => seconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showNotification]); //showNotification as dependency

  useEffect(() => {
    if (seconds < 0) {
      setPlayer(!player);
      setSeconds(30);
    }
  }, [seconds]);

  function dropCoin(number) {
    let lastEmptyCell;
    let color;
    if (!showNotification) {
      for (let i = 0; i < table.table.length; i++) {
        if (table.table[i][number] === null) {
          continue;
        }

        lastEmptyCell = i - 1;

        break;
      }
      if (lastEmptyCell === undefined) {
        lastEmptyCell = table.table.length - 1;
      }

      const newTable = table.table;

      player ? (color = 'red') : (color = 'yellow');
      if (lastEmptyCell >= 0 && lastEmptyCell < newTable.length) {
        // check if the rank is within the array bounds
        newTable[lastEmptyCell][number] = color;
        setTable({ table: newTable });

        if (checkForWin(color, newTable)) {
          setShowNotification(true);
          setWinnerColor(color);

          if (color === 'red') {
            return setWinningPlayerOne(winningPlayerOne + 1);
          } else {
            setWinningPlayerTwo(winningPlayerTwo + 1);
          }
        }
      }

      setPlayer(!player);
      setSeconds(30);
    } else {
      return;
    }
  }

  // check for win
  function checkForWin(color, table) {
    // Check horizontal
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j <= table[i].length - 4; j++) {
        if (
          table[i][j] === color &&
          table[i][j + 1] === color &&
          table[i][j + 2] === color &&
          table[i][j + 3] === color
        ) {
          return true;
        }
      }
    }

    // Check vertical
    for (let i = 0; i <= table.length - 4; i++) {
      for (let j = 0; j < table[i].length; j++) {
        if (
          table[i][j] === color &&
          table[i + 1][j] === color &&
          table[i + 2][j] === color &&
          table[i + 3][j] === color
        ) {
          return true;
        }
      }
    }

    // Check diagonal (top left to bottom right)
    for (let i = 0; i <= table.length - 4; i++) {
      for (let j = 0; j <= table[i].length - 4; j++) {
        if (
          table[i][j] === color &&
          table[i + 1][j + 1] === color &&
          table[i + 2][j + 2] === color &&
          table[i + 3][j + 3] === color
        ) {
          return true;
        }
      }
    }

    // Check diagonal (bottom left to top right)
    for (let i = 4; i < table.length; i++) {
      for (let j = 0; j <= table[i].length - 4; j++) {
        if (
          table[i][j] === color &&
          table[i - 1][j + 1] === color &&
          table[i - 2][j + 2] === color &&
          table[i - 3][j + 3] === color
        ) {
          return true;
        }
      }
    }

    // No win found
    return false;
  }

  // fresh table
  function restart() {
    setTable({
      table: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
    });

    setPlayer(true);

    setSeconds(30);
    setShowNotification(false);
    setWinnerColor(null);
  }

  return (
    <div className="container">
      <button onClick={restart} className="restartButton">
        restart
      </button>
      <div className="playerone">
        <p>Player 1 Winnings</p>
        <BsFillEmojiSmileFill style={{ color: 'red', fontSize: '40px' }} />
        <p>{winningPlayerOne}</p>
      </div>
      <div className="playertwo">
        <p>Player 2 Winnings</p>
        <BsFillEmojiSmileFill style={{ color: 'yellow', fontSize: '40px' }} />
        <p>{winningPlayerTwo}</p>
      </div>

      <div className="headerRow">
        {[0, 1, 2, 3, 4, 5, 6].map((number) => {
          return (
            <div
              className="headcell"
              onClick={() => dropCoin(number)}
              key={number}
            ></div>
          );
        })}
      </div>
      <div className="table">
        {table.table.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={`row`}>
              {row.map((element, columnIndex) => {
                return (
                  <div
                    key={columnIndex}
                    className={`cell ${element === 'red' ? 'cellRed' : ''} ${
                      element === 'yellow' ? 'cellYellow' : ''
                    }`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Timer seconds={seconds} player={player} />

      <img src="/table.svg" className="pseudotable" alt="table"></img>

      {showNotification && (
        <WinningNotification
          color={winnerColor}
          restart={restart}
          player={player}
        />
      )}
    </div>
  );
}
