import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URL); // Debugging output
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error(`Some error occurred while connecting to database: ${error.message}`);
    }
};

