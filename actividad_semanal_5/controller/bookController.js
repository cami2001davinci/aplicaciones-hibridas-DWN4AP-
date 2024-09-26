import { readAuthorsFile, writeAuthorsFile } from '../models/authorModel.js';

const createBook = (req, res) =>{
    const {id, title, authorId} = req.body;
    const books = readBooksFile();
    const newBook ={id, title, authorId};
    books.push(newBook);
    writeBooksFile(books);
    res.status(201).json(newBook)
}



const getAllBooks = (req, res)=>{
    let books = readBooksFile();
    res.status(200).json(books);
}

const getBookById = (req, res)=>{
    const {id}= req.params;
    let books = readBooksFile();
    const book = books.find(u => u.id === id);

    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({message: "Libro no encontrado"})
    }
}


const updateBook = (req, res)=>{
    const {id}= req.params;
    const {title, authorId} = req.body;
    let books = readBooksFile()
    const bookIndex = books.findIndex( u => u.id === id);

    if(bookIndex !== -1){
        books[bookIndex] = {id: id, title: title, authorId:authorId };
        writeBookFile(books)
        res.status(200).json(Book[BookIndex])
    }
}

const deleteBook = (req,res)=>{
    const {id} = req.params;
    let books = readBooksFile();
    const bookIndex = books.findIndex(u=> u.id === id);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        writeBookFile(books);
        res.status(200).json({ message: "Libro eliminado correctamente" });
    } else {
        res.status(404).json({ message: "Libro no encontrado" });
    }
};

export{getAllBooks,getBookById,createBook,updateBook,deleteBook};