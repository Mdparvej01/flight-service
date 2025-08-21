const express = require("express");

require("dotenv").config();

const { ServerConfig, Queue } = require("./config");
const apiRoutes = require("./routes");

const app = express();

const CRON = require("./utils/common/cron-jobs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use("/bookingService/api", apiRoutes);

app.get("/bookingService/home", (req, res) => {
  return res.json({ msg: "ok" });
});

const connectionString = "amqp://localhost";

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  try {
    CRON();
    await Queue.connectionQueue();

    console.log("Queue connected successfully.");
  } catch (error) {
    console.error("Failed to connect to the queue!", error);
  }
});
