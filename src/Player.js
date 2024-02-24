// Player.js
import React from 'react';

const Player = ({ x, y, size }) => {
  const playerStyle = {
    position: 'absolute',
    left: x,
    top: y,
    width: size,
    height: size,
    backgroundColor: 'blue',
  };

  return <div style={playerStyle}></div>;
};

export default Player;
