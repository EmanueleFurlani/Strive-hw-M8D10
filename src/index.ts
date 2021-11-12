import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import server from "./app";



process.env.TS_NODE_DEV && require("dotenv").config();


if (!process.env.PORT) {
  throw new Error("No Port defined");
}

const PORT = process.env.PORT || 3001;

if (!process.env.MONGO_CONNECTION) {
  throw new Error("No Mongo connection defined.");
}

mongoose.connect(process.env.MONGO_CONNECTION!);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(PORT, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${PORT}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
