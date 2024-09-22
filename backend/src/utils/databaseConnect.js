import mongoose from "mongoose";



export default function connectToDatabase () {
    
    const URL = process.env.DB_URL;
    mongoose.connect(URL);
    mongoose.connection.on("connected", () => console.log("connected to MongoDB"));
    mongoose.connection.on("error", (err) => console.log(err.message));
}
