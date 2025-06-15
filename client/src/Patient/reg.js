import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Link } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
      username,
      email,
      password
    })
      .then(res => {
        alert(res.data.message);
      })
      .catch(err => {
        alert(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
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
              Register
            </Typography>

            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ backgroundColor: red[600], color: '#fff' }}
              >
                Register
              </Button>
            </form>

            <Typography variant="body2" className="text-center mt-4 text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                underline="hover"
                style={{ color: red[700], fontWeight: '500' }}
              >
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>

        {/* Text below card */}
        <Typography
          variant="body2"
          className="text-center mt-16"
          style={{ color: '#fff' }}
        >
          Register now to manage your appointments easily and get updates via email.
        </Typography>
      </div>
    </div>
  );
}

export default Register;
