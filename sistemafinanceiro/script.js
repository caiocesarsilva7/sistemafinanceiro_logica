const form = document.getElementById('transaction-form');
const tbody = document.querySelector('#transactions-table tbody');
const totalReceitasEl = document.getElementById('total-receitas');
const totalDespesasEl = document.getElementById('total-despesas');
const saldoEl = document.getElementById('saldo');

let transacoes = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const descricao = document.getElementById('description').value;
  const valor = parseFloat(document.getElementById('amount').value);
  const tipo = document.getElementById('type').value;
  const data = new Date().toLocaleDateString('pt-BR');

  if (!descricao || isNaN(valor)) return;

  const transacao = { descricao, valor, tipo, data };
  transacoes.push(transacao);
  atualizarTabela();
  atualizarResumo();
  form.reset();
});

function atualizarTabela() {
  tbody.innerHTML = '';
  transacoes.forEach((t) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.descricao}</td>
      <td>R$ ${t.valor.toFixed(2)}</td>
      <td>${t.tipo}</td>
      <td>${t.data}</td>
    `;
    tbody.appendChild(tr);
  });
}

function atualizarResumo() {
  const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
  const saldo = receitas - despesas;

  totalReceitasEl.textContent = `R$ ${receitas.toFixed(2)}`;
  totalDespesasEl.textContent = `R$ ${despesas.toFixed(2)}`;
  saldoEl.textContent = `R$ ${saldo.toFixed(2)}`;
}
