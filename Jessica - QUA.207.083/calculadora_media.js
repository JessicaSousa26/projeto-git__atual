let nota1 = 60;
let nota2 = 65;
let nota3 = 45;
let media = (nota1 + nota2 + nota3) / 3;

if (media >= 70) {
    console.log("Aprovado! " + media.toFixed(2));
} else if (media >= 50 && media < 70) {
    console.log("Recuperação " + media.toFixed(2));
} else {
    console.log("Reprovado " + media.toFixed(2));
}