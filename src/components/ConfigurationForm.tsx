import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
} from '@mui/material';

interface ConfigurationFormProps {
  onSubmit: (rows: number, columns: number) => void;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rows && columns) {
      onSubmit(parseInt(rows), parseInt(columns));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Locker Configuration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Number of Rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            margin="normal"
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            required
          />
          <TextField
            fullWidth
            label="Number of Columns"
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            margin="normal"
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Generate Lockers
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ConfigurationForm;
