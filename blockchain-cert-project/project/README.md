# Blockchain-Based Student Certificate Verification System

## Project Idea
This project demonstrates a simple web application that uses blockchain technology to verify the authenticity of student certificates. Users can upload certificate text or files, generate a SHA-256 hash, store it in a blockchain, and later verify certificates by checking against the chain. It's designed as a beginner-friendly demo for college ideathons, showcasing core blockchain concepts like hashing, blocks, and immutability without needing a server.

## Problem Statement
In today's digital world, fake certificates are a growing issue, leading to fraud in education and employment. Traditional verification methods are slow, centralized, and prone to tampering. Blockchain offers a decentralized, tamper-proof way to store and verify certificate hashes, ensuring authenticity and integrity.

## How It Works
1. **Upload Certificate**: Paste text or upload a file (e.g., .txt, .pdf) containing the certificate details.
2. **Generate Hash**: Click "Generate SHA-256 Hash" to create a unique digital fingerprint of the certificate using SHA-256 hashing.
3. **Add to Blockchain**: Store the hash as data in a new block, linked to the previous block via hashes.
4. **Verify Certificate**: Enter a hash to check if it exists in the blockchain and if the chain is untampered.
5. **Blockchain Viewer**: See all blocks with details like index, timestamp, data, previous hash, and current hash.
6. **Tamper Test**: Simulate tampering by altering a block's data and observe how verification fails.

The blockchain is implemented in JavaScript with classes for Block and Blockchain. Each block includes an index, timestamp, data (hash), previous hash, and its own hash. The chain starts with a genesis block and grows as new certificates are added.

## How to Run
1. Download or clone the project files.
2. Open `index.html` in any modern web browser (Chrome, Firefox, etc.).
3. No server or installation required – it's a client-side app using browser APIs and crypto-js for hashing.
4. Interact with the UI: Upload/generate hash, add to blockchain, verify, and view blocks.

## How to Present in Ideathon
- **Demo Flow**: Start with uploading a sample certificate, generate hash, add to blockchain, verify it as valid. Then, use the tamper button to show how verification fails, highlighting blockchain's immutability.
- **Key Points to Cover**: Explain hashing (unique fingerprint), blockchain structure (linked blocks), decentralization (no central authority), and real-world applications (education, supply chain).
- **Tips**: Keep it simple, use visuals from the app, and relate to audience (e.g., "Imagine verifying your degree instantly!"). Prepare for questions on scalability or real blockchain differences (e.g., this is simplified, no mining or consensus).
- **Time**: Aim for 5-7 minutes demo + Q&A.

## Technologies Used
- HTML5, CSS3, Vanilla JavaScript
- crypto-js library (via CDN) for SHA-256 hashing
- No backend – runs entirely in the browser

## Future Enhancements
- Integrate with real blockchain networks (e.g., Ethereum) for persistence.
- Add user authentication or multi-user support.
- Support more file types or advanced hashing.

Enjoy exploring blockchain basics!
