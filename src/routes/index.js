import { Router } from "express"

import clienteRoutes from "./cliente.routes.js"
import produtoRoutes from "./produto.routes.js"
import categoriaRoutes from "./categoria.routes.js"
import pedidoRoutes from "./pedido.routes.js"
import produtoCategoriaRoutes from "./produtoCategoria.routes.js"

const router = Router()

router.use("/clientes", clienteRoutes)
router.use("/produtos", produtoRoutes)
router.use("/categorias", categoriaRoutes)
router.use("/pedidos", pedidoRoutes)
router.use("/produto-categorias", produtoCategoriaRoutes)

export default router
