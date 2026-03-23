import { contractAddress, abi } from './config.js';

const connectBtn = document.getElementById('connectBtn');
const mintBtn = document.getElementById('mintBtn');
const status = document.getElementById('status');

// Fonction pour connecter MetaMask [cite: 122, 135]
connectBtn.onclick = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        status.innerText = "Connecté : " + accounts[0];
        mintBtn.disabled = false;
    }
};

// Fonction pour Minter [cite: 123, 136]
mintBtn.onclick = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        status.innerText = "Transaction en cours...";
        const tx = await contract.mint({
            value: ethers.parseEther("0.001") // Le prix défini dans ton contrat [cite: 132]
        });
        await tx.wait(); // Attend la confirmation sur la blockchain [cite: 131]
        status.innerText = "Succès ! NFT Minté. Hash : " + tx.hash;
    } catch (err) {
        status.innerText = "Erreur : " + err.message;
    }
};