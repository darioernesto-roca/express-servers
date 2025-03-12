const router = require('express').Router();
const path = require('path');

// API V2 Home Route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to API v2' });
});

// Example updated API endpoint with additional data
router.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Juancho Polo', email: 'juanchopolo@example.com' },
        { id: 2, name: 'Pepita', email: 'pepita@example.com' }
    ]);
});

module.exports = router;
// Compare this snippet from express/server-1/routes/v2/index.js:
// const router = require('express').Router();
// const path = require('path');
//
// // API V2 Home Route
// router.get('/', (req, res) => {
//     res.json({ message: 'Welcome to API v2' });
// });