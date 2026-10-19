function paraCentavos(valor) {
  const sinal = valor < 0 ? -1 : 1;
  valor = Math.abs(valor);

  let str = String(valor);
  if (/[eE]/.test(str)) {
    str = valor.toFixed(20).replace(/0+$/, "").replace(/\.$/, "");
  }

  const partes = str.split(".");
  const inteiro = partes[0] || "0";
  let fracao = partes[1] || "";
  fracao = (fracao + "000").slice(0, 3);

  let centavos = Number(inteiro) * 100 + Number(fracao.slice(0, 2));
  if (fracao[2] >= "5") centavos += 1;

  return sinal * centavos;
}

function arredondarCentavos(valor) {
  return paraCentavos(valor) / 100;
}

function calcularSubtotal(itens) {
  let totalCentavos = 0;

  for (const item of itens) {
    const valorItem = item.precoUnitario * item.quantidade;
    totalCentavos += paraCentavos(valorItem);
  }

  return totalCentavos / 100;
}

function aplicarDesconto(subtotal, cupom) {
  const subtotalCentavos = paraCentavos(subtotal);

  let percentual = 0;
  if (subtotal > 500) {
    percentual = 0.1;
  } else if (subtotal > 200) {
    percentual = 0.05;
  }

  const descontoPercentualCentavos = paraCentavos(subtotal * percentual);
  let valorCentavos = subtotalCentavos - descontoPercentualCentavos;

  if (cupom === "COOP10") {
    valorCentavos -= 1000;
  }

  if (valorCentavos < 0) {
    valorCentavos = 0;
  }

  const descontoCentavos = subtotalCentavos - valorCentavos;

  return {
    desconto: descontoCentavos / 100,
    valorComDesconto: valorCentavos / 100,
  };
}

function calcularFrete(distanciaKm, valorComDesconto) {
  if (valorComDesconto >= 300) {
    return 0;
  }

  const kmArredondado = Math.ceil(distanciaKm);
  let frete = 8;

  if (kmArredondado > 10) {
    frete += 0.9 * (kmArredondado - 10);
  }

  return arredondarCentavos(frete);
}

function fecharPedido(itens, estoque, distanciaKm, cupom) {
  const solicitado = {};

  for (const item of itens) {
    const produto = item.produto;
    const quantidade = item.quantidade;
    const disponivel = estoque[produto];
    const jaSolicitado = solicitado[produto] || 0;

    if (disponivel === undefined || jaSolicitado + quantidade > disponivel) {
      return {
        aprovado: false,
        motivo: "ESTOQUE_INSUFICIENTE",
        produto,
      };
    }

    solicitado[produto] = jaSolicitado + quantidade;
  }

  const subtotal = calcularSubtotal(itens);
  const { desconto, valorComDesconto } = aplicarDesconto(subtotal, cupom);
  const frete = calcularFrete(distanciaKm, valorComDesconto);
  const total = arredondarCentavos(valorComDesconto + frete);

  const novoEstoque = { ...estoque };
  for (const produto of Object.keys(solicitado)) {
    novoEstoque[produto] = novoEstoque[produto] - solicitado[produto];
  }

  return {
    aprovado: true,
    subtotal,
    desconto,
    frete,
    total,
    estoque: novoEstoque,
  };
}

module.exports = { calcularSubtotal, aplicarDesconto, calcularFrete, fecharPedido };