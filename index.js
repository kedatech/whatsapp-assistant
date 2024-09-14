const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline-sync');

// Crear una instancia del cliente de WhatsApp con autenticación local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Mostrar QR en consola cuando se genere
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Por favor, escanea el código QR para conectarte.');
});

// Mensaje cuando el cliente esté listo
client.on('ready', () => {
    console.log('El cliente está listo para enviar mensajes.');
    sendMessage(); // Llamar a la función para enviar mensajes después de estar listo
});

// Función para enviar mensajes
const sendMessage = () => {
    // Pedir el número de teléfono y el mensaje desde la consola
    const phoneNumber = readline.question('Ingresa el número de teléfono (incluye el código de país): ');
    const message = readline.question('Ingresa el mensaje que deseas enviar: ');

    // Enviar mensaje
    client.sendMessage(`${phoneNumber}@c.us`, message)
        .then(response => {
            console.log(`Mensaje enviado a ${phoneNumber}: ${message}`);
        })
        .catch(err => {
            console.error('Error al enviar el mensaje: ', err);
        });
};

// Inicializar el cliente
client.initialize();
