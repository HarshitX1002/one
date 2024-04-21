"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const TodoModel = require('./Models/Todo');
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express_1.default.json());
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri).then(() => {
    console.log(`Connection Successful`);
}).catch((err) => console.log(`No Connection`));
app.get('/get', (req, res) => {
    TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then((result) => res.json(result))
        .catch((err) => res.json(err));
});
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
