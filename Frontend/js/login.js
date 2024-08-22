const inputEmail = document.querySelector("#email");
const inputContraseña = document.querySelector("#contraseña");
const form = document.querySelector("#formLogin");
const url = "http://localhost:3000";
const alertMessage = document.querySelector("#alert");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (inputEmail.value === "" || inputContraseña.value === "") {
    showAlert("error", "Por favor, complete todos los campos.");
    return;
  }

  const entrar = await login(inputEmail.value, inputContraseña.value);
  console.log(entrar);

  if (entrar.error) {
    location.reload();
    return;
  }

  localStorage.setItem("ID_USER", entrar.usuario);
  console.log(localStorage.getItem("ID_USER"));
  location.replace("../sesionAdmin/sesion.html");
}

async function login(email, contraseña) {
  const body = { email, contraseña };
  const res = await fetch(`${url}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.error) {
    showAlert("error", json.msg);
    return;
  }

  return json;
}

function showAlert(type, msg) {
  alertMessage.classList.remove("alert", "alert-danger", "alert-success");
  if (type === "error") {
    alertMessage.classList.add("alert", "alert-danger");
    alertMessage.textContent = msg;
  }
  console.log(type);
}
