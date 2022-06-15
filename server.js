// const express = require('express');
// const bodyParser = require('body-parser');  Importation en mode commonjs

import express from "express";
import bodyParser from "body-parser";

import userRoute from "./routes/user.js";

const app = express();

const port = process.env.PORT || 3001

app.use(bodyParser.json())

app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})