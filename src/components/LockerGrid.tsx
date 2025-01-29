import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LockerProps {
  id: string;
  status: 'available' | 'reserved' | 'open';
}

type StyledLockerProps = {
  status?: 'available' | 'reserved' | 'open';
} & React.ComponentProps<typeof Paper>;

const StyledLocker = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'status',
})<StyledLockerProps>(({ theme, status = 'available' }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  backgroundColor: getLockerColor(status),
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const getLockerColor = (status: string) => {
  switch (status) {
    case 'available':
      return '#ffffff';
    case 'reserved':
      return '#ffcdd2';
    case 'open':
      return '#c8e6c9';
    default:
      return '#ffffff';
  }
};

const LockerGrid: React.FC<{ rows: number; columns: number }> = ({ rows, columns }) => {
  const [lockers, setLockers] = useState<LockerProps[]>([]);
  const [selectedLocker, setSelectedLocker] = useState<LockerProps | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Load lockers from localStorage or initialize if not exists
    const savedLockers = localStorage.getItem('lockers');
    if (savedLockers) {
      setLockers(JSON.parse(savedLockers));
    } else {
      const initialLockers = Array.from({ length: rows * columns }, (_, index) => ({
        id: `${index}`,
        status: 'available',
      })) as LockerProps[];
      setLockers(initialLockers);
      localStorage.setItem('lockers', JSON.stringify(initialLockers));
    }
  }, [rows, columns]);

  const handleLockerClick = (locker: LockerProps) => {
    setSelectedLocker(locker);
    setDialogOpen(true);
  };

  const handleLockerAction = (action: 'open' | 'close' | 'reserve') => {
    if (!selectedLocker) return;

    const newLockers = lockers.map((locker) => {
      if (locker.id === selectedLocker.id) {
        const newStatus = action === 'close' ? 'available' : action === 'open' ? 'open' : 'reserved';
        return { ...locker, status: newStatus };
      }
      return locker;
    });

    setLockers(newLockers);
    localStorage.setItem('lockers', JSON.stringify(newLockers));
    setDialogOpen(false);
  };

  const handleColumnAction = (columnIndex: number, action: 'open' | 'close' | 'reserve') => {
    const newLockers = lockers.map((locker, index) => {
      if (index % columns === columnIndex) {
        const newStatus = action === 'close' ? 'available' : action === 'open' ? 'open' : 'reserved';
        return { ...locker, status: newStatus };
      }
      return locker;
    });

    setLockers(newLockers);
    localStorage.setItem('lockers', JSON.stringify(newLockers));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {lockers.map((locker, index) => (
          <Grid item xs={12 / columns} key={locker.id}>
            <StyledLocker
              elevation={3}
              onClick={() => handleLockerClick(locker)}
              status={locker.status}
            >
              Locker {parseInt(locker.id) + 1}
              <br />
              {locker.status}
            </StyledLocker>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {Array.from({ length: columns }).map((_, index) => (
            <Grid item xs={12 / columns} key={`column-${index}`}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleColumnAction(index, 'open')}
                >
                  Open Column {index + 1}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleColumnAction(index, 'reserve')}
                >
                  Reserve Column {index + 1}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleColumnAction(index, 'close')}
                >
                  Close Column {index + 1}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Locker {selectedLocker ? parseInt(selectedLocker.id) + 1 : ''}</DialogTitle>
        <DialogContent>
          Current status: {selectedLocker?.status}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLockerAction('open')} color="primary">
            Open
          </Button>
          <Button onClick={() => handleLockerAction('reserve')} color="secondary">
            Reserve
          </Button>
          <Button onClick={() => handleLockerAction('close')}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LockerGrid;
