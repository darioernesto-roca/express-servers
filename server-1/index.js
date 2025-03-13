const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./db/config');

// Import versioned routes
const routesV1 = require('./routes/v1');
const routesV2 = require('./routes/v2');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);

// Authentication helper function
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Apply API versioning
app.use('/api/v1', routesV1);
app.use('/api/v2', routesV2);

// Database connection
// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error('Error acquiring client', err.stack);
//     }
//     console.log('Connected to the database');
//     release();
// });

// Start server
app.listen(port, () => {
    console.log(`🌎Server is running on http://localhost:${port}`);
});