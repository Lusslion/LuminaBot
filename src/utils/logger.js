/**
 * Utilidad para logs coloridos en la consola con opciones de formato
 */
const chalk = require('chalk');
const moment = require('moment');

// Configuración para logs resumidos o completos
const LOG_MODE = process.env.LOG_MODE || 'full'; // 'full' o 'short'

/**
 * Formatea la fecha y hora actual
 * @returns {String} Fecha y hora formateada
 */
function getDateTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Formatea el mensaje según el modo de log
 * @param {String} level - Nivel del log
 * @param {String} message - Mensaje a mostrar
 * @returns {String} Mensaje formateado
 */
function formatMessage(level, message) {
    const timestamp = chalk.gray(`[${getDateTime()}]`);
    const levelTag = {
        info: chalk.blue('ℹ️ INFO'),
        success: chalk.green('✅ SUCCESS'),
        warn: chalk.yellow('⚠️ WARNING'),
        error: chalk.red('❌ ERROR'),
        debug: chalk.magenta('🔍 DEBUG')
    }[level];

    if (LOG_MODE === 'short') {
        return `${levelTag} ${message}`;
    }
    return `${levelTag} ${timestamp} ${message}`;
}

/**
 * Muestra un mensaje informativo
 * @param {String} message - Mensaje a mostrar
 */
function info(message) {
    console.log(formatMessage('info', message));
}

/**
 * Muestra un mensaje de éxito
 * @param {String} message - Mensaje a mostrar
 */
function success(message) {
    console.log(formatMessage('success', message));
}

/**
 * Muestra un mensaje de advertencia
 * @param {String} message - Mensaje a mostrar
 */
function warn(message) {
    console.log(formatMessage('warn', message));
}

/**
 * Muestra un mensaje de error con traza opcional
 * @param {String} message - Mensaje a mostrar
 * @param {Error} [error] - Objeto de error opcional
 */
function error(message, error = null) {
    const formattedMessage = formatMessage('error', message);
    console.log(formattedMessage);
    if (error && error.stack) {
        console.log(chalk.red(error.stack));
    }
}

/**
 * Muestra un mensaje de depuración
 * @param {String} message - Mensaje a mostrar
 */
function debug(message) {
    if (process.env.NODE_ENV === 'development') {
        console.log(formatMessage('debug', message));
    }
}

module.exports = {
    info,
    success,
    warn,
    error,
    debug
};