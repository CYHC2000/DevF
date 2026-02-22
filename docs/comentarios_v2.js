document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const commentsList = document.querySelector(".comments__list");

    // 🔹 Cargar comentarios guardados
    loadComments();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre === "" || mensaje === "") return;

        const now = new Date();
        const fecha = now.toLocaleString();

        const commentData = {
            id: Date.now(),   // identificador único
            nombre: nombre,
            mensaje: mensaje,
            fecha: fecha
        };

        saveComment(commentData);
        renderComment(commentData);

        form.reset();
    });

    function renderComment(data) {

        const article = document.createElement("div");
        article.classList.add("comment");
        article.setAttribute("data-id", data.id);

        const nameElement = document.createElement("h3");
        nameElement.classList.add("comment__name");
        nameElement.textContent = data.nombre;

        const dateElement = document.createElement("span");
        dateElement.classList.add("comment__date");
        dateElement.textContent = data.fecha;

        const messageElement = document.createElement("p");
        messageElement.classList.add("comment__text");
        messageElement.textContent = data.mensaje;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "Eliminar";

        deleteButton.addEventListener("click", function () {
            article.remove();
            deleteComment(data.id);
        });

        article.appendChild(nameElement);
        article.appendChild(dateElement);
        article.appendChild(messageElement);
        article.appendChild(deleteButton);

        commentsList.appendChild(article);
    }

    function saveComment(comment) {
        const comments = getComments();
        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function getComments() {
        const comments = localStorage.getItem("comments");
        return comments ? JSON.parse(comments) : [];
    }

    function loadComments() {
        const comments = getComments();
        comments.forEach(function (comment) {
            renderComment(comment);
        });
    }

    function deleteComment(id) {
        let comments = getComments();
        comments = comments.filter(function (comment) {
            return comment.id !== id;
        });
        localStorage.setItem("comments", JSON.stringify(comments));
    }

});