import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectdb = async () => {
  try {
    // Attempt to connect to the database using the connection string from environment variables
    const connect = await mongoose.connect(process.env.MONGO_URL);

    // Log the successful connection details
    console.log("Database Connected!".america);
  } catch (err) {
    // Log any error that occurs during connection
    console.log(err);

    // Exit the process with failure (code 1) if the connection fails
    process.exit(1);
  }
};

export { connectdb };
