/* 
    <div class="grid m-6 is-gap-4 is-col-min-20" id="carreras">
        <div class="cell box has-background-warning">
            <h2 class="subtitle has-text-black">id</h2>
            <h2 class="subtitle has-text-black">Nombre Carrera</h2>
            <h2 class="subtitle has-text-black">Primer Puesto</h2>
            <h2 class="subtitle has-text-black">Pais sede</h2>
            <h2 class="subtitle has-text-black">anio</h2>
            <h2 class="subtitle has-text-black">circuito asociado</h2>
        </div>
    </div> 
*/

document.addEventListener('DOMContentLoaded', () => { 
	const urlParams = new URLSearchParams(window.location.search);
    const carreraId = urlParams.get('id');

    if (carreraId) {
        fetch(`http://127.0.0.1:3000/api/v1/carreras/${carreraId}`)
            .then(response => response.json())
            .then(carrera => {
                rellenar_formulario(carrera);
                document.querySelector('.boton_modificar').style.display = 'inline-block'; 
            })
            .catch(error => {
                console.error('Error al obtener la carrera:', error);
            });
    }

	mostrar_carreras();
});

mostrar_carreras = function() {
    fetch('http://127.0.0.1:3000/api/v1/carreras')
    .then(response => response.json())
    .then(carreras => {
        console.log(carreras)

        let padre = document.getElementById('carreras')
        padre.innerHTML = ''

        carreras.forEach(carrera => {
            let div = document.createElement('div');
            div.className = "cell box  ";
            div.id = "carrera-" + carrera.id_carrera
            
            let id = document.createElement('h2');
            id.className = "subtitle has-text-white";
            id.textContent = carrera.id_carrera;
            let id_carrera = carrera.id_carrera

            let nombre = document.createElement('h2');
            nombre.className = "subtitle has-text-white";
            nombre.textContent = `Nombre: ${carrera.nombre_carrera}`;

            let pais_sede = document.createElement('h2');
            pais_sede.className = "subtitle has-text-white";
            pais_sede.textContent = `Sede: ${carrera.pais_sede}`;

            let anio = document.createElement('h2');
            anio.className = "subtitle has-text-white";
            anio.textContent = `Año: ${carrera.anio}`;

            let primer_puesto = document.createElement('h2');
            primer_puesto.className = "subtitle has-text-white";
            primer_puesto.textContent = `Piloto ganador: ${carrera.piloto.nombre_piloto}`;

            let circuito_asociado = document.createElement('h2');
            circuito_asociado.className = "subtitle has-text-white";
            circuito_asociado.textContent = `Circuito: ${carrera.circuito.nombre}`;

            // <button class="button is-danger is-inverted">Inverted</button>
            let borrar = document.createElement('button')
            borrar.className = "button is-danger is-inverted"
            borrar.textContent = "Borrar"
            borrar.onclick = function() { eliminar_carrera(id_carrera) }

            let boton_modificar = document.createElement('button');
			boton_modificar.className = 'button is-danger is-inverted';
			boton_modificar.textContent = 'Modificar';
			boton_modificar.onclick = function () {
				const carreraId = carrera.id_carrera; 
    			window.location.href = `post/Carreras_agregar.html?id=${carreraId}`;
			};

            div.appendChild(id);
            div.appendChild(nombre);
            div.appendChild(pais_sede)
            div.appendChild(anio)
            div.appendChild(primer_puesto);
            div.appendChild(circuito_asociado);
            div.appendChild(borrar);
            div.appendChild(boton_modificar);

            padre.appendChild(div);


        });
    })
}

eliminar_carrera = function(id_carrera) {
    alert("eliminando carrera " + id_carrera)
    fetch('http://127.0.0.1:3000/api/v1/carreras/' + id_carrera, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(carrera => {
        console.log(carrera)
        let div = document.getElementById("carrera-" + id_carrera)
        div.remove()
    })
}

function crearCarrera(event) {
    event.preventDefault()

    const nombre = document.getElementById('nombre').value
    const sede = document.getElementById('sede').value
    const anio = document.getElementById('anio').value
    const piloto_ganador = document.getElementById('piloto_ganador').value
    const circuito_asociado = document.getElementById('circuito_asociado').value

    if (!nombre || !sede || !anio || !piloto_ganador || !circuito_asociado) {
        alert('Error: Algún campo no existe en el DOM.')
        return
    }

    let body = {
        nombre_carrera: nombre,
        pais_sede: sede,
        anio: parseInt(anio),
        id_primer_puesto: parseInt(piloto_ganador),
        id_circuito_asociado: parseInt(circuito_asociado)
    }

    console.log(body)

    fetch('http://127.0.0.1:3000/api/v1/carreras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if(response.status === 201){
            alert("carrera creada con exito")
            limpiarFormulario()
        } else{
            alert("error al crear la carrera")
        }
    })

}

function limpiarFormulario(){
    document.getElementById('nombre').value = ''
    document.getElementById('sede').value = ''
    document.getElementById('anio').value = ''
    document.getElementById('piloto_ganador').value = ''
    document.getElementById('circuito_asociado').value = ''

    document.querySelector('.boton_agregar').style.display = 'inline-block'; 
	document.querySelector('.boton_modificar').style.display = 'none';
}

rellenar_formulario = function (carrera) {
	document.getElementById('id_carrera').value =   carrera.id_carrera;
	document.getElementById('nombre').value = carrera.nombre_carrera;
	document.getElementById('sede').value = carrera.pais_sede;
	document.getElementById('anio').value = carrera.anio;
	document.getElementById('piloto_ganador').value = carrera.id_primer_puesto;
	document.getElementById('circuito_asociado').value = carrera.id_circuito_asociado;

	document.querySelector('.boton_agregar').style.display = 'none';
	document.querySelector('.boton_modificar').style.display = 'inline-block';
}

modificar_carrera = function () {
    const id = document.getElementById('id_carrera').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const sede = document.getElementById('sede').value.trim();
    const anio = document.getElementById('anio').value.trim();
    const piloto_ganador = document.getElementById('piloto_ganador').value.trim();
    const circuito_asociado = document.getElementById('circuito_asociado').value.trim();

    if (!id || !nombre || !sede || !anio || !piloto_ganador || !circuito_asociado) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    let carrera = {
        nombre_carrera: nombre,
        pais_sede: sede,
        anio: parseInt(anio, 10),
        id_primer_puesto: parseInt(piloto_ganador, 10),
        id_circuito_asociado: parseInt(circuito_asociado, 10),
    };

    fetch(`http://127.0.0.1:3000/api/v1/carreras/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carrera),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
    })
    .then(updatedCarrera => {
        console.log('Carrera actualizada:', updatedCarrera);
        alert('Carrera actualizada correctamente.');
        limpiarFormulario();
        mostrar_carreras();
    })
    .catch(error => {
        console.error('Error al modificar la carrera:', error);
        alert('Ocurrió un error al actualizar la carrera: ' + error.message);
    });
}