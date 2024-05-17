const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Adiciona redirecionamento ao clicar no botão "Ler Mais"
document.querySelectorAll('.ler-mais').forEach(item => {
    item.addEventListener('click', event => {
        window.location.href = item.getAttribute('href');
    });
});

// Início Blog
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    // Captura os valores dos campos do formulário
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Redireciona para a página de destino com os dados na URL
    window.location.href = `dados.html?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    // Limpa os campos do formulário após o envio
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});
// Fim Blog

// Início Fale Conosco
function validar() {
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var email = document.getElementById("email").value;
    var mensagem = document.getElementById("mensagem").value;
    var validado = true;

    if (nome == '') {
        document.getElementById("nome").style.borderColor = 'red';
        validado = false;
    } else {
        document.getElementById("nome").style.borderColor = 'black';
    }

    if (sobrenome == '') {
        document.getElementById("sobrenome").style.borderColor = 'red';
        validado = false;
    } else {
        document.getElementById("sobrenome").style.borderColor = 'black';
    }
    if (email == '') {
        document.getElementById("email").style.borderColor = 'red';
        validado = false;
    } else {
        document.getElementById("email").style.borderColor = 'black';
    }
    if (mensagem == '') {
        document.getElementById("mensagem").style.borderColor = 'red';
        validado = false;
    } else {
        document.getElementById("mensagem").style.borderColor = 'black';
    }
    if (validado) {
        alert('Sua mensagem foi enviada com sucesso!');

        // Limpa os campos do formulário após o envio
        document.getElementById("nome").value = '';
        document.getElementById("sobrenome").value = '';
        document.getElementById("email").value = '';
        document.getElementById("mensagem").value = '';
    }
}
// Fim Fale Conosco

// começo cardápio
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('produto').addEventListener('change', showOptions);
    document.querySelectorAll('.pedido-select').forEach(function(select) {
        select.addEventListener('change', updateTotal);
    });
});

function showOptions() {
    var produto = document.getElementById("produto").value;
    var options = document.querySelectorAll(".pedido-options");

    options.forEach(function(option) {
        option.style.display = 'none';
    });

    if (produto) {
        document.getElementById(produto + "-options").style.display = 'block';
    }
}

function updateTotal() {
    var produto = document.getElementById("produto").value;
    var tipoProduto = document.getElementById("tipo-" + produto).value;
    var bebida = document.getElementById("bebida").value;
    var total = 0;

    var valores = {
        hamburguer: { xtotalduplo: 25, xtotal: 20, xbacon: 15, xeggs: 18, classic: 12, ratao: 22, xburguer: 10 },
        sushi: { niguiri: 10, temaki: 12, uramaki: 15, hosomaki: 14, sashimi: 18 },
        churrasco: { picanha: 35, maminha: 30, fraldinha: 28, costela: 40, alcatra: 32 },
        pastel: { carne: 8, queijo: 7, frango: 9, pizza: 10, palmito: 12 },
        hotdog: { tradicional: 6, completo: 8, catupiry: 9, bacon: 10, duplo: 12 },
        porcao: { batata: 15, mandioca: 14, frango: 18, calabresa: 20, peixe: 25 },
        churros: { doceDeLeite: 5, chocolate: 6, nutella: 7, morango: 5, caramelo: 6 },
        bebida: { juninho: 2, refrigeranteLata: 3, refrigeranteMeio: 5, refrigeranteDois: 7, suco: 4, cerveja: 6, energetico: 8, caipirinha: 10, vinho: 12, vodka: 15, whisky: 20 }
    };

    if (produto && tipoProduto) {
        total += valores[produto][tipoProduto.split(' ')[0]] || 0;
    }
    if (bebida) {
        total += valores.bebida[bebida.split(' ')[0]] || 0;
    }

    document.getElementById("total").textContent = total.toFixed(2);
}

function finalizarPedido() {
    var formaPagamentoContainer = document.getElementById("forma-pagamento-container");
    formaPagamentoContainer.style.display = 'block';
}

function showPagamentoOptions() {
    var formaPagamento = document.getElementById("forma-pagamento").value;
    var cartaoOptions = document.getElementById("cartao-options");

    if (formaPagamento === "cartao") {
        cartaoOptions.style.display = 'block';
    } else {
        cartaoOptions.style.display = 'none';
    }
}

function pagarPedido() {
    var produto = document.getElementById("produto").value;
    var tipoProduto = document.getElementById("tipo-" + produto).value;
    var bebida = document.getElementById("bebida").value;
    var formaPagamento = document.getElementById("forma-pagamento").value;
    var tipoCartao = document.getElementById("tipo-cartao").value;
    var total = document.getElementById("total").textContent;

    var resumoContainer = document.getElementById("resumo-pedido-container");
    var resumoTabela = document.getElementById("resumo-pedido").getElementsByTagName('tbody')[0];

    resumoTabela.innerHTML = `
        <tr>
            <td>${produto}</td>
            <td>${tipoProduto}</td>
            <td>${bebida}</td>
            <td>${formaPagamento === "cartao" ? "Cartão - " + tipoCartao : formaPagamento}</td>
            <td>R$ ${total}</td>
        </tr>
    `;

    resumoContainer.style.display = 'block';
    document.getElementById("forma-pagamento-container").style.display = 'none';
}

function novoPedido() {
    document.getElementById("produto").value = "";
    document.querySelectorAll(".pedido-options").forEach(function(option) {
        option.style.display = 'none';
    });
    document.getElementById("bebida").value = "";
    document.getElementById("total").textContent = "0.00";
    document.getElementById("resumo-pedido-container").style.display = 'none';
}

// fim cardápio


