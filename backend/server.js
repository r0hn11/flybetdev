import express, { request, response } from "express";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import {PORT, mongoDBURL} from "./config.js";
const app = express();

app.use(express.json());


app.get('/',(request, response)=>{
    return response.status(200).send("Ok");
})

app.post('/books',async(request, response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message: "Invalid fields"});
        };
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
    }
})

app.get('/books',async (request, response)=>{
    try{
        const books = await Book.find();
    }catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
    }
})



mongoose.connect(mongoDBURL).
then(()=>{
    console.log("Database connection: success");
    app.listen(PORT, ()=>{
        console.log(`Application status: running\nPort: ${PORT}`);
    })
}).
catch(error=>{
    console.log(error);
})