import prisma from "../prisma/client.js"

export const criarCategoria = async (req, res, next) => {
  try {
    const { nome, descricao } = req.body

    const categoriaExistente = await prisma.categoria.findUnique({
      where: { nome },
    })
    if (categoriaExistente) {
      return res.status(400).json({ error: "Categoria já existe" })
    }

    const categoria = await prisma.categoria.create({
      data: { nome, descricao },
    })

    res.status(201).json(categoria)
  } catch (error) {
    next(error)
  }
}

export const listarCategorias = async (req, res, next) => {
  try {
    const categorias = await prisma.categoria.findMany()
    res.json(categorias)
  } catch (error) {
    next(error)
  }
}

export const buscarCategoriaPorId = async (req, res, next) => {
  try {
    const { id } = req.params
    const categoria = await prisma.categoria.findUnique({ where: { id } })

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" })
    }

    res.json(categoria)
  } catch (error) {
    next(error)
  }
}

export const atualizarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nome, descricao } = req.body

    const categoria = await prisma.categoria.update({
      where: { id },
      data: { nome, descricao },
    })

    res.json(categoria)
  } catch (error) {
    next(error)
  }
}

export const deletarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.categoria.delete({
      where: { id },
    })

    res.status(204).send() // No Content
  } catch (error) {
    next(error)
  }
}
