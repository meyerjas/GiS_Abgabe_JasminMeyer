"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    let favorisierteRezepte = document.querySelector(".fav");
    let localRez = JSON.parse(localStorage.getItem(Rezeptesammlung.favoritenLocalStorage));
    //Rezepte reinladen
    for (let i = 0; i < localRez.length; i++) {
        let rezeptDiv = document.createElement("div");
        rezeptDiv.classList.add("rezeptDiv");
        favorisierteRezepte.appendChild(rezeptDiv);
        //Rezepttitel
        let titelDiv = rezeptDiv.appendChild(document.createElement("div"));
        titelDiv.classList.add("rezeptTitel");
        titelDiv.innerHTML = localRez[i].titel;
        //Zutatenliste
        //let zutatenDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
        //zutatenDiv.classList.add("rezeptZutat");
        //zutatenDiv.innerHTML = rezepte[i].Zutat;
        //Anleitung
        let anleitungDiv = rezeptDiv.appendChild(document.createElement("div"));
        anleitungDiv.classList.add("rezeptTitel");
        anleitungDiv.innerHTML = localRez[i].anleitung;
        //Autor
        let autorDiv = rezeptDiv.appendChild(document.createElement("div"));
        autorDiv.classList.add("rezeptTitel");
        autorDiv.innerHTML = localRez[i].autor;
        //Button zum entfernen von Favs
        let deleteButton = rezeptDiv.appendChild(document.createElement("button"));
        deleteButton.classList.add("deleteButton");
        deleteButton.setAttribute("type", "button");
        deleteButton.innerHTML = "Entfernen";
        deleteButton.setAttribute("RezeptIndex", i.toString());
        //Entfern-Event
        deleteButton?.addEventListener("click", entferneRezept);
    }
    function entferneRezept(_event) {
        let target = _event.target;
        let index = parseInt(target.getAttribute("RezeptIndex"));
        localRez.splice(index, 1);
        localStorage.setItem(Rezeptesammlung.favoritenLocalStorage, JSON.stringify(localRez));
        location.reload();
    }
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=favoriten.js.map