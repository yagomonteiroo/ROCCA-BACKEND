import prisma from "../prisma/client.js"

export const criarCliente = async (req, res, next) => {
  try {
    const { nome, email, senha, telefone, endereco } = req.body
    const clienteExistente = await prisma.cliente.findUnique({
      where: { email },
    })

    if (clienteExistente) {
      return res.status(400).json({ error: "Email já cadastrado." })
    }

    const cliente = await prisma.cliente.create({
      data: { nome, email, senha, telefone, endereco },
    })

    res.status(201).json(cliente)
  } catch (error) {
    next(error)
  }
}

export const listarClientes = async (req, res, next) => {
  try {
    const clientes = await prisma.cliente.findMany()
    res.json(clientes)
  } catch (error) {
    next(error)
  }
}

export const buscarClientePorId = async (req, res, next) => {
  try {
    const { id } = req.params
    const cliente = await prisma.cliente.findUnique({ where: { id } })

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." })
    }

    res.json(cliente)
  } catch (error) {
    next(error)
  }
}

export const atualizarCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nome, email, senha, telefone, endereco } = req.body

    const cliente = await prisma.cliente.update({
      where: { id },
      data: { nome, email, senha, telefone, endereco },
    })

    res.json(cliente)
  } catch (error) {
    next(error)
  }
}

export const deletarCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    await prisma.cliente.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
