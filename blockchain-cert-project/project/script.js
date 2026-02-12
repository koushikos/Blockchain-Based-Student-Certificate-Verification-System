// script.js - Handles user interactions and integrates with the blockchain

// Global variables
let currentHash = ''; // Store the generated hash

// Function to handle file upload and read content
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('certificate-text').value = e.target.result; // Load file content into textarea
        };
        reader.readAsText(file);
    }
}

// Function to generate SHA-256 hash from certificate text
function generateHash() {
    const text = document.getElementById('certificate-text').value;
    if (text.trim() === '') {
        alert('Please enter or upload certificate text first.');
        return;
    }
    currentHash = CryptoJS.SHA256(text).toString(); // Generate hash using crypto-js
    document.getElementById('hash-display').textContent = 'Generated Hash: ' + currentHash;
}

// Function to add the current hash as a new block to the blockchain
function addToBlockchain() {
    if (currentHash === '') {
        alert('Please generate a hash first.');
        return;
    }
    // Check if the hash already exists in the blockchain to avoid duplicates
    const hashExists = myBlockchain.chain.some(block => block.data === currentHash);
    if (hashExists) {
        showMessage('This certificate hash already exists in the blockchain!', 'invalid');
        return;
    }
    const newBlock = new Block(myBlockchain.chain.length, new Date().toISOString(), currentHash);
    myBlockchain.addBlock(newBlock); // Add block to blockchain
    displayBlocks(); // Update the display
    currentHash = ''; // Reset hash
    document.getElementById('hash-display').textContent = ''; // Clear display
    showMessage('Block added to blockchain!', 'valid');
}

// Function to verify a certificate by recalculating its hash and checking against the blockchain
function verifyCertificate() {
    const textToVerify = document.getElementById('verify-text').value.trim();
    if (textToVerify === '') {
        alert('Please enter certificate text to verify.');
        return;
    }
    // Generate hash from the entered text
    const hashToVerify = CryptoJS.SHA256(textToVerify).toString();
    // Check if the hash exists in any block's data and chain is valid
    const isValid = myBlockchain.chain.some(block => block.data === hashToVerify);
    if (isValid && myBlockchain.isChainValid()) {
        showMessage('Certificate is VALID!', 'valid');
    } else {
        showMessage('Certificate is FAKE or chain is tampered!', 'invalid');
    }
}

// Function to display all blocks in the blockchain viewer
function displayBlocks() {
    const container = document.getElementById('blocks-container');
    container.innerHTML = ''; // Clear previous display
    myBlockchain.chain.forEach(block => {
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block';
        blockDiv.innerHTML = `
            <h3>Block ${block.index}</h3>
            <p><strong>Timestamp:</strong> ${block.timestamp}</p>
            <p><strong>Data (Hash):</strong> ${block.data}</p>
            <p><strong>Previous Hash:</strong> ${block.previousHash}</p>
            <p><strong>Hash:</strong> ${block.hash}</p>
        `;
        container.appendChild(blockDiv);
    });
}

// Function to simulate tampering with block 1
function tamperBlock() {
    if (myBlockchain.chain.length > 1) {
        myBlockchain.chain[1].data = 'tampered'; // Change data of block 1
        myBlockchain.chain[1].hash = myBlockchain.chain[1].calculateHash(); // Recalculate hash
        // Also need to update the next block's previousHash if it exists
        if (myBlockchain.chain.length > 2) {
            myBlockchain.chain[2].previousHash = myBlockchain.chain[1].hash;
            myBlockchain.chain[2].hash = myBlockchain.chain[2].calculateHash();
        }
        displayBlocks(); // Update display
        showMessage('Block 1 tampered! Verify again to see the effect.', 'invalid');
    } else {
        alert('No blocks to tamper with yet.');
    }
}

// Function to show result messages
function showMessage(message, type) {
    const resultDiv = document.getElementById('result-message');
    resultDiv.textContent = message;
    resultDiv.className = type; // 'valid' or 'invalid' for styling
    // Clear the message after 5 seconds
    setTimeout(() => {
        resultDiv.textContent = '';
        resultDiv.className = '';
    }, 5000);
}

// Event listeners
document.getElementById('certificate-file').addEventListener('change', handleFileUpload);
document.getElementById('generate-hash-btn').addEventListener('click', generateHash);
document.getElementById('add-block-btn').addEventListener('click', addToBlockchain);
document.getElementById('verify-btn').addEventListener('click', verifyCertificate);
document.getElementById('tamper-btn').addEventListener('click', tamperBlock);

// Initial display of genesis block
displayBlocks();
