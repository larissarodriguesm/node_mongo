import mongoose from "mongoose";

export const Usuario = mongoose.model('Usuario', {
    nome: String,
    idade: Number,
    ativo: Boolean,
    email: String
})