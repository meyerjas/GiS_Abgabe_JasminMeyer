namespace Rezeptesammlung {

    async function meineRezepteZeigen(): Promise<void> {
        let result: Response = await fetch(serverUrl + "meineRezepte");
        let rezepte: Rezept[] = JSON.parse(await result.text());
        let nutzername: string = localStorage.getItem("nutzername");
        let rezeptDiv: HTMLDivElement = document.createElement("div");

        //Erstellen der Rezeptdivs
        for (let i: number = 0; i < rezepte.length; i++) {

            if (rezepte[i].autor == nutzername) {

                rezeptDiv.classList.add("rezeptDiv");
                rezeptDiv.id = "Rezept" + i.toString();
                document.querySelector("#meineRezepte").appendChild(rezeptDiv);

                //Rezeptname
                let titelDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                titelDiv.classList.add("rezeptTitel");
                titelDiv.innerHTML = rezepte[i].titel;
                rezeptDiv.appendChild(document.createElement("hr"));

                for (let k: number = 0; k < rezepte[i].zutaten.length; k++) {

                    //Zutaten
                    let zutatenDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                    zutatenDiv.classList.add("rezeptZutaten");
                    zutatenDiv.innerHTML = (rezepte[i].zutaten[k]);

                }

                rezeptDiv.appendChild(document.createElement("hr"));

                //Anleitung
                let anleitungDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                anleitungDiv.classList.add("rezeptAnleitung");
                anleitungDiv.innerHTML = rezepte[i].anleitung;

                rezeptDiv.appendChild(document.createElement("hr"));

                //Autor
                let autorDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                autorDiv.classList.add("rezeptAutor");
                autorDiv.innerHTML = "Autor: " + rezepte[i].autor;
                rezeptDiv.appendChild(document.createElement("br"));


                //Button zum Löschen von Rezepten
                let deleteButton: HTMLButtonElement = rezeptDiv.appendChild(document.createElement("button"));
                deleteButton.classList.add("deleteButton");
                deleteButton.setAttribute("type", "button");
                deleteButton.innerHTML = "Löschen";
                deleteButton.setAttribute("RezeptIndex", i.toString());

                //Button zum Bearbeiten von Rezepten
                let editButton: HTMLButtonElement = rezeptDiv.appendChild(document.createElement("button"));
                editButton.classList.add("editButton");
                editButton.setAttribute("type", "button");
                editButton.innerHTML = "Bearbeiten";
                editButton.setAttribute("RezeptIndex", i.toString());

                
                deleteButton?.addEventListener("click", löscheRezept); 
                editButton?.addEventListener("click", editRezept); 
            }
        }

        async function löscheRezept(_event: Event): Promise<void> {
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("RezeptIndex"));
            let idInd: string = rezepte[index]._id;

            alert("Achtung! Dieses Rezept wird hiermit gelöscht!");

            let urlLöschen: string = serverUrl + "meineRezepte/delete";
            urlLöschen = urlLöschen + "?id=" + idInd;
            console.log(urlLöschen);
            await fetch(urlLöschen);

            location.reload(); //lädt die Seite neu, weil was entfernt wurde und das angezeigt werden soll
        }

        function editRezept(_event: Event): void {
            console.log("editButton geklickt.");
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("RezeptIndex"));
            let idInd: string = rezepte[index]._id;

            let rezeptDivMitId: HTMLElement = document.getElementById("Rezept" + index);
           
            let ogTitel: HTMLElement = rezeptDivMitId.querySelector(".rezeptTitel");
            let ogZutaten: NodeListOf<HTMLElement> = rezeptDivMitId.querySelectorAll(".rezeptZutaten");
            let ogAnleitung: HTMLElement = rezeptDivMitId.querySelector(".rezeptAnleitung");

            //Buttontext ändern zu "speichern"
            let editButton: HTMLButtonElement = document.querySelector(".editButton");
            editButton.innerHTML = "Speichern";
            editButton?.addEventListener("click", speichern);

            //https://codepen.io/JoannaEl/pen/ZjaBvr um die Felder bearbeiten zu können.
            ogTitel.contentEditable = "true";
            ogAnleitung.contentEditable = "true";

            ogZutaten.forEach(function(zutatfeld: HTMLElement): void {
               zutatfeld.contentEditable = "true";
              });
            
           

            async function speichern(_event: Event): Promise<void> {
                console.log("Wir sind am Speichern.");
    
                let ogZutatenArray: string[] = [];

                ogZutaten.forEach(function(zutatfeld: HTMLElement): void {
                    ogZutatenArray.push(zutatfeld.innerHTML);
                   });

                let urlEdit: string = serverUrl + "meineRezepte/edit";
                urlEdit = urlEdit + "?titelChange=" + ogTitel.innerHTML + "&id=" + idInd + "&zutatenChange=" + JSON.stringify(ogZutatenArray) + "&anleitungChange=" + ogAnleitung.innerHTML;
                console.log(urlEdit);
                await fetch(urlEdit);
                console.log("gespeichert.");

                location.reload();
            }
            
        }
    }
    meineRezepteZeigen();

    let teilenButton: HTMLButtonElement = document.querySelector("#absenden");
    teilenButton?.addEventListener("click", erstelleNeuesRezept);

    async function erstelleNeuesRezept(_event: Event): Promise<void> {

        let neuerTitel: HTMLInputElement = document.querySelector("#titel");
        let neueAnleitung: HTMLInputElement = document.querySelector("#anleitung");
        let autor: string = localStorage.getItem("nutzername");
        let zutatenArray: string[] = [];

        for (let i: number = 1; i <= 10; i++) {
            let zutatenListe: HTMLInputElement = document.querySelector("#zutat" + i);
            let zutatenListeWert: string = zutatenListe.value;
            if (zutatenListeWert[i] != null || undefined || "") {
                zutatenArray.push(zutatenListeWert);
            }
        }
        let urlNeuesRezept: string = serverUrl + "meineRezepte/neuesRezept";
        urlNeuesRezept = urlNeuesRezept + "?titel=" + neuerTitel.value + "&anleitung=" + neueAnleitung.value + "&autor=" + autor + "&zutaten=" + JSON.stringify(zutatenArray);
        console.log(urlNeuesRezept);
        await fetch(urlNeuesRezept);
        location.reload();
    }
}


