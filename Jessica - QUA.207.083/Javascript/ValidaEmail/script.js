/*const email = document.getElementById("email");
const mensagemErro = document.getElementById("erroEmail");
cont btnValidar = document.getElementById("btnValidar");

btnValidar.addEventListener("click", function(){
    if (!padraoEmail(email.value)) {
        erroEmail.textContent = "Email inválido";
        email.classList.add("erro");
        return false;
    } else {
        erroEmail.textContent = "";
        email.classList.remove("erro");
        alert("Email valido");
        return true;
    }
});*/

const email = document.getElementById("email");
const erroEmail = document.getElementById("erroEmail");
const btnValidar = document.getElementById("btnValidar");

btnValidar.addEventListener("click", function () {
    if (!email.value.includes("@") || !email.value.includes(".")) {
        erroEmail.textContent = "Email inválido";
    } else {
        erroEmail.textContent = "";
        alert("Email válido");
    }
});