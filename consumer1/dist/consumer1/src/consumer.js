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
exports.ConumerMessage = void 0;
const kafkajs_1 = require("kafkajs");
const config_1 = require("../../config/config");
const client = new kafkajs_1.Kafka({
    clientId: config_1.kafkaConfig.CLIENTID,
    brokers: config_1.kafkaConfig.BROKERS,
});
const consumer = client.consumer({ groupId: config_1.kafkaConfig.GROUPID });
const ConumerMessage = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield consumer.connect();
        yield consumer.subscribe({ topic });
        yield consumer
            .run({
            eachMessage: ({ message }) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const data = (_a = message.value) === null || _a === void 0 ? void 0 : _a.toString();
                console.log(` *** Consumer 1 received message from '${topic}': ${data}`);
            }),
        })
            .then(() => console.log("message consumed successfully"))
            .catch((err) => console.log("error consuming message"));
    }
    catch (error) {
        console.log("Erro consuming message:", error);
    }
});
exports.ConumerMessage = ConumerMessage;
