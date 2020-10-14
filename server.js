import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Cards from "./dbCard.js";
import cors from "cors";
dotenv.config();

// App Config
const app = express();
// DB Config
mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoint
app.get("/", (req, res) => {
  res.status(200).send("hellow");
});

app.post("/tinder/cards", (req, res) => {
  const cardInfo = req.body;

  Cards.create(cardInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).send(data);
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).send(data);
  });
});

// App listner
const PORT = 4040;
app.listen(4040, () => {
  console.log(`Server Start with port ${PORT} ==> http://localhost:${PORT} `);
});
