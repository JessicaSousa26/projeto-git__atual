// js/state.js — estado + persistência via localStorage
const KEY = 'painel_usuarios_v1';

export function carregarEstado() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { usuarios: [], seqId: 1000 };
    const parsed = JSON.parse(raw);
    return { usuarios: parsed.usuarios || [], seqId: parsed.seqId || 1000 };
  } catch {
    return { usuarios: [], seqId: 1000 };
  }
}

export function salvarEstado(estado) {
  localStorage.setItem(KEY, JSON.stringify(estado));
}

export function proximoId(estado) {
  estado.seqId += 1;
  salvarEstado(estado);
  return estado.seqId;
}
