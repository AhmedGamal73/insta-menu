import http, { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import express from 'express';
import { MONGO_URL } from './config/database';
import cors from 'cors';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL);

const server: Server = http.createServer(app);

const API_PORT: string | undefined = process.env.API_PORT;
const port: string | number = process.env.PORT || API_PORT || 3001; // default port to listen


const User = mongoose.model('User');

app.get('/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// fetching all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create new user
app.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            const errorCode = (err as any).code
            if (errorCode === 11000) {
                res.status(400).send('Duplicate email');
            } else {
            res.status(500).send('Server error');
            }
            res.status(400).send('User already exists');
    }
}
})


server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});