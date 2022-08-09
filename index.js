const formulario = document.querySelector("#formulario")
const inputNombre = document.querySelector("#nombre")
const inputApellido = document.querySelector("#apellido")
const inputDiaTurno = document.querySelector("#diaTurno")
const inputHoraTurno = document.querySelector("#horaTurno")
const contenedorDeTurnos= document.querySelector("#contenedor-turnos")

arrayTurnos = []


function turno (nombre,apellido,diaTurno,horaTurno){
    this.nombre = nombre;
    this.apellido = apellido;
    this.diaTurno = diaTurno;
    this.horaTurno = horaTurno;
}


formulario.onsubmit = (event) => {
    event.preventDefault()
    arrayTurnos.push(new turno (inputNombre.value, inputApellido.value, inputDiaTurno.value, inputHoraTurno.value))
    console.log(arrayTurnos)
    formulario.reset()
    arrayTurnosJSON = JSON.stringify(arrayTurnos)
    localStorage.setItem("Turnos",arrayTurnosJSON)
}


arrayTurnosLs = localStorage.getItem("Turnos")

console.log(arrayTurnosLs)

arrayTurnosLsParseado = JSON.parse(arrayTurnosLs)

console.log(arrayTurnosLsParseado)

const cardTurno = arrayTurnosLsParseado.reduce((acc,elemento) => {
    return acc + `
            <div class="descripcionTurno">
                <p>Paciente ${elemento.nombre}</p>
                <p>Día del turno ${elemento.diaTurno}</p>
                <p>Hora del turno ${elemento.horaTurno}</p>
            </div>
    `
},"")



contenedorDeTurnos.innerHTML = cardTurno

