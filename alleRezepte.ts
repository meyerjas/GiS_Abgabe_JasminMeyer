namespace Rezeptesammlung {

    export interface Rezept {
        _id: string;
        titel: string;
        anleitung: string;
        autor: string;
        zutaten: string[];
        favoriten: string[];
    }

    export interface Nutzer {
        _id: string;
        nutzername: string;
        passwort: string;
        status: string;
    }

    async function RezepteZeigen(): Promise<void> {
        let result: Response = await fetch(serverUrl + "alleRezepte");
        let textAntwort: string = await result.text(); 
        let rezepte: Rezept[] = JSON.parse(textAntwort);

        //Erstellen der Rezeptdivs
        for (let i: number = 0; i < rezepte.length; i++) {
            let rezeptDiv: HTMLDivElement = document.createElement("div");
            rezeptDiv.classList.add("rezeptDiv");

            //wähle den container und gib ihm ein Div-Kind
            document.querySelector("#rezeptContainer").appendChild(rezeptDiv);

            //Rezepttitel
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

            //FavoButton
            let favoButton: HTMLButtonElement = rezeptDiv.appendChild(document.createElement("button"));
            favoButton.classList.add("favoButton");
            favoButton.setAttribute("type", "button");
            favoButton.innerHTML = "Favorisieren";
            favoButton.setAttribute("RezeptIndex", i.toString());

            //Event zum Favorisieren
            favoButton?.addEventListener("click", addToFavs);

        }

        async function addToFavs(_event: Event): Promise <void> {
            //Rezeptauswahl
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("RezeptIndex"));
            let auswahl: Rezept = rezepte[index];

            //Abfrage, ob der nutzer eingeloggt ist
            if (localStorage.getItem("status") == "eingeloggt") {
                //Favorit hinzufügen
                let favorit: Rezept[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
                console.log(favorit);
                favorit.push(auswahl);
                localStorage.setItem(favoritenLocalStorage, JSON.stringify(favorit));

                let favId: string = auswahl._id;
                let nutzer: string = localStorage.getItem("nutzername");
                
                let urlFavorisieren: string = serverUrl + "alleRezepte/favorisieren";
                urlFavorisieren = urlFavorisieren + "?neuerFav=" + favId + "&nutzer" + nutzer;
                let response: Response = await fetch(urlFavorisieren);
                
                if (response.status == 200) {
                    alert("Das Rezept wurde zu den Favoriten hinzugefügt.");
                } else {
                    alert("Das Rezept befindet sich bereits in ihrer Favoriten-Sammlung.");
                }

            } else {
                alert("Loggen Sie sich ein, um Rezepte zu favorisieren.");
                location.href = "/logIn.html";
            }

        }     

    }
    async function seiteLaden(): Promise<void> {
        if (!localStorage.getItem(favoritenLocalStorage)) {
            localStorage.setItem(favoritenLocalStorage, "[]");
            }
        RezepteZeigen();
        }

    seiteLaden();

}