const express = require("express");
const app = express();

// ---- banco de dados ----
const mongoose = require('mongoose');
const db_access = require('./setup/db').mongoURL;

mongoose
.connect(db_access,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conexão ao MongoDb bem sucedida!"))
.catch(err => console.log(err));

// ---- login ----
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/contato', express.static(__dirname + '/public/contato'));
app.use('/resultOK', express.static(__dirname + '/public/feedback/resultOK'));
app.use('/resultNO', express.static(__dirname + '/public/feedback/resultNO'));

const auth = require("./routes/auth");

app.use("/auth", auth);
// ----

app.get('/', (req, res) =>{
   res.send("Pagina Inicial")
});

app.get('*', (req, res) =>{
   res.send("ERRO: 404, destino não encontrado!")
});

const port = 3000;

app.listen(port, () => console.log(`Escutando na porta ${port}`));
