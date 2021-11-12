import express from "express";
import cors from "cors";
import userRouter from "./services/users/index";
import accommodationRouter from "./services/accommodations/index";
import {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
  forbiddenHandler,
} from "./errorHandlers";
// import passport from "passport";
// import cookieParser from "cookie-parser";


const server = express();

// ************************* MIDDLEWARES ********************************

server.use(cors());
server.use(express.json());
// server.use(cookieParser());


// ************************* ROUTES ************************************

server.use("/user", userRouter);
server.use("/accommodation", accommodationRouter);

// ************************** ERROR HANDLERS ***************************

server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(genericErrorHandler);


export default server