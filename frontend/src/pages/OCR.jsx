import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Fade, Grow, Grid, Alert } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function OCR() {
  const [pdf, setPdf] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const theme = useTheme();

  const handlePdfChange = (e) => setPdf(e.target.files[0]);

  const handleOCR = async () => {
    if (!pdf) return;
    setLoading(true);
    setShowResult(false);
    const formData = new FormData();
    formData.append('pdf', pdf);
    try {
      const res = await axios.post('/ocr', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResult(res.data.text);
      setShowResult(true);
    } catch (err) {
      setResult('Error: ' + (err.response?.data?.detail || err.message));
      setShowResult(true);
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
                <TextSnippetIcon sx={{ fontSize: 80 }} color="primary" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1, mb: 1 }}>OCR (Extract Text from PDF)</Typography>
              <Typography sx={{ color: theme.palette.text.primary, fontSize: 18, mb: 2 }}>
                Use AI-powered OCR to extract all text from scanned PDFs. Upload a PDF and get the extracted text instantly.
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <b>Note:</b> This feature works best with high-quality scans. Text will be extracted from all pages.
              </Alert>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={5}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload PDF
                    <input type="file" accept="application/pdf" hidden onChange={handlePdfChange} />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                  <Button variant="contained" onClick={handleOCR} disabled={loading || !pdf} fullWidth>
                    Extract Text
                  </Button>
                </Grid>
              </Grid>
              {loading && <CircularProgress sx={{ mt: 2 }} />}
              <Fade in={showResult} timeout={700}>
                <Box>
                  {result && (
                    <Paper elevation={2} sx={{ mt: 3, p: 2, background: theme.palette.mode === 'dark' ? '#23272f' : 'background.default', borderRadius: 3, boxShadow: '0 2px 12px #1976d210', color: theme.palette.text.primary }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>Extracted Text:</Typography>
                      <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: 16 }}>{result}</Typography>
                    </Paper>
                  )}
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Box>
  );
}

export default OCR; 