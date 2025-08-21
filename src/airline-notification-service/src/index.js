const express = require("express");
require("dotenv").config();

const { ServerConfig } = require("./config");
const amqplib = require("amqplib");
const apiRoutes = require("./routes");
const app = express();

const { mailSender } = require("./utils");

async function connectionQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");

    const channel = await connection.createChannel();

    await channel.assertQueue("noti-queue-for-bookings");

    channel.consume("noti-queue-for-bookings", (data) => {
      console.log(`${Buffer.from(data.content)}`);
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  await connectionQueue();
});
