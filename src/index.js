import express from "express";
import { comentarioProduto } from "./controllers/inserirComentario.js";
import { resultadosProdutos} from "./controllers/avaliacaoProduto.js";
import { comentariosProdutos } from "./controllers/comentariosProdutos.js";
const app = express()

app.use(express.json())

app.param("nomeProduto", (req, res, next, nomeProduto) => {
    req.nomeProduto = nomeProduto
    next()
})

app.post("/produto/:nomeProduto", async (req, res) => {

    try{
        await comentarioProduto(req, res, req.nomeProduto)
    } catch (err){
        res.status(500).json({mensagem: "Erro ao realizar conexão"})
    }

})

app.get("/avaliacao/media/:nomeProduto", async (req, res) => {

    try{
        await resultadosProdutos(req.nomeProduto, res)
    } catch (err) {
        res.status(500).json({mensagem: "Erro ao realizar conexão"})
    }

})

app.get("/avaliacao/:nomeProduto", async (req, res) => {

    try{
        await comentariosProdutos(req.nomeProduto, res)
    } catch (err) {
        res.status(500).json({mensagem: "Erro ao realizar conexão"})
    }
})

app.listen(5090, () => {
    console.log("servidor on!")
})