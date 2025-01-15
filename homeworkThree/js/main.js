/* Crear las variables de los datos */

var datos = [];
var posicionTemporal = null;

/* Carga de datos del local storage */

var cargarDatos = function () {
  var extraer = localStorage.getItem("misDatos");
  console.log(extraer);
  if (extraer == null) {
    datos = [];
  } else {
    datos = JSON.parse(extraer);
  }

  var lista = document.getElementById("listaDatos");

  lista.innerHTML = "";

  for (let a = 0; a < datos.length; a++) {
    lista.innerHTML += `<tr>
          <td onclick="cargarPosicion(${a})">${datos[a].nombre}</td>
          <td onclick="cargarPosicion(${a})">${datos[a].apellido}</td>
          <td onclick="cargarPosicion(${a})">${datos[a].cedula}</td>
          <td onclick="cargarPosicion(${a})">${datos[a].email}</td>
          <td>
            <button class="btn btn-success" onclick="cargarPosicion(${a})">Seleccionar para editar</button>
            <button class="btn btn-danger" onclick="eliminar(${a})">Eliminar</button>
          </td>
        </tr>`;
  }
};

/* Guardar de datos del local storage */

var guardar = function () {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var cedula = document.getElementById("cedula").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;
  var direccion = document.getElementById("direccion").value;

  var posicion = datos.findIndex((item) => item.email == email);

  if (posicion == -1) {
    datos.push({
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
      email: email,
      telefono: telefono,
      direccion: direccion,
    });
    localStorage.setItem("misDatos", JSON.stringify(datos));
    Swal.fire({
      icon: "success",
      title: "Usuario guardado correctamente",
      text: "Bienvenido " + email,
    });
    console.log(datos);

    cargarDatos();
  } else {
    Swal.fire({
      icon: "error",
      title: "Tu usuario ya existe!",
      text: "Por favor verifica tu email y contraseña.",
    });
    console.log(datos);

    cargarDatos();
  }
};

/* Eliminar registros */

var eliminar = function (posicion) {
  console.log(posicion);
  datos.splice(posicion, 1);
  localStorage.setItem("misDatos", JSON.stringify(datos));
  Swal.fire({
    icon: "success",
    title: "Se elimino corretamente!",
    text: "Tu informacion ",
  });
  cargarDatos();
};

/* Cargar posición del item a editar */

var cargarPosicion = function (posicion) {
  console.log(posicion);
  document.getElementById("nombre").value = datos[posicion].nombre;
  document.getElementById("apellido").value = datos[posicion].apellido;
  document.getElementById("cedula").value = datos[posicion].cedula;
  document.getElementById("email").value = datos[posicion].email;
  document.getElementById("telefono").value = datos[posicion].telefono;
  document.getElementById("direccion").value = datos[posicion].direccion;
  posicionTemporal = posicion;
};

/* Actualizar datos del item */

var actualizarDatos = function () {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var cedula = document.getElementById("cedula").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;
  var direccion = document.getElementById("direccion").value;
  datos[posicionTemporal].nombre = nombre;
  datos[posicionTemporal].apellido = apellido;
  datos[posicionTemporal].cedula = cedula;
  datos[posicionTemporal].email = email;
  datos[posicionTemporal].telefono = telefono;
  datos[posicionTemporal].direccion = direccion;
  localStorage.setItem("misDatos", JSON.stringify(datos));
  Swal.fire({
    icon: "success",
    title: "Se actualizo corretamente!",
    text: "Tu informacion " + email,
  });
  cargarDatos();
};

/* Busqueda de items */

var buscar = function () {
  var buscar = document.getElementById("busqueda").value;
  var posicionEmail = datos.findIndex((item) => item.email == buscar);
  var posicionDocumento = datos.findIndex((item) => item.cedula == buscar);

  if (posicionEmail !== -1) {
    Swal.fire({
      icon: "success",
      title: "Se encontro el email",
      text: buscar,
    });
    mostrarResultados(posicionEmail);
  }

  if (posicionDocumento !== -1) {
    Swal.fire({
      icon: "success",
      title: "Se encontro el documento",
      text: buscar,
    });
    mostrarResultados(posicionDocumento);
  }

  if (posicionEmail == -1 && posicionDocumento == -1) {
    Swal.fire({
      icon: "error",
      title: "No se encontro ningun resultado!",
    });
    cargarDatos();
  }
};

var mostrarResultados = function (posicion) {
  var lista = document.getElementById("listaDatos");

  lista.innerHTML = "";

  for (let a = 0; a < datos.length; a++) {
    if (a == posicion) {
      lista.innerHTML += `<tr>
          <td onclick="cargarPosicion(${a})">${datos[a].nombre}</td>
          <td onclick="cargarPosicion(${a})">${datos[a].apellido}</td>
          <td onclick="cargarPosicion(${a})">${datos[a].cedula}</td>
          <td onclick="cargarPosicion(${a})">${datos[a].email}</td>
          <td>
            <button class="btn btn-success" onclick="cargarPosicion(${a})">Seleccionar para editar</button>
            <button class="btn btn-danger" onclick="eliminar(${a})">Eliminar</button>
          </td>
        </tr>`;
    }
  }
};

/* Carga de datos del item */

cargarDatos();
