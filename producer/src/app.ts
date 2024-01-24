import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { produceMessage } from "./producer";
import { kafkaConfig } from "../../config/config";

dotenv.config();
const app: Express = express();
const port = 8001

app.use(cookieParser()); 

app.use(cors());

const topic = kafkaConfig.TOPIC;
const message = "hello world!";

produceMessage(topic , message)

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
 