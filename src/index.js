import './css/styles.css';
import { io } from 'socket.io-client';

// Conectar con el servidor de Socket.IO
const socket = io('http://localhost:5000');

// Seleccionar las luces del semáforo
const semaforo = {
  red: document.querySelector('.light-red'),
  yellow: document.querySelector('.light-yellow'),
  green: document.querySelector('.light-green'),
};

// Función para actualizar el semáforo
function updateSemaforo(cantidad) {
  // Asegúrate de apagar todas las luces
  Object.values(semaforo).forEach((light) => {
    light.classList.remove('active'); // Apagar todas
  });

  // Encender la luz correspondiente según la cantidad
  if (cantidad > 12) {
    semaforo.red.classList.add('active');
  } else if (cantidad > 6) {
    semaforo.yellow.classList.add('active');
  } else {
    semaforo.green.classList.add('active');
  }
}

socket.on('connect', () => {
  console.log('Conectado a Socket.IO');
});

socket.on('new_data', (data) => {
  console.log('Datos recibidos:', data);

  if (data && data.cantidad !== undefined) {
    updateSemaforo(Number(data.cantidad)); // Actualiza el semáforo
  }
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});