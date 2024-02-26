import mongoose from 'mongoose';

export const connectToDb = async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.DB_CONNECTION_STRING);
            console.log("Your server is connected successfully!");
        } catch (error) {
            console.log("There is some problem during connection");
            console.log(error.message);
        }
    } else if (mongoose.connection.readyState === 1) {
        console.log("Server connected already!");
    }
};
