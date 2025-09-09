/*let texto = "Hello World JavaScript";
let contadorVogais = 0;
// Converte o texto para minúsculas para facilitar a comparação
let textoMinusculo = texto.toLowerCase();
let vogais = "aeiouAEIOU";

for (let i = 0; i < textoMinusculo.length; i++) {
    let caracter = textoMinusculo[i];
    if (vogais.includes(caracter)) {
        contadorVogais++;
    } console.log("O texto \"" + texto + "\" possui " + contadorVogais + " vogais.");
}*/

let texto = "Gosto de Aprender JavaScript";
let contadorVogais = 0;
// Converte o texto para minúsculas para facilitar a comparação
let textoMinusculo = texto.toLowerCase();
for (let i = 0; i < textoMinusculo.length; i++) {
let caractere = textoMinusculo[i];
// Verifique se o caractere é uma vogal
if (
caractere === 'a' ||
caractere === 'e' ||
caractere === 'i' ||
caractere === 'o' ||
caractere === 'u'
) {
contadorVogais++;
}
}
console.log("O texto \"" + texto + "\" possui " + contadorVogais + " vogais.");