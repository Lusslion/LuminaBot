/**
 * Diccionario de palabras clave del bot
 * Este archivo permite definir palabras clave y respuestas automáticas
 * 
 * Formato:
 * "palabra_clave": {
 *    type: "text" | "media" | "sticker" | "button" | "template",
 *    content: "respuesta" | { url: "https://..." } | ...
 *    isRegex: false, // opcional, si es true, la palabra clave se trata como regex
 * }
 */

const keywords = {
    // Saludos
    "hola": {
        type: "text",
        content: "¡Hola! ¿En qué puedo ayudarte hoy? Usa !ayuda para ver comandos disponibles."
    },
    "buenas": {
        type: "text",
        content: "¡Buenas! Estoy para asistirte. Escribe !ayuda para ver mis comandos."
    },
    
    // Despedidas
    "adios": {
        type: "text",
        content: "¡Hasta pronto! Estoy aquí cuando me necesites."
    },
    "chao": {
        type: "text",
        content: "¡Chao! Vuelve pronto."
    },
    
    // Agradecimientos
    "gracias": {
        type: "text",
        content: "¡No hay de qué! Estoy aquí para ayudarte."
    },
    
    // Preguntas frecuentes
    "que puedes hacer": {
        type: "text",
        content: "Puedo responder a mensajes, gestionar grupos, enviar memes, y mucho más. Escribe !ayuda para ver todas mis funciones."
    },
    
    // Expresiones regulares (patrones)
    ".*como estas.*": {
        type: "text",
        content: "¡Estoy muy bien, gracias por preguntar! ¿Y tú cómo estás?",
        isRegex: true
    },
    
    // Palabras clave multimedia (ejemplo)
    "meme": {
        type: "media",
        content: {
            url: "https://ejemplo.com/meme.jpg",
            caption: "¡Aquí tienes un meme!"
        }
    },
    
    // Palabras clave de botones (ejemplo)
    "opciones": {
        type: "button",
        content: {
            text: "Selecciona una opción:",
            buttons: [
                { id: "btn1", text: "Ayuda" },
                { id: "btn2", text: "Información" },
                { id: "btn3", text: "Contacto" }
            ]
        }
    }
};

module.exports = keywords;