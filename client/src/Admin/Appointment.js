import {
  Box, Typography, Button, Divider, IconButton, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions, Card,
} from '@mui/material';
import { red } from '@mui/material/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ScheduleAppointment = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentHistory, setAppointmentHistory] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    fetchAppointmentHistory(patient._id);
  };

  const handleAddAppointment = () => {
    setOpenPopup(true);
  };

  const handleSendMail = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/appointments/add`, {
      patientId: selectedPatient._id,
      date: appointmentDate,
      time: appointmentTime
    })
    .then(() => {
      return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send-appointment`, {
        email: selectedPatient.email,
        name: selectedPatient.username,
        date: appointmentDate,
        time: appointmentTime
      });
    })
    .then(() => {
      setOpenPopup(false);
      fetchAppointmentHistory(selectedPatient._id);
      alert('Appointment saved and email sent');
    })
    .catch(err => {
      console.error(err);
      alert('Failed to send email or save appointment');
    });
  };

  const fetchAppointmentHistory = (patientId) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/appointments/history/${patientId}`)
      .then(res => setAppointmentHistory(res.data))
      .catch(err => console.error(err));
  };

  return (
  <Box className="min-h-screen p-10" style={{ backgroundColor: red[50] }}>
    <Typography
      variant="h4"
      align="center"
      sx={{
        color: red[700],
        fontWeight: 'bold',
        mb: 6,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}
    >
      Schedule Appointment
    </Typography>

    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
      {/* Left Panel - Patient List */}
      <Box flex={1}>
        <Typography variant="h6" sx={{ color: red[800], fontWeight: 'bold', mb: 2 }}>
          Patients
        </Typography>

        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                p: 2,
                boxShadow: 2,
                backgroundColor: '#ffffff',
                borderRadius: 2,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body1"><strong>ID:</strong> {patient.patientId}</Typography>
                  <Typography variant="body1"><strong>Name:</strong> {patient.username}</Typography>
                </Box>
                <IconButton
                onClick={() => handleSelect(patient)}
                sx={{
                  color: '#fff',
                  backgroundColor: red[600],
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: red[700],
                  },
                }}
              >
                <ArrowForwardIcon fontSize="small" />
              </IconButton>

              </Box>
            </Card>
          ))
        ) : (
          <Typography color="textSecondary">No patients found.</Typography>
        )}
      </Box>

      {/* Right Panel - Selected Patient Info */}
      <Box flex={1}>
        {selectedPatient ? (
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, backgroundColor: '#fff' }}>
            <Typography variant="h6" sx={{ color: red[800], fontWeight: 'bold', mb: 2 }}>
              Appointment Details
            </Typography>

            <Typography variant="body1"><strong>ID:</strong> {selectedPatient.patientId}</Typography>
            <Typography variant="body1"><strong>Name:</strong> {selectedPatient.username}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {selectedPatient.email}</Typography>

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              fullWidth
              onClick={handleAddAppointment}
              sx={{
                mt: 3,
                backgroundColor: red[600],
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: red[700],
                },
              }}
            >
              Add Appointment
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: red[700], mb: 1 }}>
              Appointment History
            </Typography>

            {appointmentHistory.length > 0 ? (
              appointmentHistory.map((appt, i) => (
                <Typography key={i} variant="body2" sx={{ color: '#666' }}>
                  • {appt.date} at {appt.time}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No appointments found.
              </Typography>
            )}
          </Card>
        ) : (
          <Card sx={{ p: 3, backgroundColor: '#fff', boxShadow: 1, borderRadius: 2 }}>
            <Typography color="textSecondary">Select a patient to view details.</Typography>
          </Card>
        )}
      </Box>
    </Box>

    {/* Appointment Dialog */}
    <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
      <DialogTitle sx={{ color: red[700], fontWeight: 'bold' }}>
        Add Appointment
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Patient:</strong> {selectedPatient?.username}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>ID:</strong> {selectedPatient?.patientId}
        </Typography>

        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <TextField
          label="Time"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleSendMail}
          variant="contained"
          sx={{
            backgroundColor: red[600],
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: red[700],
            },
          }}
        >
          Send Mail
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
};

export default ScheduleAppointment;
