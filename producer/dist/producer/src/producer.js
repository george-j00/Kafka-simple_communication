"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceMessage = void 0;
const kafkajs_1 = require("kafkajs");
const config_1 = require("../../config/config");
const client = new kafkajs_1.Kafka({
    clientId: config_1.kafkaConfig.CLIENTID,
    brokers: config_1.kafkaConfig.BROKERS,
});
const producer = client.producer();
const produceMessage = (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.connect();
        yield producer
            .send({
            topic,
            messages: [{ value: message }],
        })
            .then((res) => console.log("message sent successfully"))
            .catch((err) => console.log("error sending message"));
    }
    catch (error) {
        console.log("Erro publishing message:", error);
    }
});
exports.produceMessage = produceMessage;
const topic = config_1.kafkaConfig.TOPIC;
const message = "Message from the producer";
