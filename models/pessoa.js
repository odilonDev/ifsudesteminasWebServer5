const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PessoaSchema = new schema({
    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    senha: {
        type: String
    },
});

module.exports = Pessoa = mongoose.model("pessoa", PessoaSchema);