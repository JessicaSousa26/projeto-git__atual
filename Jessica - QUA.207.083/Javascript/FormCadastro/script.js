const form = document.getElementById("formCadastro");
const nome = document.getElementById("nome");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");

function validarNome(){
    if (!nome.value.trim()) {
        erroNome.textContent = "O nome é obrigatório";
        nome.classList.add("erro");
        return false;
    } else {
        erroNome.textContent = "";
        nome.classList.remove("erro");
        nome.classList.add("valido");
        return true;
    }
}

function validarEmail() {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!padraoEmail(email.value)) {
        erroEmail.textContent = "Digite um email válido";
        email.classList.add("erro");
        return false;
    } else {
        erroEmail.textContent = "";
        email.classList.remove("erro");
        email.classList.add("valido");
        return true;
    }
}