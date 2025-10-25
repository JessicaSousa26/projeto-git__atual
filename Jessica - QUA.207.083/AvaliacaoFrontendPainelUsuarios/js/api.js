const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export async function apiListarUsuarios() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    return data.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      idade: Math.floor(Math.random() * 40) + 20, // JSONPlaceholder não fornece idade
      cargo: u.company?.bs || 'Desenvolvedor Jr', // usa o campo "bs" como cargo fictício
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(u.name)}`
    }));
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return [];
  }
}

export async function apiCriarUsuario(dados) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: dados.name,
        email: dados.email,
        company: { bs: dados.cargo }
      })
    });

    const result = await response.json();
    return {
      id: result.id || Date.now().toString(),
      name: dados.name,
      email: dados.email,
      idade: dados.idade,
      cargo: dados.cargo,
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(dados.name)}`
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return null;
  }
}

export async function apiRemoverUsuario(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    return { success: response.ok, id };
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    return { success: false, id };
  }
}
