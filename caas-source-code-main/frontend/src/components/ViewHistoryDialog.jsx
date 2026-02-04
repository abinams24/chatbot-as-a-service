import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material';

const ViewHistoryDialog = ({ open, onClose }) => {
  const historyItems = [
    'Instance A modified at 10:30 AM',
    'Instance B added at 2:15 PM',
    'Instance C deleted at 5:45 PM',
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Instance History</DialogTitle>
      <DialogContent>
        <List>
          {historyItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
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

export default ViewHistoryDialog;
