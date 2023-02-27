const randomController = require('../controllers/random')

// Recibe el mensaje enviado desde el proceso padre
process.on('message', async ({ cant }) => {
  // Llama al método correspondiente de forma no bloqueante utilizando una Promesa
  const resultado = await Promise.resolve(randomController.getNumbers(cant));
  // Envía el resultado de vuelta al proceso padre
  process.send(resultado);
});
