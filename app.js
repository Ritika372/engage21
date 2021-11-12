const express = require("express");
const morgan = require("morgan");
const userRouter = require("./Routes/userRoutes");
const subjectRouter = require("./Routes/subjectRoutes");
const customError = require("./utils/customError");
const globalErrorHandler = require("./Controllers/errorController");

const app = express();

//Parsing request body in http request
app.use(express.json());

//Middlewares
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);

//To handle unhandled routes
app.all("*", (req, res, next) => {
  const err = new customError(
    `Could not find ${req.originalUrl} on this server`,
    404
  );
  next(err);
});

//global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
