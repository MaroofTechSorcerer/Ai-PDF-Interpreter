import { API_BASE } from "../config";

import React from 'react';
import { Box, Typography, Container, Grid, Paper, Grow, Fade, Divider, useTheme, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const features = [
  {
    icon: <SummarizeIcon sx={{ fontSize: 60 }} />, title: 'Summarize', desc: 'Get concise summaries of your PDFs or text in any language. Upload your PDF or paste text, select a language, and receive a clear, AI-powered summary instantly.'
  },
  {
    icon: <GTranslateIcon sx={{ fontSize: 60 }} />, title: 'Translate', desc: 'Translate PDF or text to any language instantly. Upload your file or enter text, choose a target language, and get accurate translations.'
  },
  {
    icon: <ListAltIcon sx={{ fontSize: 60 }} />, title: 'Bullets', desc: 'Generate bullet points from your content for quick insights. Perfect for meeting notes, study guides, and more.'
  },
  {
    icon: <CallSplitIcon sx={{ fontSize: 60 }} />, title: 'Split', desc: 'Split PDFs by page range and download all split files as a ZIP. Organize large documents with ease.'
  },
  {
    icon: <ImageIcon sx={{ fontSize: 60 }} />, title: 'Extract Images', desc: 'Extract all images from your PDFs and download as ZIP. Select specific images or download all at once.'
  },
  {
    icon: <SearchIcon sx={{ fontSize: 60 }} />, title: 'Search', desc: 'Find anything inside your PDF with powerful search. Instantly locate keywords and view page snippets.'
  },
  {
    icon: <PictureAsPdfIcon sx={{ fontSize: 60 }} />, title: 'Export Summary', desc: 'Export your summaries as beautiful new PDFs. Share or archive your AI-generated insights.'
  },
  {
    icon: <LibraryBooksIcon sx={{ fontSize: 60 }} />, title: 'Merge PDFs', desc: 'Combine multiple PDFs into one with a single click. Upload, merge, and download your unified document.'
  },
];

function HomePage() {
  const theme = useTheme();
  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #181c24 0%, #23272f 100%)' : 'linear-gradient(135deg, #e3f2fd 0%, #f7fafd 100%)', pb: 8 }}>
      <Box sx={{ width: '100%', py: { xs: 6, md: 10 }, background: theme.palette.mode === 'dark' ? 'linear-gradient(120deg, #23272f 60%, #21cbf3 100%)' : 'linear-gradient(120deg, #1976d2 60%, #21cbf3 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 6, position: 'relative', overflow: 'hidden' }}>
        <Grow in timeout={900}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <LibraryBooksIcon sx={{ fontSize: 90, color: 'white', mb: 2, filter: 'drop-shadow(0 4px 24px #1976d2aa)' }} />
            <Typography variant="h2" fontWeight={800} sx={{ color: 'white', textShadow: '0 4px 32px #0008', mb: 2, letterSpacing: 2, fontSize: { xs: 36, sm: 48, md: 60 } }}>
              <span style={{ background: 'linear-gradient(90deg, #fff 40%, #21cbf3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PDF AI Interpreter</span>
            </Typography>
            <Typography variant="h5" sx={{ color: 'white', opacity: 0.95, mb: 1, fontWeight: 500, textAlign: 'center', maxWidth: 600 }}>
              The ultimate AI-powered toolkit for all your PDF needs.
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', opacity: 0.8, fontWeight: 400, textAlign: 'center', maxWidth: 500, mt: 1 }}>
              Summarize, translate, split, extract, search, merge, and more—<span style={{ color: '#ffeb3b', fontWeight: 700 }}>all in one place</span>.
            </Typography>
          </Box>
        </Grow>
        {/* Animated background shapes */}
        <Box sx={{ position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(33,203,243,0.18)', zIndex: 1, animation: 'float1 7s ease-in-out infinite' }} />
        <Box sx={{ position: 'absolute', bottom: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(25,118,210,0.13)', zIndex: 1, animation: 'float2 9s ease-in-out infinite' }} />
        <style>{`
          @keyframes float1 { 0% { transform: translateY(0); } 50% { transform: translateY(30px); } 100% { transform: translateY(0); } }
          @keyframes float2 { 0% { transform: translateY(0); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0); } }
        `}</style>
      </Box>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          {features.map((f, idx) => (
            <React.Fragment key={f.title}>
              <Grow in timeout={900 + idx * 180}>
                <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: 6 }}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
                      <Paper elevation={4} sx={{ width: 110, height: 110, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${theme.palette.mode === 'dark' ? theme.palette.primary.main : '#1976d2'}`, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, boxShadow: '0 2px 16px #1976d210' }}>
                        {React.cloneElement(f.icon, { color: 'primary', sx: { fontSize: 60 } })}
                      </Paper>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Fade in timeout={1200 + idx * 180}>
                      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, background: 'none', boxShadow: 'none', color: theme.palette.text.primary }}>
                        <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1, mb: 1 }}>{f.title}</Typography>
                        <Typography sx={{ color: theme.palette.text.primary, fontSize: 18 }}>{f.desc}</Typography>
                      </Paper>
                    </Fade>
                  </Grid>
                </Grid>
              </Grow>
              {idx < features.length - 1 && (
                <Divider sx={{ my: { xs: 2, sm: 4 }, borderColor: theme.palette.mode === 'dark' ? '#333c' : '#1976d220', borderBottomWidth: 2 }} />
              )}
            </React.Fragment>
          ))}
        </Box>
        <Fade in timeout={1200}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, mb: 6 }}>
            <Button component={RouterLink} to="/about" color="primary" sx={{ textTransform: 'none', fontWeight: 500, fontSize: 17, opacity: 0.85, px: 2, borderRadius: 2, background: 'none', boxShadow: 'none', '&:hover': { background: theme.palette.mode === 'dark' ? '#23272f' : '#e3f2fd', opacity: 1 }, transition: 'all 0.3s' }}>About</Button>
            <Button component={RouterLink} to="/faq" color="primary" sx={{ textTransform: 'none', fontWeight: 500, fontSize: 17, opacity: 0.85, px: 2, borderRadius: 2, background: 'none', boxShadow: 'none', '&:hover': { background: theme.palette.mode === 'dark' ? '#23272f' : '#e3f2fd', opacity: 1 }, transition: 'all 0.3s' }}>FAQ</Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default HomePage; 
