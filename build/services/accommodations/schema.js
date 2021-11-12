"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var accommodationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    located: { type: String, required: true },
    host: { type: Schema.Types.ObjectId, ref: "user" },
}, {
    timestamps: true,
});
accommodationSchema.methods.toJSON = function () {
    // this is executed automatically EVERY TIME express does a res.send
    var userDocument = this;
    var userObject = userDocument.toObject();
    delete userObject.__v;
    // delete userObject.host.password;
    // delete userObject.host.__v;
    // delete userObject.host.createdAt;
    // delete userObject.host.updatedAt;
    return userObject;
};
exports.default = model("Accommodation", accommodationSchema);
