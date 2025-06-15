import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: red[50] }}>
      {/* Heading */}
      <div className="text-center mb-10">
        <Typography variant="h2" style={{ color: red[700], fontWeight: 'bold' }}>
          APPOINTMENT SCHEDULER SYSTEM
        </Typography>
        <p className="text-gray-700 mt-6 max-w-xl mx-auto">
          In this Scheduler application, the admin has the ability to schedule patient appointments for a specific date and time. Once an appointment is set, the patient will receive an email notification with the appointment details.
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Admin Card */}
        <Card className="shadow-xl border-l-8 rounded-xl flex flex-col justify-between h-56" style={{ borderColor: red[500] }}>
          <CardContent className="flex flex-col justify-between h-full">
            <div>
              <Typography variant="h5" style={{ color: red[800], fontWeight: 'bold' }} gutterBottom>
                Admin
              </Typography>
              <Typography variant="body1" className="text-gray-700 mb-6">
                Admin can schedule appointments for patients by selecting a fixed date and time. Patients will receive email notifications instantly.
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button
                variant="contained"
                style={{ backgroundColor: red[600], color: '#fff' }}
                onClick={() => navigate('/dash')}
              >
                Go to Admin Panel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient Card */}
        <Card className="shadow-xl border-l-8 rounded-xl flex flex-col justify-between h-56" style={{ borderColor: red[500] }}>
          <CardContent className="flex flex-col justify-between h-full">
            <div>
              <Typography variant="h5" style={{ color: red[800], fontWeight: 'bold' }} gutterBottom>
                Patient
              </Typography>
              <Typography variant="body1" className="text-gray-700 mb-6">
                Patients can register using their email ID to receive a unique user ID and view their scheduled appointments with your mail ID.
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button
                variant="contained"
                style={{ backgroundColor: red[600], color: '#fff' }}
                onClick={() => navigate('/login')}
              >
                Register as Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
