const express = require('express');
const cors = require('cors'); // Import the cors package
const scrapePlayerPoints = require('./JS/scripts'); // Adjust the path to scripts.js

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors()); // Enable CORS for all routes

app.get('/playerPoints', async (req, res) => {
    const playerName = req.query.playerName;
    try {
        const playerPoints = await scrapePlayerPoints(playerName);
        console.log(playerPoints)
        res.json(playerPoints);
    } catch (error) {
        console.error('Error fetching player points:', error);
        res.status(500).send('Error fetching player points');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
