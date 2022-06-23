const Queue = require("bull");
const { ordersProcess } = require("./orders-queue-consumer.js");

// Our job queue
const ordersQueue = new Queue("orders");

ordersQueue.process(ordersProcess);

const createNewOrder = (order) => {
  ordersQueue.add(order, {
    priority: getJobPriority(order),
    attempts: 2,
  });
};

const getJobPriority = (order) => {
  if (!order.price) return 3;
  return order.price > 100 ? 1 : 2;
};

module.exports = {
  ordersQueue,
  createNewOrder,
};
