import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Grid from './Grid';
import './Grid.css';

const GameScreen = () => {
  const gridSize = 12000;
  const cellSize = 50;

  const [playerPosition, setPlayerPosition] = useState({ x: '50vw', y: '50vh' });
  const [playerSize, setPlayerSize] = useState(100);

  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const directionX = e.clientX - rect.left - centerX;
      const directionY = e.clientY - rect.top - centerY;

      const length = Math.sqrt(directionX ** 2 + directionY ** 2);
      const normalizedDirectionX = directionX / length;
      const normalizedDirectionY = directionY / length;

      const speed = 8;
      const dx = normalizedDirectionX * speed;
      const dy = normalizedDirectionY * speed;

      containerRef.current.scrollLeft += dx;
      containerRef.current.scrollTop += dy;

      setPlayerPosition((prevPosition) => ({
        x: (window.innerWidth - playerSize) / 2 + containerRef.current.scrollLeft,
        y: (window.innerHeight - playerSize) / 2 + containerRef.current.scrollTop,
      }));
    });
  }, [playerSize]);

  const memoizedGrid = useMemo(() => <Grid gridSize={gridSize} cellSize={cellSize} />, [
    gridSize,
    cellSize,
  ]);

  const playerStyle = useMemo(() => ({
    position: 'absolute',
    left: playerPosition.x,
    top: playerPosition.y,
    width: playerSize,
    height: playerSize,
    backgroundColor: 'red',
    borderRadius: '50%',
    borderWidth:'10px',
    color:'white'
  }), [playerPosition, playerSize]);

  const handleZoomIn = () => {
    document.body.style.zoom = '1.2';
  };

  const handleZoomOut = () => {
    document.body.style.zoom = '1';
  };

  useEffect(() => {
    const handleMouseMoveWrapper = (e) => handleMouseMove(e);

    window.addEventListener('mousemove', handleMouseMoveWrapper);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWrapper);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    document.body.style.zoom = '1';
  }, []);

  return (
    <div>
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
      <div
        ref={containerRef}
        style={{
          overflow: 'hidden',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div style={{ width: `${gridSize}px`, height: `${gridSize}px`, position: 'relative', overflow: 'hidden' }}>
          {memoizedGrid}
         
          <button style={playerStyle}>AUGUSTO</button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
