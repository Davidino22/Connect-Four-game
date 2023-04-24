import React from 'react';
import './WinningNotification.css';

export default function WinningNotification(prop) {
  const { color, restart } = prop;
  return (
    <div className="notification">
      <h1> {color} wins</h1>
      <button onClick={restart} className="button">
        restart
      </button>
    </div>
  );
}
