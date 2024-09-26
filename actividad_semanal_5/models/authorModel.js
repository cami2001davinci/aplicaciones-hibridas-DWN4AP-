import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authorsFilePath = path.join(__dirname, '../data/authors.json');

// Leer el archivo de autores
const readAuthorsFile = () => {
    try {
        if (!fs.existsSync(authorsFilePath)) {
            fs.writeFileSync(authorsFilePath, '[]', 'utf8');  // Crea un archivo vacío si no existe
        }
        const data = fs.readFileSync(authorsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error leyendo el archivo de autores:', err);
        return [];
    }
};

// Escribir datos en el archivo de autores
const writeAuthorsFile = (data) => {
    try {
        fs.writeFileSync(authorsFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error escribiendo en el archivo de autores:', err);
    }
};

export { readAuthorsFile, writeAuthorsFile };
