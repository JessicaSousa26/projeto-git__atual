//Colocar regras e dados recebidos - Cofre - Guardar valores
class TarefaModel {
    //construção, base do model this traz herança
    constructor() {
        this.tarefas = [];
    }
    adicionarTarefa(texto) {
        if (texto.trim() !== "") {
            this.tarefas.push(texto);
        }
    }
    getTarefas() {
        return this.tarefas;
    }
}
