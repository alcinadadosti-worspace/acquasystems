const params = new URLSearchParams(window.location.search);
const sectorKey = params.get('key');
const title = document.getElementById('sector-title');
const grid = document.getElementById('apps-grid');

if (!sectorKey) window.location.href = '/';

// Dados das aplicações embutidos (para deploy estático)
const APPS_DATA = [
    {
        "id": 1,
        "nome": "Ponto Eletrônico",
        "setor": "RH",
        "url": "https://google.com",
        "descricao": "Registro de ponto diário"
    },
    {
        "id": 2,
        "nome": "Holerites",
        "setor": "RH",
        "url": "https://google.com",
        "descricao": "Consulta de pagamentos"
    },
    {
        "id": 3,
        "nome": "Fluxo de Caixa",
        "setor": "FINANCEIRO",
        "url": "https://google.com",
        "descricao": "Controle financeiro"
    },
    {
        "id": 4,
        "nome": "Ativos e Multimarcas",
        "setor": "COMERCIAL",
        "url": "https://multimarks-active-circles.onrender.com",
        "descricao": "Clientes ativos e multimarcas do ciclo"
    },
    {
        "id": 5,
        "nome": "Ranking Supervisoras",
        "setor": "COMERCIAL",
        "url": "https://supervisiondashboard.onrender.com",
        "descricao": "Visão de clientes, metas e objetivos"
    },
    {
        "id": 6,
        "nome": "Supervisão de Estoque",
        "setor": "LOGISTICO",
        "url": "https://organizationstock.onrender.com",
        "descricao": "Itens negativos, zerados e duplicados"
    },
    {
        "id": 7,
        "nome": "Entrada de Mercadorias",
        "setor": "LOGISTICO",
        "url": "https://supervisionstock.onrender.com",
        "descricao": "Notas fiscais e itens recebidos"
    },
    {
        "id": 8,
        "nome": "Tickets TI",
        "setor": "ADMINISTRATIVO",
        "url": "https://google.com",
        "descricao": "Abertura de chamados"
    }
];

// Nomes amigáveis para exibição
const nomesSetores = {
    'MASTER': 'Acesso Master',
    'RH': 'Recursos Humanos',
    'GENTE_CULTURA': 'Gente e Cultura',
    'FINANCEIRO': 'Financeiro',
    'ADMINISTRATIVO': 'Administrativo',
    'LOGISTICO': 'Logístico',
    'COMERCIAL': 'Comercial',
    'MARKETING': 'Marketing'
};

// Ícones SVG por setor/tipo de aplicação
const iconesPorSetor = {
    'RH': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    'GENTE_CULTURA': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    'FINANCEIRO': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    'ADMINISTRATIVO': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    'LOGISTICO': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
    'COMERCIAL': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path><path d="M15 7h6v6"></path></svg>',
    'MARKETING': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>',
    'MASTER': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
};

// Ícone padrão para aplicações
const iconeDefault = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>';

title.textContent = nomesSetores[sectorKey] || sectorKey;

// Carrega aplicações usando dados embutidos (sem necessidade de API)
const apps = APPS_DATA;

// MASTER vê todas as aplicações, outros setores veem apenas as suas
const filtered = sectorKey === 'MASTER'
    ? apps
    : apps.filter(app => app.setor === sectorKey);

grid.innerHTML = '';
if (filtered.length === 0) {
    grid.innerHTML = '<div class="loading">Nenhuma aplicação neste setor.</div>';
} else {
    filtered.forEach(app => {
        const card = document.createElement('a');
        card.className = 'card';
        card.href = app.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        // Usa o ícone do setor da aplicação ou o ícone padrão
        const icone = iconesPorSetor[app.setor] || iconeDefault;

        card.innerHTML = `
            <div class="card-icon">${icone}</div>
            <div class="card-content">
                <h2>${app.nome}</h2>
                <span>${app.descricao}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}
