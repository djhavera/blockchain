class Block{
    constructor(data){
       this.hash = "";
       this.height = 0;
       this.body = data;
       this.message = 0;
       this.validationWindow = 0;
       this.time = 0;
       this.previousBlockHash = "";
      }
  }

  module.exports = Block;