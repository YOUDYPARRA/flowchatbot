// Importar las funciones o módulos necesarios (asegúrate de que estén disponibles en tu entorno)
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const AIClass = require('../services/ai'); // Reemplaza la ruta según tu estructura de carpetas
const { getHistoryParse, handleHistory } = require('../utils/handleHistory'); // Reemplaza las rutas según tu estructura de carpetas
const { getFullCurrentDate } = require('../utils/currentDate'); // Reemplaza la ruta según tu estructura de carpetas
const { getCurrentCalendar } = require('../services/calendar'); // Reemplaza la ruta según tu estructura de carpetas

const PROMPT_SCHEDULE = `
Como ingeniero de inteligencia artificial especializado en la programación de reuniones, tu objetivo es analizar la conversación y determinar la intención del cliente de programar una reunión, así como su preferencia de fecha y hora. La reunión durará aproximadamente 45 minutos y solo puede ser programada entre las 9am y las 4pm, de lunes a viernes, y solo para la semana en curso.

Fecha de hoy: {CURRENT_DAY}

Reuniones ya agendadas:
-----------------------------------
{AGENDA_ACTUAL}

Historial de Conversacion:
-----------------------------------
{HISTORIAL_CONVERSACION}

Ejemplos de respuestas adecuadas para sugerir horarios y verificar disponibilidad:
----------------------------------
"Por supuesto, tengo un espacio disponible mañana, ¿a qué hora te resulta más conveniente?"
"Sí, tengo un espacio disponible hoy, ¿a qué hora te resulta más conveniente?"
"Ciertamente, tengo varios huecos libres esta semana. Por favor, indícame el día y la hora que prefieres."

INSTRUCCIONES:
- NO saludes
- Si existe disponibilidad debes decirle al usuario que confirme
- Revisar detalladamente el historial de conversación y calcular el día fecha y hora que no tenga conflicto con otra hora ya agendada
- Respuestas cortas ideales para enviar por whatsapp con emojis
-----------------------------
Respuesta útil en primera persona:`;

const generateSchedulePrompt = (summary, history) => {
    const nowDate = getFullCurrentDate(); // Asegúrate de llamar a la función correctamente
    // Resto del código...
};

// Exportar las funciones necesarias (puedes agregar más si es necesario)
module.exports = { generateSchedulePrompt };