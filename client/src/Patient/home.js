import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { red } from '@mui/material/colors';

const Home = () => {
  const [user, setUser] = useState(null); // user: { username, email }

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error('User fetch error:', err);
        });
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: red[50] }}>
        <CircularProgress style={{ color: red[500] }} />
      </div>
    );
  }

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: red[100] }} // red background
    >
      <Container maxWidth="md">
        <Box
          className="text-center shadow-lg p-10 rounded-2xl"
          style={{ backgroundColor: '#fff' }} // white card
        >
          <Typography
            variant="h3"
            style={{
              color: red[700],
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Appointment Scheduler
          </Typography>

          <Typography
            variant="h5"
            style={{
              color: red[600],
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            Welcome{' '}
            <span style={{ color: red[500] }}>{user.username}</span> to Appointment Scheduler!
          </Typography>

          <Typography
            variant="body1"
            style={{
              color: '#555',
              fontSize: '1.1rem',
              marginTop: '1rem',
            }}
          >
            All appointments scheduled for you will be sent directly to your registered email:{' '}
            <span style={{ color: red[700], fontWeight: 500 }}>{user.email}</span>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
