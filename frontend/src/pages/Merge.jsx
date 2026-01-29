import { API_BASE } from "../config";
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Fade, Grow, Grid, Alert, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function Merge() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [merged, setMerged] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleFilesChange = (e) => {
    setPdfs(Array.from(e.target.files));
    setMerged(false);
    setError('');
  };

  const handleRemove = (idx) => {
    setPdfs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleMerge = async () => {
    if (pdfs.length < 2) return;
    setLoading(true);
    setError('');
    setMerged(false);
    const formData = new FormData();
    pdfs.forEach((pdf, idx) => formData.append('pdfs', pdf));
    try {
const res = await axios.post(`${API_BASE}/merge`, formData, {
  responseType: 'blob'
});
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMerged(true);
    } catch (err) {
      setError('Failed to merge: ' + (err.response?.data?.detail || err.message));
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
                <MergeTypeIcon sx={{ fontSize: 80 }} color="primary" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1, mb: 1 }}>Merge PDFs</Typography>
              <Typography sx={{ color: theme.palette.text.primary, fontSize: 18, mb: 2 }}>
                Combine multiple PDF files into a single document. Upload at least two PDFs and click Merge.
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <b>Tip:</b> The order of files determines the order in the merged PDF. Remove and re-upload to reorder.
              </Alert>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={5}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload PDFs
                    <input type="file" accept="application/pdf" hidden multiple onChange={handleFilesChange} />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                  <Button variant="contained" onClick={handleMerge} disabled={loading || pdfs.length < 2} fullWidth>
                    Merge
                  </Button>
                </Grid>
              </Grid>
              {pdfs.length > 0 && (
                <Paper elevation={1} sx={{ mb: 2, p: 1, background: theme.palette.mode === 'dark' ? '#23272f' : 'background.default', borderRadius: 2, color: theme.palette.text.primary }}>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>Files to Merge:</Typography>
                  <List dense>
                    {pdfs.map((file, idx) => (
                      <ListItem key={idx} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      }>
                        <ListItemText primary={file.name} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
              {loading && <CircularProgress sx={{ mt: 2 }} />}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              <Fade in={merged} timeout={700}>
                <Alert severity="success" sx={{ mt: 2 }}>Merged PDF downloaded!</Alert>
              </Fade>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Merge; 
