import mongoose, { mongo } from "mongoose";
import "dotenv/config"

async function  connectToDatabase(){
    mongoose.connect(process.env.DB_CONNECTION_STRING);


    return mongoose.connection;
};

export default connectToDatabase;