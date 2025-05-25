import { Router } from "express"
import {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  deletarCliente,
} from "../controllers/cliente.controller.js"

const router = Router()

router.post("/", criarCliente)
router.get("/", listarClientes)
router.get("/:id", buscarClientePorId)
router.put("/:id", atualizarCliente)
router.delete("/:id", deletarCliente)

export default router
