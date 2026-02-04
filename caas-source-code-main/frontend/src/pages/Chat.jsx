import React, { useState } from 'react';
import { Container, Paper, List, ListItem, ListItemText, TextField, IconButton, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [apiUrl, setApiUrl] = useState(''); // Default API URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApiUrl, setNewApiUrl] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post(apiUrl, { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Error: Unable to fetch response.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const handleOpenModal = () => {
    setNewApiUrl(apiUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveApiUrl = () => {
    setApiUrl(newApiUrl);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ height: '70vh', overflow: 'auto', padding: '1rem', marginTop: '2rem' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} style={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={msg.text}
                style={{
                  backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#FFF',
                  borderRadius: '10px',
                  padding: '0.5rem',
                  maxWidth: '70%',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <div style={{ display: 'flex', marginTop: '1rem' }}>
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </div>
      <Fab
        color="secondary"
        aria-label="settings"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
        onClick={handleOpenModal}
      >
        <SettingsIcon />
      </Fab>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Set API Endpoint URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="API URL"
            type="url"
            fullWidth
            variant="outlined"
            value={newApiUrl}
            onChange={(e) => setNewApiUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveApiUrl} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Chat;
