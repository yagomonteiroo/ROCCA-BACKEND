import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes/index.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Rotas
app.use("/", routes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: "Erro interno do servidor" })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost/${PORT}`)
})
