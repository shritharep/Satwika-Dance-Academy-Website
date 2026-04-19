// Optional translation server.
// The React app now loads translations locally from JSON, so you only need this
// server if you want to keep translations behind an HTTP endpoint.

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

const corsOptions = {
    origin: true, // allow requests from any origin
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/translations/:lang", (req, res) => {
    const lang = req.params.lang;

    const filePath = path.join(__dirname, "translations", `${lang.split('-')[0]}.json`);
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(404).json({ error: "Translation file not found" });
        }

        try {
            const jsonData = JSON.parse(data);
            res.set("Cache-control", "public, max-age=3600");
            res.json(jsonData);
        } catch (parseErr) {
            res.status(500).json({ error: "Error parsing translation file" });
        }
    });
});

app.listen(port, () => {
    console.log(`Translation server running at http://localhost:${port}`);
});
