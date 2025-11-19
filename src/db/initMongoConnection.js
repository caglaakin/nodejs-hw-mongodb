import mongoose from "mongoose";
import {env} from '../utils/env.js';

export const initMongoConnection = async () => {
    try {
        const user = env('MONGODB_USER');
        const password = env('MONGODB_PASSWORD');
        const url = env('MONGODB_URL');
        const dbName = env('MONGODB_DB');

        await mongoose.connect(
          `mongodb+srv://${user}:${password}@${url}/${dbName}?appName=Cluster0`,
        );
        console.log('Mongo connection successfully established!');
    }catch (error) {
        console.log('Failed to connect to MongoDB', error);
        throw error;
    }  
};
