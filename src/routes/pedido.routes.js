import { Router } from "express"
import {
  criarPedido,
  listarPedidosPorCliente,
} from "../controllers/pedido.controller.js"

const router = Router()

router.post("/", criarPedido)
router.get("/cliente/:clienteId", listarPedidosPorCliente)

export default router
