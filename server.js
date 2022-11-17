const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");

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
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}
