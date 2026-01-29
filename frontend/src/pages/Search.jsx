import { API_BASE } from "../config";
import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, CircularProgress, Fade, Grow, Slide, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function Search() {
  const [pdf, setPdf] = useState(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const theme = useTheme();

  const handlePdfChange = (e) => setPdf(e.target.files[0]);

  const handleSearch = async () => {
    if (!pdf || !query) return;
    setLoading(true);
    setShowResult(false);
    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('query', query);
    try {
const res = await axios.post(`${API_BASE}/search`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
      setResult(res.data.results);
      setShowResult(true);
    } catch (err) {
      setResult([{ page: '', snippet: 'Error: ' + (err.response?.data?.detail || err.message) }]);
      setShowResult(true);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, width: '100%' }}>
      <Grow in timeout={700}>
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, boxShadow: '0 4px 32px #1976d220' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SearchIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
            <Typography variant="h5" fontWeight={700} letterSpacing={1} sx={{ flex: 1, color: theme.palette.primary.main }}>Search in PDF</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button variant="contained" component="label" sx={{ minWidth: 140, fontWeight: 500 }}>
              Upload PDF
              <input type="file" accept="application/pdf" hidden onChange={handlePdfChange} />
            </Button>
            <TextField label="Query" value={query} onChange={e => setQuery(e.target.value)} sx={{ width: 200 }} />
            <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading || !pdf || !query} sx={{ fontWeight: 600, minWidth: 140 }}>
              Search
            </Button>
          </Box>
          {loading && <CircularProgress sx={{ mt: 2 }} />}
          <Fade in={showResult} timeout={700}>
            <Box>{result.length > 0 && (
              <Slide in={showResult} direction="up" timeout={700} mountOnEnter unmountOnExit>
                <Paper elevation={2} sx={{ mt: 3, p: 3, background: theme.palette.mode === 'dark' ? '#23272f' : '#f5faff', borderRadius: 3, boxShadow: '0 2px 12px #1976d210', color: theme.palette.text.primary }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>Results:</Typography>
                  <List>
                    {result.map((item, idx) => (
                      <ListItem key={idx} alignItems="flex-start" sx={{ mb: 1, borderRadius: 2, transition: 'background 0.2s', '&:hover': { background: theme.palette.mode === 'dark' ? '#23272f' : '#e3f2fd' } }}>
                        <ListItemText primary={`Page ${item.page}`} secondary={item.snippet} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Slide>
            )}</Box>
          </Fade>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Search; 
