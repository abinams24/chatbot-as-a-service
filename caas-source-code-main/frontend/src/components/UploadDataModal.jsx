import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, InputLabel, FormControl, Select, Box
} from '@mui/material';
import axios from 'axios';

const UploadDataModal = ({ open, onClose, instanceId }) => {
  const [dataType, setDataType] = useState('');
  const [file, setFile] = useState(null);
  const [websiteLink, setWebsiteLink] = useState('');
  const [error, setError] = useState('');

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
    setFile(null);
    setWebsiteLink('');
    setError('');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type and size
      const validTypes = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        csv: 'text/csv',
        excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };
      if (selectedFile.size > 3 * 1024 * 1024) { // 3 MB limit
        setError('File size must not exceed 3 MB.');
        return;
      }
      if (selectedFile.type !== validTypes[dataType]) {
        setError(`Invalid file type. Expected ${validTypes[dataType]}.`);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleWebsiteLinkChange = (event) => {
    setWebsiteLink(event.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('instance_id', instanceId);
      formData.append('data_type', dataType);
      if (dataType === 'website') {
        formData.append('website_link', websiteLink);
      } else {
        formData.append('file', file);
      }

      const response = await axios.post('/api/instances/upload_data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Data uploaded successfully!');
        onClose();
      } else {
        setError('Failed to upload data.');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      setError('An error occurred during upload.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Data</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Data Format</InputLabel>
          <Select value={dataType} onChange={handleDataTypeChange}>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="doc">DOC</MenuItem>
            <MenuItem value="csv">CSV</MenuItem>
            <MenuItem value="excel">Excel</MenuItem>
            <MenuItem value="website">Website Link</MenuItem>
          </Select>
        </FormControl>

        {dataType && dataType !== 'website' && (
          <Box mt={2}>
            <input
              type="file"
              accept={dataType === 'pdf' ? 'application/pdf' :
                      dataType === 'doc' ? 'application/msword' :
                      dataType === 'csv' ? 'text/csv' :
                      dataType === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : ''}
              onChange={handleFileChange}
            />
          </Box>
        )}

        {dataType === 'website' && (
          <TextField
            fullWidth
            margin="normal"
            label="Website URL"
            value={websiteLink}
            onChange={handleWebsiteLinkChange}
          />
        )}

        {error && (
          <Box mt={2} color="error.main">
            {error}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={(dataType !== 'website' && !file) || (dataType === 'website' && !websiteLink)}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDataModal;
