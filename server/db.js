const mongoose = require("mongoose");
const { exit } = require("process");

const connect = async () => {
  await mongoose
    // .connect("mongodb+srv://lazizbekabdullayev118:8mJhRMX9C2BHgOnQ@cluster0.yu5xyhp.mongodb.net/stoploto?retryWrites=true&w=majority&appName=Cluster0")
    .connect("mongodb://localhost:27017/telegram")
    .then(() => {
      console.log("\u001b[32;1m ⚙️  App has connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
      exit(0);
    });
  console.log("\u001b[0m");
};

module.exports = connect;