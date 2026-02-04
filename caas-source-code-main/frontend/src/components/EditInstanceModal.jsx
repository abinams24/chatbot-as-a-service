import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, IconButton, InputAdornment } from '@mui/material';
import { ContentCopy, CloudUpload } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const EditInstanceModal = ({ open, onClose, instance, models }) => {
  const [formData, setFormData] = useState({
    instance_name: instance.instance_name,
    model_name: instance.model_name || '',
    url: instance.url,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the update functionality here
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Edit Instance
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Instance Name"
            name="instance_name"
            value={formData.instance_name}
            onChange={handleChange}
            variant="outlined"
          />

          <Select
            fullWidth
            margin="normal"
            name="model_name"
            value={formData.model_name}
            onChange={handleChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="" disabled>Select Model</MenuItem>
            {models.map((model, index) => (
              <MenuItem key={index} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>

          <TextField
            fullWidth
            margin="normal"
            label="URL"
            value={formData.url}
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopy}>
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box mt={2} display="flex" alignItems="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload Data
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {formData.file && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                {formData.file.name}
              </Typography>
            )}
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={onClose} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditInstanceModal;
