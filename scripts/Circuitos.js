/* 
    <td></td>
    model circuito{
    id_circuito Int @id @default(autoincrement())
    carreras carrera[]
    nombre String
    tipo String
    longitud_total Int
    cantidad_curvas Int
}
*/

document.addEventListener('DOMContentLoaded', () => { 
	const urlParams = new URLSearchParams(window.location.search);
    const circuitoId = urlParams.get('id');

    if (circuitoId) {
        fetch(`http://127.0.0.1:3000/api/v1/circuitos/${circuitoId}`)
            .then(response => response.json())
            .then(circuito => {
                rellenar_formulario(circuito);
                document.querySelector('.boton_modificar').style.display = 'inline-block'; 
            })
            .catch(error => {
                console.error('Error al obtener el circuito:', error);
            });
    }

	mostrar_circuitos();
});

mostrar_circuitos = function() {
    fetch('http://127.0.0.1:3000/api/v1/circuitos')
    .then(response => response.json())
    .then(circuitos => {
        console.log(circuitos)

        let padre = document.getElementById('circuitos')
        padre.innerHTML = ''

        circuitos.forEach(circuito => {

            let fila = document.createElement('tr')
            fila.id = `circuito-` + circuito.id_circuito
            
            let id = document.createElement('td');
            id.textContent = circuito.id_circuito;

            let nombre = document.createElement('td');
            nombre.textContent = circuito.nombre

            let tipo = document.createElement('td');
            tipo.textContent = circuito.tipo

            let longitud_total = document.createElement('td');
            longitud_total.textContent = circuito.longitud_total

            let cantidad_curvas = document.createElement('td');
            cantidad_curvas.textContent = circuito.cantidad_curvas

            let carreras = document.createElement('td');
            let nombres_carreras = document.createElement('ul')
            circuito.carreras.forEach(carrera =>
            {
                let nombre_carrera = document.createElement('li')
                nombre_carrera.textContent = carrera.nombre_carrera
                nombres_carreras.appendChild(nombre_carrera)
            }
            )
            carreras.appendChild(nombres_carreras)

            // <button class="button is-danger is-inverted">Inverted</button>
            let borrado = document.createElement('td')
            let boton_borrar = document.createElement('button')
            boton_borrar.className = "button is-danger is-inverted"
            boton_borrar.textContent = "Borrar"
            boton_borrar.onclick = function() { eliminar_circuito(circuitoId) }
            borrado.appendChild(boton_borrar)

            let modificar = document.createElement('td')
            let boton_modificar = document.createElement('button');
			boton_modificar.className = 'button is-danger is-inverted';
			boton_modificar.textContent = 'Modificar';
			boton_modificar.onclick = function () {
				const circuitoId = circuito.id_circuito; 
    			window.location.href = `post/agregar_circuito.html?id=${circuitoId}`;
			};
            modificar.appendChild(boton_modificar)


            fila.appendChild(id)
            fila.appendChild(nombre)
            fila.appendChild(tipo)
            fila.appendChild(longitud_total)
            fila.appendChild(cantidad_curvas)
            fila.appendChild(carreras)
            fila.appendChild(borrado)
            fila.appendChild(modificar)

            padre.appendChild(fila)


        });
    })
}

eliminar_circuito = function(circuitoId) {
    alert("eliminando circuito " + circuitoId)
    fetch('http://127.0.0.1:3000/api/v1/carreras/' + circuitoId, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(circuito => {
        console.log(circuito)
        let div = document.getElementById("circuito-" + circuitoId)
        div.remove()
    })
}

// function crearCarrera(event) {
//     event.preventDefault()

//     const nombre = document.getElementById('nombre').value
//     const sede = document.getElementById('sede').value
//     const anio = document.getElementById('anio').value
//     const piloto_ganador = document.getElementById('piloto_ganador').value
//     const circuito_asociado = document.getElementById('circuito_asociado').value

//     if (!nombre || !sede || !anio || !piloto_ganador || !circuito_asociado) {
//         alert('Error: Algún campo no existe en el DOM.')
//         return
//     }

//     let body = {
//         nombre_carrera: nombre,
//         pais_sede: sede,
//         anio: parseInt(anio),
//         id_primer_puesto: parseInt(piloto_ganador),
//         id_circuito_asociado: parseInt(circuito_asociado)
//     }

//     console.log(body)

//     fetch('http://127.0.0.1:3000/api/v1/carreras', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     }).then(response => {
//         if(response.status === 201){
//             alert("carrera creada con exito")
//             limpiarFormulario()
//         } else{
//             alert("error al crear la carrera")
//         }
//     })

// }

// function limpiarFormulario(){
//     document.getElementById('nombre').value = ''
//     document.getElementById('sede').value = ''
//     document.getElementById('anio').value = ''
//     document.getElementById('piloto_ganador').value = ''
//     document.getElementById('circuito_asociado').value = ''

//     document.querySelector('.boton_agregar').style.display = 'inline-block'; 
// 	document.querySelector('.boton_modificar').style.display = 'none';
// }

// rellenar_formulario = function (carrera) {
// 	document.getElementById('id_carrera').value =   carrera.id_carrera;
// 	document.getElementById('nombre').value = carrera.nombre_carrera;
// 	document.getElementById('sede').value = carrera.pais_sede;
// 	document.getElementById('anio').value = carrera.anio;
// 	document.getElementById('piloto_ganador').value = carrera.id_primer_puesto;
// 	document.getElementById('circuito_asociado').value = carrera.id_circuito_asociado;

// 	document.querySelector('.boton_agregar').style.display = 'none';
// 	document.querySelector('.boton_modificar').style.display = 'inline-block';
// }

// modificar_carrera = function () {
//     const id = document.getElementById('id_carrera').value.trim();
//     const nombre = document.getElementById('nombre').value.trim();
//     const sede = document.getElementById('sede').value.trim();
//     const anio = document.getElementById('anio').value.trim();
//     const piloto_ganador = document.getElementById('piloto_ganador').value.trim();
//     const circuito_asociado = document.getElementById('circuito_asociado').value.trim();

//     if (!id || !nombre || !sede || !anio || !piloto_ganador || !circuito_asociado) {
//         alert('Todos los campos son obligatorios.');
//         return;
//     }

//     let carrera = {
//         nombre_carrera: nombre,
//         pais_sede: sede,
//         anio: parseInt(anio, 10),
//         id_primer_puesto: parseInt(piloto_ganador, 10),
//         id_circuito_asociado: parseInt(circuito_asociado, 10),
//     };

//     fetch(`http://127.0.0.1:3000/api/v1/carreras/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(carrera),
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             return response.json().then(error => {
//                 throw new Error(error.error);
//             });
//         }
//     })
//     .then(updatedCarrera => {
//         console.log('Carrera actualizada:', updatedCarrera);
//         alert('Carrera actualizada correctamente.');
//         limpiarFormulario();
//         mostrar_carreras();
//     })
//     .catch(error => {
//         console.error('Error al modificar la carrera:', error);
//         alert('Ocurrió un error al actualizar la carrera: ' + error.message);
//     });
// }