
import dotenv from 'dotenv';
import esPrimo from './common.cjs';

dotenv.config();

const numero1 = parseInt(process.env.NUMERO1);
const numero2 = parseInt(process.env.NUMERO2);

// Llama a la función esPrimo con los números obtenidos de las variables de entorno
esPrimo(numero1);  
esPrimo(numero2);