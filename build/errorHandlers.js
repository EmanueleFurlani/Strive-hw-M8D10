"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.badRequestHandler = exports.forbiddenHandler = exports.notFoundHandler = void 0;
var notFoundHandler = function (err, req, res, next) {
    if (err.status === 404) {
        res.status(err.status).send({ message: err.message || "Not found!" });
    }
    else {
        next(err);
    }
};
exports.notFoundHandler = notFoundHandler;
var forbiddenHandler = function (err, req, res, next) {
    if (err.status === 403) {
        res.status(err.status).send({ message: err.message || "Forbidden!" });
    }
    else {
        next(err);
    }
};
exports.forbiddenHandler = forbiddenHandler;
var badRequestHandler = function (err, req, res, next) {
    if (err.status === 400 || err.name === "ValidationError") {
        res.status(400).send({ message: err.errors || "Bad Request!" });
        console.log(err);
    }
    else {
        next(err);
    }
};
exports.badRequestHandler = badRequestHandler;
var genericErrorHandler = function (err, req, res, next) {
    console.log(err);
    res.status(500).send({ message: "Generic Server Error!" });
};
exports.genericErrorHandler = genericErrorHandler;
