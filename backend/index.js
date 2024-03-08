import express from 'express';
import { PORT, MONGODB_URL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';

const app = express();

//to enable middleware functionalities(for eg Postman)
app.use(express.json());

app.get("/", (req, res)=>{
    console.log(req);
    return res.status(234).send("Welcome to my book store!");
});

//to save books to database
app.post("/books", async (req, res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({message: "Send all the required data"});
        }
        const newBook = {
            title: req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

//Route to get all books from database
app.get("/books", async (req, res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    };
});


//Route to get one book by id from database
app.get("/books/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    };
});

//Route to Update a book(we use put method to update)
app.put("/books/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: "Send all required data" });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully!" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});


mongoose.connect(MONGODB_URL).then(()=>{
    console.log("App connected to Database!👍");
    app.listen(PORT, () =>{
        console.log("App is running on port 3000! ⭐");
    });
}).catch((error)=>{
    console.log(error);
})