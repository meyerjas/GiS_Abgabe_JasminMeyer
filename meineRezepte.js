"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function meineRezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "meineRezepte");
        let rezepte = JSON.parse(await result.text());
        let rezeptDiv = document.createElement("div");
        console.log(rezepte);
        //Erstellen der Rezeptdivs
        for (let i = 0; i < rezepte.length; i++) {
            if (rezepte[i].autor == localStorage.getItem("nutzername")) {
                rezeptDiv.classList.add("rezeptDiv");
                //wähle den container und gib ihm ein Div-Kind
                document.querySelector("#meineRezepte").appendChild(rezeptDiv);
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
                //Button zum löschen von Rezepten
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
            function editRezept(_event) {
                let target = _event.target;
                let index = parseInt(target.getAttribute("RezeptIndex"));
                let saveButton = rezeptDiv.appendChild(document.createElement("button"));
                saveButton.classList.add("saveButton");
                saveButton.setAttribute("type", "button");
                saveButton.innerHTML = "Speichern";
                saveButton.setAttribute("RezeptIndex", i.toString());
                //speicher die Changes am Rezept in der DB.
                //lädt die Seite neu, weil was geändert wurde und das angezeigt werden soll
                location.reload();
            }
        }
    }
    meineRezepteZeigen();
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=meineRezepte.js.map