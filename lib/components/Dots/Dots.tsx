import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

interface DotsProps {
  count: number;
  index: number;
  sx?: SxProps<Theme>;
  onDotClick?: (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

export const Dots: React.FC<DotsProps> = ({ count, index, sx, onDotClick }) => {
  const [previousIndex, setPreviousIndex] = useState<number>(index);

  useEffect(() => {
    if (index !== previousIndex) {
      const timeout = setTimeout(() => {
        setPreviousIndex(index);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [index, previousIndex]);

  const handleDotClick = (
    dotIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (onDotClick) {
      onDotClick(dotIndex, event);
    }
  };

  return (
    <Box sx={{ width: count * 16, ...sx }}>
      <Box sx={{ position: 'relative', padding: '20px 0 28px' }}>
        {[...Array(count).keys()].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              padding: 0.5,
              position: 'absolute',
              left: i * 16,
              cursor: onDotClick ? 'pointer' : 'inherit',
            }}
            onClick={(event) => handleDotClick(i, event)}
          >
            <Paper
              elevation={0}
              sx={{
                width: 8,
                height: 8,
                background: '#fff',
                borderRadius: 4,
                transition: 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                opacity:
                  i >= Math.min(previousIndex, index) &&
                  i <= Math.max(previousIndex, index)
                    ? 0
                    : 0.5,
              }}
            />
          </Box>
        ))}
        <Paper
          elevation={0}
          sx={{
            position: 'absolute',
            marginTop: 0.5,
            left: Math.min(previousIndex, index) * 16 + 4,
            width: Math.abs(previousIndex - index) * 16 + 8,
            height: 8,
            background: '#fff',
            borderRadius: 4,
            transition: 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        />
      </Box>
    </Box>
  );
};
