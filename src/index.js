const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/about.html'))
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
