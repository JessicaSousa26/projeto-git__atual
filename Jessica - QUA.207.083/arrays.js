/*Exemplos básicos de Arrays*/
// Exemplo 1: Declarando e iniciando um array vazio
let meuArrayVazio = []; //Usuario coloca entrada de dados
console.log('Exemplo 1 - ArrayVazio:', meuArrayVazio); // Saída: [] 

//Exemlo 2: Um array com diferentes tipos
let frutas = ['Maçã', 'Laranja', 'Banana', 'Uva'];
    console.log('Exemplo 2 - Array de Frutas:', frutas); // Saída: ['Maçã', 'Laranja', 'Banana', 'Uva'],

    let numeros = [10, 20, 30, 40, 50];
    console.log('Exemplo 2 - Array de Números:', numeros); // Saída: [0, 1, 2, 3, 4, 5]

let misto = ['Texto', 123, true, null];
console.log('Exemplo 2 - Array Misto:', misto); // Saída: ['Texto', 123, true, null]        

//Exemplo 3: Acessando Array pelo Índice
console.log('Exemplo 3 - Primeira fruta', frutas[0]); // Saída: 'Maçã'
console.log('Exemplo 3 - Terceiro número:', numeros[3]); // Saída: 40

//Exemplo 4: Modificando Elementos do Array
frutas[1] = 'Pera';
console.log('Exemplo 4 - Array de Frutas Modificado:', frutas); // Saída: ['Maçã', 'Pera', 'Banana', 'Uva']

//Exemplo 5: Obtendo tamanho de um Array
console.log('Exemplo 5 - Tamanho do Array de Frutas', frutas.length); // Saída: 4

//Exemplo 6: Adicionando elementos ao final de um Array
frutas.push('Morango');
console.log('Exemplo 6 - Array de Frutas adicionadas com push:', frutas); //     Saída: ['Maçã', 'Pera', 'Banana', 'Uva', 'Morango']

//Exemplo 7: Removendo o último elementos de um Array
let ultimaFruta = frutas.pop();
console.log('Exemplo 7 - Array de Fruta Removendo com pop:', ultimaFruta); // Saída: 'Morango'
console.log('Exemplo 7 - Array de Frutas após pop:', frutas); // Saída: ['Maçã', 'Pera', 'Banana', 'Uva']

//Exemplo 8: Adicionandar elemento ao início de um Array
frutas.unshift('Abacaxi');
console.log('Exemplo 8 - Array de Frutas adicionando com unshift:', frutas); // Saída: ['Abacaxi', 'Maçã', 'Pera', 'Banana', 'Uva']

//Exemplo 9: Removendo o primeiro elemento de um Array
let primeiraFruta = frutas.shift();
console.log('Exemplo 9 - Array de Frutas remover primeiro item com shift:', primeiraFruta); // Saída: 'Abacaxi'
console.log('Exemplo 9 - Array de Frutas após shift:', frutas); // Saída: ['Maçã', 'Pera', 'Banana', 'Uva']

//Exemplo 10: Iterando sobre um Array com um loop tradicional
for (let i = 0; i < numeros.length; i++) {
    console.log('Exemplo 10 - Iterando com for:', numeros[i]);
}

//Exemplo 11: Iterando sobre um Array com for...of (mais moderno e simples)
console.log('Exemplo 11 - Iterando sobre um array com for...of:');
for (let fruta of frutas) {
    console.log(fruta);
}   