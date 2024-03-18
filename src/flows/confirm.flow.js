// Importar las funciones o módulos necesarios (asegúrate de que estén disponibles en tu entorno)
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const AIClass = require('../services/ai'); // Reemplaza la ruta según tu estructura de carpetas
const { clearHistory, handleHistory, getHistoryParse } = require('../utils/handleHistory'); // Reemplaza las rutas según tu estructura de carpetas
const { getFullCurrentDate } = require('../utils/currentDate'); // Reemplaza la ruta según tu estructura de carpetas
const { appToCalendar } = require('src/services/calendar'); // Reemplaza la ruta según tu estructura de carpetas

const generatePromptToFormatDate = (history) => {
    const prompt = `Fecha de Hoy:${getFullCurrentDate()}, Basado en el Historial de conversacion: 
    ${history}
    ----------------
    Fecha ideal:...dd / mm hh:mm`;

    return prompt;
};

const generateJsonParse = (info) => {
    const prompt = `tu tarea principal es analizar la información proporcionada en el contexto y generar un objeto JSON que se adhiera a la estructura especificada a continuación. 

    Contexto: "${info}"
    
    {
        "name": "Leifer",
        "interest": "n/a",
        "value": "0",
        "email": "fef@fef.com",
        "startDate": "2024/02/15 00:00:00"
    }
    
    Objeto JSON a generar:`;

    return prompt;
};

/**
 * Encargado de pedir los datos necesarios para registrar el evento en el calendario
 */
const flowConfirm = addKeyword(EVENTS.ACTION).addAction(async (_, { flowDynamic }) => {
    await flowDynamic('Ok, voy a pedirte unos datos para agendar');
    await flowDynamic('¿Cual es tu nombre?');
}).addAction({ capture: true }, async (ctx, { state, flowDynamic, extensions }) => {
    await state.update({ name: ctx.body });
    const ai = extensions.ai instanceof AIClass ? extensions.ai : new AIClass(); // Asegúrate de crear una instancia válida de AIClass
    const history = getHistoryParse(state);
    const text = await ai.createChat([
        {
            role: 'system',
            content: generatePromptToFormatDate(history),
        },
    ], 'gpt-4');

    await handleHistory({ content: text, role: 'assistant' }, state);
    await flowDynamic(`¿Me confirmas fecha y hora?: ${text}`);
    await state.update({ startDate: text });
});
