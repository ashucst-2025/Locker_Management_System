import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';
import LockerGrid from './components/LockerGrid';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [config, setConfig] = useState<{ rows: number; columns: number } | null>(null);

  const handleConfigSubmit = (rows: number, columns: number) => {
    setConfig({ rows, columns });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Locker Management System
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {!config ? (
            <ConfigurationForm onSubmit={handleConfigSubmit} />
          ) : (
            <LockerGrid rows={config.rows} columns={config.columns} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
