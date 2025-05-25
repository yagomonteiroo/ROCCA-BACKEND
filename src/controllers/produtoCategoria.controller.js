import prisma from "../prisma/client.js"

export const adicionarCategoriaAoProduto = async (req, res, next) => {
  try {
    const { produtoId, categoriaId } = req.body

    // Verificar se produto e categoria existem
    const produto = await prisma.produto.findUnique({
      where: { id: produtoId },
    })
    const categoria = await prisma.categoria.findUnique({
      where: { id: categoriaId },
    })
    if (!produto || !categoria) {
      return res
        .status(404)
        .json({ error: "Produto ou Categoria não encontrados" })
    }

    // Verificar se já existe associação
    const existe = await prisma.produtoCategoria.findUnique({
      where: { produtoId_categoriaId: { produtoId, categoriaId } },
    })
    if (existe) {
      return res
        .status(400)
        .json({ error: "Categoria já associada ao produto" })
    }

    const produtoCategoria = await prisma.produtoCategoria.create({
      data: { produtoId, categoriaId },
    })

    res.status(201).json(produtoCategoria)
  } catch (error) {
    next(error)
  }
}

export const removerCategoriaDoProduto = async (req, res, next) => {
  try {
    const { produtoId, categoriaId } = req.params

    await prisma.produtoCategoria.delete({
      where: { produtoId_categoriaId: { produtoId, categoriaId } },
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

export const listarCategoriasDoProduto = async (req, res, next) => {
  try {
    const { produtoId } = req.params

    const categorias = await prisma.produtoCategoria.findMany({
      where: { produtoId },
      include: { categoria: true },
    })

    res.json(categorias.map((pc) => pc.categoria))
  } catch (error) {
    next(error)
  }
}

export const listarProdutosPorCategoria = async (req, res, next) => {
  try {
    const { categoriaId } = req.params

    const produtos = await prisma.produtoCategoria.findMany({
      where: { categoriaId },
      include: { produto: true },
    })

    res.json(produtos.map((pc) => pc.produto))
  } catch (error) {
    next(error)
  }
}
