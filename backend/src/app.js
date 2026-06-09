//always load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const achievementRoutes = require('./routes/achievementRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const taskRoutes = require('./routes/taskRoutes');
const noteRoutes = require('./routes/noteRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

const allowedOrigin = process.env.FR_URL || 'https://growthboard.netlify.app';

app.use(cors({ origin: allowedOrigin, credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'] }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use(expressSession({ resave: false, saveUninitialized: false, secret: process.env.EXPRESS_SESSION_SECRET, }));
app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  // This syntax works safely across legacy and modern connect-mongo instances
  store: (typeof MongoStore.create === 'function') 
    ? MongoStore.create({ mongoUrl: process.env.MONGO_URI }) 
    : new MongoStore({ url: process.env.MONGO_URI }),
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'none'
  }
}));


app.use('/', authRoutes);
app.use('/skills', skillRoutes);
app.use('/projects', projectRoutes);
app.use('/achievements', achievementRoutes);
app.use('/tasks', taskRoutes);
app.use('/notes', noteRoutes);
app.use('/profile', profileRoutes);

app.get("/", (req, res) => {
    res.send("hey, It's working vishesh");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key:", process.env.CLOUDINARY_API_KEY);
    console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");
});

module.exports = app;