// Importar las funciones o módulos necesarios (asegúrate de que estén disponibles en tu entorno)
const { getHistoryParse } = require('../utils/handleHistory'); 
const AIClass = require('../services/ai'); // Reemplaza la ruta según tu estructura de carpetas
const { flowSeller, flowSchedule, flowConfirm } = require('../flows'); // Reemplaza las rutas según tu estructura de carpetas

/**
 * Determina qué flujo va a iniciarse basado en el historial previo entre el bot y el humano
 */
module.exports = async (_, { state, gotoFlow, extensions }) => {
    const ai = extensions.ai instanceof AIClass ? extensions.ai : new AIClass(); // Asegúrate de crear una instancia válida de AIClass
    const history = getHistoryParse(state);
    const prompt = `Como una inteligencia artificial avanzada, tu tarea es analizar el contexto de una conversación y determinar cuál de las siguientes acciones es más apropiada para realizar:
    --------------------------------------------------------
    Historial de conversación:
    ${history}
    
    Posibles acciones a realizar:
    1. AGENDAR: Esta acción se debe realizar cuando el cliente expresa su deseo de programar una cita.
    2. HABLAR: Esta acción se debe realizar cuando el cliente desea hacer una pregunta o necesita más información.
    3. CONFIRMAR: Esta acción se debe realizar cuando el cliente y el vendedor llegaron a un acuerdo mutuo proporcionando una fecha, día y hora exacta sin conflictos de hora.
    -----------------------------
    Tu objetivo es comprender la intención del cliente y seleccionar la acción más adecuada en respuesta a su declaración.
    
    Respuesta ideal (AGENDAR|HABLAR|CONFIRMAR):`;

    const text = await ai.createChat([
        {
            role: 'system',
            content: prompt,
        },
    ]);

    if (text.includes('HABLAR')) return gotoFlow(flowSeller);
    if (text.includes('AGENDAR')) return gotoFlow(flowSchedule);
    if (text.includes('CONFIRMAR')) return gotoFlow(flowConfirm);
};
