//const express = require('express')
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import { Usuario } from './models/Usuario.js';
import moment from 'moment/moment.js';

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json())


const HOST = 'localhost'
const PORT = 5000

//endpoint inicial
app.get('/', (req, res) => {
    res.send({msg: 'Servidor rodando!',
codigo: 200});
});

//endpoints do Usuario
app.post('/usuario', async (req, res) => {
    /*const body = {
        nome: req.body.nome,
        idade: req.body.idade
    }*/

    //desestruturação do body para acessar os atributos
    const { nome, idade, ativo, email } = req.body;

    // crio o objeto usuario copiado do objeto body
    const usuario = { nome, idade, ativo, email };

    //cria o usuário através do mongoose
    const usuarioBD = await Usuario.create(usuario);
    res.status(201).json({
        data: usuarioBD,
        msg: 'Usuário criado com sucesso!'
    });
});

// atualizar usuário
app.put('/usuario/:id', async(req, res) => {
    const id = req.params.id

//desestruturação do body para acessar os atributos
const { nome, idade, ativo, email } = req.body;

// crio o objeto usuario copiado do objeto body
const usuario = { nome, idade, ativo, email };

await Usuario.updateOne({ _id: id }, usuario);
res.status(200).json('Usuário atualizado com sucesso!');
})

app.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.find()

    res.status(200).json(usuarios)

})

app.get('/usuario/:id', async (req,res) =>{
    const id = req.params.id

    const usuario = await Usuario.findOne({_id: id})

    res.status(200).json(usuario)

})

app.delete('/usuario/:id', async (req, res) =>{
    const id = req.params.id

    //Busca o usuário, antes de deletar, com as suas informações
    const usuarioBD = await Usuario.findOne({ _id: id})

    //Deleta o usuário do banco
    const usuario = await Usuario.deleteOne({_id: id})

    //Pego a data atual, new Date(), e coloco no formato 27/07/2023 20:06:55 
    let date = moment(new Date()).format('DD/MM/YYYY hh:mm:ss')
    let msg = `O usuário ${usuarioBD.nome} foi excluído com sucesso às ${date}!`

    res.status(200).json({msg})
})


const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const DB_USER_COMPASS = process.env.DB_USER_COMPASS
const DB_PASS_COMPASS = process.env.DB_PASS_COMPASS

console.log(DB_USER_COMPASS, DB_PASS_COMPASS)

//conectando no banco Mongo Atlas
mongoose.connect(
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

app.listen(PORT, () => {
    console.log(`Example app listening on port http://${HOST}:${PORT}`)
})