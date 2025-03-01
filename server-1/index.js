const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('This is a page coming from Express JS and VS Code');
});

app.listen(port, () => {
    console.log(`🌎Server is running on http://localhost:${port}`);
});