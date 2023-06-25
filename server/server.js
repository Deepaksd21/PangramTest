const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./src/routes/user.routes");

const app = express();

// Middleware
app.use(helmet()); // Helmet for securing HTTP headers
app.use(compression()); // Compression for response compression
app.use(cors()); // CORS for handling Cross-Origin Resource Sharing
app.use(express.json()); // Body parsing middleware for handling JSON data
app.use(morgan("combined")); // Logging middleware for HTTP request logging

app.use("/api/v1/user", userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

require("./src/db/db");

// Start the server
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
