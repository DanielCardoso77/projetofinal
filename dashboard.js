document.addEventListener("DOMContentLoaded", () => {
    carregarChamados();

    const formCriar = document.getElementById("form-criar-chamado");
    if (formCriar) {
        formCriar.addEventListener("submit", async (e) => {
            e.preventDefault();
            const titulo = document.getElementById("titulo").value;
            const descricao = document.getElementById("descricao").value;

            try {
                const response = await fetch("api/criar_chamado.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, descricao })
                });
                const resultado = await response.json();
                
                if (resultado.sucesso) {
                    alert(resultado.mensagem);
                    formCriar.reset();
                    carregarChamados();
                } else {
                    alert(resultado.mensagem);
                }
            } catch (error) {
                console.error("Erro:", error);
            }
        });
    }
});

async function carregarChamados() {
    const tabelaContainer = document.getElementById("tabela-chamados");
    if (!tabelaContainer) return;

    try {
        const response = await fetch("api/listar_chamados.php");
        const resultado = await response.json();

        if (resultado.sucesso) {
            let html = `<table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>`;

            resultado.dados.forEach(c => {
                html += `<tr>
                    <td>${c.id}</td>
                    <td>${c.titulo}</td>
                    <td>${c.descricao}</td>
                    <td>${c.status}</td>
                    <td>${c.usuario_nome}</td>
                    <td>
                        <button onclick="excluirChamado(${c.id})" style="background-color: #dc2626; padding: 0.3rem 0.6rem; font-size: 0.8rem;">Excluir</button>
                    </td>
                </tr>`;
            });

            html += `</tbody></table>`;
            tabelaContainer.innerHTML = html;
        }
    } catch (error) {
        console.error("Erro ao carregar chamados:", error);
    }
}

async function excluirChamado(id) {
    if (!confirm("Tem certeza que deseja excluir este chamado?")) return;

    try {
        const response = await fetch("api/excluir_chamado.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        const resultado = await response.json();
        alert(resultado.mensagem);
        if (resultado.sucesso) {
            carregarChamados();
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}