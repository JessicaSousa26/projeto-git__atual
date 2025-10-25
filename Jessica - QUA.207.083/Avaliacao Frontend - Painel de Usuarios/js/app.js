// js/app.js — página única com formulário + lista
import { apiListarUsuarios, apiCriarUsuario, apiRemoverUsuario } from './api.js';
import { carregarEstado, salvarEstado, proximoId } from './state.js';
import { criarToast, notificar, avatarURL } from './common.js';

const toast = criarToast();

// Elementos
const elLista = document.getElementById('lista-usuarios');
const busca = document.getElementById('busca');
const btnLimparLista = document.getElementById('btnLimparLista');
const form = document.getElementById('formUsuario');
const btnLimpar = document.getElementById('btnLimpar');

// Render de cards
function criarCard(usuario, onRemove) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card card-user h-100';
  card.dataset.id = usuario.id;

  const img = document.createElement('img');
  img.className = 'card-img-top';
  img.alt = `Avatar de ${usuario.nome}`;
  img.src = avatarURL(usuario.nome, usuario.avatar);

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
  btnRemover.addEventListener('click', (e) => {
    e.stopPropagation();
    onRemove(usuario.id);
  });

  footer.append(btnRemover);
  card.addEventListener('dblclick', () => onRemove(usuario.id));

  card.append(img, body, footer);
  col.append(card);
  return col;
}

function renderizarLista(filtro = '') {
  const estado = carregarEstado();
  elLista.innerHTML = '';
  const termo = (filtro || '').trim().toLowerCase();
  const filtrados = estado.usuarios.filter(u => u.nome.toLowerCase().includes(termo));
  if (filtrados.length === 0) {
    elLista.innerHTML = '<div class="col-12 text-center text-light-50"><div class="p-5 text-secondary">Nenhum usuário encontrado.</div></div>';
    return;
  }
  const frag = document.createDocumentFragment();
  filtrados.forEach(u => frag.appendChild(criarCard(u, removerUsuario)));
  elLista.appendChild(frag);
}

// Ações da lista
async function carregarDaAPI() {
  const estado = carregarEstado();
  const lista = await apiListarUsuarios();
  estado.usuarios = lista;
  salvarEstado(estado);
  renderizarLista(busca.value);
  notificar(toast, 'Usuários carregados da API.');
}

async function removerUsuario(id) {
  const estado = carregarEstado();
  try { await apiRemoverUsuario(id); } catch {}
  estado.usuarios = estado.usuarios.filter(u => u.id !== id);
  salvarEstado(estado);
  renderizarLista(busca.value);
  notificar(toast, `Usuário #${id} removido.`);
}

function exportarJSON() {
  const estado = carregarEstado();
  const data = JSON.stringify(estado.usuarios, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'usuarios.json';
  a.click();
  URL.revokeObjectURL(url);
}

function limparLista() {
  const estado = carregarEstado();
  estado.usuarios = [];
  salvarEstado(estado);
  renderizarLista(busca.value);
  notificar(toast, 'Lista limpa.');
}

// Formulário
form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  // elementos
  const nomeEl = document.getElementById('nome');
  const emailEl = document.getElementById('email');
  const idadeEl = document.getElementById('idade');
  const cargoEl = document.getElementById('cargo');

  const nome = (nomeEl.value || '').trim();
  const email = (emailEl.value || '').trim();
  const idadeVal = idadeEl.value;
  const idade = Number(idadeVal);
  const cargo = (cargoEl.value || '').trim();

  // validações customizadas
  const errors = [];

  if (!nome) {
    errors.push('Nome é obrigatório.');
  } else if (/\d/.test(nome)) {
    errors.push('Nome não pode conter números.');
  }

  if (!email) {
    errors.push('E-mail é obrigatório.');
  } else if (!emailEl.checkValidity()) {
    errors.push('Informe um e-mail válido.');
  }

  // idade
  const minIdade = Number(idadeEl.min) || 0;
  const maxIdade = Number(idadeEl.max) || Infinity;
  if (idadeVal === '' || isNaN(idade)) {
    errors.push('Idade é obrigatória.');
  } else if (idade < minIdade || idade > maxIdade) {
    errors.push(`Idade deve estar entre ${minIdade} e ${maxIdade} anos.`);
  }

  if (!cargo) {
    errors.push('Cargo é obrigatório.');
  }

  if (errors.length > 0) {
    // exibir alert com lista de erros e ativar estilos de validação do Bootstrap
    alert('Por favor corrija os seguintes erros:\n- ' + errors.join('\n- '));
    form.classList.add('was-validated');
    return;
  }

  //Outras validações 
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formUsuario');
    form.addEventListener('submit', function (event) {
      // Validação customizada do nome (sem números)
      const nome = document.getElementById('nome');
      const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+$/.test(nome.value.trim());
      if (!nomeValido) {
        nome.classList.add('is-invalid');
        event.preventDefault();
        event.stopPropagation();
      } else {
        nome.classList.remove('is-invalid');
      }
  
      // Validação padrão Bootstrap
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });


  // se passou nas validações, continuar com criação
  const estado = carregarEstado();
  let id = proximoId(estado);
  try {
    const resp = await apiCriarUsuario({ name: nome, job: cargo, email, idade });
    if (resp && resp.id) id = Number(resp.id) || id;
  } catch {}

  const novo = { id, nome, email, idade, cargo, avatar: '' };
  estado.usuarios.unshift(novo);
  salvarEstado(estado);
  renderizarLista(busca.value);
  notificar(toast, 'Usuário cadastrado com sucesso.');
  form.reset();
  form.classList.remove('was-validated');
});

btnLimpar.addEventListener('click', () => {
  form.reset();
  form.classList.remove('was-validated');
});

// Eventos da lista
busca.addEventListener('input', () => renderizarLista(busca.value));
btnCarregar.addEventListener('click', carregarDaAPI);
btnExportar.addEventListener('click', exportarJSON);
btnLimparLista.addEventListener('click', limparLista);

// Auto-load inicial
carregarDaAPI();

// --- Stepper de idade: botões - / + para ajustar o valor respeitando min/max ---
(function setupAgeStepper(){
  const idadeInput = document.getElementById('idade');
  const btnInc = document.getElementById('idade-increment');
  const btnDec = document.getElementById('idade-decrement');
  if (!idadeInput || !btnInc || !btnDec) return;

  function clamp(v){
    const min = Number(idadeInput.min) || 0;
    const max = Number(idadeInput.max) || Infinity;
    if (Number.isNaN(v)) return min;
    return Math.min(max, Math.max(min, v));
  }

  // garante valor inicial
  if (idadeInput.value === '' || isNaN(Number(idadeInput.value))) {
    idadeInput.value = clamp(Number(idadeInput.min) || 0);
  }

  btnInc.addEventListener('click', () => {
    const step = Number(idadeInput.step) || 1;
    const next = clamp(Number(idadeInput.value || 0) + step);
    idadeInput.value = next;
    idadeInput.dispatchEvent(new Event('input', { bubbles: true }));
  });

  btnDec.addEventListener('click', () => {
    const step = Number(idadeInput.step) || 1;
    const next = clamp(Number(idadeInput.value || 0) - step);
    idadeInput.value = next;
    idadeInput.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // evitar que usuário digite valor fora do intervalo ao perder foco
  idadeInput.addEventListener('blur', () => {
    idadeInput.value = clamp(Number(idadeInput.value || 0));
  });
})();
