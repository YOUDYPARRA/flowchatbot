const { format } = require('date-fns');

const getFullCurrentDate = () => {
    const currentD = new Date();
    const formatDate = format(currentD, 'yyyy/MM/dd HH:mm'); // Formato "dd/MM/yyyy HH:mm:ss"
    const day = format(currentD, 'EEEE'); // Obtener el día de la semana

    return [
        formatDate,
        day,
    ].join(' ');
};

module.exports = { getFullCurrentDate };
