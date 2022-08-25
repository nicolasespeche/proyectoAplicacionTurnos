const formulario = document.querySelector("#formulario")
const inputNombre = document.querySelector("#nombre")
const inputApellido = document.querySelector("#apellido")
const inputDiaTurno = document.querySelector("#diaTurno")
const inputHoraTurno = document.querySelector("#horaTurno")
const contenedorDeTurnos= document.querySelector("#contenedor-turnos")
const eliminarTurno = document.querySelector("#eliminarTurno")

let arrayTurnos = []


function turno (nombre,apellido,diaTurno,horaTurno){
    this.nombre = nombre;
    this.apellido = apellido;
    this.diaTurno = diaTurno;
    this.horaTurno = horaTurno;
}


function validadorTurno (array,diaDelTurno,horaDelTurno){
    for(let i=0; i >= array.length; i++){
        if (diaDelTurno.value === array[i].diaTurno && horaDelTurno.value === array[i].horaTurno){
            swal({
                title: "Turnos",
                text: "El Turno no se encuentra disponible",
                icon: "error",
                button: "Continuar",
                });
        }
        else if (diaDelTurno.value != array[i].diaTurno && horaDelTurno.value != array[i].horaTurno){
            array.push(new turno(inputNombre.value, inputApellido.value, inputDiaTurno.value, inputHoraTurno.value))
        }
    }
}




const turnosJSON = (array) => {
    arrayTurnosJSON = JSON.stringify(array)
    localStorage.setItem("Turnos", arrayTurnosJSON)
}

const arrayDelLS = (clave) => {
    arrayTurnosLS = localStorage.getItem(clave)
    arrayTurnosLSParseado = JSON.parse(arrayTurnosLS)
    return arrayTurnosLSParseado
}



function insertarHTML (array) {
    const cardTurno = array.reduce((acc,elemento) => {
        return acc + `
                <div class="descripcionTurno">
                    <p>Paciente ${elemento.nombre}</p>
                    <p>Día ${elemento.diaTurno}</p>
                    <p>Hora ${elemento.horaTurno}</p>
                </div>
        `
    },"")
    return cardTurno
}


formulario.onsubmit = (event) => {
    event.preventDefault()
    validadorTurno(arrayTurnos,inputDiaTurno,inputHoraTurno)
    //arrayTurnos.push(new turno(inputNombre.value, inputApellido.value, inputDiaTurno.value, inputHoraTurno.value))
    turnosJSON(arrayTurnos)
    arrayDelLS("Turnos")
    contenedorDeTurnos.innerHTML = insertarHTML(arrayTurnosLSParseado)
    formulario.reset()
    swal({
        title: "Turnos",
        text: "El Turno fue reservado con éxito",
        icon: "success",
        button: "Continuar",
    });
}


let arrayTurnosDelLs = arrayDelLS("Turnos")
arrayTurnos = arrayTurnosDelLs
contenedorDeTurnos.innerHTML = insertarHTML(arrayTurnos)




