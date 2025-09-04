export function criarElementoCliente(cliente, onDelete) {
    const item = document.createElement("li");
    item.setAttribute("data-id", cliente._id);
    item.innerHTML = `Nome: ${cliente.nome} , Email: ${cliente.email} <button>X</button>`;
    item.querySelector("button").addEventListener("click", () => onDelete(cliente._id, item));
    return item;
}

export function limparCampos(...ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}