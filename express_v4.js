const express = require('express') // requires express and puts it into a variable
const http = require('http')
const path = require('path')
const app = express() //calls express() and puts new Express application inside app variable
const bodyParser = require('body-parser');
const leveldb = require('./levelSandbox'); 
const SHA256 = require('crypto-js/sha256');
const bc = require('./app3'); 
const Block = require('./block'); 
//const port = process.env.PORT || 8000;


let blockchain = new bc();

app.get('/block/:id', (req,res)=>{
    blockchain.getBlock(req.params.id)
        .then((bloc) => {
        res.send((bloc));
      })
      .catch(function(bloc) {
        return res.status(422).json( { errors: { id: "The Block was not in the Chain." }})
      })
    })

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post('/block',async (req,res)=>{
    if(req.body) {
        let body = "Testing block with test string data"
        let block = new Block(body);
        const block_add = await blockchain.addBlock(block)
        res.send('Block has been added to the chain!' + JSON.stringify(block)); //.JSON
    } else {
        res.status(404).send("No Payload")
    }
    });

app.listen(8000);
 //app.listen(port)
     console.log('Server started! At http://localhost:8000'); //http://localhost:8000 http://localhost:8000/block
 

