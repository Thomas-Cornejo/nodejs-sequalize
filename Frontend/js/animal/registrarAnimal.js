const inputNombre = document.querySelector("#name");
const inputEdad = document.querySelector("#age");
const inputRaza = document.querySelector("#race");
const inputGenero = document.querySelector("#gender");
const inputPeso = document.querySelector("#weight");
const areaHistoria = document.querySelector("#history");
const inputEnfermedad = document.querySelector("#diseases");
const inputImagen = document.querySelector("#imagen");
const form = document.querySelector("#formRegistro");
const alertMessage = document.querySelector("#alert");
const url = "http://localhost:3000";

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
    evt.preventDefault();

    const name = inputNombre.value;
    const age = inputEdad.value;
    const race = inputRaza.value;
    const gender = inputGenero.value;
    const weight = inputPeso.value;
    const history = areaHistoria.value;
    const diseases = inputEnfermedad.value;
    const imagen = inputImagen.files[0];

    const nuevoAnimal = await crearAnimal({ name, age, race, gender, weight, history, diseases, imagen });
    if (!nuevoAnimal.error) {
        showAlert("success", `Registro del animal exitoso. Animal ${name} ingresado.`);
        form.reset();
    }
}

async function crearAnimal({ name, age, race, gender, weight, history, diseases, imagen }) {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("race", race);
        formData.append("gender", gender);
        formData.append("weight", weight);
        formData.append("history", history);
        formData.append("diseases", diseases);
        formData.append("imagen", imagen);

        const response = await fetch(`${url}/animals/crear`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Error al crear el animal.");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        showAlert("error", "Se produjo un error al crear el animal. Por favor, inténtelo de nuevo más tarde.");
        return { error: error.message };
    }
}

function showAlert(type, msg) {
    alertMessage.classList.remove("alert-danger", "alert-success");
    alertMessage.style.display = "block";
    if (type === "error") {
        alertMessage.classList.add("alert-danger");
        alertMessage.textContent = msg;
    } else if (type === "success") {
        alertMessage.classList.add("alert-success");
        alertMessage.textContent = msg;
    }
    setTimeout(() => {
        alertMessage.style.display = "none";
    }, 5000); // Ocultar la alerta después de 5 segundos
}
