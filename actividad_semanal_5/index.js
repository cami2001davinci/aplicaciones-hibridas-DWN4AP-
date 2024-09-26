import express from "express";
import fs from "fs";
import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from "./routes/bookRoutes.js";


//MVC MOEDLO-VISTA-CONTROLADOR

const app = express();
const port = 3000;


app.use (express.json());

app.use('/api/authors', authorRoutes); 
app.use('/api/books', bookRoutes); 

app.listen(port, ()=>{
    console.log (`http://localhost:${(port)}`);
})


export default app;