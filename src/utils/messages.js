/**
 * Utilidades para el manejo de mensajes
 */
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');

/**
 * Muestra un código QR en la terminal con formato
 * @param {String} qr - String del código QR
 */
function showQRCode(qr) {
    console.log('\n' + chalk.green('▶️ Escanea este código QR con WhatsApp:'));
    console.log('\n');
    qrcode.generate(qr, { small: true });
    console.log('\n');
    console.log(chalk.yellow('⏳ Esperando que escanees el código QR...'));
}

/**
 * Extrae el texto de un mensaje según su tipo
 * @param {Object} msg - Objeto del mensaje
 * @returns {String} Texto extraído
 */
function extractMessageText(msg) {
    if (!msg || !msg.message) return '';
    
    const msgType = Object.keys(msg.message)[0];
    
    // Texto normal
    if (msgType === 'conversation') {
        return msg.message.conversation || '';
    }
    
    // Texto extendido (con formato)
    if (msgType === 'extendedTextMessage') {
        return msg.message.extendedTextMessage.text || '';
    }
    
    // Texto en imagen/video/documento
    if (['imageMessage', 'videoMessage', 'documentMessage'].includes(msgType)) {
        return msg.message[msgType].caption || '';
    }
    
    return '';
}

/**
 * Verifica si un usuario es administrador
 * @param {String} jid - JID del usuario
 * @returns {Boolean} Es administrador o no
 */
function isAdmin(jid) {
    const adminNumber = process.env.ADMIN_NUMBER;
    if (!adminNumber) return false;
    
    return jid.includes(adminNumber);
}

/**
 * Formatea una mención a un usuario
 * @param {String} number - Número de teléfono
 * @param {String} name - Nombre para mostrar
 * @returns {String} Mención formateada
 */
function formatMention(number, name) {
    return `@${number.split('@')[0]}`;
}

module.exports = {
    showQRCode,
    extractMessageText,
    isAdmin,
    formatMention
};