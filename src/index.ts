// src/index.ts
import { SupraClient } from "supra-l1-sdk";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

let supraClient: SupraClient;

const initializeSupraClient = async () => {
  supraClient = await SupraClient.init("https://rpc-testnet.supra.com/");
};

// Test route to verify server is working
app.get('/', (req, res) => {
  res.send('Server is running and reachable.');
});

app.post('/add-task', async (req, res) => {
  const { account, task } = req.body;
  if (!supraClient) {
    await initializeSupraClient();
  }
  // Log the received task for debugging purposes
  console.log(`Received task from account ${account}: ${task.text}`);
  // Respond with a success message
  res.send("Task added successfully");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

initializeSupraClient();
