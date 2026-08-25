const imagemPadrao = 'https://placehold.co/150';

// Função assíncrona que simula a resposta de uma API
async function buscarPecas() {
  return [
    { nome: "Processador Ryzen 5 5600X", categoria: "processadores", preco: 950, imagem: imagemPadrao },
    { nome: "Placa de Vídeo RTX 4060", categoria: "placas-video", preco: 1999, imagem: imagemPadrao },
    { nome: "Memória RAM 16GB DDR4", categoria: "memorias", preco: 280, imagem: imagemPadrao },
    { nome: "SSD NVMe 1TB", categoria: "ssds", preco: 420, imagem: imagemPadrao },
    { "nome": "Fonte Corsair 650W 80 Plus", categoria: "fontes", preco: 380.00, imagem:imagemPadrao}
  ];
}

let pecas = [];
const listaProdutos = document.getElementById('listaProdutos');

// Função assíncrona principal que inicializa a aplicação
async function carregarPagina() {
  pecas = await buscarPecas();
  renderizar(pecas);
}

function renderizar(lista) {
  if (lista.length === 0) {
    listaProdutos.innerHTML = '<p>Nenhuma peça encontrada.</p>';
    return;
  }
  
  listaProdutos.innerHTML = lista.map(item => `
    <div class="card-produto">
      <img src="${item.imagem}" alt="${item.nome}">
      <h3>${item.nome}</h3>
      <p>R$ ${item.preco},00</p>
    </div>
  `).join('');
}

// Botão de Pesquisa
document.getElementById('btnPesquisar').onclick = () => {
  const busca = document.getElementById('campoPesquisa').value.toLowerCase();
  const filtrados = pecas.filter(p => p.nome.toLowerCase().includes(busca));
  renderizar(filtrados);
};

// Cliques nas Categorias
document.querySelectorAll('.categorias a').forEach(link => {
  link.onclick = (e) => {
    e.preventDefault();
    const cat = link.getAttribute('href').replace('#', '');
    if (cat === 'todos') {
      renderizar(pecas);
    } else {
      renderizar(pecas.filter(p => p.categoria === cat));
    }
  };
});

// Executa a busca assíncrona ao abrir a página
carregarPagina();