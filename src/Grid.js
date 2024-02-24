// Grid.js
import React from 'react';
import './Grid.css'; // Asegúrate de crear este archivo para los estilos

const Grid = ({ gridSize, cellSize, playerX, playerY, playerSize }) => {
  const gridStyle = {
    width: `${gridSize}px`,
    height: `${gridSize}px`,
    position: 'relative',
    overflow: 'hidden',
  };

  const playerStyle = {
    position: 'absolute',
    left: playerX,
    top: playerY,
    width: playerSize,
    height: playerSize,
    backgroundColor: 'blue',
    borderRadius: '50%',
  };

  const playerStyle2 = {
    position: 'absolute',
    left: 50,
    top: 50,
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: '50%',
  };

  const lines = [];
  for (let i = 0; i < gridSize / cellSize; i++) {
    lines.push(
      <div key={`h${i}`} className="divider horizontal-divider" style={{ top: `${i * cellSize}px` }}></div>
    );
    lines.push(
      <div key={`v${i}`} className="divider vertical-divider" style={{ left: `${i * cellSize}px` }}></div>
    );
  }

  return (
    <div style={gridStyle}>
      {lines}
      <div style={playerStyle}></div>
      <div style={playerStyle2}></div>
      {/* Agrega más elementos o lógica para representar otros jugadores, objetos, etc. */}
    </div>
  );
};

export default Grid;
