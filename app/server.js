"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
console.log("Hello " + path.resolve(process.cwd()) + "!");
// import express from 'express';
// // const redisClient = require('./redis');
//
// const EXPRESS_PORT = process.env.EXPRESS_PORT || 3040;
//
// const app = express();
//
// app.get('/', (req, res) => res.send('Hello World!'));
//
// app.listen(EXPRESS_PORT, () =>
// console.log(`Express app listening on port ${EXPRESS_PORT}!`)
// );
