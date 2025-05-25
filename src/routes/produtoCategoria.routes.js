import { Router } from "express"
import {
  adicionarCategoriaAoProduto,
  removerCategoriaDoProduto,
  listarCategoriasDoProduto,
  listarProdutosPorCategoria,
} from "../controllers/produtoCategoria.controller.js"

const router = Router()

router.post("/", adicionarCategoriaAoProduto)
router.delete("/:produtoId/:categoriaId", removerCategoriaDoProduto)
router.get("/produto/:produtoId", listarCategoriasDoProduto)
router.get("/categoria/:categoriaId", listarProdutosPorCategoria)

export default router
