import React from 'react';
import './Timer.css';
import { BsFillEmojiSmileFill } from 'react-icons/bs';

function Timer(props) {
  const { seconds, player } = props;

  return (
    <div className="timer">
      <h1> {seconds} </h1>
      <h1>
        player :
        <BsFillEmojiSmileFill
          style={{ color: `${player ? 'red' : 'yellow'}` }}
        />
        turn
      </h1>
    </div>
  );
}

export default Timer;
