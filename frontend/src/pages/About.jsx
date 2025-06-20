import React from 'react';
import { Box, Typography, Paper, Container, List, ListItem, ListItemIcon, ListItemText, Grow, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const features = [
  'Summarize PDF or text in any language',
  'Translate PDF or text to any language',
  'Generate bullet points from content',
  'Split PDFs by page range',
  'Extract images from PDFs (with download options)',
  'Search within PDF',
  'Export summaries as new PDFs',
  'Modern, animated, and responsive UI',
  'Merge multiple PDFs into one',
  'Beautiful, professional design',
];

function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Grow in timeout={800}>
        <Box sx={{ height: 300, mb: 4, borderRadius: 4, overflow: 'hidden', background: 'linear-gradient(135deg, #2196f3 30%, #21cbf3 90%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <MenuBookIcon sx={{ fontSize: 120, color: 'white', opacity: 0.18, position: 'absolute', left: 32, top: 32 }} />
          <Typography variant="h3" color="white" fontWeight={700} sx={{ textShadow: '0 2px 16px #0008', zIndex: 1 }}>
            About PDF AI Interpreter
          </Typography>
        </Box>
      </Grow>
      <Fade in timeout={900}>
        <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 32px #1976d220' }}>
          <Typography variant="h5" gutterBottom fontWeight={700}>What is this project?</Typography>
          <Typography paragraph fontSize={18}>
            PDF AI Interpreter is a next-generation web app that leverages AI to make working with PDFs effortless and powerful. Summarize, translate, extract, search, merge, and more—all in a beautiful, modern interface.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3 }} fontWeight={700}>Key Features:</Typography>
          <List>
            {features.map((feature, idx) => (
              <ListItem key={idx}>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Fade>
    </Container>
  );
}

export default About; 