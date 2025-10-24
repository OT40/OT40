// index.js: Haupt-Einstiegspunkt des Backend-Servers

const express = require('express');
const profileRouter = require('./routes/profile');

const app = express();
app.use(express.json());

// API-Routen
app.use('/api/profile', profileRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});
