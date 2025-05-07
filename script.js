function showSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  
    if (id === 'listar') listarTreinos();
    if (id === 'registrar') carregarTreinosNoSelect();
    if (id === 'historico') listarHistorico();
  }
  
  // Utilidades de armazenamento
  function salvarTreino(treino) {
    const treinos = JSON.parse(localStorage.getItem("treinos") || "[]");
    treinos.push(treino);
    localStorage.setItem("treinos", JSON.stringify(treinos));
  }
  
  function salvarRealizacao(realizacao) {
    const registros = JSON.parse(localStorage.getItem("realizacoes") || "[]");
    registros.push(realizacao);
    localStorage.setItem("realizacoes", JSON.stringify(registros));
  }
  
  // Eventos
  document.getElementById("formTreino").addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nomeTreino").value;
    const tipo = document.getElementById("tipoTreino").value;
    const duracao = document.getElementById("duracaoTreino").value;
  
    salvarTreino({ nome, tipo, duracao });
    alert("Treino cadastrado!");
    e.target.reset();
  });
  
  document.getElementById("formRealizacao").addEventListener("submit", e => {
    e.preventDefault();
    const treinoIndex = document.getElementById("selectTreino").value;
    const treinos = JSON.parse(localStorage.getItem("treinos") || "[]");
    const treino = treinos[treinoIndex];
    const data = document.getElementById("dataRealizacao").value;
    const duracao = document.getElementById("duracaoReal").value;
    const obs = document.getElementById("obsRealizacao").value;
  
    salvarRealizacao({ treino: treino.nome, data, duracao, obs });
    alert("Treino registrado!");
    e.target.reset();
  });
  
  function listarTreinos() {
    const tbody = document.getElementById("tabelaTreinos");
    tbody.innerHTML = "";
    const treinos = JSON.parse(localStorage.getItem("treinos") || "[]");
    treinos.forEach(t => {
      tbody.innerHTML += `
        <tr>
          <td>${t.nome}</td>
          <td>${t.tipo}</td>
          <td>${t.duracao} min</td>
        </tr>`;
    });
  }
  
  function carregarTreinosNoSelect() {
    const select = document.getElementById("selectTreino");
    select.innerHTML = "";
    const treinos = JSON.parse(localStorage.getItem("treinos") || "[]");
    treinos.forEach((t, i) => {
      select.innerHTML += `<option value="${i}">${t.nome}</option>`;
    });
  }
  
  function listarHistorico() {
    const tbody = document.getElementById("tabelaHistorico");
    tbody.innerHTML = "";
    const registros = JSON.parse(localStorage.getItem("realizacoes") || "[]");
    registros.forEach(r => {
      tbody.innerHTML += `
        <tr>
          <td>${r.treino}</td>
          <td>${r.data}</td>
          <td>${r.duracao || '-'} min</td>
          <td>${r.obs || '-'}</td>
        </tr>`;
    });
  }
  