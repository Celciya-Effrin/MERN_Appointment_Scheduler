const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt= require("bcrypt")
const dotenv = require("dotenv")
const path = require("path");

const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users'); // if separated

//dotenv connect backend and frontend by express
dotenv.config();
const app = express()

app.use(express.json());
app.use(cors({
  origin: "mern-appointment-scheduler-jxufs0uin-celciya-effrins-projects.vercel.app", // Frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Connect routes
app.use("/api", authRoutes);

//mongo DB connection code
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Connected to mongo DB"))
    .catch(err => console.log("Fail to connect", err));
    
app.use('/api', authRoutes);
app.use('/api', userRoutes); // include if you use a separate file
app.use('/api/appointments', require('./routes/appointments'));


app.listen(process.env.PORT,() =>{
    console.log(`server is running on port ${process.env.REACT_APP_FRONTEND_URL}`)
})

app.get("/", (req, res) => {
  res.send("✅ MERN Billing Backend is running!");
});
