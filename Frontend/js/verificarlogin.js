const urll = "http://localhost:3000";
const currentPath = location.pathname;

const rutasAdmin = [
  "/Frontend/html/admin/deportistas.html",
  "/Frontend/html/admin/editarDatosAdmin.html",
  "/Frontend/html/admin/editarAdmin.html",
  "/Frontend/html/admin/generar.html",
  "/Frontend/html/admin/sesionAdmin.html",
];

const rutasUser = [
  "/Frontend/html/sesion/editarDatos.html",
  "/Frontend/html/sesion/sesion.html",
];
console.log(currentPath);
async function verificarLogin() {
  const id = localStorage.getItem("ID_USER");
  if (!id || id === "") {
    console.log("no hay usuario");
    location.replace("../login/login.html");
    return;
  }

  console.log("hay usuario");

  const esAdmin = await verificarAdministrador(Number(id));
  console.log(esAdmin);

  if (esAdmin.esAdmin && !rutasAdmin.includes(currentPath)) {
    console.log(id);
    location.replace("../admin/sesionAdmin.html");
  }
  if (!esAdmin.esAdmin && !rutasUser.includes(currentPath)) {
    location.replace("../sesion/sesion.html");
  }
}
verificarLogin();

async function verificarAdministrador(id) {
  const res = await fetch(`${urll}/usuarios/${id}/admin`);

  const json = await res.json();

  return json;
}

function cerrarSesion() {
  location.replace("../index.html");
  localStorage.removeItem("ID_USER");
}
