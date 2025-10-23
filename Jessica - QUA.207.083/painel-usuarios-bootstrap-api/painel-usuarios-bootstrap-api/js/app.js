// Estado global
const estado = {
  usuarios: [], // {id, nome, email, idade, cargo, avatar}
  seqId: 1000,
};

// Helpers UI
const elLista = document.getElementById('lista-usuarios');
const toastEl = document.getElementById('liveToast');
const toastMsg = document.getElementById('toastMsg');
const toast = new bootstrap.Toast(toastEl);
function notificar(msg) { toastMsg.textContent = msg; toast.show(); }

// API Demo (ReqRes)
const API_BASE = 'https://reqres.in/api';

async function apiListarUsuarios() {
  const [p1, p2] = await Promise.all([
    fetch(`${API_BASE}/users?per_page=6&page=1`).then(r => r.json()),
    fetch(`${API_BASE}/users?per_page=6&page=2`).then(r => r.json()),
  ]);
  const todos = [...p1.data, ...p2.data].map(u => ({
    id: u.id,
    nome: `${u.first_name} ${u.last_name}`,
    email: u.email,
    idade: 25 + (u.id % 15),
    cargo: ['Analista','Dev','Designer','QA','PM'][u.id % 5],
    avatar: u.avatar,
  }));
  return todos;
}

async function apiCriarUsuario(payload) {
  const resp = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await resp.json();
  return data; // {id, createdAt}
}

async function apiRemoverUsuario(id) {
  await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
  return true;
}

// Renderização dos cards
function criarCard(usuario) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card card-user h-100';
  card.dataset.id = usuario.id;

  const img = document.createElement('img');
  img.className = 'card-img-top';
  img.alt = `Avatar de ${usuario.nome}`;
  img.src = usuario.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(usuario.nome)}`;

  const body = document.createElement('div');
  body.className = 'card-body';

  const h3 = document.createElement('h3');
  h3.className = 'h6 card-title mb-1';
  h3.textContent = usuario.nome;

  const pEmail = document.createElement('p');
  pEmail.className = 'mb-2 text-secondary small';
  pEmail.textContent = usuario.email;

  const row = document.createElement('div');
  row.className = 'd-flex align-items-center justify-content-between';

  const idade = document.createElement('span');
  idade.className = 'badge text-bg-secondary';
  idade.textContent = `${usuario.idade} anos`;

  const cargo = document.createElement('span');
  cargo.className = 'badge badge-role';
  cargo.textContent = usuario.cargo;

  row.append(idade, cargo);
  body.append(h3, pEmail, row);

  const footer = document.createElement('div');
  footer.className = 'card-footer bg-transparent d-flex gap-2';

  const btnRemover = document.createElement('button');
  btnRemover.className = 'btn btn-sm btn-outline-danger';
  btnRemover.textContent = 'Remover';
  btnRemover.addEventListener('click', async (e) => {
    e.stopPropagation();
    await removerUsuario(usuario.id);
  });

  footer.append(btnRemover);

  // Remoção por duplo clique no card
  card.addEventListener('dblclick', async () => {
    await removerUsuario(usuario.id);
  });

  card.append(img, body, footer);
  col.append(card);
  return col;
}

function renderizarLista(filtro = '') {
  elLista.innerHTML = '';
  const termo = filtro.trim().toLowerCase();
  const filtrados = estado.usuarios.filter(u => u.nome.toLowerCase().includes(termo));
  if (filtrados.length === 0) {
    elLista.innerHTML = '<div class="col-12 text-center text-light-50"><div class="p-5 text-secondary">Nenhum usuário encontrado.</div></div>';
    return;
  }
  const frag = document.createDocumentFragment();
  filtrados.forEach(u => frag.appendChild(criarCard(u)));
  elLista.appendChild(frag);
}

// Ações
async function carregarDaAPI() {
  const lista = await apiListarUsuarios();
  estado.usuarios = lista;
  notificar('Usuários carregados da API.');
  renderizarLista(document.getElementById('busca').value);
}

async function removerUsuario(id) {
  try { await apiRemoverUsuario(id); } catch {}
  estado.usuarios = estado.usuarios.filter(u => u.id !== id);
  renderizarLista(document.getElementById('busca').value);
  notificar(`Usuário #${id} removido.`);
}

async function cadastrarUsuario(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const idade = Number(document.getElementById('idade').value);
  const cargo = document.getElementById('cargo').value.trim();

  let novoId = ++estado.seqId;
  try {
    const resp = await apiCriarUsuario({ name: nome, job: cargo, email, idade });
    if (resp && resp.id) novoId = Number(resp.id) || novoId;
  } catch {}

  const novo = { id: novoId, nome, email, idade, cargo, avatar: '' };
  estado.usuarios.unshift(novo);
  renderizarLista(document.getElementById('busca').value);
  notificar('Usuário cadastrado com sucesso.');
  form.reset();
  form.classList.remove('was-validated');
}

function exportarJSON() {
  const data = JSON.stringify(estado.usuarios, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'usuarios.json';
  a.click();
  URL.revokeObjectURL(url);
}

function limparLista() {
  estado.usuarios = [];
  renderizarLista(document.getElementById('busca').value);
  notificar('Lista limpa.');
}

// Eventos
document.getElementById('btnCarregar').addEventListener('click', carregarDaAPI);
document.getElementById('btnExportar').addEventListener('click', exportarJSON);
document.getElementById('btnLimparLista').addEventListener('click', limparLista);
document.getElementById('btnLimpar').addEventListener('click', () => {
  const form = document.getElementById('formUsuario');
  form.reset();
  form.classList.remove('was-validated');
});
document.getElementById('busca').addEventListener('input', (e) => renderizarLista(e.target.value));
document.getElementById('formUsuario').addEventListener('submit', cadastrarUsuario);

// Autoload inicial
carregarDaAPI();
