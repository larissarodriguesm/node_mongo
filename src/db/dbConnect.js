import mongoose from "mongoose";
import 'dotenv/config';

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const DB_USER_COMPASS = process.env.DB_USER_COMPASS
const DB_PASS_COMPASS = process.env.DB_PASS_COMPASS

console.log(DB_USER_COMPASS, DB_PASS_COMPASS);

//conectando no banco Mongo Atlas
export const dbConnect = mongoose
    .connect(
    /* Mongo Atlas */
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.crmtwy5.mongodb.net/dc_fs12?retryWrites=true&w=majority`

    /*Mongo Local(Compass) */
    //`mongodb://${DB_USER_COMPASS}:${DB_PASS_COMPASS}admin:admin@localhost:27017/?authMechanism=DEFAULT`//
    )

    .then(() => {
        console.log('BD conectado com sucesso!');
    })
    .catch(error => {
        console.log('Erro ao conectar no BD', error)
    })
