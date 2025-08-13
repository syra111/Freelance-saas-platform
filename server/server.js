const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const bidRoutes = require("./routes/bidRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.get('/', (req, res) => {
  res.send('SaaS Freelancing Marketplace API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/bids', bidRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/certificates", require("./routes/certificateRoutes"));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});