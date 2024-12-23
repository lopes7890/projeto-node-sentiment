import { db } from "../src/db.js";
import { nota } from "../functions/calcularNota.js";

export const comentarioProduto = async (req, res, nome) => {

    try{

        const { comentario } = req.body;

        if (comentario.toLowerCase().match(/[a-z]/g) == null){
            return res.status(400).json({mensagem: "Comentário não enviado"})
        }

        const notaFinal = await nota(comentario);

        console.log(notaFinal)

        if (notaFinal == 0 || notaFinal == undefined || notaFinal == null || notaFinal == " ") {
            return res.status(500).json({mensagem: "Não foi possivel calcular a nota"})
        }

        await db.query("INSERT INTO produtos (nome_produto, comentario, nota) VALUES (?, ?, ?)", 
            [nome, comentario, notaFinal]);

        return res.status(200).json({mensagem: "Avaliação inserida com sucesso!"})

    } catch (err) {
        return res.status(500).json({mensagem: "Erro ao inserir a nota"})
    };

};