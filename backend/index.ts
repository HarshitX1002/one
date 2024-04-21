import express, { Express, Request, Response } from "express";
const mongoose = require('mongoose')
const TodoModel = require('./Models/Todo')

import dotenv from "dotenv";
const cors = require("cors")

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGODB_URI

mongoose.connect(mongoUri).then(()=>{
    console.log(`Connection Successful`);
    }).catch((err: any) => console.log(`No Connection`))

app.get('/get', (req: Request,res: Response)=>{
    TodoModel.find()
    .then((result: any) => res.json(result))
    .catch((err:any) => res.json(err))
})

app.put('/update/:id', (req: Request, res: Response)=>{
    const {id} = req.params;
   TodoModel.findByIdAndUpdate({_id: id}, {done: true})
   .then((result: any) => res.json(result))
   .catch((err: any) => res.json(err))
   
})


app.post('/add', (req: Request, res: Response) => {
    const task: string = req.body.task;
    TodoModel.create({
        task: task
    }).then((result: any) => res.json(result))
    .catch((err: any) => res.json(err));
});

app.delete('/delete/:id', (req: Request, res: Response)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
   .then((result: any) => res.json(result))
   .catch((err: any) => res.json(err))
   
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});