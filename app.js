// Basic Lib Import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Security Middleware Lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database Lib Import
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Security Middleware Implement
// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Helmet Security Middleware
if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "https:", "data:"],
          connectSrc: ["'self'", "https:"],
        },
      },
      crossOriginEmbedderPolicy: true,
    })
  );
} else {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
}


app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Mongo DB Database Connection
let URL = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.nakaabb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

// Try to connect to MongoDB, but continue even if it fails
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB Connected Successfully!");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    console.log("Server will continue to run without database connection");
  });

// API Routing
app.use("/api/v1", router);

// Health check endpoint
app.get("/health", (req, res) => res.json({ status: "Server is Running" }));

// View Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/products", (req, res) => {
  res.render("products", { title: "Products" });
});

app.get("/products/new", (req, res) => {
  res.render("create-product", { title: "Add New Product" });
});

app.get("/products/edit/:id", (req, res) => {
  res.render("edit-product", {
    title: "Edit Product",
    productId: req.params.id,
  });
});

// Backend server port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});

module.exports = app;
