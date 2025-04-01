
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for multiple origins
const allowedOrigins = [
  'http://localhost:5173', // Local frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

let fruits = [];

// Add Fruit API
app.post("/add", (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ message: "Invalid fruit name" });
  }

  fruits.push(name.trim()); // Add the fruit name to the fruits array
  console.log(`Fruit Added: ${name}`);
  console.log("Updated Fruits List:", fruits);

  // Send a success response with the updated fruits list
  res.status(201).json({ message: "Fruit added successfully", fruits });
});

// Get All Fruits API
app.get("/fruits", (req, res) => {
  res.json({ fruits });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
