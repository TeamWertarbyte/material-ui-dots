import * as React from 'react';
import { Dots } from '../dist/material-ui-dots';
import { Box } from '@mui/material';

export const App: React.FC = () => {
  const [index, setIndex] = React.useState<number>(0);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 6,
        pb: 0.5,
        width: 200,
      }}
    >
      <Dots index={index} count={5} onDotClick={(value) => setIndex(value)} />
    </Box>
  );
};
