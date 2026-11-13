const loteInput = document.getElementById("loteVacuna");
const tempInput = document.getElementById("tempActual");
const btnRegistrar = document.getElementById("btnRegistrarTemp");
const gridLecturas = document.getElementById("gridLecturas");

document.addEventListener("DOMContentLoaded", cargarLecturas);

// Evento para registrar la lectura
btnRegistrar.addEventListener("click", registrarLectura);

// Clase LecturaBiologica
class LecturaBiologica {
    constructor(lote, temperatura, estado) {
        this.lote = lote;
        this.temperatura = temperatura;
        this.estado = estado;
    }
}

// Obtenerrr de LocalStorage
function obtenerLecturas() {
    const datosGuardados = localStorage.getItem("lecturasFrio");
    if (datosGuardados === null) {
        return [];
    } else {
        return JSON.parse(datosGuardados);
    }
}

function registrarLectura() {
    const lote = loteInput.value.trim();
    const temperatura = parseFloat(tempInput.value);

    if (lote === "") {
        return alert("Eh, llena todos los campos correctamente,porfis!");
    }

    if (isNaN(temperatura)) {
        return alert("Traviesillo, te falta la temperatura.");
    }
    // Comprometido u optimo
    let estado = "";
    if (temperatura < 2) {
        estado = "COMPROMETIDO";
    } else if (temperatura > 8) {
        estado = "COMPROMETIDO";
    } else {
        estado = "¡Óptimo! :D";
    }
    const nuevaLectura = new LecturaBiologica(lote, temperatura, estado);

    // Guardar en LocalStorage
    const lecturas = obtenerLecturas();
    lecturas.push(nuevaLectura);
    localStorage.setItem("lecturasFrio", JSON.stringify(lecturas));

    mostrarLecturas();
    loteInput.value = "";
    tempInput.value = "";
}

// uso de DOM
function mostrarLecturas() {
    const lecturas = obtenerLecturas();
    gridLecturas.innerHTML = "";

    lecturas.forEach((lectura) => {
        let claseBorde = "";
        let claseBadge = "";

        if (lectura.estado === "COMPROMETIDO") {
            claseBorde = "border-danger text-danger";
            claseBadge = "bg-danger";
        } else {
            claseBorde = "border-success text-success";
            claseBadge = "bg-success";
        }

        const col = document.createElement("div");
        col.className = "col-md-6 mb-3";

        col.innerHTML = `
            <div class="card p-3 shadow-sm ${claseBorde} border-2">
                <div class="card-body">
                    <h5 class="card-title">Lote: ${lectura.lote}</h5>
                    <p class="card-text mb-1">Temperatura: <strong>${lectura.temperatura} °C</strong></p>
                    <span class="badge ${claseBadge}">${lectura.estado}</span>
                </div>
            </div>
        `;

        gridLecturas.appendChild(col);
    });
}

function cargarLecturas() {
    mostrarLecturas();
}