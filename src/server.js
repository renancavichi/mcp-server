import express from 'express'
import userRouter from './routers/userRouter.js'

const app = express()
const port = process.env.PORT || 3000

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json())

// Boas-vindas
app.get('/', (req, res) => {
  res.send('Bem-vindo à API do MCP Server!')
})

// Rotas da API
app.use('/api', userRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
