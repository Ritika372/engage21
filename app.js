const express = require('express')
const morgan = require("morgan");
const userRouter = require("./Routes/userRoutes");

const app = express();

//Parsing request body in http request
app.use(express.json());

//Middlewares
app.use(morgan("dev"));

app.use("/api/users", userRouter);


module.exports = app;