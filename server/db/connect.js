// import mongoose from "mongoose";

// const connect = async () => {
//   try {
//     console.log("Connecting to MongoDB...");
//     await `mongoose.connect(process.env.MONGO_URI, {})`;
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error.message);
//     process.exit(1);
//   }
// };

// export default connect;

import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await `mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })`,
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }

  // Add event listeners for connection issues
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });

  // Handle process termination
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    }
  });
};

export default connect;