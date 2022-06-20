const ordersProcess = async (job) => {
  console.log("Processing job...");
  console.log({ jobdata: job.data });
};

module.exports = {
  ordersProcess,
};
