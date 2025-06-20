import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Fade, Grow, Grid, Checkbox, FormControlLabel, Alert } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function ExtractImages() {
  const [pdf, setPdf] = useState(null);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
  const [zipSelectedLoading, setZipSelectedLoading] = useState(false);
  const theme = useTheme();

  const handlePdfChange = (e) => setPdf(e.target.files[0]);

  const handleExtract = async () => {
    if (!pdf) return;
    setLoading(true);
    setShowResult(false);
    const formData = new FormData();
    formData.append('pdf', pdf);
    try {
      const res = await axios.post('/extract-images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setImages(res.data.images);
      setSelected([]);
      setShowResult(true);
    } catch (err) {
      setImages(['Error: ' + (err.response?.data?.detail || err.message)]);
      setShowResult(true);
    }
    setLoading(false);
  };

  const handleSelect = (img) => {
    setSelected((prev) => prev.includes(img) ? prev.filter(i => i !== img) : [...prev, img]);
  };

  const handleDownloadAllZip = async () => {
    if (!pdf) return;
    setZipLoading(true);
    const formData = new FormData();
    formData.append('pdf', pdf);
    try {
      const res = await axios.post('/extract-images-direct', formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'extracted_images.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download ZIP: ' + (err.response?.data?.detail || err.message));
    }
    setZipLoading(false);
  };

  const handleDownloadSelectedZip = async () => {
    if (selected.length === 0) return;
    setZipSelectedLoading(true);
    try {
      const res = await axios.post('/extract-images-selected-zip', selected, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'selected_images.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download selected ZIP: ' + (err.response?.data?.detail || err.message));
    }
    setZipSelectedLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, width: '100%' }}>
      <Grow in timeout={700}>
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, boxShadow: '0 4px 32px #1976d220' }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ImageIcon sx={{ fontSize: 80 }} color="primary" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1, mb: 1 }}>Extract Images from PDF</Typography>
              <Typography sx={{ color: theme.palette.text.primary, fontSize: 18, mb: 2 }}>
                Extract all images from your PDFs and download as ZIP. Select specific images or download all at once.
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <b>Tip:</b> Use <b>Download All (ZIP)</b> for a direct download without saving images to the server, or use <b>Download Selected (ZIP)</b> to download only selected images as a ZIP.
              </Alert>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4} md={3}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload PDF
                    <input type="file" accept="application/pdf" hidden onChange={handlePdfChange} />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Button variant="contained" onClick={handleExtract} disabled={loading || !pdf} fullWidth>
                    Extract Images
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2} md={3}>
                  {images.length > 0 && (
                    <Button variant="outlined" onClick={handleDownloadAllZip} disabled={zipLoading || !pdf} fullWidth>Download All (ZIP)</Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={2} md={3}>
                  {images.length > 0 && (
                    <Button variant="outlined" onClick={handleDownloadSelectedZip} disabled={zipSelectedLoading || selected.length === 0} fullWidth>Download Selected (ZIP)</Button>
                  )}
                </Grid>
              </Grid>
              {loading && <CircularProgress sx={{ mt: 2 }} />}
              <Fade in={showResult} timeout={700}>
                <Box>
                  {images.length > 0 && (
                    <Paper elevation={2} sx={{ mt: 3, p: 2, background: theme.palette.mode === 'dark' ? '#23272f' : 'background.default', borderRadius: 3, boxShadow: '0 2px 12px #1976d210', color: theme.palette.text.primary }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>Extracted Images:</Typography>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        {images.map((img, idx) => (
                          <Grid item key={idx} xs={6} sm={4} md={3}>
                            <Box sx={{ position: 'relative', textAlign: 'center', p: 1 }}>
                              <img src={"/outputs/" + img} alt={`Extracted ${img}`} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #0002' }} />
                              <FormControlLabel
                                control={<Checkbox checked={selected.includes(img)} onChange={() => handleSelect(img)} />}
                                label="Select"
                                sx={{ display: 'block', mx: 'auto', mt: 1 }}
                              />
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  )}
                </Box>
              </Fade>
              {(zipLoading || zipSelectedLoading) && <CircularProgress sx={{ mt: 2 }} />}
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Box>
  );
}

export default ExtractImages; 