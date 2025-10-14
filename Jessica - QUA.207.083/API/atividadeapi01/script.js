const btn = document.getElementById('btn');
const usuarioDiv = document.getElementById('usuarios');

btn.addEventListener('click', async () => {
    usuarioDiv.innerHTML = 'Carregando usuarios...';
    try{
        const responde = await fetch(`https://randomuser.me/api/?results=20`);

        if (!responde.ok) {
            throw new Error(`Erro na requisição: ${responde.status}`);
        }
        const data = await responde.json();

        //data.results é um array com 5 usuarios
        const results = data.results ?? [];

        //Se não vier nada, mostrar mensagem
        if (results.length === 0) {
            usuarioDiv.innerHTML = 'Nenhum usuário encontrado';
            return;
        }
    //Montar os cards dinamicamente
        usuarioDiv.innerHTML = '';

        results.forEach(user => {
            const nome = `${user.name.first} ${user.name.last}`;
            const pais = user.location.country;
            const foto = user.picture.large;

            //Cria um elemento card
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `<img src="${foto}" alt="Foto de ${nome}" width="100" heigth="100">
            <h3 style="margin:10 0 5px 0;">${nome}</h3>
            <p style="margin:0;">${pais}</p>`;

            usuarioDiv.appendChild(card);
        });
    }catch (erro){
        console.erro('Erro ao buscar usuário:', erro);
        usuarioDiv.innerHTML = 'Erro ao carregar usuários. Tente novamente.';
    }
});