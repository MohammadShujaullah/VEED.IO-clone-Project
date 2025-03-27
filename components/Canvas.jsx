import { useState, useRef, useEffect } from 'react';
import { Paper } from '@mantine/core';
import interact from 'interactjs';
import styles from '../styles/Canvas.module.css';

const Canvas = ({ mediaElement, mediaProperties, updateMediaProperties, isPlaying, currentTime }) => {
  const canvasRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !mediaElement) return;

    const position = { x: mediaProperties.x, y: mediaProperties.y };

    interact(canvasRef.current)
      .draggable({
        listeners: {
          move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            updateMediaProperties({ x: position.x, y: position.y });
          },
        }
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            let { width, height } = event.rect;
            width = Math.max(50, width);
            height = Math.max(50, height);
            
            event.target.style.width = `${width}px`;
            event.target.style.height = `${height}px`;
            
            updateMediaProperties({ width, height });
          }
        }
      });
  }, [mediaElement]);

  const shouldShowMedia = () => {
    if (!mediaElement) return false;
    if (!isPlaying) return true;
    return currentTime >= mediaProperties.startTime && currentTime <= mediaProperties.endTime;
  };

  return (
    <Paper className={styles.canvasContainer} shadow="sm">
      <div className={styles.canvas} ref={canvasRef}>
        {mediaElement && shouldShowMedia() && (
          <div 
            ref={mediaRef}
            style={{
              width: `${mediaProperties.width}px`,
              height: `${mediaProperties.height}px`,
              transform: `translate(${mediaProperties.x}px, ${mediaProperties.y}px)`,
              position: 'absolute',
              overflow: 'hidden'
            }}
          >
            {mediaElement.type === 'video' ? (
              <video 
                src={mediaElement.url} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                controls={false}
                autoPlay={isPlaying}
              />
            ) : (
              <img 
                src={mediaElement.url} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt="Uploaded content"
              />
            )}
          </div>
        )}
      </div>
    </Paper>
  );
};

export default Canvas;