import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme, CssBaseline, useTheme } from '@mui/material';
import Summarize from './pages/Summarize';
import Translate from './pages/Translate';
import Bullets from './pages/Bullets';
import OCR from './pages/OCR';
import Split from './pages/Split';
import ExtractImages from './pages/ExtractImages';
import Search from './pages/Search';
import ExportSummary from './pages/ExportSummary';
import About from './pages/About';
import FAQ from './pages/FAQ';
import CreditsFooter from './components/CreditsFooter';
import Merge from './pages/Merge';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomePage from './pages/HomePage';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#21cbf3' : '#1976d2',
      },
      background: {
        default: mode === 'dark' ? '#181c24' : '#f7fafd',
        paper: mode === 'dark' ? '#23272f' : '#fff',
      },
      text: {
        primary: mode === 'dark' ? '#fff' : '#181c24',
        secondary: mode === 'dark' ? '#b0bec5' : '#555',
      },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: theme.palette.background.default, color: theme.palette.text.primary }}>
        <Router>
          <AppBar position="sticky" elevation={3} sx={{ background: theme.palette.mode === 'dark' ? 'linear-gradient(90deg, #23272f 60%, #21cbf3 100%)' : 'linear-gradient(90deg, #1976d2 60%, #21cbf3 100%)', color: theme.palette.text.primary }}>
            <Toolbar>
              <MenuBookIcon sx={{ mr: 1, fontSize: 32, color: 'white' }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, color: 'white', textShadow: '0 2px 8px #0003' }}>
                PDF AI Interpreter
              </Typography>
              <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 500 }}>Home</Button>
              <Button color="inherit" component={Link} to="/summarize" sx={{ fontWeight: 500 }}>Summarize</Button>
              <Button color="inherit" component={Link} to="/translate" sx={{ fontWeight: 500 }}>Translate</Button>
              <Button color="inherit" component={Link} to="/bullets" sx={{ fontWeight: 500 }}>Bullets</Button>
              <Button color="inherit" component={Link} to="/split" sx={{ fontWeight: 500 }}>Split</Button>
              <Button color="inherit" component={Link} to="/extract-images" sx={{ fontWeight: 500 }}>Extract Images</Button>
              <Button color="inherit" component={Link} to="/search" sx={{ fontWeight: 500 }}>Search</Button>
              <Button color="inherit" component={Link} to="/export-summary" sx={{ fontWeight: 500 }}>Export Summary</Button>
              <Button color="inherit" component={Link} to="/merge" sx={{ fontWeight: 500 }}>Merge PDFs</Button>
              <IconButton sx={{ ml: 2 }} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ flex: 1, pb: 8 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/summarize" element={<Summarize />} />
              <Route path="/translate" element={<Translate />} />
              <Route path="/bullets" element={<Bullets />} />
              <Route path="/split" element={<Split />} />
              <Route path="/extract-images" element={<ExtractImages />} />
              <Route path="/search" element={<Search />} />
              <Route path="/export-summary" element={<ExportSummary />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/merge" element={<Merge />} />
            </Routes>
          </Box>
          <Box sx={{ position: 'sticky', bottom: 0, width: '100%', zIndex: 1200 }}>
            <CreditsFooter />
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
