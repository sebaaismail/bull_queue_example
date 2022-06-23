/**
 * source:
 * https://roluquec.medium.com/job-queuing-101-start-using-bull-in-your-node-js-project-part-i-2be3ef36a42d
 */

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const router = express.Router();

const { ordersQueue, createNewOrder } = require("./queues/orders-queue.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/health", (ctx) => {
  ctx.body = {
    status: "ok",
    data: "Server is working",
  };
});

router.post("/order", async (req, res) => {
  await createNewOrder(req.body);
  res.send({
    status: "ok",
    data: {
      msg: "Order processed successfully!",
      order: req.body,
    },
  });
});

app.listen(port, () => console.log("Server up and running!"));

// json to post for test:
// look at source lin above
/*
 json = {
   "client": "Rodrigo Luque",
   "item": "White T-Shirt",
   "price": 39,
   "datetime": "2021-09-05T09:09:43.060Z"
 }
 */
