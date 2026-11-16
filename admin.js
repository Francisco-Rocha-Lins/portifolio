
// LOGIN DO PAINEL ADMINISTRATIVO

const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Dados de acesso demonstrativos
    const usuarioCorreto = "admin";
    const senhaCorreta = "Francisco123";

    if (usuario === usuarioCorreto && senha === senhaCorreta) {

        localStorage.setItem("adminLogado", "true");

        window.location.href = "painel.html";

    } else {

        mensagemLogin.textContent = "Usuário ou senha incorretos.";
        mensagemLogin.style.color = "#f87171";

    }
});
