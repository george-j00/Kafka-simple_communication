"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const producer_1 = require("./producer");
const config_1 = require("../../config/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8001;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
const topic = config_1.kafkaConfig.TOPIC;
const message = "hello world!";
app.get('/api/test/producer', (req, res) => {
    (0, producer_1.produceMessage)(topic, message);
});
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
