import mongoose from "mongoose";

import { MONGO_URI } from "./env.js";

async function connectToDbViaMongoose() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongodb Database via Mongoose");
  } catch (error) {
    console.log(error);
  }
}

export default connectToDbViaMongoose;
