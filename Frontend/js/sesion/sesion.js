async function mostrarInformacion() {
    const id = localStorage.getItem("ID_USER");
    console.log(id);
    try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();
    console.log(usuario);

    document.getElementById("name").textContent = usuario.name;
    document.getElementById("lastName").textContent = usuario.lastname;
    document.getElementById("email").textContent = usuario.email;
    document.getElementById("phone").textContent = usuario.telefono;
    document.getElementById("cedula").textContent = usuario.cedula;
    } catch (error) {
    console.log("error");
    }
}
mostrarInformacion();