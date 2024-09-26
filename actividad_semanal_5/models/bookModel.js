import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksFilePath = path.join(__dirname, '../data/books.json');

const readBooksFile = () => {
    try {
        if (!fs.existsSync(booksFilePath)) {
            fs.writeFileSync(booksFilePath, '[]', 'utf8');  // Crea un archivo vacío si no existe
        }
        const data = fs.readFileSync(booksFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error leyendo el archivo de libros:', err);
        return [];
    }
};

// Escribir datos en el archivo de autores
const writeBooksFile = (data) => {
    try {
        fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error escribiendo en el archivo de libros:', err);
    }
};

export {readBooksFile, writeBooksFile };
