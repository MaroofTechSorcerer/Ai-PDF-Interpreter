import { API_BASE } from "../config";

import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, CircularProgress, Fade, Grow, Grid, Alert } from '@mui/material';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function Split() {
  const [pdf, setPdf] = useState(null);
  const [pageRanges, setPageRanges] = useState('0-1');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
  const theme = useTheme();

  const handlePdfChange = (e) => setPdf(e.target.files[0]);

  const handleSplit = async () => {
    if (!pdf) return;
    setLoading(true);
    setShowResult(false);
    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('page_ranges', pageRanges);
    try {
      const res = await axios.post('/split', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResult(res.data.files);
      setShowResult(true);
    } catch (err) {
      setResult(['Error: ' + (err.response?.data?.detail || err.message)]);
      setShowResult(true);
    }
    setLoading(false);
  };

  const handleDownloadAllZip = async () => {
    if (result.length === 0) return;
    setZipLoading(true);
    try {
      const res = await axios.post('/split-zip', result, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'split_pdfs.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download ZIP: ' + (err.response?.data?.detail || err.message));
    }
    setZipLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, width: '100%' }}>
      <Grow in timeout={700}>
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, boxShadow: '0 4px 32px #1976d220' }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CallSplitIcon sx={{ fontSize: 80 }} color="primary" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1, mb: 1 }}>Split PDF</Typography>
              <Typography sx={{ color: theme.palette.text.primary, fontSize: 18, mb: 2 }}>
                Split PDFs by page range and download all split files as a ZIP. Organize large documents with ease.
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <b>Tip:</b> Use <b>Download as ZIP</b> to download all split PDFs as a ZIP file.
              </Alert>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload PDF
                    <input type="file" accept="application/pdf" hidden onChange={handlePdfChange} />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField label="Page Ranges" value={pageRanges} onChange={e => setPageRanges(e.target.value)} fullWidth helperText="e.g. 0-1,2-3" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Button variant="contained" onClick={handleSplit} disabled={loading || !pdf} fullWidth>
                    Split
                  </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                  {result.length > 0 && (
                    <Button variant="outlined" onClick={handleDownloadAllZip} disabled={zipLoading || result.length === 0} fullWidth>Download as ZIP</Button>
                  )}
                </Grid>
              </Grid>
              {loading && <CircularProgress sx={{ mt: 2 }} />}
              <Fade in={showResult} timeout={700}>
                <Box>{result.length > 0 && <Paper elevation={2} sx={{ mt: 3, p: 2, background: theme.palette.mode === 'dark' ? '#23272f' : 'background.default', borderRadius: 3, boxShadow: '0 2px 12px #1976d210', color: theme.palette.text.primary }}><Typography variant="subtitle1" fontWeight={600} gutterBottom>Split Files:</Typography><ul style={{ margin: 0, paddingLeft: 18 }}>{result.map((file, idx) => <li key={idx}>{file}</li>)}</ul></Paper>}</Box>
              </Fade>
              {zipLoading && <CircularProgress sx={{ mt: 2 }} />}
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Split; 
