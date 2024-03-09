import express from 'express';
import { PORT, MONGODB_URL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
import booksRoute from './routes/booksRoute.js'
import cors from "cors";

const app = express();

//to enable middleware functionalities(for eg Postman)
app.use(express.json());

//Middleware to handle CORS policy
//Method:1
app.use(cors());

// Method:2
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

app.get("/", (req, res)=>{
    console.log(req);
    return res.status(234).send("Welcome to my book store!");
});

app.use("/books", booksRoute);


mongoose.connect(MONGODB_URL).then(()=>{
    console.log("App connected to Database!👍");
    app.listen(PORT, () =>{
        console.log("App is running on port 3000! ⭐");
    });
}).catch((error)=>{
    console.log(error);
})