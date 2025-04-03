const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');
const keywords = require('./config/keywords');

// Almacenar los handlers cargados
const handlers = new Map();

/**
 * Carga automáticamente todos los handlers de la carpeta commands
 * @param {Object} socket - Instancia del cliente de WhatsApp
 */
function loadHandlers(socket) {
    const handlersDir = path.join(__dirname, 'commands');
    
    // Verificar si el directorio existe
    if (!fs.existsSync(handlersDir)) {
        logger.warn(`El directorio de comandos no existe: ${handlersDir}`);
        return;
    }
    
    // Leer todos los archivos .js del directorio
    const handlerFiles = fs.readdirSync(handlersDir)
        .filter(file => file.endsWith('_handler.js'));
    
    // Cargar cada handler
    for (const file of handlerFiles) {
        try {
            const handlerPath = path.join(handlersDir, file);
            const handler = require(handlerPath);
            
            // Si el handler tiene un nombre y una función
            if (handler.name && typeof handler.execute === 'function') {
                handlers.set(handler.name, handler);
                logger.info(`Handler cargado: ${handler.name}`);
            } else {
                logger.warn(`El archivo ${file} no tiene un formato válido de handler`);
            }
        } catch (error) {
            logger.error(`Error al cargar el handler ${file}: ${error.message}`);
        }
    }
    
    // Configurar el evento de manejo de mensajes
    setupMessageHandler(socket);
    
    logger.success(`Se cargaron ${handlers.size} handlers correctamente`);
}

/**
 * Configura el manejo de mensajes para ejecutar los handlers correspondientes
 * @param {Object} socket - Instancia del cliente de WhatsApp
 */
function setupMessageHandler(socket) {
    socket.ev.on('messages.upsert', async ({ messages }) => {
        for (const message of messages) {
            // Procesar solo mensajes nuevos y no de status
            if (message.key && !message.key.fromMe && message.message && message.key.remoteJid !== 'status@broadcast') {
                try {
                    await processMessage(socket, message);
                } catch (error) {
                    logger.error(`Error al procesar mensaje: ${error.message}`);
                }
            }
        }
    });
}

/**
 * Procesa un mensaje y ejecuta el handler correspondiente
 * @param {Object} socket - Instancia del cliente de WhatsApp
 * @param {Object} message - Mensaje recibido
 */
async function processMessage(socket, message) {
    const msgType = Object.keys(message.message)[0];
    let msgText = '';

    // Obtener el texto según el tipo de mensaje
    if (msgType === 'conversation') {
        msgText = message.message.conversation;
    } else if (msgType === 'extendedTextMessage') {
        msgText = message.message.extendedTextMessage.text;
    } else {
        // Otros tipos de mensajes (imagen, video, etc.)
        return;
    }

    // Log bonito para mensajes recibidos
    const sender = message.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const senderName = isGroup ? `Grupo (${sender})` : `Chat personal (${sender})`;
    logger.info(`📩 Mensaje recibido de ${senderName}: "${msgText}"`);

    // Buscar el handler correspondiente (sin prefijo)
    for (const [name, handler] of handlers.entries()) {
        if (msgText.toLowerCase().startsWith(handler.command.toLowerCase())) {
            logger.info(`Ejecutando comando: ${handler.command}`);
            const args = msgText.slice(handler.command.length).trim().split(' ');
            await handler.execute(socket, message, args);
            return;
        }
    }

    // Si no es un comando, procesar palabras clave
    await processKeywords(socket, message, msgText);
}

/**
 * Procesa palabras clave del diccionario
 * @param {Object} socket - Instancia del cliente de WhatsApp
 * @param {Object} message - Mensaje recibido
 * @param {String} text - Texto del mensaje
 */
async function processKeywords(socket, message, text) {
    const textLower = text.toLowerCase().trim();
    
    // Buscar palabra clave exacta primero
    for (const [key, data] of Object.entries(keywords)) {
        const keyLower = key.toLowerCase();
        
        // Comprobar si es una coincidencia exacta o regex
        if ((data.isRegex && new RegExp(keyLower, 'i').test(textLower)) || 
            (!data.isRegex && textLower === keyLower)) {
            
            // Procesar según el tipo de respuesta
            switch (data.type) {
                case 'text':
                    await sendMessage(socket, message.key.remoteJid, { text: data.content });
                    break;
                    
                case 'media':
                    // Implementar envío de media
                    break;
                    
                case 'button':
                    // Implementar envío de botones
                    break;
                    
                // Otros tipos
                default:
                    break;
            }
            
            // Romper después de encontrar la primera coincidencia
            return;
        }
    }
}

/**
 * Envía un mensaje usando el socket de WhatsApp
 * @param {Object} socket - Instancia del cliente de WhatsApp
 * @param {String} jid - ID del chat
 * @param {Object} content - Contenido del mensaje
 */
async function sendMessage(socket, jid, content) {
    try {
        await socket.sendMessage(jid, content);
    } catch (error) {
        logger.error(`Error al enviar mensaje: ${error.message}`);
    }
}

module.exports = {
    loadHandlers,
    handlers,
    sendMessage
};