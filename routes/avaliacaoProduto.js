import { db } from "../src/db.js";

export const resultadosProdutos = async (nome, res) => {
    try {
        
        const [resultado] = await db.query("SELECT AVG(nota) AS media_nota FROM produtos WHERE nome_produto = ?", [nome]);

        if (resultado.length > 0 && resultado[0].media_nota !== null){
            const resultadoFinal = Number(resultado[0].media_nota)

            if (resultadoFinal <= 1) {
                return res.status(200).json({media: resultadoFinal.toFixed(2), produto: "ruim"})
            } else {
                return res.status(200).json({media: resultadoFinal.toFixed(2), produto: "bom"})
            }
            
        } else {
            return res.status(400).json({mensagem: "Produto não existente na base de dados"})
        }

    } catch (err){
        return res.status(500).json({mensagem: "Erro ao realizar consulta"})
    };
}