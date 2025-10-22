//Cuida da interface - avisa controller - alguém clicou, mas, não sabe o que fazer, atribui função dos elementos
//seleção dos elementos
class TarefaView {
    constructor() {
        this.input = document.getElementById("tarefaInput");

        this.botao = document.getElementById("btnAdicionar");

        this.lista = document.getElementById("listaTarefas");
    }
    renderizar(tarefas) {
        this.lista.innerHTML = "";

        //recebe conteudo de texto que vem das tarefas
        tarefas.forEach(tarefa => {
            const li = document.createElement("li");
            li.textContent = tarefa;
            this.lista.appendChild(li); //ordenar um após o outro
        });
    }
    //faz chamada para adicionar
    emAdicionar(callback) {
        this.botao.addEventListener("click", () => {
            callback(this.input.value);
            this.input.value = "";
        });

    }
}

