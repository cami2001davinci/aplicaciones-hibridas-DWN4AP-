const http = require('http');
const fs = require('fs'); 
const os = require('os'); 
const path = require('path'); 

const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Página principal");
    } else if (url === '/alumno' && method === 'GET') {
        const data = {
            message: 'Nombre: Camila Galindez, Comisión: DWN4AP',
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } else if (url === '/info' && method === 'GET') {
        
        const info = {
            plataforma: os.platform(),
            arquitectura: os.arch(),
            memoriaLibre: os.freemem(),
            memoriaTotal: os.totalmem(),
            tiempoActivo: os.uptime()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(info));
    } else if (url === '/static' && method === 'GET') {
        
        const filePath = path.join(__dirname, 'index.html'); 

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar el archivo');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Página no encontrada");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}/`);
});
