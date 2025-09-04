//Modularização (ES Modules)
import { Cliente } from "./classes.js";
import { criarElementoCliente, limparCampos } from "./utils.js";

const API_URL = "https://crudcrud.com/api/e937afd2119c46f09134c7722711e534/cadastro";
const clientesUl = document.getElementById("listaClientes");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const addBtn = document.getElementById("add");
const temaBtn = document.getElementById("tema");

// Função pura para transformar dados da API em instâncias de Cliente
const mapToClientes = lista => lista.map(obj => new Cliente(obj.nome, obj.email, obj._id));

// Renderiza a lista de clientes
function renderClientes(lista) {
    clientesUl.innerHTML = "";
    lista
        .map(cliente => criarElementoCliente(cliente, deletarCliente))
        .forEach(item => clientesUl.appendChild(item));
}

// Busca clientes na API do CrudCrud
async function buscarClientes() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Erro ao buscar clientes');
        const lista = await res.json();
        renderClientes(mapToClientes(lista));
    } catch (err) {
        alert(err.message);
    }
}

// Adiciona um novo cliente
async function adicionarCliente() {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    if (!nome || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email })
        });
        if (!res.ok) throw new Error('Erro ao adicionar cliente');
        const obj = await res.json();
        const cliente = new Cliente(obj.nome, obj.email, obj._id);
        clientesUl.appendChild(criarElementoCliente(cliente, deletarCliente));
        limparCampos("nome", "email");
    } catch (err) {
        alert(err.message);
    }
}

// Deleta um cliente
async function deletarCliente(id, item) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error('Erro ao deletar cliente');
        item.remove();
    } catch (err) {
        alert(err.message);
    }
}

// Tema escuro/claro
function inicializarTema() {
    if (localStorage.getItem('tema') === 'escuro') {
        document.body.classList.add('escuro');
    }
    if (temaBtn) {
        temaBtn.addEventListener('click', () => {
            document.body.classList.toggle('escuro');
            document.body.classList.contains('escuro')
                ? localStorage.setItem('tema', 'escuro')
                : localStorage.removeItem('tema');
        });
    }
}

// Eventos
if (addBtn) addBtn.addEventListener("click", adicionarCliente);

// Inicialização
inicializarTema();
buscarClientes();