const btn = document.getElementById("btn");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
    const nome = "Laís";
    let idade = 25;
    const cidade = "Brasília";
    
    output.textContent = `Nome: ${nome}\nIdade: ${idade}\nCidade: ${cidade}`;
});