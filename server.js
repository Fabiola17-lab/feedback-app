const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connexion à Cosmos DB (Azure remplira ces infos tout seul plus tard)
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const client = new CosmosClient({ endpoint, key });

// Afficher votre page HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Recevoir le formulaire et l'envoyer à Cosmos DB
app.post('/api/feedback', async (req, res) => {
    const { email, message } = req.body;
    const container = client.database("feedback").container("messages");
    await container.items.create({ id: Date.now().toString(), email, message });
    res.send("<h1>Merci ! Votre message a été enregistré.</h1><a href='/'>Retour</a>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur prêt sur le port ${port}`));
