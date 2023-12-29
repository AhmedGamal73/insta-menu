require('dotenv').config();
require("./config/database").connect(); // database connection
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import qrcode from 'qrcode';
import User from './model/user';
import path from 'path';

interface usrerInterface {
    name: string;
    email: string;
    password: string;
    tocken?: string;
}

const app = express();
app.use(express.json());    // to support JSON-encoded bodies

// register route
app.post("/register", async (req: Request, res: Response) => {
    try {
    // Get user input 
    const { name, email, password }: usrerInterface = req.body;

    // Validate user input
    if (!(email && password && name)) {
        res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    // Encrypt user password
    let encryptedPassword: string = await bcrypt.hash(password, 10);

    if (email === oldUser?.email) {
        res.status(409).send("User Already Exist. Please Login");
    } else if (email !== oldUser?.email) {
        // Create QR code
        const qrCodePath = path.join(__dirname, 'qrcode.png');
        await qrcode.toFile(qrCodePath, email);
        console.log(`Your Qr code save at ${qrCodePath}`);
    }

    // Create user in our database
    const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY as string,
        {
        expiresIn: "2h",
        }
    )

    // return new user
    res.status(201).json({token});

    } catch (error) {
        res.status(500).json({
            error: `Internal server error: ${error}`,
        });
    }
    
}); 

// login route
app.post("/login", async (req: Request, res: Response) => {
    try {
        // Get user input
        const { email, password }: usrerInterface = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY as string,
                {
                expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");

    } catch (err) {
        console.log(err);
    }

}); 

export default app;