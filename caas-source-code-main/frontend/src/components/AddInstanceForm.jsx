import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const AddInstanceForm = ({ models, onClose, onInstanceAdded }) => {
  const [instanceName, setInstanceName] = useState('');
  const [modelName, setModelName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInstance = { instance_name: instanceName, model_name: modelName };
    try {
      const response = await fetch('/api/instances/addinstance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInstance),
      });
      if (response.ok) {
        const addedInstance = await response.json();
        onInstanceAdded(addedInstance);
        onClose();
      } else {
        console.error('Failed to add instance');
      }
    } catch (error) {
      console.error('Error adding instance:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Instance Name"
        value={instanceName}
        onChange={(e) => setInstanceName(e.target.value)}
        required
      />
      <TextField
        select
        label="Model"
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        required
      >
        {models.map((model) => (
          <MenuItem key={model} value={model}>
            {model}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default AddInstanceForm;
