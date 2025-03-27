import { useState, useRef } from 'react';
import { AppShell, Navbar, Header, Box } from '@mantine/core';
import LeftMenu from '../components/LeftMenu';
import Canvas from '../components/Canvas';
import Timeline from '../components/Timeline';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [mediaElement, setMediaElement] = useState(null);
  const [mediaProperties, setMediaProperties] = useState({
    width: 300,
    height: 200,
    startTime: 0,
    endTime: 10,
    x: 100,
    y: 100
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const canvasRef = useRef(null);

  const handleFileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setMediaElement({
      type: file.type.startsWith('video') ? 'video' : 'image',
      url
    });
  };

  const updateMediaProperties = (newProps) => {
    setMediaProperties(prev => ({ ...prev, ...newProps }));
  };

  const handlePlay = () => {
    setIsPlaying(true);
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setCurrentTime(elapsed);
      
      if (elapsed >= mediaProperties.endTime) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }, 100);
    
    return () => clearInterval(interval);
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs" className={styles.navbar}>
          <LeftMenu 
            mediaProperties={mediaProperties}
            onPropertyChange={updateMediaProperties}
            onFileUpload={handleFileUpload}
            onPlay={handlePlay}
            isPlaying={isPlaying}
            currentTime={currentTime}
          />
        </Navbar>
      }
      header={
        <Header height={60} p="xs" className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>veed.io</h1>
            <div className={styles.headerActions}>
              <button className={styles.exportButton}>Export</button>
            </div>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: { 
          backgroundColor: theme.colors.gray[0],
          position: 'relative',
          padding: 0
        },
      })}
    >
      <Box className={styles.mainContent}>
        <Canvas 
          ref={canvasRef}
          mediaElement={mediaElement}
          mediaProperties={mediaProperties}
          updateMediaProperties={updateMediaProperties}
          isPlaying={isPlaying}
          currentTime={currentTime}
        />
        <Timeline 
          duration={mediaProperties.endTime}
          currentTime={currentTime}
        />
      </Box>
    </AppShell>
  );
}