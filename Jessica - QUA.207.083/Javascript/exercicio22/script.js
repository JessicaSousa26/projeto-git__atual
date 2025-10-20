const form = document.getElementById("formCadastro");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const idade = document.getElementById("idade");
const senha = document.getElementById("senha");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroIdade = document.getElementById("erroIdade");
const erroSenha = document.getElementById("erroSenha");

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

function validarIdade() {
    const idadeNum = parseInt(idade.value);
    if (idadeNum < 18 || idadeNum > 100) {
        erroIdade.textContent = "A idade deve estar entre 18 e 100";
        idade.classList.add("erro");
        return false;
    } else {
        erroIdade.textContent = "";
        idade.classList.remove("erro");
        idade.classList.add("valido");
        return true;
    }
}

function validarSenha (){
    if(senha.value.length < 8) {
        erroSenha.textContent = "A senha deve ter no minimo 8 caracteres";
        senha.classList.add("erro");
        return false;
    } else {
        erroSenha.textContent = "";
        senha.classList.remove("erro");
        senha.classList.add("valido");
        return true;
    }
}

form.addEventListener("submit", function (event){
    event.preventDefault();

    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const idadeValida = validarIdade();
    const senhaValida = validarSenha();

    if(nomeValido && emailValido && idadeValida && senhaValida){
        alert("Cadastro realizado com sucesso");
        form.reset();

        document.querySelectorAll("input").forEach(campo => campo.classList.remove("valido"));
    } else {
        alert("Por favor. Corrija os erros antes de enviar");
    }
});

nome.addEventListener("blur", validarNome);
email.addEventListener("blur", validarEmail);
idade.addEventListener("blur", validarIdade);
senha.addEventListener("blur", validarSenha);

try {
    validarEmail();
} catch (erro) {
    console.log("Ocorreu um erro", erro);
}