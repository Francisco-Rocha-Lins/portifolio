
// ==========================================
// CONFIGURAÇÃO DO EMAILJS
// ==========================================

emailjs.init({
    publicKey: "1sV0UKhUtJk7dSujm"
});

// Identificação dos serviços e templates
const SERVICE_ID = "service_t29kvq9";

const TEMPLATE_CONFIRMACAO = "template_dmoot0n";
const TEMPLATE_NOTIFICACAO = "template_zjf3aa9";

// ==========================================
// LOCALSTORAGE
// ==========================================

const CHAVE_MENSAGENS = "mensagensPortfolio";

// Criar 20 registros de teste na primeira utilização
if (localStorage.getItem(CHAVE_MENSAGENS) === null) {
    const exemplos = [];

    for (let i = 1; i <= 20; i++) {
        exemplos.push({
            id: i,
            nome: `Visitante de teste ${i}`,
            email: `visitante${i}@exemplo.com`,
            mensagem: "Mensagem de exemplo para teste do portfólio.",
            data: new Date().toLocaleString("pt-BR")
        });
    }

    localStorage.setItem(
        CHAVE_MENSAGENS,
        JSON.stringify(exemplos)
    );
}

// ==========================================
// FORMULÁRIO DE CONTATO
// ==========================================

const formulario = document.getElementById("formContato");
const statusContato = document.getElementById("statusContato");

if (formulario) {
    formulario.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        const botao = formulario.querySelector("button[type='submit']");

        botao.disabled = true;
        botao.textContent = "Enviando...";

        // Preparar os dados
        const dados = {
            nome: nome,
            email: email,
            mensagem: mensagem
        };
        console.log("E-mail informado pelo visitante:", email);
        console.log("Dados enviados ao EmailJS:", dados);

        // Salvar mensagem no navegador
        const novaMensagem = {
            id: Date.now(),
            nome,
            email,
            mensagem,
            data: new Date().toLocaleString("pt-BR")
        };

        const mensagens = JSON.parse(
            localStorage.getItem(CHAVE_MENSAGENS) || "[]"
        );

        mensagens.push(novaMensagem);

        localStorage.setItem(
            CHAVE_MENSAGENS,
            JSON.stringify(mensagens)
        );

      
try {
    // Enviar confirmação para o visitante
    const confirmacao = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_CONFIRMACAO,
        dados
    );

    console.log("Confirmação enviada:", confirmacao);

} catch (erro) {
    console.error("Erro na confirmação:", erro);
}

try {
    // Enviar notificação para seu Gmail
    const notificacao = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_NOTIFICACAO,
        dados
    );

    console.log("Notificação enviada:", notificacao);

    statusContato.textContent =
        "Mensagem enviada! Obrigado pelo contato.";

    statusContato.style.color = "#38bdf8";

    formulario.reset();

} catch (erro) {
    console.error("Erro na notificação:", erro);

    statusContato.textContent =
        "Houve um problema no envio da mensagem.";

    statusContato.style.color = "#f87171";

} finally {
    botao.disabled = false;
    botao.textContent = "Enviar mensagem";
}
    });
} else {
    console.error("Formulário formContato não encontrado no HTML.");
}

// MENU DE NAVEGAÇÃO RESPONSIVO

const menuToggle = document.getElementById("menuToggle");
const menuNavegacao = document.getElementById("menuNavegacao");

if (menuToggle && menuNavegacao) {

    menuToggle.addEventListener("click", function() {
        menuNavegacao.classList.toggle("ativo");
    });

    menuNavegacao.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            menuNavegacao.classList.remove("ativo");
        });
    });

}
