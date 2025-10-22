import express from "express";
import cors from "cors";
import 'dotenv/config'; 

const app = express();
const port = 3000;

app.use(cors()); 

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.get("/search", async (req, res) => {
    const { value } = req.query; // Changed from 'q' to 'value'

    if (!value) {
        return res.status(400).json({ error: "Search query 'value' is required." });
    }

    if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: "API key is not configured on the server." });
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(value)}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`);
});