document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const commentsList = document.querySelector(".comments__list");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre === "" || mensaje === "") return;

        const article = document.createElement("div");
        article.classList.add("comment");

        const nameElement = document.createElement("h3");
        nameElement.classList.add("comment__name");
        nameElement.textContent = nombre;

        const messageElement = document.createElement("p");
        messageElement.classList.add("comment__text");
        messageElement.textContent = mensaje;

        // FECHA Y HORA
        const dateElement = document.createElement("span");
        dateElement.classList.add("comment__date");

        const now = new Date();
        dateElement.textContent = now.toLocaleString(); 

        // BOTÓN ELIMINAR
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "Eliminar";

        deleteButton.addEventListener("click", function () {
            article.remove();
        });

        article.appendChild(nameElement);
        article.appendChild(dateElement);
        article.appendChild(messageElement);
        article.appendChild(deleteButton);

        commentsList.appendChild(article);

        form.reset();
    });

});
