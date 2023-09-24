const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/cut.json');
const middlewares = jsonServer.defaults();
const _ = require('lodash');

// Configura middleware para permitir solicitudes JSON
server.use(middlewares);

// Configura rutas personalizadas si es necesario
// Ejemplo: server.use('/custom', customRouter);

// Ruta de búsqueda nombre comuna s comuna qs
server.get('/s/comuna', (req, res) => {
    const searchTerm = req.query.qs;
    console.log(searchTerm)
    if (!searchTerm) {
        return res.status(400).json({ error: 'Debes proporcionar un término de búsqueda.' });
    }
    const datos = router.db.getState().chile; // Obtiene los datos de la base de datos
    // Realiza una búsqueda insensible a mayúsculas/minúsculas y sin tildes
    const results = datos.filter(item => {
        const normalizedItem = _.deburr(item.nombrecomuna.toLowerCase()); // Remueve tildes y convierte a minúsculas
        const normalizedSearch = _.deburr(searchTerm.toLowerCase());
        return normalizedItem.includes(normalizedSearch);
    });
    res.json(results);
});
// Ruta de búsqueda personalizada
server.get('/s/region', (req, res) => {
    const searchTerm = req.query.qs;
    console.log(searchTerm)
    if (!searchTerm) {
        return res.status(400).json({ error: 'Debes proporcionar un término de búsqueda.' });
    }
    const datos = router.db.getState().chile; // Obtiene los datos de la base de datos
    // Realiza una búsqueda insensible a mayúsculas/minúsculas y sin tildes
    const results = datos.filter(item => {
        const normalizedItem = _.deburr(item.nombreregion.toLowerCase()); // Remueve tildes y convierte a minúsculas
        const normalizedSearch = _.deburr(searchTerm.toLowerCase());
        return normalizedItem.includes(normalizedSearch);
    });
    res.json(results);
});
server.get('/s/provincia', (req, res) => {
    const searchTerm = req.query.qs;
    console.log(searchTerm)
    if (!searchTerm) {
        return res.status(400).json({ error: 'Debes proporcionar un término de búsqueda.' });
    }
    const datos = router.db.getState().chile; // Obtiene los datos de la base de datos
    // Realiza una búsqueda insensible a mayúsculas/minúsculas y sin tildes
    const results = datos.filter(item => {
        const normalizedItem = _.deburr(item.nombreprovincia.toLowerCase()); // Remueve tildes y convierte a minúsculas
        const normalizedSearch = _.deburr(searchTerm.toLowerCase());
        return normalizedItem.includes(normalizedSearch);
    });
    res.json(results);
});


// Usa el enrutador JSON-Server
server.use(router);

// Define el puerto en el que se ejecutará el servidor
const port = process.env.PORT || 3000;

// Inicia el servidor
server.listen(port, () => {
    console.log(`Servidor JSON-Server escuchando en el puerto ${port}`);
});
