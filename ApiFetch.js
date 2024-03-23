// Acceso al API
console.log("Accediste al API");

// Elementos DOM
const button = document.getElementById('btn');
let data = document.getElementById("content");

// Escucha de eventos
button.addEventListener("click", solicitudFetch);

// Límite de tiempo para el almacenamiento local en segundos
const localStorageTimeLimit_s = 60;

// Función para solicitar datos
function solicitudFetch() {
    const users = JSON.parse(localStorage.getItem("users"));
    data.innerHTML = "";
    console.log(users);
    console.log(typeof users);

    if (users && users.time > Date.now()) {
        fetchData(users.data);
    } else {
        data.innerHTML = generarSpinnerHTML();

        fetch("https://reqres.in/api/users?delay=3")
            .then((response) => {
                if (response.status == 200) {
                    console.log("Estado de la petición: Realizada");
                    return response.json();
                }
            })
            .then((users) => {
                const usersData = {
                    data: users.data,
                    time: Date.now() + 60000,
                };
                data.innerHTML = "";
                localStorage.setItem("users", JSON.stringify(usersData));
                fetchData(users.data);
            })
            .catch((err) => {
                console.error("Error en la petición:", err);
                console.warn("Estado de la petición:", err.status);
            });
    }
}

// Función para obtener datos
function fetchData(usersData) {
    usersData.forEach((user) => {
        data.innerHTML += generarUsuarioHTML(user);
    });
}

// Función para generar el HTML de un usuario
function generarUsuarioHTML(user) {
    return `
        <tr class="users container-sm text-center" >
            <td id="user-id" class="col-md-1 table-primary"> ${user.id}</td>
            <td id="user-name" class="col-md-3 table-primary"> ${user.first_name}</td>
            <td id="user-lastname" class="col-md-3 table-primary"> ${user.last_name}</td>
            <td id="user-email" class="col-md-2 table-primary"> ${user.email}</td>
            <td id="user-avatar" class="col-md-3 table-primary"><img src="${user.avatar}" alt="${user.first_name}" class="rounded-circle " style="width: 65px"/></td>
        </tr>`;
}

// Función para generar el HTML de un spinner
function generarSpinnerHTML() {
    return `
        <tr>
            <td class="col-md-1 text-center">${generarSpinner()}</td>
            <td class="col-md-3 text-center">${generarSpinner()}</td>
            <td class="col-md-3 text-center">${generarSpinner()}</td>
            <td class="col-md-2 text-center">${generarSpinner()}</td>
            <td class="col-md-3 text-center">${generarSpinner()}</td>
        </tr>`;
}

// Función para generar el HTML de un spinner
function generarSpinner() {
    return `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-info" role="status"></div>
        </div>`;
}