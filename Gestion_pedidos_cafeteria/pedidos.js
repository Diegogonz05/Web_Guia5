const formulario = document.querySelector("#formPedido");
const formularioFiltro = document.querySelector("#formFiltro");
const contenedor_producto = document.querySelector("#producto");
const contenedor_precio = document.querySelector("#precio");
const contenedor_cantidad = document.querySelector("#cantidad");
const contenedor_pm = document.querySelector("#pm");
const boton_mt = document.querySelector("#mt");
const boton_limpiar = document.querySelector("#limpiar");
const contenedor = document.querySelector("#idContenedor");
const mensajePedido = document.querySelector("#mensajePedido");

// Cada registro tiene únicamente los datos solicitados en la guía.
const pedidos = [];
let precioMaximo = null;

const formatoMoneda = valor => `$${valor.toFixed(2)}`;

// Trabajamos los importes en centavos para sumar sin errores de decimales.
const subtotalCentavos = pedido => Math.round(pedido.precio * 100) * pedido.cantidad;

// Estas funciones procesan datos sin modificar la tabla ni el arreglo original.
const filtrarPorPrecio = (lista, maximo) => lista.filter(pedido => pedido.precio <= maximo);

const calcularTotales = lista => ({
    unidades: lista.reduce((total, pedido) => total + pedido.cantidad, 0),
    monto: lista.reduce((total, pedido) => total + subtotalCentavos(pedido), 0) / 100
});

// map transforma los objetos en filas. textContent muestra el nombre como texto.
const crearFilas = lista => lista.map(pedido => {
    const fila = document.createElement("tr");
    const datos = [
        pedido.producto,
        formatoMoneda(pedido.precio),
        pedido.cantidad,
        formatoMoneda(subtotalCentavos(pedido) / 100)
    ];

    datos.forEach((dato, indice) => {
        const celda = document.createElement("td");
        celda.textContent = dato;
        celda.className = indice === 0 ? "text-wrap" : "text-end text-nowrap";
        fila.appendChild(celda);
    });

    return fila;
});

function mostrarTabla(lista = pedidos) {
    contenedor.innerHTML = `
        <table class="table table-striped table-hover table-bordered align-middle mb-0">
            <caption class="visually-hidden">Productos y subtotales de los pedidos mostrados</caption>
            <thead class="table-dark">
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col" class="text-end">Precio unitario</th>
                    <th scope="col" class="text-end">Cantidad</th>
                    <th scope="col" class="text-end">Subtotal</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;

    const cuerpo = contenedor.querySelector("tbody");

    if (lista.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 4;
        celda.className = "text-center text-secondary py-4";
        celda.textContent = pedidos.length === 0
            ? "Todavía no hay pedidos. Agrega el primero desde el formulario."
            : "No hay productos que cumplan con ese precio máximo.";
        fila.appendChild(celda);
        cuerpo.appendChild(fila);
        return;
    }

    crearFilas(lista).forEach(fila => cuerpo.appendChild(fila));
}

function actualizarVista() {
    const listaVisible = precioMaximo === null ? pedidos : filtrarPorPrecio(pedidos, precioMaximo);
    const totales = calcularTotales(pedidos);
    const totalesVisibles = calcularTotales(listaVisible);

    mostrarTabla(listaVisible);
    document.querySelector("#totalUnidades").textContent = totales.unidades;
    document.querySelector("#montoTotal").textContent = formatoMoneda(totales.monto);
    document.querySelector("#estadoFiltro").textContent = precioMaximo === null
        ? `Mostrando todos los pedidos: ${pedidos.length} registros.`
        : `Precio unitario máximo: ${formatoMoneda(precioMaximo)}. Mostrando ${listaVisible.length} de ${pedidos.length} registros: ${totalesVisibles.unidades} unidades y ${formatoMoneda(totalesVisibles.monto)} en esta vista.`;

    boton_limpiar.disabled = pedidos.length === 0;
}

const mostrarMensaje = texto => {
    mensajePedido.textContent = texto;
    mensajePedido.className = "alert alert-success mt-3 mb-0";
};

// Comprobación propia además de los atributos required, min y step del HTML.
function validarPedido(producto, precio, cantidad) {
    contenedor_producto.setCustomValidity(producto === "" ? "Escribe el nombre del producto; no solo espacios." : "");
    contenedor_precio.setCustomValidity(!Number.isFinite(precio) || precio <= 0 ? "Ingresa un precio mayor que cero." : "");
    contenedor_cantidad.setCustomValidity(!Number.isSafeInteger(cantidad) || cantidad <= 0 ? "Ingresa una cantidad entera positiva." : "");

    if (precio > 0 && cantidad > 0 && !Number.isSafeInteger(Math.round(precio * 100) * cantidad)) {
        contenedor_precio.setCustomValidity("El subtotal es demasiado grande. Revisa el precio y la cantidad.");
    }

    return formulario.reportValidity();
}

function agregarPedido(event) {
    event.preventDefault();

    const producto = contenedor_producto.value.trim();
    const precio = Number(contenedor_precio.value);
    const cantidad = Number(contenedor_cantidad.value);

    if (!validarPedido(producto, precio, cantidad)) return;

    pedidos.push({ producto, precio, cantidad });
    actualizarVista();
    formulario.reset();
    contenedor_producto.focus();

    const avisoFiltro = precioMaximo !== null && precio > precioMaximo
        ? " Está registrado, pero el filtro actual lo oculta; puedes usar Mostrar todos."
        : "";
    mostrarMensaje(`Pedido agregado: ${producto}, ${cantidad} unidades.${avisoFiltro}`);
}

function filtrarProductos(event) {
    event.preventDefault();

    const maximo = Number(contenedor_pm.value);
    contenedor_pm.setCustomValidity(contenedor_pm.value.trim() === "" || !Number.isFinite(maximo) || maximo < 0
        ? "Ingresa un precio máximo igual o mayor que cero."
        : "");
    if (!formularioFiltro.reportValidity()) return;

    precioMaximo = maximo;
    actualizarVista();
}

function mostrarTodos() {
    precioMaximo = null;
    formularioFiltro.reset();
    contenedor_pm.setCustomValidity("");
    actualizarVista();
}

function eliminarPedidos() {
    pedidos.splice(0, pedidos.length);
    mostrarTodos();
    mostrarMensaje("Se limpiaron todos los pedidos. Los totales volvieron a cero.");
}

// submit también permite agregar o filtrar con Enter, sin recargar la página.
formulario.addEventListener("submit", agregarPedido);
formularioFiltro.addEventListener("submit", filtrarProductos);
boton_mt.addEventListener("click", mostrarTodos);
boton_limpiar.addEventListener("click", eliminarPedidos);

[contenedor_producto, contenedor_precio, contenedor_cantidad].forEach(campo => {
    campo.addEventListener("input", () => {
        // El subtotal depende de precio y cantidad; al corregirlos se limpia el aviso.
        [contenedor_producto, contenedor_precio, contenedor_cantidad].forEach(entrada => entrada.setCustomValidity(""));
        mensajePedido.className = "d-none";
        mensajePedido.textContent = "";
    });
});
contenedor_pm.addEventListener("input", () => contenedor_pm.setCustomValidity(""));

actualizarVista();
