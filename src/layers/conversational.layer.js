// Importar las funciones o módulos necesarios (asegúrate de que estén disponibles en tu entorno)
const { handleHistory } = require('../utils/handleHistory');

/**
 * Su función es almacenar en el estado todos los mensajes que el usuario escriba
 */
module.exports = async ({ body }, { state }) => {
    await handleHistory({ content: body, role: 'user' }, state);
};
