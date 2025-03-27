import { Box } from '@mantine/core';
import styles from '../styles/Timeline.module.css';

const Timeline = ({ duration, currentTime }) => {
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Box className={styles.timelineContainer}>
      <div className={styles.timeline}>
        <div 
          className={styles.progress} 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </Box>
  );
};

export default Timeline;