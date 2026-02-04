import React, { useState } from 'react';
import {
  Card, CardContent, Typography, IconButton, Box,
  Tooltip, Paper
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditInstanceModal from './EditInstanceModal';
import UploadDataModal from './UploadDataModal';
import Grid from '@mui/material/Grid2';

const Instance = ({ instance }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(instance.url);
    alert('URL copied to clipboard!');
  };

  return (
    <Card sx={{ marginBottom: 3, padding: 2, borderRadius: 3, boxShadow: 4, bgcolor: 'background.paper' }}>
      <CardContent>
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            {instance.instance_name}
          </Typography>
        </Box>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              <strong>Instance ID:</strong> {instance.instance_id}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Instance Name:</strong> {instance.instance_name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Model:</strong> {instance.model_name}
            </Typography>
           
          </Grid>

          <Grid item>
            <Tooltip title="Edit Instance">
              <IconButton onClick={handleOpenEditModal} color="primary">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Upload Data">
              <IconButton onClick={handleOpenUploadModal} color="secondary">
                <UploadFileIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" sx={{ wordBreak: 'break-all', flexGrow: 1 }}>
              {instance.url}
            </Typography>
            <Tooltip title="Copy URL">
              <IconButton onClick={handleCopyUrl} color="primary">
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>
      </CardContent>

      {/* Edit Instance Modal */}
      <EditInstanceModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        instance={instance}
        models={['Model A', 'Model B', 'Model C']}
      />

      {/* Upload Data Modal */}
      <UploadDataModal
        open={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        instanceId={instance.instance_id}
      />
    </Card>
  );
};

export default Instance;
