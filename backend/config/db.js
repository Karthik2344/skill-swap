import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", JSON.stringify(process.env.MONGO_URI));
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/skillswap`);
    console.log(
      `MongoDB connected succecsfully... DB HOST: ${connectionInstance.connection.host} `
    );
  } catch (err) {
    console.log("MongoDB connection error: ", err.message);
    process.exit(1);
  }
};

export default connectDB;
