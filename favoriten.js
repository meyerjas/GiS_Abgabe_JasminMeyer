"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function RezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "favoriten");
        let rezepte = JSON.parse(await result.text());
        console.log(rezepte);
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
            rezeptDiv.appendChild(document.createElement("hr"));
            //Zutaten; für jedes Rezept im local Storage geht es durch die Zutaten. 
            for (let k = 0; k < localRez[i].zutaten.length; k++) {
                let zutatenDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenDiv.classList.add("rezeptZutaten");
                zutatenDiv.innerHTML = (localRez[i].zutaten[k].anzahl) + " " + localRez[i].zutaten[k].einheit + " " + localRez[i].zutaten[k].name;
            }
            rezeptDiv.appendChild(document.createElement("hr"));
            //Anleitung
            let anleitungDiv = rezeptDiv.appendChild(document.createElement("div"));
            anleitungDiv.classList.add("rezeptAnleitung");
            anleitungDiv.innerHTML = localRez[i].anleitung;
            rezeptDiv.appendChild(document.createElement("hr"));
            //Autor
            let autorDiv = rezeptDiv.appendChild(document.createElement("div"));
            autorDiv.classList.add("rezeptAutor");
            autorDiv.innerHTML = localRez[i].autor;
            rezeptDiv.appendChild(document.createElement("br"));
            //Button zum entfernen von Favs
            let deleteButton = rezeptDiv.appendChild(document.createElement("button"));
            deleteButton.classList.add("deleteButton");
            deleteButton.setAttribute("type", "button");
            deleteButton.innerHTML = "Entfernen";
            deleteButton.setAttribute("RezeptIndex", i.toString());
            //Entfern-Event
            deleteButton?.addEventListener("click", entferneFavorit);
        }
        function entferneFavorit(_event) {
            let target = _event.target;
            let index = parseInt(target.getAttribute("RezeptIndex"));
            localRez.splice(index, 1);
            localStorage.setItem(Rezeptesammlung.favoritenLocalStorage, JSON.stringify(localRez));
            location.reload();
        }
    }
    RezepteZeigen();
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=favoriten.js.map