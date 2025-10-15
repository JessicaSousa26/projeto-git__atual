function gerarCachorro() {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const img = document.getElementById("dogImg");
        img.src = data.message;
    })
    .catch(error => {
        console.error("Erro ao buscar cachorro:", error);
        alert("Ocorreu um erro ao carregar o cachorro");
    });
}