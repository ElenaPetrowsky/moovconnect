// const express = require('express');
// const bodyParser = require('body-parser');  Importation en mode commonjs

import { config } from 'dotenv';
import express from "express";
import bodyParser from "body-parser";

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";

const app = express();

const port = process.env.PORT || 3001

app.use(bodyParser.json())

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})