const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const achievementRoutes = require('./routes/achievementRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const taskRoutes = require('./routes/taskRoutes');
const noteRoutes = require('./routes/noteRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
require('dotenv').config();

app.use(cors({origin: process.env.FR_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(expressSession({resave: false, saveUninitialized: false, secret: process.env.EXPRESS_SESSION_SECRET,}));
app.use(flash());

app.use('/',authRoutes);
app.use('/skills',skillRoutes);
app.use('/projects', projectRoutes);
app.use('/achievements', achievementRoutes);
app.use('/tasks', taskRoutes);
app.use('/notes', noteRoutes);
app.use('/profile', profileRoutes);

app.get("/", (req, res) => {
    res.send("hey, It's working vishesh");
});

module.exports = app;