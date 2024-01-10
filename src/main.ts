// Definimos interfaz de los datos de los chistes
interface Chiste {
  id: number;
  texto: string;
}

// Variable para almacenar el chiste actual
let jokeActual: Chiste;

// Creamos función para poder llamar a la API de los chistes
//Declaramos función asincrónica que devuelve una promesa de tipo Chiste
async function fetchChiste(): Promise<Chiste> {
  //Llamada a la API y await para esperar la respuesta
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    },
  });

  //Transformamos la respuesta a json con await
  const data = await response.json();
  console.log('chiste obtenido:', data);
  return { id: data.id, texto: data.joke };
}

// Creamos función para mostrar el chiste por pantalla con parámetro joke que será de tipo Chiste definido previamente
function mostrarChiste(joke: Chiste): void {
  //Elemento del DOM donde se mostrara el chiste por pantalla 
  const jokeTextElement = document.getElementById('texto-chistes');
  if (jokeTextElement) {
    //Si el elemento existe (dif de null o undefined), aparecera el texto del chiste en el contenido
    jokeTextElement.textContent = joke.texto;
  }
}

// Event listener per al botó de "Següent Acudit"
document.getElementById('siguiente-chiste')?.addEventListener('click', async () => {
  try {
    const joke = await fetchChiste();
    jokeActual = joke;
    mostrarChiste(joke);
    console.log(joke);
  } catch (error) {
    console.error('Error al obtener el chiste:', error);
  }
});

//Llamamos a fetchChiste para mostrar un chiste inicial por pantalla
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const initialJoke = await fetchChiste();
    jokeActual = initialJoke;
    mostrarChiste(initialJoke);
    votarChiste(initialJoke, 2);
    console.log(initialJoke);
  } catch (error) {
    console.error('Error al obtener el chiste inicial:', error);
  }
});


// Array para almacenar los chistes y sus puntuaciones
let reportJokes: { joke: string; score: number; date: string }[] = [];

// Función para manejar la votación del chiste
function votarChiste(joke: Chiste, score: number): void {
  // Buscar si el chiste ya ha sido votado
  const index = reportJokes.findIndex((item) => item.joke === joke.texto);

  if (index !== -1) {
    // Si ya ha sido votado, actualizar la puntuación
    reportJokes[index].score = score;
    reportJokes[index].date = new Date().toISOString();
  } else {
    // Si no ha sido votado, agregarlo al array
    const report = {
      joke: joke.texto,
      score: score,
      date: new Date().toISOString(),
    };
    reportJokes.push(report);
  }

  // Mostrar el array en la consola
  console.log('puntuación hecha', reportJokes);

}

// Event listeners para los botones de votación
document.getElementById('votar-1')?.addEventListener('click', () => votarChiste(jokeActual, 1));
document.getElementById('votar-2')?.addEventListener('click', () => votarChiste(jokeActual, 2));
document.getElementById('votar-3')?.addEventListener('click', () => votarChiste(jokeActual, 3));