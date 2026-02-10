// arquivo: server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Pega a porta do Render ou usa 3000 local
const PORT = process.env.PORT || 3000;

// Resolve o caminho absoluto da pasta public para evitar erro no Linux
const publicPath = path.resolve(__dirname, 'public');

console.log(`📂 Servindo arquivos estáticos de: ${publicPath}`);

// Middleware para servir arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(publicPath));

// --- ROTA DE MONITORAMENTO (UPTIMEROBOT) ---
app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        service: "portal-acqua-sistemas",
        timestamp: new Date().toISOString()
    });
});

// --- ROTA DA API (JSON) ---
app.get('/api/apps', (req, res) => {
    const configPath = path.join(__dirname, 'config', 'apps.json');
    
    fs.readFile(configPath, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Erro ao ler apps.json:", err);
            // Retorna array vazio para não quebrar o front
            return res.json([]); 
        }
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            console.error("❌ Erro no parse do JSON:", e);
            res.json([]);
        }
    });
});

// --- ROTAS DO FRONTEND ---

// Rota específica para a página de setor (garante que ela seja servida)
app.get('/setor.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'setor.html'));
});

// Rota Coringa (Catch-all): 
// Qualquer outra coisa que não seja API ou arquivo estático, manda para a Home
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});