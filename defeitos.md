# Tabela de defeitos — Parte 2 (verificação)

Casos de teste escritos a partir de `requisitos.md`, não a partir do código.
Execução: `npm test` → 21 testes, 17 passam, 4 falham.

---

## Função 1 — `calcularSubtotal` (RF01, RF02)

**Autor dos testes:** José Ailton
**Resultado:** 6 passam, 2 falham

| ID | RF | Descrição do defeito | Entrada que expõe | Esperado (spec) | Obtido (IA) | Severidade | Status |
|---|---|---|---|---|---|---|---|
| D01 | RF01 | Preço unitário negativo é aceito; subtotal fica negativo | `[{ precoUnitario: -10, quantidade: 1 }]` | rejeitar entrada inválida | `-10` | Média | Aberto |
| D02 | RF01 | Preço `undefined` gera `NaN` sem lançar erro | `[{ precoUnitario: undefined, quantidade: 1 }]` | erro claro ao chamador | `NaN` | Média | Aberto |

---

## Função 2 — `aplicarDesconto` (RF03 a RF06)

**Autor dos testes:** José Ailton
**Resultado:** 9 passam, 2 falham

| ID | RF | Descrição do defeito | Entrada que expõe | Esperado (spec) | Obtido (IA) | Severidade | Status |
|---|---|---|---|---|---|---|---|
| D03 | RF06 | Subtotal negativo retorna `desconto` negativo e `valorComDesconto` zerado — incoerente | `aplicarDesconto(-10)` | rejeitar entrada inválida | `{ desconto: -10, valorComDesconto: 0 }` | Média | Aberto |
| D04 | RF06 | `NaN` propagado silenciosamente para o retorno | `aplicarDesconto(NaN)` | erro claro ao chamador | `{ desconto: NaN, valorComDesconto: NaN }` | Baixa | Aberto |

---

## Função 3 — `calcularFrete` (RF07, RF08)

**Autor dos testes:** Fernanda
**Resultado:** —

| ID | RF | Descrição do defeito | Entrada que expõe | Esperado (spec) | Obtido (IA) | Severidade | Status |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

---

## Função 4 — `fecharPedido` (RF09 a RF12)

**Autor dos testes:** Fernanda
**Resultado:** —

| ID | RF | Descrição do defeito | Entrada que expõe | Esperado (spec) | Obtido (IA) | Severidade | Status |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

---

## Ambiguidades da especificação (não são defeitos — alimentam a Parte 3)

| ID | RF | Ponto em aberto | Decisão adotada nos testes |
|---|---|---|---|
| A01 | RF03 | "acima de 200" / "acima de 500" inclui o valor exato? | Estritamente maior: 200,00 → 0%; 500,00 → 5% |
| A02 | RF04 | O cupom `"COOP10"` é case-sensitive? | Sim; `"coop10"` é ignorado |
| A03 | RF01 / RF06 | O que fazer com preço ou subtotal negativo ou `NaN`? | Rejeitar com erro (a spec não define) |
| A04 | RF01 | Arredondamento de valores negativos segue "meio para cima" ou "meio para longe do zero"? | Não testado — depende de A03 ser resolvido |