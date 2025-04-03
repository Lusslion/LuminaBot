#!/usr/bin/env node

require('dotenv').config();
const figlet = require('figlet');
const gradient = require('gradient-string');
const { createConnection } = require('./src/connection');
const { showQRCode } = require('./src/utils/messages');

/**
 * Inicializa el bot con un banner bonito
 */
async function startBot() {
    // Crear banner colorido
    console.clear();
    const banner = figlet.textSync(process.env.BOT_NAME || 'WhatsApp Bot', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    });
    
    console.log(gradient.rainbow(banner));
    console.log(gradient.pastel('\n✨ WhatsApp Bot con Baileys - Listo para iniciar ✨\n'));
    console.log('='.repeat(80));
    
    try {
        // Iniciar conexión con WhatsApp
        console.log('🔄 Iniciando conexión con WhatsApp...');
        await createConnection();
        
        console.log('='.repeat(80));
        console.log(gradient.cristal('\n✅ Bot iniciado correctamente!\n'));
    } catch (error) {
        console.error('\n❌ Error al iniciar el bot:', error.message);
        process.exit(1);
    }
}

// Iniciar el bot
startBot();