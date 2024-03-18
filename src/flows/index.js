// Importar las funciones o módulos necesarios (asegúrate de que estén disponibles en tu entorno)
const { createFlow } = require('@bot-whatsapp/bot');
const welcomeFlow = require('./welcome.flow'); // Reemplaza la ruta según tu estructura de carpetas
const { flowSeller, flowSchedule, flowConfirm } = require('./seller.flow'); // Reemplaza las rutas según tu estructura de carpetas

/**
 * Declaramos todos los flujos que vamos a utilizar
 */
module.exports = createFlow([welcomeFlow, flowSeller, flowSchedule, flowConfirm]);
