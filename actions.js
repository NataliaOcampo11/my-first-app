
/* Referencias a los elementos HTML */
const contador = document.getElementById("contador");
const clickButton = document.getElementById("clickButton");
const resetButton = document.getElementById("resetButton");
const campoTitulo = document.getElementById("nuevoTitulo");
const tituloEvento = document.getElementById("tituloEvento");

const tituloPredeterminado = "Contador de clicks para eventos";

let clicks = 0;

/* Incrementa el contador */
function incrementarContador() {
    clicks++;
    actualizarContador();

    // Animación del número
    contador.style.transform = "scale(1.12)";

    setTimeout(() => {
        contador.style.transform = "scale(1)";
    }, 150);
}

/* Reinicia el contador a cero */
function reiniciarContador() {
    clicks = 0;
    actualizarContador();
}

/* Actualiza el número en pantalla */
function actualizarContador() {
    contador.textContent = clicks;
}

/* Cambia el título mientras el usuario escribe */
function actualizarTitulo() {
    const texto = campoTitulo.value.trim();

    tituloEvento.textContent = texto || tituloPredeterminado;
}

/* Conecta los botones con sus funciones */
clickButton.addEventListener("click", incrementarContador);
resetButton.addEventListener("click", reiniciarContador);

/* Detecta cada cambio en el campo de texto */
campoTitulo.addEventListener("input", actualizarTitulo);
