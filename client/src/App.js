import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Patient/welcome';
import Register from './Patient/reg';
import Login from './Patient/login';
import Home from './Patient/home';
import AdminDash from './Admin/dash';
import Appointment from './Admin/Appointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dash" element={<AdminDash />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </Router>
  );
}

export default App;
