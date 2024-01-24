import { Kafka } from "kafkajs";
import { kafkaConfig } from "../../config/config";

const client = new Kafka({
  clientId: kafkaConfig.CLIENTID,
  brokers: kafkaConfig.BROKERS,
});

const producer = client.producer();

export const produceMessage = async (topic: string, message: string) => {
  try {
    await producer.connect();
    await producer
      .send({ 
        topic,
        messages: [{ value: message }],
      })
      .then((res) => console.log("message sent successfully"))
      .catch((err) => console.log("error sending message"));
  } catch (error) {
    console.log("Erro publishing message:", error);
  }
};

const topic = kafkaConfig.TOPIC;
const message: string = "Message from the producer";


