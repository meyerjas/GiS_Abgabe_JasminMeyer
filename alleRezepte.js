"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function RezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "AlleRezepte");
        let rezepte = JSON.parse(await result.text());
        let zutaten = JSON.parse(await result.text());
        console.log(rezepte);
        console.log(zutaten);
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
            for (let k = 0; k < zutaten.length; k++) {
                if (zutaten[k].referenzName == rezepte[i].titel) {
                    //Zutatenname
                    let zutatenNameDiv = rezeptDiv.appendChild(document.createElement("div"));
                    zutatenNameDiv.classList.add("rezeptZutaten");
                    zutatenNameDiv.innerHTML = zutaten[i].name;
                    //Zutateneinheit
                    let zutatenUnitDiv = rezeptDiv.appendChild(document.createElement("div"));
                    zutatenUnitDiv.classList.add("rezeptZutaten");
                    zutatenUnitDiv.innerHTML = zutaten[i].einheit;
                    //Zutatenanzahl
                    let zutatenNumDiv = rezeptDiv.appendChild(document.createElement("div"));
                    zutatenNumDiv.classList.add("rezeptZutaten");
                    zutatenNumDiv.innerHTML = zutaten[i].anzahl.toString();
                }
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
            let favorisieren = JSON.parse(localStorage.getItem(Rezeptesammlung.favoritenLocalStorage));
            let favorisierenZutaten = JSON.parse(localStorage.getItem(Rezeptesammlung.favoritenLocalStorage));
            console.log(favorisieren);
            console.log(favorisierenZutaten);
            favorisieren.push(auswahl);
            localStorage.setItem(Rezeptesammlung.favoritenLocalStorage, JSON.stringify(favorisieren));
        }
        async function seiteLaden() {
            if (!localStorage.getItem(Rezeptesammlung.favoritenLocalStorage)) {
                localStorage.setItem(Rezeptesammlung.favoritenLocalStorage, "[]");
            }
            RezepteZeigen();
        }
        seiteLaden();
    }
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=alleRezepte.js.map