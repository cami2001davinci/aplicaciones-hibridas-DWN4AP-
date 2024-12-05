// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config(); // Carga las variables de entorno del archivo .env
// const app = express();

// app.use(express.json()); // Middleware para manejar JSON en las solicitudes

// // Ruta básica para verificar que el servidor funciona
// app.get('/', (req, res) => {
//     res.send('API F1 Encyclopedia is running!');
// });

// // Puerto en el que correrá el servidor
// const PORT = process.env.PORT || 5000;

// // Conexión a la base de datos MongoDB
// const connectDB = async () => {
//     try {
//         // Conexión a la base de datos sin opciones obsoletas
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         // Manejo de errores
//         console.error(`Error: ${error.message}`);
//         process.exit(1); // Cierra el proceso en caso de error
//     }
// };

// // Ejecutar la conexión a la base de datos
// connectDB();

//  // Llama a la función para conectar a la base de datos

// // Inicia el servidor en el puerto configurado
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routerAPI from './routes/index.js';
import cors from 'cors';


dotenv.config();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5175'],
}));
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'resources', 'index.html'));
});

routerAPI(app);


mongoose.connect(mongoURI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
        app.listen(port, () => {
            console.log(`Servidor en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB Atlas:', err);
    });
