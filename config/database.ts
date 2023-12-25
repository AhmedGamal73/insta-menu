import { ConnectOptions, mongo } from "mongoose";

import mongoose from 'mongoose';

const MONGO_URL: string = process.env.MONGO_URL as string

export const connect = (): void => {
    const options: ConnectOptions = {}
    mongoose
    .connect(MONGO_URL,  options )

    .then(() => {
        console.log('Connected to database');
    })

    .catch((err: Error) => {
        console.log('Failed to connect to database', err);
    });

    mongoose.connection.on('error', (err: Error) => {
        console.log('Database error', err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
    });
    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
}