"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function RezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "AlleRezepte");
        let rezepte = JSON.parse(await result.text());
        // let nutzer: Nutzer[];
        console.log(rezepte);
        //Erstellen der Rezeptdivs
        for (let i = 0; i < rezepte.length; i++) {
            let rezeptDiv = document.createElement("div");
            rezeptDiv.classList.add("rezeptDiv");
            //wähle den container und gib ihm ein Div-Kind
            document.querySelector("#rezeptContainer").appendChild(rezeptDiv);
            //Rezeptname
            let titelDiv = rezeptDiv.appendChild(document.createElement("div"));
            titelDiv.classList.add("rezeptTitel");
            titelDiv.innerHTML = rezepte[i].titel;
            for (let k = 0; k < rezepte[i].zutaten.length; k++) {
                //Zutaten
                let zutatenDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenDiv.classList.add("rezeptZutaten");
                zutatenDiv.innerHTML = rezepte[i].zutaten[k];
            }
            //Anleitung
            let anleitungDiv = rezeptDiv.appendChild(document.createElement("div"));
            anleitungDiv.classList.add("rezeptTitel");
            anleitungDiv.innerHTML = rezepte[i].anleitung;
            //Autor
            let autorDiv = rezeptDiv.appendChild(document.createElement("div"));
            autorDiv.classList.add("rezeptTitel");
            autorDiv.innerHTML = rezepte[i].autor;
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
            //let favorisiert: string = document.querySelector("").getAttribute("");
            //Abfrage, ob der nutzer eingeloggt ist
            if (localStorage.getItem("status") == "eingeloggt") {
                //Favorit hinzufügen
                let favorit = JSON.parse(localStorage.getItem(Rezeptesammlung.favoritenLocalStorage));
                console.log(favorit);
                favorit.push(auswahl);
                localStorage.setItem(Rezeptesammlung.favoritenLocalStorage, JSON.stringify(favorit));
                //wie speicher ich den nutzer in dem array favorisiert? Über mehrere Sitzungen hinweg favorisiert dann.
            }
            else {
                alert("Loggen Sie sich ein, um Rezepte zu favorisieren.");
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