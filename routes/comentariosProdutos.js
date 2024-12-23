import { db } from "../src/db.js";

export const comentariosProdutos = async (nome, res) => {

    try{
        const [comentarios] = await db.query("SELECT comentario, nota FROM produtos WHERE nome_produto = ?", [nome])

        if (comentarios.length == 0){
            return res.status(400).json({mensagem: "Produto não existente na base de dados"})
        }

        return res.status(200).json(comentarios)

    } catch (err) {
        return res.status(500).json({mensagem: "Não foi possivel realizar a consulta"})
    }
}