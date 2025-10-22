//
class TarefaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.renderizar(this.model.getTarefas());
        this.view.emAdicionar((texto) => this.adicionarTarefa(texto));
    }
    adicionarTarefa(texto) {
        this.model.adicionarTarefa(texto);

        this.view.renderizar(this.model.getTarefas());
    }
}

