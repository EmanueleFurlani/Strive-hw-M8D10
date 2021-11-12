"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./services/users/index"));
var index_2 = __importDefault(require("./services/accommodations/index"));
var errorHandlers_1 = require("./errorHandlers");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
// import GoogleStrategy from "./services/auth/oauth.js";
process.env.TS_NODE_DEV && require("dotenv").config();
if (!process.env.PORT) {
    throw new Error("No Port defined");
}
var server = (0, express_1.default)();
var port = process.env.PORT || 3001;
// ************************* MIDDLEWARES ********************************
// passport.use("google", GoogleStrategy);
// server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use((0, cookie_parser_1.default)());
// server.use(passport.initialize());
// ************************* ROUTES ************************************
server.use("/user", index_1.default);
server.use("/accommodation", index_2.default);
// ************************** ERROR HANDLERS ***************************
server.use(errorHandlers_1.notFoundHandler);
server.use(errorHandlers_1.badRequestHandler);
server.use(errorHandlers_1.forbiddenHandler);
server.use(errorHandlers_1.genericErrorHandler);
if (!process.env.MONGO_CONNECTION) {
    throw new Error("No Mongo connection defined.");
}
mongoose_1.default.connect(process.env.MONGO_CONNECTION);
mongoose_1.default.connection.on("connected", function () {
    console.log("Successfully connected to Mongo!");
    server.listen(port, function () {
        console.table((0, express_list_endpoints_1.default)(server));
        console.log("Server running on port " + port);
    });
});
mongoose_1.default.connection.on("error", function (err) {
    console.log(err);
});
