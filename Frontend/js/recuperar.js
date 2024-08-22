const inputEmail = document.querySelector("#email");
const inputContraseña = document.querySelector("#contraseña");
const form = document.querySelector("#formRecuperar");
const url = "http://localhost:3000";
const alertMessage = document.querySelector("#alert");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (inputEmail.value === "" || inputContraseña.value === "") {
    return;
  }

  const usuarioNuevo = await recuperarContraseña(
    inputEmail.value,
    inputContraseña.value
  );
  console.log(usuarioNuevo);
}

async function recuperarContraseña(email, contraseña) {
  const body = { email, contraseña };

  const res = await fetch(`${url}/usuarios/cambiar`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.error) {
    showAlert("error", json.msg);
    return;
  } else {
    showAlert("success", json.msg);
  }

  return json;
}

function showAlert(type, msg) {
  alertMessage.classList.remove("alert", "alert-danger", "alert-success");
  if (type === "error") {
    alertMessage.classList.add("alert", "alert-danger");
    alertMessage.textContent = msg;
  } else if (type === "success") {
    alertMessage.classList.add("alert", "alert-success");
    alertMessage.textContent = msg;
  }
  console.log(type);
}
