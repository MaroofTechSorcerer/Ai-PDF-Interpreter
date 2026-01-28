
import { API_BASE } from "../config";
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Fade, Grow, Grid, Alert } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function ExportSummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleSummaryChange = (e) => setSummary(e.target.value);

  const handleExport = async () => {
    if (!summary) return;
    setLoading(true);
    setError('');
    setDownloaded(false);
    try {
      const res = await axios.post('/export-summary', { summary }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'summary.txt');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloaded(true);
    } catch (err) {
      setError('Failed to export: ' + (err.response?.data?.detail || err.message));
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
                <FileDownloadIcon sx={{ fontSize: 80 }} color="primary" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1, mb: 1 }}>Export Summary</Typography>
              <Typography sx={{ color: theme.palette.text.primary, fontSize: 18, mb: 2 }}>
                Download your summary as a text file. Paste or edit your summary below and click Export.
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <b>Tip:</b> You can edit the summary before exporting. The file will be downloaded directly.
              </Alert>
              <textarea
                value={summary}
                onChange={handleSummaryChange}
                rows={6}
                style={{ width: '100%', fontSize: 16, borderRadius: 8, border: `1px solid ${theme.palette.divider}`, padding: 12, marginBottom: 16, background: theme.palette.background.default, color: theme.palette.text.primary }}
                placeholder="Paste or edit your summary here..."
              />
              <Button variant="contained" onClick={handleExport} disabled={loading || !summary} sx={{ minWidth: 160, fontWeight: 600 }}>
                Export as TXT
              </Button>
              {loading && <CircularProgress sx={{ mt: 2 }} />}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              <Fade in={downloaded} timeout={700}>
                <Alert severity="success" sx={{ mt: 2 }}>Summary exported and downloaded!</Alert>
              </Fade>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Box>
  );
}

export default ExportSummary; 
