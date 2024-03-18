// Importar módulos o funciones necesarias (reemplaza las rutas de los módulos según tu estructura de carpetas)
const { EVENTS, addKeyword } = require("@bot-whatsapp/bot");
const conversationalLayer = require("...src/layers/conversational.layer");
const mainLayer = require("src/layers/main.layer");

/**
 * Este flujo responde a cualquier palabra que escriban
 */
const botFlow = addKeyword(['holi', 'hola', 'buenas', 'quetal', 'ola', 'que tal'])
    .addAction(conversationalLayer)
    .addAction(mainLayer);
// Exportar el flujo del bot
module.exports = botFlow;