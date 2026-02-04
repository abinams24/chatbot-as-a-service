import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Fab,  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import HistoryIcon from '@mui/icons-material/History';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Instance from '../components/Instance';
import ViewModelsDialog from '../components/ViewModelsDialog';
import ViewLogsDialog from '../components/ViewLogsDialog';
import ViewHistoryDialog from '../components/ViewHistoryDialog';
import AddInstanceForm from '../components/AddInstanceForm';

const AdminPage = () => {
  const [instances, setInstances] = useState([]);
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAddInstanceOpen, setIsAddInstanceOpen] = useState(false);

  useEffect(() => {
    // Fetch instances from the backend API
    fetch('http://localhost:5000/api/instances')
      .then((response) => response.json())
      .then((data) => setInstances(data))
      .catch((error) => console.error('Error fetching instances:', error));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item>
          <Button variant="contained" startIcon={<ViewListIcon />} onClick={() => setIsModelsOpen(true)}>
            View Models
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<AssessmentIcon />} onClick={() => setIsLogsOpen(true)} color="secondary">
            View Logs
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<HistoryIcon />} onClick={() => setIsHistoryOpen(true)} color="success">
            View History
          </Button>
        </Grid>
      </Grid>

      {/* List of Instances */}
      {instances.map((instance) => (
        <Instance key={instance.instance_id} instance={instance} />
      ))}

      {/* Floating Add Instance Button */}
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ position: 'fixed', bottom: 24, right: 24 }} 
        onClick={() => setIsAddInstanceOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Instance Dialog (Placeholder) */}
      <Dialog open={isAddInstanceOpen} onClose={() => setIsAddInstanceOpen(false)}>
      <DialogTitle>Add New Instance</DialogTitle>
      <DialogContent>
        <AddInstanceForm
          onClose={() => setIsAddInstanceOpen(false)}
          onInstanceAdded={(newInstance) => setInstances([...instances, newInstance])}
          models={["Model A","Model B","Model C"]}
       />
      </DialogContent>
    </Dialog>


      {/* Dialog Components */}
      <ViewModelsDialog open={isModelsOpen} onClose={() => setIsModelsOpen(false)} />
      <ViewLogsDialog open={isLogsOpen} onClose={() => setIsLogsOpen(false)} />
      <ViewHistoryDialog open={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </Container>
  );
};

export default AdminPage;
