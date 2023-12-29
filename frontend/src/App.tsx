// App.tsx

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const App = () => {
  const [sequence, setSequence] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleClickButton1 = () => {
    if (!isStreaming) {
      const newSocket = new WebSocket('ws://localhost:8000/ws');

      newSocket.onmessage = (event) => {
        const receivedNucleotide = event.data;
        setSequence((prevSequence) => prevSequence + receivedNucleotide);

        if (receivedNucleotide === 'T') {
          const lastThree = sequence.slice(-10);
          if (lastThree === 'TAA' || lastThree === 'TAG' || lastThree === 'TGA') {
            alert('Stop Codon Identified. Stream stopped.');
            newSocket.close();
            setIsStreaming(false);
          }
        }
      };

      newSocket.onclose = () => {
        setIsStreaming(false);
      };

      setSocket(newSocket);
      setIsStreaming(true);
    } else {
      alert('Streaming is already in progress.');
    }
  };

  const stopStream = () => {
    // Chiudi la connessione WebSocket per fermare la sequenza
    // (questo attiverà anche la chiamata onclose sopra)
    if (socket) {
      socket.close();
    }
    setSequence('');
  };

  const handleDownload = () => {
    const firstWord = sequence.split(' ')[0]; // Estrae la prima parola dalla sequenza
    const blob = new Blob([firstWord], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  

  return (
    <Container maxWidth="md" style={{ backgroundColor: '#f0f0f0', height: '100vh' }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h3" color={sequence.includes('Stop Codon') ? 'secondary' : 'primary'} gutterBottom>
          DNA Sequence
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickButton1} style={{ marginBottom: '16px' }}>
          Start Stream
        </Button>
        {isStreaming && (
          <Button variant="contained" color="secondary" onClick={stopStream} style={{ marginBottom: '16px' }}>
            Stop Stream
          </Button>
        )}
        <Typography variant="body1" color="textPrimary">
          {sequence.split(' ')[0]}
          </Typography>
        {sequence.includes('Stop Codon') && (
          <>
            <Typography variant="h6" color="secondary" style={{ marginTop: '16px' }}>
              Evviva! Hai identificato correttamente una sequenza di DNA con codone di terminazione
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleDownload} style={{ marginTop: '16px' }}>
              Download Sequence
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default App;