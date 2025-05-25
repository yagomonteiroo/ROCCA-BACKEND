import { prisma } from "../prisma/client.js"

export const criarProduto = async (req, res, next) => {
  try {
    const { nome, descricao, preco, estoque } = req.body
    const produto = await prisma.produto.create({
      data: { nome, descricao, preco, estoque },
    })

    res.status(201).json(produto)
  } catch (error) {
    next(error)
  }
}

export const listarProdutos = async (req, res, next) => {
  try {
    const produtos = await prisma.produto.findMany()
    res.json(produtos)
  } catch (error) {
    next(error)
  }
}

export const buscarProdutoPorId = async (req, res, next) => {
  try {
    const { id } = req.params
    const produto = await prisma.produto.findUnique({ where: { id } })

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." })
    }

    res.json(produto)
  } catch (error) {
    next(error)
  }
}

export const atualizarProduto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nome, descricao, preco, estoque } = req.body

    const produto = await prisma.produto.update({
      where: { id },
      data: { nome, descricao, preco, estoque },
    })

    res.json(produto)
  } catch (error) {
    next(error)
  }
}

export const deletarProduto = async (req, res, next) => {
  try {
    const { id } = req.params
    await prisma.produto.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
