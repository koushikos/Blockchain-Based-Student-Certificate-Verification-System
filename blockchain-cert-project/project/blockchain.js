// blockchain.js - Implements a simple blockchain for certificate verification

// Block class represents each block in the blockchain
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index; // Position of the block in the chain
        this.timestamp = timestamp; // Time when the block was created
        this.data = data; // The certificate hash stored in this block
        this.previousHash = previousHash; // Hash of the previous block
        this.hash = this.calculateHash(); // Current block's hash
    }

    // Calculate the hash of this block using SHA-256
    calculateHash() {
        // Combine all block data into a string and hash it
        return CryptoJS.SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

// Blockchain class manages the chain of blocks
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Start with the genesis block
    }

    // Create the first block (genesis block) with no previous hash
    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Genesis Block", "0");
    }

    // Get the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new block to the chain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // Set previous hash
        newBlock.hash = newBlock.calculateHash(); // Recalculate hash
        this.chain.push(newBlock); // Add to chain
    }

    // Check if the blockchain is valid (no tampering)
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if current block's hash is correct
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if previous hash matches
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Create a global blockchain instance
const myBlockchain = new Blockchain();
