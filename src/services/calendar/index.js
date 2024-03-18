const {format, addMinutes} = require("date-fns")

/**
 * POST https://hook.us1.make.com/di5gfr894srhk5jg2s3eifdwgvrv5kb4
 * 
 * Get data calendar.
 * https://hook.us1.make.com/kmna6jdokierly3i1kwgdx3j41jik9z2
 */
const getCurrentCalendar = async () => {
    try {
        const dataCalendarApi = await fetch('https://hook.us1.make.com/kmna6jdokierly3i1kwgdx3j41jik9z2');
        const json = await dataCalendarApi.json();

        const list = json.reduce((prev, current) => {
            const reservedSpace = [
                `Espacio reservado (no disponible):`,
                `Desde ${format(new Date(current.date), 'eeee do h:mm a')}`,
                `Hasta ${format(addMinutes(new Date(current.date), 45), 'eeee do h:mm a')}\n`,
            ].join(' ');

            return prev + reservedSpace;
        }, '');

        return list;
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Error al obtener el calendario';
    }
}

// Función appToCalendar
const appToCalendar = async (text) => {
    try {
        const payload = JSON.parse(text);
        console.log(payload);

        const dataApi = await fetch('https://hook.us1.make.com/di5gfr894srhk5jg2s3eifdwgvrv5kb4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return dataApi;
    } catch (err) {
        console.log('error:', err);
        return null; // Otra acción apropiada en caso de error
    }
};

// Exportar las funciones necesarias (puedes agregar más si es necesario)
module.exports = { appToCalendar, getCurrentCalendar }