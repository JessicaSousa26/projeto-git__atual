// js/api.js — API demo (ReqRes)
export const API_BASE = 'https://reqres.in/api';

export async function apiListarUsuarios() {
  const [p1, p2] = await Promise.all([
    fetch(`${API_BASE}/users?per_page=6&page=1`).then(r => r.json()),
    fetch(`${API_BASE}/users?per_page=6&page=2`).then(r => r.json()),
  ]);
  return [...p1.data, ...p2.data].map(u => ({
    id: u.id,
    nome: `${u.first_name} ${u.last_name}`,
    email: u.email,
    idade: 25 + (u.id % 15),
    cargo: ['Analista','Dev','Designer','QA','PM'][u.id % 5],
    avatar: u.avatar,
  }));
}

export async function apiCriarUsuario(payload) {
  const resp = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return resp.json(); // {id, createdAt}
}

export async function apiRemoverUsuario(id) {
  await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
  return true;
}
