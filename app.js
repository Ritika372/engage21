const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const userRouter = require("./Routes/userRoutes");
const subjectRouter = require("./Routes/subjectRoutes");
const customError = require("./utils/customError");
const globalErrorHandler = require("./Controllers/errorController");
const quizRouter = require("./Routes/quizRoutes");
const questionRouter = require("./Routes/questionRoutes");
const viewRouter = require("./Routes/viewRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");

//Parsing request body in http request
app.use(express.json());

app.use(cookieParser());

app.use(express.static("public"));

//Middlewares
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/questions", questionRouter);
app.use("/", viewRouter);

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
