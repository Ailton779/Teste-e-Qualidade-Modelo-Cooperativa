// Parte 2: casos de teste escritos pela DUPLA, a partir de requisitos.md.
// Para rodar: npm test   (Node.js 18 ou superior; nenhuma biblioteca externa)

const test = require("node:test");
const assert = require("node:assert/strict");
const { calcularSubtotal, aplicarDesconto, calcularFrete, fecharPedido } = require("../src/pedido.js");

// Exemplos (podem ser mantidos e contam no total):

test("EX01: exemplo da especificação", () => {
  assert.equal(
    calcularSubtotal([
      { produto: "Mel 500g", precoUnitario: 25.0, quantidade: 2 },
      { produto: "Feijão (kg)", precoUnitario: 9.5, quantidade: 3 },
    ]),
    78.5
  );
});

test("EX02: frete até 10 km", () => {
  assert.equal(calcularFrete(8, 100), 8);
});

// ===== Testes de calcularSubtotal (mínimo de 5) =====

// ===== Testes de aplicarDesconto (mínimo de 5) =====

// ===== Testes de calcularFrete (mínimo de 5) =====

// ===== Testes de fecharPedido (mínimo de 5) =====

// Pense em: valores de fronteira, arredondamento, datas, combinações de regras e entradas inválidas.
