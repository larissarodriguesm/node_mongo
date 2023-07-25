import { Usuario } from './src/models/Usuario.js';
import moment from 'moment/moment.js';
import app from './src/app.js';

const HOST = 'localhost'
const PORT = 5000

//endpoint inicial
app.get('/', (req, res) => {
    res.send({msg: 'Servidor rodando!',
codigo: 200});
});



app.listen(PORT, () => {
    console.log(`Example app listening on port http://${HOST}:${PORT}`)
})