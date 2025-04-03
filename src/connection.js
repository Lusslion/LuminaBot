const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');
const { loadHandlers } = require('./managerHandler');
const logger = require('./utils/logger');

// Asegurarse de que existe el directorio de sesión
const SESSION_DIR = process.env.SESSION_FOLDER || './sessions';
if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
}

/**
 * Crea y gestiona la conexión con WhatsApp
 */
async function createConnection() {
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
    
    // Opciones de conexión
    const socket = makeWASocket({
        printQRInTerminal: false, // Manejamos el QR manualmente
        auth: state,
        logger: pino({ level: process.env.LOG_LEVEL || 'silent' }),
        browser: ['WhatsApp Bot', 'Chrome', '91.0.4472.124'],
    });
    
    // Manejar la conexión
    socket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        // Si hay un código QR, mostrarlo
        if (qr) {
            logger.info('Escanea el código QR para iniciar sesión:');
            qrcode.generate(qr, { small: true });
        }
        
        // Manejar cambios en la conexión
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)
                ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
                : true;
                
            const reason = lastDisconnect?.error?.message || 'Razón desconocida';
            logger.error(`Conexión cerrada debido a: ${reason}`, lastDisconnect?.error);
            
            if (shouldReconnect) {
                logger.warn('Reconectando en 3 segundos...');
                setTimeout(createConnection, 3000);
            } else {
                logger.warn('Sesión cerrada. Por favor elimina la carpeta de sesión y vuelve a iniciar el bot.');
            }
        } else if (connection === 'open') {
            logger.success(`Conectado como: ${socket.user?.name || socket.user?.id?.split(':')[0] || 'Usuario desconocido'}`);
            
            // Cargar los manejadores de comandos una vez conectado
            loadHandlers(socket);
        }
    });

    // Manejar errores de conexión
    socket.ev.on('connection.error', (error) => {
        logger.error('Error de conexión detectado:', error);
    });
    
    // Guardar credenciales cuando se actualicen
    socket.ev.on('creds.update', saveCreds);
    
    // Manejar mensajes entrantes
    socket.ev.on('messages.upsert', async ({ messages }) => {
        for (const message of messages) {
            // Procesar solo mensajes nuevos y no de status
            if (message.key && !message.key.fromMe && message.message && message.key.remoteJid !== 'status@broadcast') {
                // Procesar el mensaje (se maneja a través de los handlers)
            }
        }
    });
    
    return socket;
}

module.exports = { createConnection };