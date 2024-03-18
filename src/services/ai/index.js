//index de IA
// Importar la clase OpenAI (asegúrate de que esté disponible en tu entorno)
const OpenAI = require('openai'); // Reemplaza la ruta según tu estructura de carpetas

class AIClass {
    constructor(apiKey, _model) {
        this.openai = new OpenAI({ apiKey, timeout: 15 * 1000 });
        if (!apiKey || apiKey.length === 0) {
            throw new Error('OPENAI_KEY is missing');
        }

        this.model = _model;
    }

    /**
     * @param messages
     * @param model
     * @param temperature
     * @returns
     */
    async createChat(messages, model, temperature = 0) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: model || this.model,
                messages,
                temperature,
                max_tokens: 326,
                top_p: 0,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            return completion.choices[0].message.content;
        } catch (err) {
            console.error(err);
            return 'ERROR';
        }
    }
}

// Exportar la clase
module.exports = AIClass;
