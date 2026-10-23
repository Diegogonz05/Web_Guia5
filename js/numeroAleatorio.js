// El número oculto está entre 1 y 25, incluidos ambos extremos.
let numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;
let intentos = 0;
let juegoTerminado = false;

const parrafo = document.querySelector("#idParrafo");
const contador = document.querySelector("#contadorIntentos");
const botonNumero = document.querySelector("#idBtnNumero");
const botonReiniciar = document.querySelector("#idBtnReiniciar");

const actualizarContador = () => {
    contador.textContent = `Intentos utilizados: ${intentos} de ${numeroIntentos}. Restantes: ${numeroIntentos - intentos}.`;
};

function generarNumeroAleatorio() {
    if (juegoTerminado) return;

    const entrada = prompt(`¿Qué número se ha generado? Ingrese un entero del 1 al 25 (intento ${intentos + 1} de ${numeroIntentos}).`);
    if (entrada === null) {
        parrafo.textContent = "Intento cancelado. No se ha descontado ningún intento.";
        return;
    }

    const numero = Number(entrada);
    if (entrada.trim() === "" || !Number.isInteger(numero) || numero < 1 || numero > 25) {
        parrafo.textContent = "Ingrese un número entero del 1 al 25. Los datos inválidos no consumen intentos.";
        return;
    }

    intentos++;
    if (numero === numeroAleatorio) {
        parrafo.textContent = `¡Correcto! El número oculto era ${numeroAleatorio}. Lo adivinaste en ${intentos} de ${numeroIntentos} intentos. Presiona «Jugar de nuevo» para iniciar otra partida.`;
        juegoTerminado = true;
    } else {
        // El complementario solicita una pista cada vez que se falla.
        const pista = numero < numeroAleatorio
            ? `El número oculto es mayor que ${numero}.`
            : `El número oculto es menor que ${numero}.`;

        if (intentos === numeroIntentos) {
            parrafo.textContent = `${pista} Se terminaron los intentos. El número oculto era ${numeroAleatorio}. Presiona «Jugar de nuevo» para comenzar otra partida.`;
            juegoTerminado = true;
        } else {
            parrafo.textContent = `${pista} Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos.`;
        }
    }

    botonNumero.disabled = juegoTerminado;
    actualizarContador();
}

function reiniciarJuego() {
    numeroAleatorio = Math.floor(Math.random() * 25) + 1;
    intentos = 0;
    juegoTerminado = false;
    botonNumero.disabled = false;
    parrafo.textContent = "Nueva partida. Se generó otro número entre 1 y 25. ¡Tienes tres intentos para adivinarlo!";
    actualizarContador();
    botonNumero.focus();
}

botonNumero.addEventListener("click", generarNumeroAleatorio);
botonReiniciar.addEventListener("click", reiniciarJuego);
actualizarContador();
