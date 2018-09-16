const express = require('express') // requires express and puts it into a variable
const http = require('http')
const app = express() //calls express() and puts new Express application inside app variable
const leveldb = require('./levelSandbox'); 
const SHA256 = require('crypto-js/sha256');
const bc = require('./app3'); 
const Block = require('./block'); 

let blockchain = new bc();

// 


app.get("/block/:height", function(req, res) {
        let height = req.params.height; //parseInt(req.params.height)
        blockchain.getBlock(height).then((block) => {
            return res.status(200).json({Block_Details: block}); 
        }).catch((error) => { return res.status(500).json("Something went wrong!")});
        //if(True) { //  verify here if the block exist if not return 404
        //} else {
        //     return res.status(404).send("Block Not Found!");
        //};
        //}).catch((error) => { return res.status(500).send("Something went wrong!"); })
    //} else {
    //    return res.status(404).send("Block Not Found!");
   // }
});

 app.listen(8000, function() {
    console.log("App started on port 8000"); //http://localhost:8000 http://localhost:8000/block/
    }); 