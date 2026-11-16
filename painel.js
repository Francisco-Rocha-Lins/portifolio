
// =====================================
// PAINEL ADMINISTRATIVO
// =====================================

// Verificar se o administrador está logado
if (localStorage.getItem("adminLogado") !== "true") {
    window.location.href = "admin.html";
}

// Identificação das mensagens
const CHAVE_MENSAGENS = "mensagensPortfolio";

const listaMensagens = document.getElementById("listaMensagens");
const totalMensagens = document.getElementById("totalMensagens");

// Buscar mensagens salvas
function buscarMensagens() {
    return JSON.parse(
        localStorage.getItem(CHAVE_MENSAGENS) || "[]"
    );
}

// Salvar mensagens
function salvarMensagens(mensagens) {
    localStorage.setItem(
        CHAVE_MENSAGENS,
        JSON.stringify(mensagens)
    );
}

// Mostrar mensagens na tela
function carregarMensagens() {
    const mensagens = buscarMensagens();

    totalMensagens.textContent = mensagens.length;
    listaMensagens.innerHTML = "";

    if (mensagens.length === 0) {
        listaMensagens.textContent = "Nenhuma mensagem recebida.";
        return;
    }

    mensagens.forEach(function(mensagem) {

        const card = document.createElement("div");
        card.className = "habilidade-card";

        const nome = document.createElement("h3");
        nome.textContent = mensagem.nome;

        const email = document.createElement("p");
        email.textContent = "E-mail: " + mensagem.email;

        const texto = document.createElement("p");
        texto.textContent = "Mensagem: " + mensagem.mensagem;

        const data = document.createElement("small");
        data.textContent = "Data: " + mensagem.data;

        // Botão editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-enviar";

        btnEditar.addEventListener("click", function() {
            editarMensagem(mensagem.id);
        });

        // Botão excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-enviar";

        btnExcluir.style.marginLeft = "10px";

        btnExcluir.addEventListener("click", function() {
            excluirMensagem(mensagem.id);
        });

        card.appendChild(nome);
        card.appendChild(email);
        card.appendChild(texto);
        card.appendChild(data);
        card.appendChild(btnEditar);
        card.appendChild(btnExcluir);

        listaMensagens.appendChild(card);
    });
}

// Editar mensagem
function editarMensagem(id) {
    const mensagens = buscarMensagens();

    const mensagem = mensagens.find(function(item) {
        return item.id === id;
    });

    if (!mensagem) return;

    const novoTexto = prompt(
        "Edite a mensagem:",
        mensagem.mensagem
    );

    if (novoTexto === null) return;

    if (novoTexto.trim() === "") {
        alert("A mensagem não pode ficar vazia.");
        return;
    }

    mensagem.mensagem = novoTexto.trim();

    salvarMensagens(mensagens);
    carregarMensagens();

    alert("Mensagem atualizada!");
}

// Excluir mensagem
function excluirMensagem(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir esta mensagem?"
    );

    if (!confirmar) return;

    const mensagens = buscarMensagens().filter(function(item) {
        return item.id !== id;
    });

    salvarMensagens(mensagens);
    carregarMensagens();

    alert("Mensagem excluída!");
}

// Sair do painel
document.getElementById("btnSair").addEventListener("click", function() {
    localStorage.removeItem("adminLogado");
    window.location.href = "admin.html";
});

// Inicializar painel
carregarMensagens();
