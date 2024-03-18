const { BotState } = require('@bot-whatsapp/bot/dist/types')

const History =
 {
     role: 'user' | 'assistant',
 content: string 
}

const handleHistory = async (inside, _state) => {
    const history = _state.get('history') || []; // Obtener historial previo o inicializar como una matriz vacía
    history.push(inside); // Agregar la entrada de historial
    await _state.update({ history }); // Actualizar el estado con la nueva matriz de historial
};

const getHistory = (_state, k = 6) => {
    const history = _state.get('history') || []; // Obtener historial previo o inicializar como una matriz vacía
    const limitHistory = history.slice(-k); // Obtener los últimos 'k' elementos del historial
    return limitHistory;
};

// Función getHistoryParse (similar al original en TypeScript)
const getHistoryParse = (_state, k = 6) => {
    const history = _state.get('history') || []; // Obtener historial previo o inicializar como una matriz vacía
    const limitHistory = history.slice(-k); // Obtener los últimos 'k' elementos del historial

    // Reducir el historial a una cadena formateada
    const formattedHistory = limitHistory.reduce((prev, current) => {
        const msg = current.role === 'user' ? `\nCliente: "${current.content}"` : `\nVendedor: "${current.content}"`;
        return prev + msg;
    }, '');

    return formattedHistory;
};

// Función clearHistory (similar al original en TypeScript)
const clearHistory = async (_state) => {
    _state.clear();
};

// Exportar las funciones
module.exports = { handleHistory, getHistory, getHistoryParse, clearHistory };