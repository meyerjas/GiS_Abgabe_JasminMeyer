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
            //Zutaten; für jedes Rezept im local Storage geht es durch die Zutaten. 
            for (let k = 0; k < localRez[i].zutaten.length; k++) {
                let zutatenAnzahlDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenAnzahlDiv.classList.add("rezeptZutaten");
                zutatenAnzahlDiv.innerHTML = JSON.stringify(localRez[i].zutaten[k].anzahl);
                let zutatenEinheitDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenEinheitDiv.classList.add("rezeptZutaten");
                zutatenEinheitDiv.innerHTML = localRez[i].zutaten[k].einheit;
                let zutatenNameDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenNameDiv.classList.add("rezeptZutaten");
                zutatenNameDiv.innerHTML = localRez[i].zutaten[k].name;
            }
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
    }
    RezepteZeigen();
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=favoriten.js.map