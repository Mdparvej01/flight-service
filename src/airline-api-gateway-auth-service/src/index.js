const express = require("express");
require("dotenv").config();

const { createProxyMiddleware } = require("http-proxy-middleware");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();
const rateLimit = require("express-rate-limit");

const { Auth } = require("./utils/common");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use(
  "/flightsService",
  createProxyMiddleware({ target: "http://localhost:3000", changeOrigin: true })
);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
