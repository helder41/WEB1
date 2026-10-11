// ========= INICIANDO - ARRAY DE FILMES =========
let filmes = [
    { titulo: "Cara-de-Barro", ano: 2026, genero: "Terror", nota: 7.8, poster: "img/poster1.jpg" },
    { titulo: "A Hora do Mal", ano: 2025, genero: "Terror", nota: 7.4, poster: "img/poster2.jpg" },
    { titulo: "Superman", ano: 2025, genero: "Ação", nota: 7.0, poster: "img/poster3.jpg" },
    { titulo: "Faça Ela Voltar", ano: 2025, genero: "Terror", nota: 7.1, poster: "img/poster4.jpg" },
    { titulo: "Oppenheimer", ano: 2023, genero: "Cinebiografia", nota: 8.2, poster: "img/poster5.jpg" },
    { titulo: "Coringa", ano: 2019, genero: "Drama", nota: 8.3, poster: "img/poster6.jpg" },
    { titulo: "Batman: O Cavaleiro das Trevas", ano: 2008, genero: "Ação", nota: 9.1, poster: "img/poster7.jpg" },
    { titulo: "O Senhor dos Anéis: O Retorno do Rei", ano: 2003, genero: "Fantasia", nota: 9.0, poster: "img/poster8.jpg" },
];

// ========= EXIBIR CATÁLOGO =========
function mostrarFilmes(lista) {
    let areaFilmes = document.getElementById("lista-filmes");
    let contador = document.getElementById("contador");
    if (lista.length === 0) {
        areaFilmes.innerHTML = "<p>Nenhum filme encontrado.</p>";
        contador.innerText = "0";
        return;
    }
    let html = "";
    for (let filme of lista) {
        let i = filmes.indexOf(filme);
        let classeSelo = filme.nota >= 8 ? "selo" : "selo escondido";

        html += `
        <div class="card">
            <span class="${classeSelo}">⭐ Recomendado</span>
            <img src="${filme.poster}" alt="Poster do filme ${filme.titulo}">
            <h3>${filme.titulo}</h3>
              <p>${filme.ano} · ${filme.genero}</p>
                <p>Nota: ${filme.nota}</p>
                <button onclick="favoritar(${i})">♥ Favoritar</button>
            </div>
        `;
    }

    areaFilmes.innerHTML = html;
    contador.innerText = lista.length;
}

// ========= BUSCA POR TÍTULO =========
let campoBusca = document.getElementById("busca");
campoBusca.addEventListener("input", function() {
    let texto = campoBusca.value.toLowerCase();
    let encontrados = [];
    for (let filme of filmes) {
        if (filme.titulo.toLowerCase().includes(texto)) {
            encontrados.push(filme);
        }
    }
    mostrarFilmes(encontrados);
});

// ========= FILTRO POR GÊNERO =========
let filtroGenero = document.getElementById("filtro-genero");
filtroGenero.addEventListener("change", function() {
    let generoEscolhido = filtroGenero.value;
    if (generoEscolhido === "Todos") {
        mostrarFilmes(filmes);
    } else {
        let filtrados = [];
        for (let filme of filmes) {
            if (filme.genero === generoEscolhido) {
                filtrados.push(filme);
            }
        }
        mostrarFilmes(filtrados);
    }
});

// ========= INVERTER ORDEM =========
let botaoInverter = document.getElementById("btn-inverter");
botaoInverter.addEventListener("click", function() {
    filmes.reverse();
    campoBusca.value = "";
    filtroGenero.value = "Todos";
    mostrarFilmes(filmes);
});

// ========= FAVORITOS =========
let favoritos = [];
    function favoritar(indice) {
        let titulo = filmes[indice].titulo;
        if (!favoritos.includes(titulo)) {
            favoritos.push(titulo);
        }
        mostrarFavoritos();
    }
    function mostrarFavoritos() {
        let lista = document.getElementById("lista-favoritos");
        let html = "";
        for (let titulo of favoritos) {
            html += "<li>" + titulo + "</li>";
        }

        if (favoritos.length === 0) {
            html = "<li>Nenhum filme favoritado.</li>";
        }

        lista.innerHTML = html;
        document.getElementById("contador-favoritos").innerText = favoritos.length;
    }

    let botaoLimpar = document.getElementById("btn-limpar");
    botaoLimpar.addEventListener("click", function() {
        favoritos = [];
        mostrarFavoritos();
    });

    // ========= INTERAÇÃO COM O MOUSE =========

    let tituloCatalogo = document.getElementById("titulo-catalogo");
    tituloCatalogo.addEventListener("mouseenter", function() {
        tituloCatalogo.style.color = "#ffcc00";
        tituloCatalogo.backgroundColor = "#333333";
    });

    tituloCatalogo.addEventListener("mouseout", function() {
        tituloCatalogo.style.color = "";
        tituloCatalogo.backgroundColor = "";
    });

// ========= QUANDO CARREGAR A PÁGINA =========
mostrarFilmes(filmes);  
mostrarFavoritos();