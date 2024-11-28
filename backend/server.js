const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

require('dotenv').config();

connectDB();

const app = express();

require('./models/Movie');
require('./models/Booking');

app.use(cors());
app.use(express.json());

app.use(require('./routes/movieRoutes'));
app.use(require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
