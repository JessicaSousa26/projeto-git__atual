//Precedência
console.log("Sem parêntese:",2 + 3 * 4);
console.log("Com parêntese:",(2+3) * 4);

function calcularIMC(){
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    if(peso <= 0 || altura <=0 || isNaN (peso)|| isNaN(altura)){
        document.getElementById("resultado").innerText = "Valores Válidos";
        return;
    }
}
let imc = peso / altura (altura * altura);
let mensagem = "";

if (imc < 18.5){
    mensagem = "Abaixo do peso";
} else if(imc < 24.5){
  mensagem = "Peso normal"
  else if(imc <29.9){


































     

  }


}
}