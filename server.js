const dotevn = require("dotenv");
dotevn.config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./api/userRouter.js"); //!add router

app.use(express.static("public"));
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("welcome to users api");
});

app.use("/api/users",userRouter) //!use router and note path /api/xxxx

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
  })
  
  app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`)
  })
