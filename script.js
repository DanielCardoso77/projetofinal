document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const msgEl = document.getElementById("mensagem");

            try {
                const response = await fetch("api/login.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha })
                });
                const resultado = await response.json();
                
                msgEl.textContent = resultado.mensagem;
                msgEl.className = "mensagem " + (resultado.sucesso ? "sucesso" : "erro");

                if (resultado.sucesso) {
                    setTimeout(() => window.location.href = "dashboard.html", 1000);
                }
            } catch (error) {
                console.error("Erro:", error);
            }
        });
    }

    const formCadastro = document.getElementById("form-cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const msgEl = document.getElementById("mensagem");

            try {
                const response = await fetch("api/cadastro.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, email, senha })
                });
                const resultado = await response.json();
                
                msgEl.textContent = resultado.mensagem;
                msgEl.className = "mensagem " + (resultado.sucesso ? "sucesso" : "erro");

                if (resultado.sucesso) {
                    setTimeout(() => window.location.href = "login.html", 1000);
                }
            } catch (error) {
                console.error("Erro:", error);
            }
        });
    }
});