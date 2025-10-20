const nome = document.getElementById("nome");
const mensagemErro = document.getElementById("mensagemErro");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", function(){
    if (!nome.value.trim()){
        mensagemErro.textContent = "O campo é obrigatório";
    } else{
        mensagemErro.textContent = "";
        alert("Nome enviado com sucesso");
    }
});