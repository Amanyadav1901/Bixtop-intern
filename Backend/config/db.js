const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Amanyadav0109:Yadav2001@cluster0.qycx9fz.mongodb.net/cluster0?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
