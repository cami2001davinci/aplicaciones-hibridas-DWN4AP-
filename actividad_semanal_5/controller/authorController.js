import { readAuthorsFile, writeAuthorsFile } from '../models/authorModel.js';

const createAuthor = (req, res) =>{
    const {id, name} = req.body;
    const authors = readAuthorsFile();
    const newAuthor ={id, name};
    authors.push(newAuthor);
    writeAuthorsFile(authors);
    res.status(201).json(newAuthor)
}



const getAllAuthors = (req, res)=>{
    let authors = readAuthorsFile();
    res.status(200).json(authors);
}

const getAuthorsById = (req, res)=>{
    const {id}= req.params;
    let authors = readAuthorsFile();
    const author = authors.find(u => u.id === id);

    if(author){
        res.status(200).json(author);
    }else{
        res.status(404).json({message: "Autor no encontrado"})
    }
}


const updateAuthor = (req, res)=>{
    const {id}= req.params;
    const {name} = req.body;
    let authors = readAuthorsFile()
    const authorIndex = authors.findIndex( u => u.id === id);

    if(authorIndex !== -1){
        authors[authorIndex] = {id: id, name: name};
        writeAuthorsFile(authors)
        res.status(200).json(authors[authorIndex])
    }
}

const deleteAuthor = (req,res)=>{
    const {id} = req.params;
    let authors = readAuthorsFile();
    const authorIndex = authors.findIndex(u=> u.id === id);

    if (authorIndex !== -1) {
        authors.splice(authorIndex, 1);
        writeAuthorsFile(authors);
        res.status(200).json({ message: "Autor eliminado correctamente" });
    } else {
        res.status(404).json({ message: "Autor no encontrado" });
    }
};

export{getAllAuthors,getAuthorsById,createAuthor,updateAuthor,deleteAuthor};