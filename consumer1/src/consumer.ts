import { Kafka } from "kafkajs";
import { kafkaConfig } from "../../config/config";

const client = new Kafka({
  clientId: kafkaConfig.CLIENTID,
  brokers: kafkaConfig.BROKERS,
});

const consumer = client.consumer({ groupId: kafkaConfig.GROUPID });

export const ConumerMessage = async (topic: string) => {
  try {  
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer
      .run({
        eachMessage: async ({ message }) => {
          const data = message.value?.toString();
          console.log(` *** Consumer 1 received message from '${topic}': ${data}`);
        }
      }) 
      .then(() => console.log("message consumed successfully"))
      .catch((err) => console.log("error consuming message"));
  } catch (error) {
    console.log("Erro consuming message:", error); 
  }
};