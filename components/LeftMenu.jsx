import { useState } from 'react';
import { 
  Stack, 
  TextInput, 
  NumberInput, 
  Button, 
  Group, 
  Text, 
  FileButton,
  Divider
} from '@mantine/core';

const LeftMenu = ({ 
  mediaProperties, 
  onPropertyChange, 
  onFileUpload, 
  onPlay, 
  isPlaying,
  currentTime
}) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      setFile(file);
      onFileUpload(file);
    }
  };

  return (
    <Stack spacing="md" style={{ height: '100%' }}>
      <div>
        <Text size="sm" weight={500}>Media</Text>
        <FileButton onChange={handleFileChange} accept="image/*,video/*">
          {(props) => <Button {...props} fullWidth variant="light">Upload Media</Button>}
        </FileButton>
        {file && (
          <Text size="xs" mt="sm">{file.name}</Text>
        )}
      </div>

      <Divider />

      <div>
        <Text size="sm" weight={500}>Properties</Text>
        <NumberInput
          label="Width"
          value={mediaProperties.width}
          onChange={(value) => onPropertyChange({ width: value })}
          min={50}
        />
        <NumberInput
          label="Height"
          value={mediaProperties.height}
          onChange={(value) => onPropertyChange({ height: value })}
          min={50}
          mt="sm"
        />
      </div>

      <Divider />

      <div>
        <Text size="sm" weight={500}>Timing</Text>
        <NumberInput
          label="Start Time (s)"
          value={mediaProperties.startTime}
          onChange={(value) => onPropertyChange({ startTime: value })}
          min={0}
          precision={1}
          step={0.1}
        />
        <NumberInput
          label="End Time (s)"
          value={mediaProperties.endTime}
          onChange={(value) => onPropertyChange({ endTime: value })}
          min={mediaProperties.startTime + 0.1}
          precision={1}
          step={0.1}
          mt="sm"
        />
      </div>

      <Divider />

      <Group position="center">
        <Button 
          onClick={onPlay} 
          disabled={isPlaying || !file}
          fullWidth
        >
          {isPlaying ? `Playing (${currentTime.toFixed(1)}s)` : 'Play'}
        </Button>
      </Group>
    </Stack>
  );
};

export default LeftMenu;