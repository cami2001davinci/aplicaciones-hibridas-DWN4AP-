import usuarioRouter from './usuarioRoutes.js';
import carreraRouter from './carreraRoutes.js';
import publicacionRouter from './publicacionRoutes.js';
import homeRouter from './homeRoutes.js';
import foroRouter from './foroRoutes.js';

const routerAPI = (app) => {
    app.use('/usuarios', usuarioRouter);
    app.use('/carreras', carreraRouter);
    app.use('/publicaciones', publicacionRouter);
    app.use('/', homeRouter);
    app.use('/foro', foroRouter);
};

export default routerAPI;