const parrafo = document.querySelector("#idParrafo");
const btnSumar = document.querySelector("#idBtnSumar");
const btnRestar = document.querySelector("#idBtnRestar");
const btnMultiplicar = document.querySelector("#idBtnMultiplicar");
const btnDividir = document.querySelector("#idBtnDividir");
let resultado;

// Esta función evita repetir la captura y validación en cada operación.
function leerNumero(mensaje) {
    const entrada = prompt(mensaje);
    if (entrada === null) {
        parrafo.textContent = "Operación cancelada.";
        return null;
    }

    const numero = Number(entrada);
    if (entrada.trim() === "" || !Number.isFinite(numero)) {
        parrafo.textContent = "Ingrese un número válido. No se admiten campos vacíos ni valores infinitos.";
        return null;
    }
    return numero;
}

function leerNumeros(operacion) {
    const numero1 = leerNumero(`Ingrese el primer número para ${operacion}`);
    if (numero1 === null) return null;

    const numero2 = leerNumero(`Ingrese el segundo número para ${operacion}`);
    if (numero2 === null) return null;
    return { numero1, numero2 };
}

function mostrarResultado(numero1, numero2, signo) {
    if (!Number.isFinite(resultado)) {
        parrafo.textContent = "El resultado excede el rango de números que JavaScript puede representar. Intente con números más pequeños.";
        return;
    }
    const resultadoVisible = resultado.toLocaleString("es-SV", { maximumSignificantDigits: 15 });
    parrafo.textContent = `${numero1} ${signo} ${numero2} = ${resultadoVisible}`;
}

function sumar() {
    const numeros = leerNumeros("sumar");
    if (numeros === null) return;
    resultado = numeros.numero1 + numeros.numero2;
    mostrarResultado(numeros.numero1, numeros.numero2, "+");
}

function restar() {
    const numeros = leerNumeros("restar");
    if (numeros === null) return;
    resultado = numeros.numero1 - numeros.numero2;
    mostrarResultado(numeros.numero1, numeros.numero2, "−");
}

function multiplicar() {
    const numeros = leerNumeros("multiplicar");
    if (numeros === null) return;
    resultado = numeros.numero1 * numeros.numero2;
    mostrarResultado(numeros.numero1, numeros.numero2, "×");
}

function dividir() {
    const numeros = leerNumeros("dividir");
    if (numeros === null) return;
    if (numeros.numero2 === 0) {
        parrafo.textContent = "No se puede dividir entre cero. Ingrese otro divisor.";
        return;
    }
    resultado = numeros.numero1 / numeros.numero2;
    mostrarResultado(numeros.numero1, numeros.numero2, "÷");
}

btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);
