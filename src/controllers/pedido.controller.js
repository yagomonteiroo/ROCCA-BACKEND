import prisma from "../prisma/client.js"

export const criarPedido = async (req, res, next) => {
  try {
    const { clienteId, itens, pagamento } = req.body

    if (!Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: "Itens do pedido são obrigatórios" })
    }

    // Calcular total do pedido
    let total = 0
    for (const item of itens) {
      if (!item.produtoId || !item.quantidade || item.quantidade <= 0) {
        return res.status(400).json({ error: "Itens inválidos" })
      }
      // Buscar preço do produto para cálculo
      const produto = await prisma.produto.findUnique({
        where: { id: item.produtoId },
      })
      if (!produto) {
        return res
          .status(400)
          .json({ error: `Produto não encontrado: ${item.produtoId}` })
      }
      if (produto.estoque < item.quantidade) {
        return res
          .status(400)
          .json({ error: `Estoque insuficiente para produto: ${produto.nome}` })
      }
      total += produto.preco.toNumber() * item.quantidade
    }

    // Criar pedido com itens e pagamento em uma única transação
    const pedido = await prisma.pedido.create({
      data: {
        clienteId,
        status: "PENDENTE",
        total,
        itens: {
          create: itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario ?? undefined, // pode usar preco do produto
          })),
        },
        pagamento: {
          create: pagamento, // { tipoPagamento, statusPagamento }
        },
      },
      include: {
        itens: true,
        pagamento: true,
      },
    })

    // Atualizar estoque dos produtos
    for (const item of itens) {
      await prisma.produto.update({
        where: { id: item.produtoId },
        data: { estoque: { decrement: item.quantidade } },
      })
    }

    res.status(201).json(pedido)
  } catch (error) {
    next(error)
  }
}

export const listarPedidosPorCliente = async (req, res, next) => {
  try {
    const { clienteId } = req.params

    const pedidos = await prisma.pedido.findMany({
      where: { clienteId },
      include: {
        itens: { include: { produto: true } },
        pagamento: true,
      },
    })

    res.json(pedidos)
  } catch (error) {
    next(error)
  }
}
