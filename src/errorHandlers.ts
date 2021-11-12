import { ErrorRequestHandler } from "express";

export const notFoundHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ message: err.message || "Not found!" });
  } else {
    next(err);
  }
};

export const forbiddenHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(err.status).send({ message: err.message || "Forbidden!" });
  } else {
    next(err);
  }
};

export const badRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 400 || err.name === "ValidationError") {
    res.status(400).send({ message: err.errors || "Bad Request!" });
    console.log(err);
  } else {
    next(err);
  }
};

export const genericErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Generic Server Error!" });
};
