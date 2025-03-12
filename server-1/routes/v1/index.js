const router = require('express').Router();
const path = require('path');

// API V1 Home Route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to API v1' });
});

// Example API endpoint
router.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
});

module.exports = router;