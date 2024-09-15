import express from "express";


const app = express();
const port= 3000;


// PARTE 1

 app.get('/', (req,res)=>{
     res.send('Camila Galindez')
 })

 app.get('/materia', (req, res)=>{
     res.send("Materia: Aplicaciones Hibridas ")
 })

 app.get('/profesor', (req, res)=>{
     res.send("Profesora: Camila Belen Marcos Galban ")
 })


// PARTE 2
const peliculas =[
    {titulo: "Forrest Gump"},
    {titulo: "Legends of the Fall"},
    {titulo: "The Hunger Games: The Ballad of Songbirds and Snakes"},
    {titulo: "Top Gun: Maverick"},
    {titulo: "Captain America: Civil War"},
]

app.get("/peliculas/:titulo", (req, res)=>{
    let tituloPelicula= req.params.titulo;
    let titulos = peliculas.filter(u=> u.titulo === tituloPelicula);
    if (titulos.length === 0) { 
        return res.send({ error: `404: La película "${tituloPelicula}" no ha sido encontrada.` });
    } else {
        res.send(`La película "${tituloPelicula}" ya está en favoritos.`);
    }
    
})


// PARTE 3
const productos = [
    { id: 1, producto: "Libro ALAS DE SANGRE", precio: 32700 },
    { id: 2, producto: "Libro ALAS DE HIERRO", precio: 38200 },
    { id: 3, producto: "UNA CORTE DE ROSAS Y ESPINAS (LIBRO 1)", precio: 41500 },
    { id: 4, producto: "UNA CORTE DE NIEBLA Y FURIA (LIBRO 2)", precio: 41500 },
    { id: 5, producto: "UNA CORTE DE ALAS Y RUINA (LIBRO 3)", precio: 41500 },
    { id: 6, producto: "UNA CORTE DE HIELO Y ESTRELLAS (LIBRO 4)", precio: 41500 },
    { id: 7, producto: "UNA CORTE DE LLAMAS PLATEADAS (LIBRO 5)", precio: 41500 },
    { id: 8, producto: "Libro EL TUNEL", precio: 16427 },
    { id: 9, producto: "Libro EL AMOR EN LOS TIEMPOS DEL COLERA", precio: 36399 },
    { id: 10, producto: "Libro HARRY POTTER Y EL PRISIONERO DE AZKABAN", precio: 18799 }
];


app.get("/productos", (req, res) => {
    let { min, max, id } = req.query;

    
    if (id) {
        let producto = productos.find(p => p.id === parseInt(id));
        if (!producto) {
            return res.status(404).send({ error: `Producto con id: ${id} no encontrado.` });
        }
        return res.send({ producto });
    }

    
    let productosFiltrados = productos.filter(producto => {
        let precioMinimo = min ? producto.precio >= parseInt(min) : true;
        let precioMaximo = max ? producto.precio <= parseInt(max) : true;
        return precioMinimo && precioMaximo;
    });

    // Si no se encuentran productos en el rango, devolver mensaje de error
    if (productosFiltrados.length === 0) {
        return res.status(404).send({ error: "No se encontraron productos en el rango de precios especificado." });
    }

    // Devolver productos filtrados o todos si no hay filtros
    res.send({ productos: productosFiltrados });
});



app.use((req, res) =>{
    res.status(404).send('Página no encontrada');
 })

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})