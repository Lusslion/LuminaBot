# LuminaBot

LuminaBot es un bot de WhatsApp basado en [Baileys](https://github.com/adiwajshing/Baileys), diseñado para manejar comandos, responder a palabras clave y gestionar grupos de manera eficiente.

## Características

- **Comandos sin prefijo**: Ejecuta comandos directamente sin necesidad de un prefijo.
- **Respuestas automáticas**: Responde a palabras clave definidas en el archivo de configuración.
- **Logs claros y configurables**: Los logs son coloridos, resumidos o detallados según la configuración.
- **Reconexión automática**: El bot intenta reconectarse automáticamente en caso de desconexión.
- **Soporte para grupos y chats personales**: Identifica si los mensajes provienen de un grupo o un chat personal.

## Requisitos

- Node.js v16 o superior
- Una cuenta de WhatsApp activa
- [npm](https://www.npmjs.com/) para gestionar dependencias

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/LuminaBot.git
   cd LuminaBot
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura el archivo `.env`:
   Copia el archivo `.env.example` y renómbralo como `.env`. Luego, edítalo con tus valores personalizados:
   ```bash
   cp .env.example .env
   ```

4. Inicia el bot:
   ```bash
   npm start
   ```

## Configuración

El archivo `.env` contiene las variables de entorno necesarias para configurar el bot. Ejemplo:

```env
# Configuración general
NODE_ENV=development
PORT=3000

# Configuración del bot
BOT_NAME=MiBot
BOT_PREFIX=!
ADMIN_NUMBER=51943726709

# Opciones adicionales
LOG_LEVEL=info
SESSION_FOLDER=./sessions
```

## Uso

- **Comandos**: Define comandos en la carpeta `src/commands`. Cada comando debe tener un archivo con el sufijo `_handler.js`.
- **Palabras clave**: Configura respuestas automáticas en `src/config/keywords.js`.

## Logs

Los logs se muestran en la consola y son configurables mediante la variable `LOG_MODE` en el archivo `.env`:
- `full`: Logs detallados con marcas de tiempo.
- `short`: Logs resumidos.

## Estructura del Proyecto

```
📁 LuminaBot/
├── 📁 src/
│   ├── 📁 commands/          # Comandos del bot
│   ├── 📁 config/            # Configuración del bot
│   ├── 📁 middlewares/       # Middlewares para validaciones
│   ├── 📁 utils/             # Utilidades como logs y manejo de mensajes
│   ├── 📄 connection.js      # Manejo de la conexión con WhatsApp
│   ├── 📄 managerHandler.js  # Gestión de comandos y palabras clave
├── 📄 index.js               # Punto de entrada del bot
├── 📄 package.json           # Dependencias y scripts
├── 📄 .env.example           # Ejemplo de configuración
```


## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas agregar nuevas funcionalidades o corregir errores, por favor abre un [issue](https://github.com/Lusslion/LuminaBot) o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar LuminaBot! Si tienes preguntas o necesitas ayuda, no dudes en contactarme.