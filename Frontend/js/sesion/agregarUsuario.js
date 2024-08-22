const inputNombre = document.querySelector("#nombres");
const inputApellido = document.querySelector("#apellidos");
const inputCedula = document.querySelector("#cedula");
const inputTelefono = document.querySelector("#telefono");
const inputEmail = document.querySelector("#email");
const inputRol = document.querySelector("#rol");
const inputContraseña = document.querySelector("#contraseña");
const form = document.querySelector("#formRegistro");
const url = "http://localhost:3000";
const alertMessage = document.querySelector("#alert");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
evt.preventDefault();

    if (inputNombre.value === "" || inputApellido.value === "" || inputContraseña.value === "" || inputEmail.value === ""
        || inputCedula.value === "" || inputTelefono.value === "") {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
}
const rolesMap = {
    "Admin": 1,
    "Veterinario": 2,
    "Secretario": 3,
    "Voluntario": 4,
    "Padrino": 5,   
    "Adoptante": 6  
};
    const rolText = inputRol.value;
    
    const rolNumero = rolesMap[rolText];
    
const nuevoUsuario = {
    name: inputNombre.value,
    lastname: inputApellido.value,
    cedula: inputCedula.value,
    telefono: inputTelefono.value,
    email: inputEmail.value,
    rol: rolNumero,
    contraseña: inputContraseña.value
};

    try {
    const response = await fetch(`${url}/usuarios`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoUsuario)
    });

    if (!response.ok) {
    throw new Error("Error al crear el usuario.");
    }

    const json = await response.json();
    console.log("Usuario creado:", json);

    location.replace("usuarios.html");
} catch (error) {
    console.error("Error al crear el usuario:", error);
    alert("Se produjo un error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
}
}
