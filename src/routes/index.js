import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import clienteRoutes from "./routes/cliente.routes.js"
import produtoRoutes from "./routes/produto.routes.js"
import categoriaRoutes from "./routes/categoria.routes.js"
import pedidoRoutes from "./routes/pedido.routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/clientes", clienteRoutes)
app.use("/produtos", produtoRoutes)
app.use("/categorias", categoriaRoutes)
app.use("/pedidos", pedidoRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: "Erro interno do servidor" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
