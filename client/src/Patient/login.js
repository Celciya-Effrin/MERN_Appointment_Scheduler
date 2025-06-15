import { Card, CardContent, Typography, TextField, Button, Link } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        username,
        password,
      });

      // ✅ Save user ID to local storage
      localStorage.setItem('userId', res.data.userId);

      alert(res.data.message);
      navigate('/home'); // move to home.js
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
          style={{ backgroundColor: red[500] }} // Red background
          >
      <div className="w-full max-w-md">
        <Card className="shadow-xl rounded-xl">
          <CardContent>
            <Typography
              variant="h4"
              className="text-center mb-6"
              style={{ color: red[700], fontWeight: 'bold' }}
            >
              Login
            </Typography>

            <form className="space-y-4 mt-4" onSubmit={handleLogin}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ backgroundColor: red[600], color: '#fff' }}
              >
                Login
              </Button>
            </form>

            <Typography variant="body2" className="text-center mt-4 text-gray-600">
              Don’t have an account?{' '}
              <Link href="/register" underline="hover" style={{ color: red[700], fontWeight: '500' }}>
                Register
              </Link>
            </Typography>
          </CardContent>
        </Card>

        {/* Text below card */}
        <Typography variant="body2" className="text-center mt-16 text-gray-600">
          Login to view your appointments and get notified via email.
        </Typography>
      </div>
    </div>
  );
};

export default Login;
