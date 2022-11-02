const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("MongoDB connected");
    }
);

const httpServer = require("http").createServer(app);

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Listening");
});

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
