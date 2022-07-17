const express = require("express");
const { Server } = require("socket.io");
const getUsers = require("./firebase/auth");
const { fetchData, addData } = require("./firebase/firestore");
const fetchUsersData = require("./functions/users");
const consola = require("consola");

// Initialize dotenv
require("dotenv").config();

// Initialize express.js
const app = express();
// Initialize http server
const http = require("http").createServer(app);

// Initialize socket.io
const io = new Server(http, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3931",
      "http://localhost",
    ],
  },
});

app.use(express.json());

// Webserver port
const port = process.env.PORT;

// Http request

// Firebase Authentication
app.get("/auth/fetchUsers", async (req, res) => {
  consola.info({
    message: "Get Users (Authentication)",
    badge: true,
  });
  res.send(await getUsers());
});

// Cloud Firestore
app.get("/firestore/fetch/:collection", async (req, res) => {
  consola.info({
    message: `Fetch data in ${req.params.collection} (Cloud Firestore)`,
    badge: true,
  });
  res.send(await fetchData(req.params.collection));
});

app.post("/firestore/add", async (req, res) => {
  consola.info({
    message: `Add data in ${req.body.collection} (Cloud Firestore)`,
    badge: true,
  });
  res.send(await addData(req.body.collection, req.body.data, req.body.docId));
});

// Custom Functions
app.get("/functions/fetchUsers", async (req, res) => {
  consola.info({
    message: `Fetch users data (Custom Functions)`,
    badge: true,
  });
  res.send(await fetchUsersData());
});

// Waiting for socket connection
io.on("connection", (socket) => {
  consola.info(`${socket.id} has been connected!`);

  socket.on("disconnect", () => {
    consola.info(`${socket.id} has been disconnected!`);
  });
});

http.listen(port, () => {
  consola.success({
    message: `Rest API & Websocket listening at port ${port}`,
    badge: true,
  });
});
