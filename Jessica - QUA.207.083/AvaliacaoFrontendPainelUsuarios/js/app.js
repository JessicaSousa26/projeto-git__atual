console.log('JS app.js carregado');

import { apiListarUsuarios, apiCriarUsuario, apiRemoverUsuario } from './api.js';
import { State } from './state.js';
import { criarToast, notificar, avatarURL } from './common.js';

const toast = criarToast();

// Elementos
const form = document.getElementById('formUsuario');
const busca = document.getElementById('busca');
const btnLimpar = document.getElementById('btnLimpar');
const btnCarregar = document.getElementById('btnCarregar');
const btnLimparLista = document.getElementById('btnLimparLista');

// Eventos
form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const nomeEl = document.getElementById('nome');
  const emailEl = document.getElementById('email');
  const idadeEl = document.getElementById('idade');
  const cargoEl = document.getElementById('cargo');

  const nome = nomeEl.value.trim();
  const email = emailEl.value.trim();
  const idade = Number(idadeEl.value);
  const cargo = cargoEl.value.trim();

  const errors = [];

  if (!nome || /\d/.test(nome)) errors.push('Nome inválido.');
  if (!email || !emailEl.checkValidity()) errors.push('E-mail inválido.');
  if (!idade || idade < 14 || idade > 120) errors.push('Idade fora do intervalo.');
  if (!cargo) errors.push('Cargo é obrigatório.');

  if (errors.length > 0) {
    alert('Corrija os erros:\n- ' + errors.join('\n- '));
    form.classList.add('was-validated');
    return;
  }

  let id = Date.now(); // fallback
  try {
    const resp = await apiCriarUsuario({ name: nome, job: cargo, email, idade });
    if (resp?.id) id = Number(resp.id);
  } catch {}

  const novo = { id, name: nome, email, idade, cargo };
  State.add(novo);
  notificar(toast, 'Usuário cadastrado com sucesso.');
  form.reset();
  form.classList.remove('was-validated');
});

btnLimpar.addEventListener('click', () => {
  form.reset();
  form.classList.remove('was-validated');
});


btnCarregar.addEventListener('click', async () => {
  try {
    const lista = await apiListarUsuarios(2);
    State.setAll(lista);
    notificar(toast, 'Lista carregada da API.');
  } catch (e) {
    console.error(e);
    notificar(toast, 'Erro ao carregar da API.');
  }
});

btnLimparLista.addEventListener('click', () => {
  if (confirm('Deseja limpar toda a lista?')) {
    State.clearAll();
    notificar(toast, 'Lista limpa.');
  }
});

busca.addEventListener('input', () => {
  const termo = busca.value;
  const filtrados = State.filterByName(termo);
  State.render(filtrados);
});

// Inicialização
State.load();

// Stepper de idade
(function setupAgeStepper() {
  const idadeInput = document.getElementById('idade');
  const btnInc = document.getElementById('idade-increment');
  const btnDec = document.getElementById('idade-decrement');
  if (!idadeInput || !btnInc || !btnDec) return;

  function clamp(v) {
    const min = Number(idadeInput.min) || 14;
    const max = Number(idadeInput.max) || 120;
    return Math.min(max, Math.max(min, v));
  }

  btnInc.addEventListener('click', () => {
    idadeInput.value = clamp(Number(idadeInput.value) + 1);
  });

  btnDec.addEventListener('click', () => {
    idadeInput.value = clamp(Number(idadeInput.value) - 1);
  });

  idadeInput.addEventListener('blur', () => {
    idadeInput.value = clamp(Number(idadeInput.value));
  });
})();
