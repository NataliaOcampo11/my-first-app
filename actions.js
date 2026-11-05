
// =====================================
// CLICK SPEED CHALLENGE
// =====================================

// Obtener elementos HTML
const durationSelect = document.getElementById("duration");
const timerDisplay = document.getElementById("timer");
const clickDisplay = document.getElementById("clickCount");

const clickButton = document.getElementById("clickButton");
const startButton = document.getElementById("startButton");

const resultDisplay = document.getElementById("result");
const statusDisplay = document.getElementById("status");

// Variables del juego
let clicks = 0;
let duration = 10;
let startTime = 0;
let gameActive = false;
let animationFrame = null;


// =====================================
// FORMATEAR TIEMPO
// =====================================

function formatTime(milliseconds) {

    const seconds = Math.floor(milliseconds / 1000);

    const millisecondsPart = Math.floor(milliseconds % 1000);

    return String(seconds).padStart(2, "0") + "." +
           String(millisecondsPart).padStart(3, "0");
}


// =====================================
// INICIAR PARTIDA
// =====================================

function startGame() {

    // Evitar iniciar dos partidas simultáneamente
    if (gameActive) {
        return;
    }

    // Reiniciar contador
    clicks = 0;

    duration = Number(durationSelect.value);

    clickDisplay.textContent = "0";

    timerDisplay.textContent = "00.000";

    resultDisplay.textContent = "";

    statusDisplay.textContent = "¡Partida en curso!";

    // Bloquear selección de tiempo
    durationSelect.disabled = true;

    // Habilitar botón de clicks
    clickButton.disabled = false;

    // Deshabilitar botón de inicio
    startButton.disabled = true;

    // Activar juego
    gameActive = true;

    // Registrar hora de inicio
    startTime = performance.now();

    // Iniciar temporizador
    updateTimer();
}


// =====================================
// ACTUALIZAR TEMPORIZADOR
// =====================================

function updateTimer() {

    if (!gameActive) {
        return;
    }

    // Calcular tiempo transcurrido
    const elapsed = performance.now() - startTime;

    const totalTime = duration * 1000;

    // Comprobar si terminó la partida
    if (elapsed >= totalTime) {

        timerDisplay.textContent = formatTime(totalTime);

        endGame();

        return;
    }

    // Mostrar tiempo actualizado
    timerDisplay.textContent = formatTime(elapsed);

    // Actualizar nuevamente
    animationFrame = requestAnimationFrame(updateTimer);
}


// =====================================
// CONTABILIZAR CLICKS
// =====================================

function registerClick() {

    if (!gameActive) {
        return;
    }

    // Verificar que el tiempo no haya terminado
    const elapsed = performance.now() - startTime;

    if (elapsed >= duration * 1000) {

        endGame();

        return;
    }

    // Aumentar contador
    clicks++;

    clickDisplay.textContent = clicks;
}


// =====================================
// FINALIZAR PARTIDA
// =====================================

function endGame() {

    if (!gameActive) {
        return;
    }

    // Detener juego
    gameActive = false;

    // Detener animación
    if (animationFrame !== null) {

        cancelAnimationFrame(animationFrame);

        animationFrame = null;
    }

    // Deshabilitar botón de clicks
    clickButton.disabled = true;

    // Habilitar controles para otra partida
    startButton.disabled = false;

    durationSelect.disabled = false;

    // Mostrar resultado
    resultDisplay.textContent =
        "¡Tiempo terminado! Conseguíste " + clicks + " clicks.";

    statusDisplay.textContent = "Partida finalizada.";

    // Notificar resultado
    alert("¡PARTIDA TERMINADA!\n\nTotal de clicks: " + clicks);
}


// =====================================
// CONECTAR BOTONES
// =====================================

// Conectar botón de inicio
startButton.addEventListener("click", startGame);

// Conectar botón de clicks
clickButton.addEventListener("click", registerClick);


// =====================================
// ESTADO INICIAL
// =====================================

clickButton.disabled = true;

startButton.disabled = false;

durationSelect.disabled = false;

console.log("Click Speed Challenge cargado correctamente.");
console.log("Botón de inicio conectado correctamente.");
