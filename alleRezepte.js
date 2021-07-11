"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function RezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "alleRezepte");
        let textAntwort = await result.text();
        let rezepte = JSON.parse(textAntwort);
        //Erstellen der Rezeptdivs
        for (let i = 0; i < rezepte.length; i++) {
            let rezeptDiv = document.createElement("div");
            rezeptDiv.classList.add("rezeptDiv");
            //wähle den container und gib ihm ein Div-Kind
            document.querySelector("#rezeptContainer").appendChild(rezeptDiv);
            //Rezepttitel
            let titelDiv = rezeptDiv.appendChild(document.createElement("div"));
            titelDiv.classList.add("rezeptTitel");
            titelDiv.innerHTML = rezepte[i].titel;
            rezeptDiv.appendChild(document.createElement("hr"));
            for (let k = 0; k < rezepte[i].zutaten.length; k++) {
                //Zutaten
                let zutatenDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenDiv.classList.add("rezeptZutaten");
                zutatenDiv.innerHTML = (rezepte[i].zutaten[k]);
            }
            rezeptDiv.appendChild(document.createElement("hr"));
            //Anleitung
            let anleitungDiv = rezeptDiv.appendChild(document.createElement("div"));
            anleitungDiv.classList.add("rezeptAnleitung");
            anleitungDiv.innerHTML = rezepte[i].anleitung;
            rezeptDiv.appendChild(document.createElement("hr"));
            //Autor
            let autorDiv = rezeptDiv.appendChild(document.createElement("div"));
            autorDiv.classList.add("rezeptAutor");
            autorDiv.innerHTML = "Autor: " + rezepte[i].autor;
            rezeptDiv.appendChild(document.createElement("br"));
            //FavoButton
            let favoButton = rezeptDiv.appendChild(document.createElement("button"));
            favoButton.classList.add("favoButton");
            favoButton.setAttribute("type", "button");
            favoButton.innerHTML = "Favorisieren";
            favoButton.setAttribute("RezeptIndex", i.toString());
            //Event zum Favorisieren
            favoButton?.addEventListener("click", addToFavs);
        }
        function addToFavs(_event) {
            //Rezeptauswahl
            let target = _event.target;
            let index = parseInt(target.getAttribute("RezeptIndex"));
            let auswahl = rezepte[index];
            //Abfrage, ob der nutzer eingeloggt ist
            if (localStorage.getItem("status") == "eingeloggt") {
                //Favorit hinzufügen
                let favorit = JSON.parse(localStorage.getItem(Rezeptesammlung.favoritenLocalStorage));
                console.log(favorit);
                favorit.push(auswahl);
                localStorage.setItem(Rezeptesammlung.favoritenLocalStorage, JSON.stringify(favorit));
                alert("Rezept wurde zu den Favoriten hinzugefügt.");
            }
            else {
                alert("Loggen Sie sich ein, um Rezepte zu favorisieren.");
                location.href = "/logIn.html";
            }
        }
    }
    async function seiteLaden() {
        if (!localStorage.getItem(Rezeptesammlung.favoritenLocalStorage)) {
            localStorage.setItem(Rezeptesammlung.favoritenLocalStorage, "[]");
        }
        RezepteZeigen();
    }
    seiteLaden();
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=alleRezepte.js.map