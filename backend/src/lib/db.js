const mongoose  = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connected`);
    } catch (error) {
        console.error("Mongo DB connection error", error);
        process.exit(1); 
    }
}

module.exports = connectDB;
