document.addEventListener("DOMContentLoaded", fetchAnimales);

async function fetchAnimales() {
    try {
        const response = await fetch('http://localhost:3000/animals');
        const animales = await response.json(); 
        console.log(animales);
        const container = document.getElementById("animal-container");
        container.innerHTML = "";

        animales.forEach((animal) => {
            const animalCard = `
                <div class="item dog col-md-4 col-lg-3 my-4">
                    <div class="card position-relative">
                        <a href="#" class="popup-trigger" data-popup-text="<strong>Edad:</strong> ${animal.age}<br><strong>Raza:</strong> ${animal.race}<br><strong>Historia:</strong> ${animal.historia}<br><strong>Enfermedades:</strong> ${animal.enfermedades}">
                            <img src="${animal.imagen}" class="img-fluid rounded-4" alt="image" title="Haz clic para ver más detalles sobre ${animal.name}">
                        </a>
                        <div class="card-body p-0">
                            <a href="single-product.html">
                                <h3 class="card-title pt-4 m-0">${animal.name}</h3>
                            </a>
                            <div class="card-text">
                                <div class="d-flex flex-wrap mt-3">
                                    <a href="formularioAdoptar.html" class="btn-cart me-3 px-4 pt-3 pb-3">
                                        <h5 class="text-uppercase m-0">Adoptar</h5>
                                    </a>
                                    <a href="#" class="btn-wishlist px-4 pt-3 ">
                                        <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            container.insertAdjacentHTML("beforeend", animalCard);
        });

        // Registrar eventos click después de insertar los elementos en el DOM
        registerPopupEvents();
    } catch (error) {
        console.error("Error fetching animales:", error);
    }
}

function registerPopupEvents() {
    document.querySelectorAll(".popup-trigger").forEach(trigger => {
        console.log("Registrando evento click para: ", trigger);
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            const content = trigger.getAttribute("data-popup-text");
            console.log("Popup contenido: ", content);
            showPopup("Detalles del animalito", content);
        });
    });
}

function showPopup(title, content) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
    `;
    document.body.appendChild(popup);

    const closeButton = popup.querySelector(".popup-close");
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popup);
    });
}

// Estilos para el popup
const style = document.createElement("style");
style.innerHTML = `
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .popup-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
        max-width: 400px;
        width: 80%;
        position: relative;
    }
    .popup-close {
        position: absolute;
        color: #ff8a8a;
        top: 10px;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
    }
    .popup-content h2 {
        margin-top: 0;
    }
`;
document.head.appendChild(style);
