const KEY = 'painel_usuarios_v1';

let estado = {
  usuarios: [],
  seqId: 1000
};

function criarCardUsuario(user) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4';

  col.innerHTML = `
    <div class="card shadow-sm border-0 h-100" data-id="${user.id}">
      <img src="${user.avatar || 'https://api.dicebear.com/9.x/initials/svg?seed=' + encodeURIComponent(user.name)}"
           alt="Avatar de ${user.name}" class="card-img-top" style="height: 200px; object-fit: cover;" />
      <div class="card-body bg-light rounded">
        <h5 class="card-title text-primary fw-bold">
          <i class="bi bi-person-circle me-2"></i>${user.name}
        </h5>
        <p class="card-text mb-1">
          <i class="bi bi-envelope-fill me-2 text-secondary"></i> ${user.email}
        </p>
        <p class="card-text mb-1">
          <i class="bi bi-calendar-heart me-2 text-secondary"></i> ${user.idade} anos
        </p>
        <p class="card-text mb-3">
          <i class="bi bi-briefcase-fill me-2 text-secondary"></i> ${user.cargo}
        </p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-sm btn-outline-success btn-editar">
            <i class="bi bi-pencil-square me-1"></i> Editar
          </button>
          <button class="btn btn-sm btn-outline-danger btn-remover">
            <i class="bi bi-trash me-1"></i> Remover
          </button>
        </div>
      </div>
    </div>
  `;

  // Eventos
  const card = col.querySelector('.card');
  const btnEditar = col.querySelector('.btn-editar');
  const btnRemover = col.querySelector('.btn-remover');

  card.addEventListener('dblclick', () => {
    State.remove(user.id);
  });

  btnRemover.addEventListener('click', () => {
    State.remove(user.id);
  });

  btnEditar.addEventListener('click', () => {
    const nomeEl = document.getElementById('nome');
    const emailEl = document.getElementById('email');
    const idadeEl = document.getElementById('idade');
    const cargoEl = document.getElementById('cargo');

    nomeEl.value = user.name;
    emailEl.value = user.email;
    idadeEl.value = user.idade;
    cargoEl.value = user.cargo;

    nomeEl.focus();
  });

  return col;
}

function salvarEstado() {
  localStorage.setItem(KEY, JSON.stringify(estado));
}

function carregarEstado() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    estado.usuarios = parsed.usuarios || [];
    estado.seqId = parsed.seqId || 1000;
  } catch {
    estado = { usuarios: [], seqId: 1000 };
  }
}

function proximoId() {
  estado.seqId += 1;
  salvarEstado();
  return estado.seqId;
}

function add(user) {
  user.id = proximoId();
  estado.usuarios.push(user);
  salvarEstado();
  render(estado.usuarios);
}

function setAll(lista) {
  estado.usuarios = lista;
  salvarEstado();
  render(lista);
}

function clearAll() {
  estado.usuarios = [];
  salvarEstado();
  render([]);
}

function filterByName(term) {
  const lower = term.trim().toLowerCase();
  return estado.usuarios.filter(u => u.name.toLowerCase().includes(lower));
}

function render(listaUsuarios) {
  const container = document.getElementById('lista-usuarios');
  container.innerHTML = '';
  listaUsuarios.forEach(user => {
    const card = criarCardUsuario(user);
    container.appendChild(card);
  });
}

function load() {
  carregarEstado();
  render(estado.usuarios);
}

function remove(id) {
  estado.usuarios = estado.usuarios.filter(u => u.id !== id);
  salvarEstado();
  render(estado.usuarios);
}

export const State = {
  load,
  add,
  setAll,
  clearAll,
  filterByName,
  remove
};
