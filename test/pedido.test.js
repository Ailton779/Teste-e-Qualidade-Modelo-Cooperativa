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
test("SUB01: lista vazia retorna 0", () => {
  assert.equal(calcularSubtotal([]), 0);
});

test("SUB02: quantidade fracionada (1.5 kg de mel)", () => {
  assert.equal(
    calcularSubtotal([{ produto: "Mel", precoUnitario: 25.0, quantidade: 1.5 }]),
    37.5
  );
});

test("SUB03: 0,005 arredonda para 0,01 (meio para cima)", () => {
  assert.equal(
    calcularSubtotal([{ produto: "X", precoUnitario: 0.005, quantidade: 1 }]),
    0.01
  );
});

test("SUB04: 0,004 arredonda para 0,00", () => {
  assert.equal(
    calcularSubtotal([{ produto: "X", precoUnitario: 0.004, quantidade: 1 }]),
    0
  );
});

test("SUB05: soma dos itens arredondados, não arredonda a soma (RF02)", () => {
  assert.equal(
    calcularSubtotal([
      { produto: "A", precoUnitario: 0.005, quantidade: 1 },
      { produto: "B", precoUnitario: 0.005, quantidade: 1 },
    ]),
    0.02
  );
});

test("SUB06: quantidade zero resulta em 0", () => {
  assert.equal(
    calcularSubtotal([{ produto: "X", precoUnitario: 10, quantidade: 0 }]),
    0
  );
});

test("SUB07: preço negativo deve ser rejeitado", () => {
  assert.throws(() =>
    calcularSubtotal([{ produto: "X", precoUnitario: -10, quantidade: 1 }])
  );
});

test("SUB08: preço undefined deve ser rejeitado com erro", () => {
  assert.throws(() =>
    calcularSubtotal([{ produto: "X", precoUnitario: undefined, quantidade: 1 }])
  );
});

// ===== Testes de aplicarDesconto (mínimo de 5) =====
test("DES01: 200,00 exatos NÃO recebem 5% (acima de 200)", () => {
  assert.deepEqual(aplicarDesconto(200.0), {
    desconto: 0,
    valorComDesconto: 200.0,
  });
});

test("DES02: 200,01 recebe 5%", () => {
  assert.deepEqual(aplicarDesconto(200.01), {
    desconto: 10.0,
    valorComDesconto: 190.01,
  });
});

test("DES03: 500,00 exatos ficam nos 5% (acima de 500)", () => {
  assert.deepEqual(aplicarDesconto(500.0), {
    desconto: 25.0,
    valorComDesconto: 475.0,
  });
});

test("DES04: 500,01 recebe 10%", () => {
  assert.deepEqual(aplicarDesconto(500.01), {
    desconto: 50.0,
    valorComDesconto: 450.01,
  });
});

test("DES05: cupom COOP10 soma R$ 10 depois do percentual", () => {
  assert.deepEqual(aplicarDesconto(200.01, "COOP10"), {
    desconto: 20.0,
    valorComDesconto: 180.01,
  });
});

test("DES06: cupom 'coop10' minúsculo é ignorado", () => {
  assert.deepEqual(aplicarDesconto(200.01, "coop10"), {
    desconto: 10.0,
    valorComDesconto: 190.01,
  });
});

test("DES07: cupom inválido é ignorado", () => {
  assert.deepEqual(aplicarDesconto(200.01, "XYZ"), {
    desconto: 10.0,
    valorComDesconto: 190.01,
  });
});

test("DES08: cupom ausente não quebra (parâmetro opcional)", () => {
  assert.deepEqual(aplicarDesconto(200.01), {
    desconto: 10.0,
    valorComDesconto: 190.01,
  });
});

test("DES09: valorComDesconto nunca fica negativo (RF05)", () => {
  assert.deepEqual(aplicarDesconto(5.0, "COOP10"), {
    desconto: 5.0,
    valorComDesconto: 0.0,
  });
});

test("DES10: subtotal negativo deve ser rejeitado", () => {
  assert.throws(() => aplicarDesconto(-10));
});

test("DES11: NaN deve ser rejeitado", () => {
  assert.throws(() => aplicarDesconto(NaN));
});

// ===== Testes de calcularFrete (mínimo de 5) =====

// ===== Testes de fecharPedido (mínimo de 5) =====

// Pense em: valores de fronteira, arredondamento, datas, combinações de regras e entradas inválidas.
