"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function meineRezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "meineRezepte");
        let rezepte = JSON.parse(await result.text());
        let rezeptDiv = document.createElement("div");
        let nutzername = localStorage.getItem("nutzername");
        //Erstellen der Rezeptdivs
        for (let i = 0; i < rezepte.length; i++) {
            if (rezepte[i].autor == nutzername) {
                rezeptDiv.classList.add("rezeptDiv");
                document.querySelector("#meineRezepte").appendChild(rezeptDiv);
                //Rezeptname
                let titelDiv = rezeptDiv.appendChild(document.createElement("div"));
                titelDiv.classList.add("rezeptTitel");
                titelDiv.innerHTML = rezepte[i].titel;
                rezeptDiv.appendChild(document.createElement("hr"));
                for (let k = 0; k < rezepte[i].zutaten.length; k++) {
                    //Zutaten
                    let zutatenDiv = rezeptDiv.appendChild(document.createElement("div"));
                    zutatenDiv.classList.add("rezeptZutaten");
                    zutatenDiv.innerHTML = (rezepte[i].zutaten[k].anzahl) + " " + rezepte[i].zutaten[k].einheit + " " + rezepte[i].zutaten[k].name;
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
                //Button zum Löschen von Rezepten
                let deleteButton = rezeptDiv.appendChild(document.createElement("button"));
                deleteButton.classList.add("deleteButton");
                deleteButton.setAttribute("type", "button");
                deleteButton.innerHTML = "Löschen";
                deleteButton.setAttribute("RezeptIndex", i.toString());
                //Button zum Bearbeiten von Rezepten
                let editButton = rezeptDiv.appendChild(document.createElement("button"));
                editButton.classList.add("editButton");
                editButton.setAttribute("type", "button");
                editButton.innerHTML = "Bearbeiten";
                editButton.setAttribute("RezeptIndex", i.toString());
                //Entfern-Event
                deleteButton?.addEventListener("click", löscheRezept);
                //Bearbeitungs-Event
                editButton?.addEventListener("click", editRezept);
            }
            function löscheRezept(_event) {
                let target = _event.target;
                let index = parseInt(target.getAttribute("RezeptIndex"));
                //lösche das Rezept aus der DB.
                delete rezepte[index];
                //lädt die Seite neu, weil was entfernt wurde und das angezeigt werden soll
                location.reload();
            }
            //Bearbeitungs-Event
            function editRezept(_event) {
                let target = _event.target;
                let index = parseInt(target.getAttribute("RezeptIndex"));
                //speicher die Changes am Rezept in der DB.
                //lädt die Seite neu, weil was geändert wurde und das angezeigt werden soll
                location.reload();
            }
        }
    }
    meineRezepteZeigen();
    let teilenButton = document.querySelector("#absenden");
    teilenButton?.addEventListener("click", erstelleNeuesRezept);
    async function erstelleNeuesRezept(_event) {
        let neuerTitel = document.querySelector("#titel");
        let neueAnleitung = document.querySelector("#anleitung");
        let autor = localStorage.getItem("nutzername");
        let zutatenArray = [];
        for (let i = 1; i <= 10; i++) {
            let zutatenListe = document.querySelector("#zut" + i);
            let neueZutatenAnzahlInput = zutatenListe.querySelector(".zutAnz");
            let neueZutatenEinheitInput = zutatenListe.querySelector(".zutEin");
            let neueZutatenNameInput = zutatenListe.querySelector(".zutName");
            zutatenArray[i] = { "anzahl": neueZutatenAnzahlInput.value, "einheit": neueZutatenEinheitInput.value, "name": neueZutatenNameInput.value };
        }
        let urlNeuesRezept = Rezeptesammlung.serverUrl + "meineRezepte/neuesRezept";
        urlNeuesRezept = urlNeuesRezept + "?titel=" + neuerTitel.value + "&anleitung=" + neueAnleitung.value + "&autor=" + autor + "&zutaten" + JSON.stringify(zutatenArray);
        console.log(urlNeuesRezept);
        let response = await fetch(urlNeuesRezept);
        location.reload();
    }
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=meineRezepte.js.map