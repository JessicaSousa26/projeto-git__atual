# Painel de Usuários — Página Única (estrutura modular)

Atende ao pedido: **formulário e cards na mesma página**, mantendo **páginas/JS/CSS** separados.
- Página principal: `pages/app.html`
- Lógica: `js/app.js`, utilitários em `js/common.js`, estado em `js/state.js`, API em `js/api.js`.

## Estrutura
```
painel-usuarios-una-pagina-modular/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── api.js
│   ├── state.js
│   ├── common.js
│   └── app.js
├── pages/
│   └── app.html
└── assets/
```
## Uso
Abra `index.html` (ou `pages/app.html`), clique **Carregar da API** e comece a cadastrar. Dados persistem em `localStorage` para testes.
