const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile); // Render .html files with EJS

// Serve static files from the "../static" directory
app.use(express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/about.html'))
})

app.get('/api/sampledata', (req, res) => {
    const now = new Date();
    res.send({
        currentDate: now.toISOString().split('T')[0],
        currentTime: now.toTimeString().split(' ')[0]
    });
})

app.get('/joke', async (req, res) => {
    const result = await fetch("https://v2.jokeapi.dev/joke/Any");
    const jokedata = await result.json();

    console.log(jokedata);

    let joke = "";
    if (jokedata.joke) {
        joke = jokedata.joke;
    } else {
        joke = jokedata.setup + " " + jokedata.delivery;
    }

    res.render(path.join(__dirname, "../static/joke.html"), { "joke": joke });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
