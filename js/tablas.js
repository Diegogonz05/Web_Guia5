// Se conservan los cinco alumnos del ejemplo de la guía.
const alumnos = [
    { id: 1, nombre: "Marcos Antonio", apellido: "Alas", correo: "marcos.alas@estudiante.esen.edu.sv" },
    { id: 2, nombre: "Ana Paola", apellido: "Rivas Polanco", correo: "paola.rivas@estudiante.esen.edu.sv" },
    { id: 3, nombre: "Alexis Armando", apellido: "Quintanilla Peña", correo: "alexis.quintanilla@estudiante.esen.edu.sv" },
    { id: 4, nombre: "Vanessa Alejandra", apellido: "Bermudez Urquilla", correo: "vanessa.bermudez@estudiante.esen.edu.sv" },
    { id: 5, nombre: "Oscar Armando", apellido: "López Rodriguez", correo: "oscar.lopez@estudiante.esen.edu.sv" }
];

// map transforma cada objeto en una fila; join une las filas sin comas.
const filas = alumnos.map(alumno => `
    <tr>
        <th scope="row">${alumno.id}</th>
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td><a class="d-inline p-0 m-0 bg-transparent text-primary text-break" href="mailto:${alumno.correo}">${alumno.correo}</a></td>
    </tr>
`).join("");

let table = '<table class="table table-striped table-hover table-bordered align-middle">';
table += '<caption>Listado de los cinco alumnos del ejemplo.</caption>';
table += '<thead><tr>';
table += '<th scope="col">#</th>';
table += '<th scope="col">Nombre</th>';
table += '<th scope="col">Apellido</th>';
table += '<th scope="col">Correo electrónico</th>';
table += '</tr></thead>';
table += `<tbody>${filas}</tbody></table>`;

const contenedor = document.querySelector("#idContenedor");
contenedor.innerHTML = table;
