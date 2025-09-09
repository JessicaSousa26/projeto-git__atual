//Classificação de temperaturas do dia em frio, agradável e quente
let temperaturas = [22, 25, 17, 33, 27, 20, 29, 31, 19, 24, 10, 45];
console.log('Temperaturas do Dia:', temperaturas);

let frio = [];
let agradavel = [];
let quente = []; 

for
(let temp of temperaturas) {
    if (temp < 20) {
        console.log(temp + '°C é considerado frio.');
    } else if (temp >= 20 && temp <= 29) {
        console.log(temp + '°C é considerado agradável.');
    } else {
        console.log(temp + '°C é considerado quente.');
    }       

    if (temp < 20) {
        frio.push(temp);
    } else if (temp >= 20 && temp <= 29) {
        agradavel.push(temp);
    } else {
        quente.push(temp);
    }
}