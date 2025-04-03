/**
 * Middleware de autenticación para comandos
 */
const config = require('../config/config');
const logger = require('../utils/logger');

/**
 * Verifica si un usuario puede ejecutar un comando
 * @param {Object} message - Mensaje recibido
 * @param {Object} commandRequirements - Requisitos del comando
 * @returns {Object} Resultado de la verificación
 */
function verifyPermission(message, commandRequirements = {}) {
    // Obtener el remitente
    const sender = message.key.remoteJid;
    const participant = message.key.participant; // Para grupos
    const senderJid = participant || sender;

    // Resultado predeterminado
    const result = {
        allowed: true,
        reason: ''
    };

    // Verificar si requiere ser admin
    if (commandRequirements.adminOnly) {
        const isAdmin = config.admins.some(admin => senderJid.includes(admin));
        if (!isAdmin) {
            result.allowed = false;
            result.reason = 'Este comando solo puede ser ejecutado por administradores.';
            return result;
        }
    }

    // Verificar si el comando tiene un cooldown
    if (config.cooldowns.enabled) {
        // Implementar lógica de cooldown si es necesario
        // Por ejemplo, almacenar el último uso del comando por usuario
    }

    return result;
}

module.exports = {
    verifyPermission
};