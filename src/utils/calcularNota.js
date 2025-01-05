import Sentiment from "sentiment";

let linguaPortugues = {
    labels: {
        // bom
        'amei': + 3,
        'gostei': + 2,
        'perfeito': + 3,
        'incrivel': + 3,
        'legal': + 1,
        'bonito': + 2,
        'confortavel': + 1,
        'agradavel': + 2,

        // ruim
        'odiei': -3,
        'horrivel': -3,
        'desconfortavel': -2,
        'feio': -1,
        'ruim': -2,
        'pessimo': -3,
        'desagradavel': -2

    }
}

export const nota = async (comentario) => {
    try{

        const sentiment = new Sentiment();
        sentiment.registerLanguage('pt', linguaPortugues);


        const resultado = sentiment.analyze(comentario, {language: 'pt'})

        console.log(resultado)

        return resultado.score

    }  catch (err) {
        console.log(err)
        return;
    };

}