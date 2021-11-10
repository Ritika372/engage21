const express = require('express')
const morgan = require("morgan");
const userRouter = require("./Routes/userRoutes");

const app = express();

//Middlewares
app.use(morgan("dev"));

app.use("/api/users", userRouter);


module.exports = app;