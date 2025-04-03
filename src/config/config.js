/**
 * Configuración central del bot
 */
require('dotenv').config();

const config = {
    // Información general
    botName: process.env.BOT_NAME || 'WhatsApp Bot',
    prefix: process.env.BOT_PREFIX || '!',
    
    // Números de administradores (pueden usar comandos admin)
    admins: [
        process.env.ADMIN_NUMBER, // Número de administrador desde .env
        // Agrega más números aquí
    ],
    
    // Configuración de sesión
    sessionFolder: process.env.SESSION_FOLDER || './sessions',
    
    // Configuración de respuesta
    responseDelay: 500, // Retraso en ms antes de responder (más natural)
    typingDelay: 1000, // Mostrar indicador de "escribiendo" por x ms
    
    // Límites para evitar spam/flood
    cooldowns: {
        enabled: true,
        defaultCooldown: 3, // segundos entre comandos
        commands: {
            // Cooldowns específicos por comando
            'spam': 60,
            'broadcast': 300
        }
    },
    
    // Configuración avanzada
    ignoreBots: true, // Ignorar mensajes de otros bots
    logLevel: process.env.LOG_LEVEL || 'info',
    
    // API keys de servicios externos (ejemplo)
    apis: {
        openai: process.env.OPENAI_API_KEY || '',
        weather: process.env.WEATHER_API_KEY || ''
    }
};

module.exports = config;