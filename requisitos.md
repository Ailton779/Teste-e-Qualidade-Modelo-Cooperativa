# Especificação de requisitos: fechamento de pedidos da cooperativa

**Sistema:** Loja Virtual da Cooperativa dos Produtores do Vale (fictícia)
**Módulo:** cálculo do pedido, descontos, frete e baixa de estoque
**Versão:** 1.0

## Contexto

A cooperativa vende pela internet a produção dos cooperados (mel, feijão, queijo, polpas de frutas) e entrega na região. Este módulo calcula o valor do pedido e atualiza o estoque.

## Interface

Implementar em JavaScript puro (Node.js), no arquivo `src/pedido.js`, exportando as quatro funções no formato CommonJS:

```js
module.exports = { calcularSubtotal, aplicarDesconto, calcularFrete, fecharPedido };
```

Um **item** do pedido é um objeto `{ produto, precoUnitario, quantidade }`. A quantidade pode ser fracionada para produtos vendidos a quilo (exemplo: `1.5`). O **estoque** é um objeto com a quantidade disponível de cada produto, por exemplo `{ "Mel 500g": 12, "Feijão (kg)": 30.5 }`. Todos os valores em dinheiro são números em reais.

## Requisitos funcionais

### Função 1: `calcularSubtotal(itens)`

**RF01.** O valor de cada item é o preço unitário multiplicado pela quantidade, arredondado ao centavo pela regra "meio para cima" (R$ 0,005 vira R$ 0,01).

**RF02.** O subtotal é a soma dos valores dos itens, já arredondados.

### Função 2: `aplicarDesconto(subtotal, cupom)`

**RF03.** Pedidos com subtotal acima de R$ 200,00 recebem 5% de desconto. Pedidos com subtotal acima de R$ 500,00 recebem 10%. Aplica-se apenas um percentual: o maior a que o pedido tiver direito.

**RF04.** O cupom `"COOP10"` dá R$ 10,00 de desconto adicional, aplicado depois do percentual. Qualquer outro cupom é ignorado. O parâmetro `cupom` é opcional.

**RF05.** O valor com desconto nunca pode ser negativo.

**RF06.** Retorna `{ desconto, valorComDesconto }`, com valores arredondados ao centavo pela regra "meio para cima".

### Função 3: `calcularFrete(distanciaKm, valorComDesconto)`

**RF07.** Pedidos com valor com desconto a partir de R$ 300,00 têm frete grátis.

**RF08.** Nos demais casos, o frete é de R$ 8,00 para entregas até 10 km. Acima de 10 km, soma-se R$ 0,90 por quilômetro excedente. Quilômetros fracionados são arredondados para cima (10,2 km contam como 11 km, ou seja, 1 km excedente).

### Função 4: `fecharPedido(itens, estoque, distanciaKm, cupom)`

**RF09.** Se algum produto do pedido não tiver estoque suficiente, ou não existir no estoque, o pedido é recusado: retorna `{ aprovado: false, motivo: "ESTOQUE_INSUFICIENTE", produto }`, com o nome do primeiro produto sem estoque.

**RF10.** Se o pedido for recusado, nenhum estoque é alterado.

**RF11.** Se o pedido for aprovado, retorna `{ aprovado: true, subtotal, desconto, frete, total, estoque }`, em que `total` é o valor com desconto mais o frete e `estoque` é o estoque atualizado, já descontadas as quantidades vendidas.

**RF12.** O objeto de estoque recebido como parâmetro não pode ser alterado: o estoque atualizado é um novo objeto.

## Exemplo

```js
calcularSubtotal([
  { produto: "Mel 500g", precoUnitario: 25.0, quantidade: 2 },
  { produto: "Feijão (kg)", precoUnitario: 9.5, quantidade: 3 },
])
// 78.5
```
