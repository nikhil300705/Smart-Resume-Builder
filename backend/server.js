const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");   // ← ADD THIS

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);              // ← ADD THIS

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("API running");
});

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

/* SERVER */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});