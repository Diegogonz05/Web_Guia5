const parrafoInformacion = document.querySelector("#idParrafo");

function aviso() {
    alert("Bienvenido al mundo JavaScript");
    parrafoInformacion.textContent = "Se mostró el mensaje de bienvenida con alert().";
}

function confirmacion() {
    const respuesta = confirm("¿Desea salir de la sesión de demostración?");
    alert(`Valor seleccionado: ${respuesta}`);
    parrafoInformacion.textContent = respuesta
        ? "Seleccionaste Aceptar. confirm() devolvió true."
        : "Seleccionaste Cancelar. confirm() devolvió false.";
}

function capturarDatos() {
    const nombreIngresado = prompt("¿Cuál es su nombre?");
    if (nombreIngresado === null) {
        parrafoInformacion.textContent = "La captura de datos fue cancelada.";
        return;
    }

    const nombre = nombreIngresado.trim();
    if (nombre === "") {
        alert("Ingrese un nombre, no solamente espacios.");
        return;
    }

    const edadIngresada = prompt("¿Cuál es su edad?", "0");
    if (edadIngresada === null) {
        parrafoInformacion.textContent = "La captura de datos fue cancelada.";
        return;
    }

    const edad = Number(edadIngresada);
    if (edadIngresada.trim() === "" || !Number.isInteger(edad) || edad < 0) {
        alert("Ingrese una edad válida: un número entero mayor o igual a cero.");
        return;
    }

    const mensaje = `Su nombre es ${nombre} y su edad es ${edad}.`;
    alert(mensaje);
    parrafoInformacion.textContent = mensaje;
}

function dibujarParrafo() {
    const informacion = prompt("Escriba la información que desea visualizar en el párrafo");
    if (informacion === null) {
        parrafoInformacion.textContent = "La escritura del párrafo fue cancelada.";
        return;
    }
    if (informacion.trim() === "") {
        alert("Escriba información para el párrafo.");
        return;
    }

    // textContent muestra lo escrito como texto, sin interpretarlo como HTML.
    parrafoInformacion.textContent = informacion.trim();
}

document.querySelector("#idBtnAlert").addEventListener("click", aviso);
document.querySelector("#idBtnPromt").addEventListener("click", capturarDatos);
document.querySelector("#idBtnConfirm").addEventListener("click", confirmacion);
document.querySelector("#idBtnParrafo").addEventListener("click", dibujarParrafo);
