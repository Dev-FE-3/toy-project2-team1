import express from "express";
import morgan from "morgan";
// import { poolDb } from './database.js';

const THRESHOLD = 2000;
const port = process.env.PORT || 5174;
const app = express();

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD);

  setTimeout(() => {
    next();
  }, delayTime);
});

app.use(morgan("dev"));
app.use(express.static("dist"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
