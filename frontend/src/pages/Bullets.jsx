
import { API_BASE } from "../config";
import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Tabs, Tab, CircularProgress, Fade, Grow, Tooltip, Grid } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function Bullets() {
  const [tab, setTab] = useState(0);
  const [pdf, setPdf] = useState(null);
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleTabChange = (e, newValue) => setTab(newValue);
  const handlePdfChange = (e) => setPdf(e.target.files[0]);

  const handleBulletsPdf = async () => {
    if (!pdf) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('language', language);
    try {
      const res = await axios.post('/bullets', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResult(res.data.bullets);
    } catch (err) {
      setResult('Error: ' + (err.response?.data?.detail || err.message));
    }
    setLoading(false);
  };

  const handleBulletsText = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/bullets-text', { text, language });
      setResult(res.data.bullets);
    } catch (err) {
      setResult('Error: ' + (err.response?.data?.detail || err.message));
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, width: '100%' }}>
      <Grow in timeout={700}>
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, boxShadow: '0 4px 32px #1976d220' }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ListAltIcon sx={{ fontSize: 80 }} color="primary" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1, mb: 1 }}>Generate Bullet Points</Typography>
              <Typography sx={{ color: theme.palette.text.primary, fontSize: 18, mb: 2 }}>
                Generate bullet points from your content for quick insights. Perfect for meeting notes, study guides, and more.
              </Typography>
              <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="PDF" />
                <Tab label="Text" />
              </Tabs>
              {tab === 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Button variant="contained" component="label" sx={{ minWidth: 140, fontWeight: 500 }}>
                    Upload PDF
                    <input type="file" accept="application/pdf" hidden onChange={handlePdfChange} />
                  </Button>
                  <TextField label="Language" value={language} onChange={e => setLanguage(e.target.value)} sx={{ width: 120 }} helperText="e.g. en, fr, es" />
                  <Tooltip title="Generate bullet points from the uploaded PDF in the selected language" arrow>
                    <span>
                      <Button variant="contained" color="primary" onClick={handleBulletsPdf} disabled={loading || !pdf} sx={{ fontWeight: 600, minWidth: 140 }}>
                        Generate
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
              )}
              {tab === 1 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 2 }}>
                  <TextField label="Text for Bullets" multiline rows={3} value={text} onChange={e => setText(e.target.value)} sx={{ flex: 1, minWidth: 220 }} />
                  <TextField label="Language" value={language} onChange={e => setLanguage(e.target.value)} sx={{ width: 120 }} helperText="e.g. en, fr, es" />
                  <Tooltip title="Generate bullet points from the entered text in the selected language" arrow>
                    <span>
                      <Button variant="contained" color="primary" onClick={handleBulletsText} disabled={loading || !text} sx={{ fontWeight: 600, minWidth: 140 }}>
                        Generate
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
              )}
              {loading && <CircularProgress sx={{ mt: 2 }} />}
              <Fade in={!!result} timeout={700}>
                <Box>{result && (
                  <Paper elevation={2} sx={{ mt: 3, p: 3, background: theme.palette.mode === 'dark' ? '#23272f' : '#f5faff', borderRadius: 3, boxShadow: '0 2px 12px #1976d210', color: theme.palette.text.primary }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Bullet Points:</Typography>
                    <Typography component="ul" sx={{ pl: 3, fontSize: 17 }}>{result.split('\n').map((line, idx) => line.trim() && <li key={idx}>{line}</li>)}</Typography>
                  </Paper>
                )}</Box>
              </Fade>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Bullets; 
