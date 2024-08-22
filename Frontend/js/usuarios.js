const inputRol = document.querySelector("#rol");

async function filtroRol() {
  document.querySelector("#root").innerHTML = "";
  const rol = inputRol.options[inputRol.selectedIndex].value;
  console.log(rol);
  const response = await fetch(`http://localhost:3000/filtro/${rol}`);
  const usuario = await response.json();

  console.log(usuario);
  for (let i = 0; i < usuario.length; i++) {
    var array =
      "<tr><td><div>" +
      usuario[i].name +
      "</div></td><td><div>" +
      usuario[i].lastname +
      "</div></td><td><div>" +
      usuario[i].email +
      "</div></td><td><div>" +
      usuario[i].telefono +
      "</div></td><td><div>" +
      usuario[i].cedula +
      "</div></td><td><div>" +
      usuario[i].rol +
      "</div></td><td><div>" +
      '<a href="editarURegistrados.html?id=' +
      usuario[i].id +
      '" class="btn btn-quinto">Editar</a>' +
      '<button onclick="deshabilitarUsuario(' +
      usuario[i].id +
      ')" class="btn btn-danger" style="margin-left: 5px;">Deshabilitar</button>' +
      "</div></td></tr>";
    document.querySelector("#root").insertAdjacentHTML("afterbegin", array);
  }
  
  
}

async function mostrarInformacion() {
  const response = await fetch(`http://localhost:3000/usuarios`);

  const usuario = await response.json();
  for (let i = 0; i < usuario.length; i++) {
    const usuarioActual = usuario[i];
    const filaHTML = `
      <tr id="usuario-${usuarioActual.id}">
        <td><div>${usuarioActual.name}</div></td>
        <td><div>${usuarioActual.lastname}</div></td>
        <td><div>${usuarioActual.email}</div></td>
        <td><div>${usuarioActual.telefono}</div></td>
        <td><div>${usuarioActual.cedula}</div></td>
        <td><div>${usuarioActual.rol}</div></td>
        <td>
          <div>
            <a href="editarURegistrados.html?id=${usuarioActual.id}" class="btn btn-quinto">Editar</a>
            <button onclick="deshabilitarUsuario(${usuarioActual.id})" class="btn btn-danger" style="margin-left: 5px;">Deshabilitar</button>
          </div>
        </td>
      </tr>`;
    document.querySelector("#root").insertAdjacentHTML("afterbegin", filaHTML);
  }
}
function deshabilitarUsuario(id) {
  console.log(id);
  if (window.confirm("¿Seguro que quieres deshabilitar este Usuario?")) {
    const fila = document.getElementById(`usuario-${id}`);
    if (fila) {
      fila.remove();
    }
  }
}

