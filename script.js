let treinos = [];
let historico = [];

function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("formTreino").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeTreino").value.trim();
  const tipo = document.getElementById("tipoTreino").value;
  const duracao = parseInt(document.getElementById("duracaoTreino").value);

  if (!nome || !tipo || !duracao || duracao <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  treinos.push({ nome, tipo, duracao });
  atualizarTabelaTreinos();
  atualizarSelectTreinos();

  this.reset();
  alert("Treino cadastrado com sucesso!");
});

document.getElementById("formRealizacao").addEventListener("submit", function (e) {
  e.preventDefault();

  const nomeTreino = document.getElementById("selectTreino").value;
  const data = document.getElementById("dataRealizacao").value;
  const duracao = document.getElementById("duracaoReal").value || "";
  const obs = document.getElementById("obsRealizacao").value;

  if (!nomeTreino || !data) {
    alert("Selecione o treino e a data.");
    return;
  }

  historico.push({ nomeTreino, data, duracao, obs });
  atualizarTabelaHistorico();
  this.reset();
  alert("Realização registrada!");
});

function atualizarTabelaTreinos(filtro = "") {
  const tbody = document.getElementById("tabelaTreinos");
  tbody.innerHTML = "";

  treinos
    .filter(t => t.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach(t => {
      const row = tbody.insertRow();
      row.innerHTML = `<td>${t.nome}</td><td>${t.tipo}</td><td>${t.duracao} min</td>`;
    });
}

function atualizarSelectTreinos() {
  const select = document.getElementById("selectTreino");
  select.innerHTML = '<option value="">Selecione um treino</option>';
  treinos.forEach(t => {
    const option = document.createElement("option");
    option.value = t.nome;
    option.textContent = t.nome;
    select.appendChild(option);
  });
}

function atualizarTabelaHistorico() {
  const tbody = document.getElementById("tabelaHistorico");
  tbody.innerHTML = "";

  historico.forEach(h => {
    const row = tbody.insertRow();
    row.innerHTML = `<td>${h.nomeTreino}</td><td>${h.data}</td><td>${h.duracao || "-"}</td><td>${h.obs || "-"}</td>`;
  });
}

document.getElementById("filtroTreino").addEventListener("input", (e) => {
  atualizarTabelaTreinos(e.target.value);
});

function ordenarPorNome() {
  treinos.sort((a, b) => a.nome.localeCompare(b.nome));
  atualizarTabelaTreinos(document.getElementById("filtroTreino").value);
}
