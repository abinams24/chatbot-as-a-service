import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material';

const ViewModelsDialog = ({ open, onClose }) => {
  const models = ['Model A', 'Model B', 'Model C'];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Available Models</DialogTitle>
      <DialogContent>
        <List>
          {models.map((model, index) => (
            <ListItem key={index}>
              <ListItemText primary={model} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModelsDialog;
