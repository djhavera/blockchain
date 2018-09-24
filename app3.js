const leveldb = require('./levelSandbox'); 
const SHA256 = require('crypto-js/sha256');
const Block = require('./block'); 
/*
class Block{
  constructor(data){
     this.hash = "";
     this.height = 0;
     this.body = data;
     this.time = 0;
     this.previousBlockHash = "";
    }
}
*/

class Blockchain{ 
    
    constructor(){ 
    this.getBlockHeight().then((height) => { 
    
        if (height === -1){ 
    this.addBlock(new Block("Genesis Block")).then(() => console.log("Genesis Block added")); }});
    }
    
    async addBlock(newBlock) { 
        const height = parseInt(await this.getBlockHeight()) ;
        newBlock.height = height + 1; 
        newBlock.time = new Date().getTime().toString().slice(0,-3); 
        
        if (newBlock.height > 0) { 
        const prevBlock = await this.getBlock(height); 
        newBlock.previousBlockHash = prevBlock.hash; 
        console.log('Previous hash: ' + newBlock.previousBlockHash);
        } 
        
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString(); 
        console.log('New Block hash value: ' + newBlock.hash);
        
        await leveldb.addBlock(newBlock.height, JSON.stringify(newBlock)); 
        } // End of addBlock
    
    async getBlockHeight() { 
        const height = await leveldb.getBlockHeight();
        console.log('Chain Height: ' + height); 
        return height; 
    } // end get BlockHeight

    async getBlock(blockHeight) { 
        const block = await leveldb.getBlock(blockHeight);
        console.log(block);
        return block; 
    } // end getBlock
    
    async validateBlock(blockHeight) { 
            // get block object
            let block = await this.getBlock(blockHeight); 
            //let block = await leveldb.getBlock(blockHeight); 
            //let block = .getBlock(blockHeight); 
            //console.log('Validate Block: ' + block);
            // get block hash 
            let blockHash = block.hash;
            // remove block hash to test block integrity 
            block.hash = ''; 
            //console.log("BLOCKHASH____________________" + blockHash);
            let validBlockHash = SHA256(JSON.stringify(block)).toString(); 
            //console.log("VALIDBLOCKHASH____________________" + validBlockHash);
            //console.log('Validate Block: ' + JSON.stringify(block).toString());
            if (blockHash === validBlockHash) { 
                console.log('Block #' + blockHeight + ' validated by validateBlock()'); 
                return true; } 
            else { console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash); 
                return false; } 
      } // the end of validateBlock function       

    async validateChain() { 
        let errorLog = [] ;
        let previousHash = '' ;
        let isValidBlock = false;  // default false so that it assumes a mismatch
        
        const height = await this.getBlockHeight();
        // loop over blocks
        for (let i = 0; i <= height; i++) {
            this.getBlock(i).then((block) => {
            // validation of current block
            isValidBlock = this.validateBlock(block.height);
            console.log('isValidBlock ' + isValidBlock)
            if (!isValidBlock) {
                console.log('!isValidBlock')
                errorLog.push(i);
            } 
            // validate previous persisted block hash matches currenBlock.previousHash 
            if (block.previousBlockHash !== previousHash) {
                errorLog.push(i);
            }
            previousHash = block.hash
            // logging errors to console
            //if (i === (height -1)) {
            if (errorLog.length > 0) {
                console.log('Block errors =' + errorLog.length);
                console.log('Blocks:' + errorLog);
                console.log('Errors detected');
        
            } else {
                console.log('No errors detected');
            }
            
            });
            } //end of for loop
            console.log('Error Log Length ' + errorLog.length);
        } // end of validateChain method       
           
    } // End Blockchain Class  

module.exports = Blockchain;

//let blockchain = new Blockchain();
//blockchain.addBlock(new Block("David data "+300));
//blockchain.getBlockHeight();
//blockchain.getBlock(0);
//blockchain.validateBlock(2);
//blockchain.addBlock(Block("David data "+100));
//blockchain.addBlock(new Block("David data "+200));
//blockchain.addBlock(new Block("David data "+300));

//blockchain.validateChain(); 


  

  

  

  
  
