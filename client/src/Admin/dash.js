import {
  Box, Typography, Button, Card, CardContent, Grid
} from '@mui/material';
import { red, teal } from '@mui/material/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDash = () => {
  const navigate = useNavigate();
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [otherAppointments, setOtherAppointments] = useState([]);

  const handleNavigate = () => {
    navigate('/appointment');
  };

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/appointments`);
      
      // ✅ Defensive coding to ensure response is always an array
      const allAppointments = Array.isArray(response.data)
        ? response.data
        : response.data.appointments || [];

      const today = new Date().toISOString().split('T')[0];

      const todayList = allAppointments.filter(appt => appt.date === today);
      const others = allAppointments.filter(appt => appt.date !== today);

      others.sort((a, b) => new Date(a.date) - new Date(b.date));

      setTodayAppointments(todayList);
      setOtherAppointments(others);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  fetchAppointments();
}, []);


  const renderAppointmentCard = (appt, key) => (
    <Card
      key={key}
      className="mb-6 shadow-lg rounded-xl"
      style={{
        backgroundColor: red[50],
        padding: '3px',
        border: `1px solid ${red[700]}`,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}
    >
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" style={{ color: teal[900], fontWeight: 'bold' }}>
              {appt.username}
            </Typography>
            <Typography style={{ color: '#333' }}>
              ID: <strong>{appt.patientId}</strong>
            </Typography>
            <Typography style={{ color: '#333' }}>
              Email: <strong>{appt.email}</strong>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} className="text-right mt-4 sm:mt-0">
            <Typography style={{ color: red[800], fontWeight: '600' }}>
              Date: {appt.date}
            </Typography>
            <Typography style={{ color: red[800], fontWeight: '600' }}>
              Time: {appt.time}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box className="min-h-screen flex justify-center items-start py-10 px-4" style={{ backgroundColor: '#fff' }}>
      <Box className="w-full max-w-7xl">
        {/* Header */}
        <Typography
          variant="h3"
          align="center"
          style={{ color: red[700], fontWeight: 'bold', marginBottom: '32px' }}
        >
          Admin Appointment Dashboard
        </Typography>

        {/* Add Appointment Button */}
        <Box className="flex justify-center mb-8">
          <Button
            variant="contained"
            onClick={handleNavigate}
            startIcon={<CalendarMonthIcon />}
            size="large"
            style={{
              backgroundColor: red[600],
              color: '#fff',
              padding: '14px 30px',
              fontSize: '1.05rem',
              fontWeight: 600,
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            Add Appointment Schedule for Patient
          </Button>
        </Box>

        {/* Two-column appointment display */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          {/* Today's Appointments */}
          <Box flex={1} p={3} borderRadius="12px" boxShadow={3} bgcolor="#fff">
            <Typography
              variant="h5"
              style={{ color: red[800], fontWeight: '600', marginBottom: '20px' }}
            >
              Today's Appointments
            </Typography>

            {todayAppointments.length > 0 ? (
              todayAppointments.map((appt, i) => renderAppointmentCard(appt, i))
            ) : (
              <Typography color="textSecondary">
                No appointments scheduled for today.
              </Typography>
            )}
          </Box>

          {/* Upcoming / Past Appointments */}
          <Box flex={1} p={3} borderRadius="12px" boxShadow={3} bgcolor="#fff">
            <Typography
              variant="h5"
              style={{ color: red[800], fontWeight: '600', marginBottom: '20px' }}
            >
              Upcoming / Past Appointments
            </Typography>

            {otherAppointments.length > 0 ? (
              otherAppointments.map((appt, i) => renderAppointmentCard(appt, `o${i}`))
            ) : (
              <Typography color="textSecondary">
                No other appointments found.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDash;
