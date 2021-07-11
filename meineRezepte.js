"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function meineRezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "meineRezepte");
        let rezepte = JSON.parse(await result.text());
        let nutzername = localStorage.getItem("nutzername");
        let rezeptDiv = document.createElement("div");
        //Erstellen der Rezeptdivs
        for (let i = 0; i < rezepte.length; i++) {
            if (rezepte[i].autor == nutzername) {
                rezeptDiv.classList.add("rezeptDiv");
                rezeptDiv.id = "Rezept" + i.toString();
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
        }
        async function löscheRezept(_event) {
            let target = _event.target;
            let index = parseInt(target.getAttribute("RezeptIndex"));
            let idInd = rezepte[index]._id;
            alert("Achtung! Dieses Rezept wird hiermit gelöscht!");
            let urlLöschen = Rezeptesammlung.serverUrl + "meineRezepte/delete";
            urlLöschen = urlLöschen + "?id=" + idInd;
            console.log(urlLöschen);
            let response = await fetch(urlLöschen);
            //lädt die Seite neu, weil was entfernt wurde und das angezeigt werden soll
            location.reload();
        }
        //Bearbeitungs-Event
        function editRezept(_event) {
            console.log("editButton geklickt.");
            let target = _event.target;
            let index = parseInt(target.getAttribute("RezeptIndex"));
            let idInd = rezepte[index]._id;
            let rezeptDivMitId = document.getElementById("Rezept" + index);
            let ogTitel = rezeptDivMitId.querySelector(".rezeptTitel");
            let ogZutaten = rezeptDivMitId.querySelectorAll(".rezeptZutaten");
            let ogAnleitung = rezeptDivMitId.querySelector(".rezeptAnleitung");
            let editButton = document.querySelector(".editButton");
            editButton.innerHTML = "Speichern";
            editButton?.addEventListener("click", speichern);
            //https://codepen.io/JoannaEl/pen/ZjaBvr um die Felder bearbeiten zu können.
            ogTitel.contentEditable = "true";
            ogAnleitung.contentEditable = "true";
            ogZutaten.forEach(function (zutatfeld) {
                zutatfeld.contentEditable = "true";
            });
            async function speichern(_event) {
                console.log("Wir sind am Speichern.");
                let ogZutatenArray = [];
                ogZutaten.forEach(function (zutatfeld) {
                    ogZutatenArray.push(zutatfeld.innerHTML);
                });
                let urlEdit = Rezeptesammlung.serverUrl + "meineRezepte/edit";
                urlEdit = urlEdit + "?titelChange=" + ogTitel.innerHTML + "&id=" + idInd + "&zutatenChange=" + JSON.stringify(ogZutatenArray) + "&anleitungChange=" + ogAnleitung.innerHTML;
                console.log(urlEdit);
                let response = await fetch(urlEdit);
                console.log("gespeichert.");
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
            let zutatenListe = document.querySelector("#zutat" + i);
            let zutatenListeWert = zutatenListe.value;
            if (zutatenListeWert[i] != null || undefined || "") {
                zutatenArray.push(zutatenListeWert);
            }
        }
        let urlNeuesRezept = Rezeptesammlung.serverUrl + "meineRezepte/neuesRezept";
        urlNeuesRezept = urlNeuesRezept + "?titel=" + neuerTitel.value + "&anleitung=" + neueAnleitung.value + "&autor=" + autor + "&zutaten=" + JSON.stringify(zutatenArray);
        console.log(urlNeuesRezept);
        let response = await fetch(urlNeuesRezept);
        //location.reload();
    }
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=meineRezepte.js.map