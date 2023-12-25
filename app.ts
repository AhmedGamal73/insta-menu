require('dotenv').config();
require("./config/database").connect(); // database connection
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import qrcode from 'qrcode';

const app = express();
app.use(express.json());    // to support JSON-encoded bodies

// Logic here

export default app;
