const express = require('express');
const router = express.Router();

// ---- tratar autenticação ----
const Pessoa = require("../models/pessoa");
const bcrypt = require("bcrypt");

router.post('/signup', (req, res) => {
    Pessoa.findOne(
//{$or:[{email: req.body.email},{usuario: req.body.usuario},{comentario: req.body.comentario}]})
        {email: req.body.email,usuario: req.body.usuario,comentario: req.body.comentario})
        
    .then(doc_pessoa => {
        if (doc_pessoa) {
            return res.redirect('/resultNO');
        }else{
            const novo_registro_pessoa = Pessoa ({
                usuario: req.body.usuario,
                email: req.body.email,
                senha: req.body.senha,
                comentario: req.body.comentario,
            });

            // criptografar senha
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(novo_registro_pessoa.senha, salt, function(err, hash){
                    if (err) throw err;
                    novo_registro_pessoa.senha = hash;

                    novo_registro_pessoa
                    .save()
                    .then(res.redirect('/resultOK'))
                    .catch(err => console.log(err));
                });
            });            
        }
    })
    .catch(err => console.log(err));
});

router.get("/", (req, res) => res.json({status: "Acesso permitido"}));

module.exports = router;