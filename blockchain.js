const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "29/05/2021", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let testCoin = new Blockchain();
testCoin.addBlock(new Block(1, "30/05/2021", { amount: 1 }));
testCoin.addBlock(new Block(2, "31/05/2021", { amount: 3 }));
testCoin.addBlock(new Block(3, "1/06/2021", { amount: 5 }));
testCoin.addBlock(new Block(4, "2/06/2021", { amount: 7 }));
testCoin.addBlock(new Block(5, "5/06/2021", { amount: 9 }));
testCoin.addBlock(new Block(6, "2/03/2022", { amount: 4 }));
testCoin.addBlock(new Block(7, "3/03/2022", { amount: 6 }));

console.log(JSON.stringify(testCoin, null, 4));
