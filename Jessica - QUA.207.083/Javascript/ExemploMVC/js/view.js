//Cuida da interface - avisa controller - alguém clicou, mas, não sabe o que fazer, atribui função dos elementos

class ContadorView {
    constructor() {
        this.valorElemento = document.getElementById("valor");
        
        this.btnMais = document.getElementById("btnMais");

        this.btnMenos = document.getElementById("btnMenos");
    }
    atualizar(valor) {
        this.valorElemento.textContent = valor;
    }
    incrementar(callback) {
        this.btnMais.addEventListener("click", callback);
    }
    decrementar(callback){
        this.btnMenos.addEventListener("click", callback);
    }
}