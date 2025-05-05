require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rewriteRoutes = require("./routes/rewrite");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use("/api/v1", rewriteRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Tone Slider Backend is running!" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
