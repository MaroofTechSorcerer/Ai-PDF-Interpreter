import { API_BASE } from "../config";
import React from 'react';
import { Box, Typography, Paper, Container, Accordion, AccordionSummary, AccordionDetails, Grow, Fade } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const faqs = [
  {
    q: 'Who is owner and creator of this App?',
    a: 'Mohammmad Maroof'
  },
  {
    q: 'What file types are supported?',
    a: 'Currently, only PDF files are supported for upload and processing.'
  },
  {
    q: 'Is my data safe?',
    a: 'Yes, your files are processed securely and are not stored after processing.'
  },
  {
    q: 'What AI models are used?',
    a: 'The app uses OpenAI GPT models for summarization, translation, and bullet points.'
  },
  {
    q: 'Can I use this on mobile?',
    a: 'Yes! The website is fully responsive and works on all devices.'
  },
  {
    q: 'How do I download results?',
    a: 'You can download summaries, translations, images, and more directly from each feature page.'
  },
  {
    q: 'What if I run out of OpenAI credits?',
    a: 'You will need to add a new API key or purchase more credits to continue using AI features.'
  },
];

function FAQ() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Grow in timeout={800}>
        <Box sx={{ height: 220, mb: 4, borderRadius: 4, overflow: 'hidden', background: 'linear-gradient(135deg, #1976d2 30%, #21cbf3 90%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <HelpOutlineIcon sx={{ fontSize: 90, color: 'white', opacity: 0.18, position: 'absolute', left: 32, top: 32 }} />
          <Typography variant="h3" color="white" fontWeight={700} sx={{ textShadow: '0 2px 16px #0008', zIndex: 1 }}>
            FAQ
          </Typography>
        </Box>
      </Grow>
      <Fade in timeout={900}>
        <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 32px #1976d220' }}>
          <Typography variant="h5" gutterBottom fontWeight={700}>Frequently Asked Questions</Typography>
          <Box sx={{ mt: 2 }}>
            {faqs.map((faq, idx) => (
              <Accordion key={idx} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 8px #1976d210', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography fontSize={17}>{faq.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}

export default FAQ; 
