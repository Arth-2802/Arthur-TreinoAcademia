// Controle de navegação
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Dados simulados
let treinos = [];
let historico = [];

// Cadastrar treino
document.getElementById("formTreino").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const nome = document.getElementById("nomeTreino").value;
  const tipo = document.getElementById("tipoTreino").value;
  const duracao = document.getElementById("duracaoTreino").value;

  if (!nome || !tipo || !duracao) return;

  const treino = { nome, tipo, duracao };
  treinos.push(treino);

  atualizarTabelaTreinos();
  atualizarSelectTreinos();
  this.reset();
  alert("Treino cadastrado com sucesso!");
});

// Atualizar lista de treinos
function atualizarTabelaTreinos() {
  const tbody = document.getElementById("tabelaTreinos");
  tbody.innerHTML = "";

  treinos.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.nome}</td>
      <td>${formatarTipo(t.tipo)}</td>
      <td>${t.duracao} min</td>
    `;
    tbody.appendChild(tr);
  });
}

// Atualizar lista no select de registro
function atualizarSelectTreinos() {
  const select = document.getElementById("selectTreino");
  select.innerHTML = "";
  treinos.forEach((t, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${t.nome} (${formatarTipo(t.tipo)})`;
    select.appendChild(opt);
  });
}

// Registrar realização de treino
document.getElementById("formRealizacao").addEventListener("submit", function (e) {
  e.preventDefault();

  const treinoIndex = document.getElementById("selectTreino").value;
  const data = document.getElementById("dataRealizacao").value;
  const duracaoReal = document.getElementById("duracaoReal").value;
  const observacoes = document.getElementById("obsRealizacao").value;

  if (treinoIndex === "" || !data) return;

  const treino = treinos[treinoIndex];
  const registro = {
    nome: treino.nome,
    tipo: treino.tipo,
    data,
    duracao: duracaoReal || treino.duracao,
    obs: observacoes
  };

  historico.push(registro);
  atualizarHistorico();
  this.reset();
  alert("Realização registrada com sucesso!");
});

// Atualizar histórico
function atualizarHistorico() {
  const tbody = document.getElementById("tabelaHistorico");
  tbody.innerHTML = "";

  historico.forEach(h => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${h.nome} (${formatarTipo(h.tipo)})</td>
      <td>${h.data}</td>
      <td>${h.duracao} min</td>
      <td>${h.obs}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Função para formatar os nomes dos tipos
function formatarTipo(tipo) {
  const tipos = {
    cardio: "Cardio",
    forca: "Força",
    funcional: "Funcional",
    alongamento: "Alongamento",
    hiit: "HIIT",
    mobilidade: "Mobilidade",
    pilates: "Pilates",
    yoga: "Yoga"
  };
  return tipos[tipo] || tipo;
}
