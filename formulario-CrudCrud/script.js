//Seleciona a nossa ul com a lista de clientes no HTML
const clientes = document.getElementById("listaClientes");
//Faz uma requisição GET para a API externa e entao obter todos os clientes
fetch("https://crudcrud.com/api/368f78fe6cd9403e8d2f73667ed9599e/cadastro")
    //converte o corpo da resposta em JSON
    .then(resposta => resposta.json())
    .then((listaDeClientes) => {
        // Itera sobre cada cliente no array
        listaDeClientes.forEach(cliente => {
            //Cria um novo elemento li para cada cliente
            const item = document.createElement("li");
            // Armazena o _id do cliente como um atributo data-id
            item.setAttribute("data-id", cliente._id);
            //Define o conteúdo HTML do item, incluindo a descrição e o botão
            item.innerHTML = `Nome:${cliente.nome} , Email:${cliente.email} <button>X</button>`
            //Adiciona o novo item à lista de clientes no HTML
            clientes.appendChild(item);
        });
    });

//Adiciona um ouvinte de evento ao elemento de lista de clientes para capturar cliques no botao adicionar
document.getElementById("add").addEventListener("click", () => {
    const nomeCliente = document.getElementById("nome").value;
    const emailCliente = document.getElementById("email").value;
    //Valida se os campos estão preenchidos
    if (!nomeCliente || !emailCliente) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    fetch("https://crudcrud.com/api/368f78fe6cd9403e8d2f73667ed9599e/cadastro", {
        //Define o método HTTP como POST
        method: "POST",
        headers: {
            //Define o tipo de conteúdo como JSON 
            "Content-Type": "application/json"
        }, //Converte o objeto {nome, email} em uma string JSON
        body: JSON.stringify({ nome: nomeCliente, email: emailCliente })
    })
        .then(resposta => resposta.json())
        .then(cliente => {
            //Cria um novo elemento li para o cliente e o email adicionado
            const item = document.createElement("li");
            //Armazena o _id do cliente como um atributo data-id
            item.setAttribute("data-id", cliente._id);
            //Define o conteúdo HTML do item, incluindo a descrição e o botão
            item.innerHTML = `Nome: ${cliente.nome} , Email: ${cliente.email} <button>X</button>`;
            //Adiciona o novo item à lista de clientes no HTML
            clientes.appendChild(item);

            //Limpa o campo de entrada após adicionar o nome e o email do cliente
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
        });
});
// Adiciona um ouvinte de evento à lista de clientes para capturar cliques no botão de deletar
clientes.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const item = event.target.parentElement;
        const id = item.getAttribute("data-id");
        fetch(`https://crudcrud.com/api/368f78fe6cd9403e8d2f73667ed9599e/cadastro/${id}`, {
            method: "DELETE"
        }).then(() => {
            item.remove();
        });
    }
});

// Adiciona um ouvinte de evento ao botão de alternância de tema
document.getElementById('tema').addEventListener('click', () => {
    document.body.classList.toggle('escuro');
    document.body.classList.contains('escuro') ? localStorage.setItem('tema', 'escuro') : localStorage.removeItem('tema');
});

// Verifica se o tema está armazenado no localStorage e aplica-o
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('escuro');
}



