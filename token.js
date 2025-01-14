const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Verify the token
app.post('/verify-token', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).send('Token is required');
    }

    try {
        const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
        // Response from Facebook API will include user info like ID, name, etc.
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).send('Failed to verify token');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
