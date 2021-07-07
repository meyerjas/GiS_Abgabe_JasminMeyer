"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function RezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "alleRezepte");
        let textAntwort = await result.text();
        console.log(textAntwort);
        let rezepte = JSON.parse(textAntwort);
        // let nutzer: Nutzer[];
        console.log(rezepte);
        //Erstellen der Rezeptdivs
        for (let i = 0; i < rezepte.length; i++) {
            console.log(rezepte[i]);
            let rezeptDiv = document.createElement("div");
            rezeptDiv.classList.add("rezeptDiv");
            //wähle den container und gib ihm ein Div-Kind
            document.querySelector("#rezeptContainer").appendChild(rezeptDiv);
            //Rezeptname
            let titelDiv = rezeptDiv.appendChild(document.createElement("div"));
            titelDiv.classList.add("rezeptTitel");
            titelDiv.innerHTML = rezepte[i].titel;
            for (let k = 0; k < rezepte[i].zutaten.length; k++) {
                console.log(rezepte[i].zutaten[k]);
                //Zutaten
                let zutatenAnzahlDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenAnzahlDiv.classList.add("ZutatenName");
                zutatenAnzahlDiv.innerHTML = JSON.stringify(rezepte[i].zutaten[k].anzahl);
                let zutatenEinheitDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenEinheitDiv.classList.add("ZutatenName");
                zutatenEinheitDiv.innerHTML = rezepte[i].zutaten[k].einheit;
                let zutatenNameDiv = rezeptDiv.appendChild(document.createElement("div"));
                zutatenNameDiv.classList.add("ZutatenName");
                zutatenNameDiv.innerHTML = rezepte[i].zutaten[k].name;
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