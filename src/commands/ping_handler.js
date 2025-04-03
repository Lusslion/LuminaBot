/**
 * Comando Ping - Ejemplo de un handler simple
 */

const moment = require('moment');

const handler = {
    // Nombre interno del handler
    name: 'ping',
    
    // Comando que activa este handler
    command: 'ping',
    
    // Descripción para el comando de ayuda
    description: 'Comprueba si el bot está en línea y su tiempo de respuesta',
    
    // Ejemplo de uso
    usage: '!ping',
    
    /**
     * Ejecuta el comando
     * @param {Object} socket - Cliente WhatsApp
     * @param {Object} message - Mensaje recibido
     * @param {Array} args - Argumentos del comando
     */
    async execute(socket, message, args) {
        // Obtener el tiempo de inicio
        const startTime = moment();
        
        // Enviar mensaje inicial
        const initialMsg = await socket.sendMessage(message.key.remoteJid, {
            text: '🏓 Pong!'
        });
        
        // Calcular el tiempo de respuesta
        const endTime = moment();
        const responseTime = endTime.diff(startTime, 'milliseconds');
        
        // Enviar mensaje final con el tiempo de respuesta
        await socket.sendMessage(message.key.remoteJid, {
            text: `⏱️ Latencia: ${responseTime}ms\n🟢 Bot en línea y funcionando correctamente.`
        }, { quoted: message });
    }
};

module.exports = handler;