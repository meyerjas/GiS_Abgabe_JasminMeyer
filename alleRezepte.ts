
namespace Rezeptesammlung {

    export interface Rezepte {
        _id: string;
        titel: string;
        anleitung: string;
        autor: string;
        zutaten: [];
        favorisiert: [];
    }

   /* export interface Zutaten {
        _id: string;
        name: string;
        einheit: string;
        anzahl: number;
    }*/

    export interface Nutzer {
        _id: string;
        nutzername: string;
        passwort: string;
        status: string;
    }



    async function RezepteZeigen(): Promise<void> {
        let result: Response = await fetch(serverUrl + "AlleRezepte");
        let rezepte: Rezepte[] = JSON.parse(await result.text()); 
        let nutzer: Nutzer[];
        console.log(rezepte);


        //Erstellen der Rezeptdivs
        for (let i: number = 0; i < rezepte.length; i++) {
            let rezeptDiv: HTMLDivElement = document.createElement("div");
            rezeptDiv.classList.add("rezeptDiv");

            //wähle den container und gib ihm ein Div-Kind
            document.querySelector("#rezeptContainer").appendChild(rezeptDiv);

            //Rezeptname
            let titelDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            titelDiv.classList.add("rezeptTitel");
            titelDiv.innerHTML = rezepte[i].titel;

            for (let k: number = 0; k < rezepte[i].zutaten.length; k++) {

                //Zutaten
                let zutatenDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                zutatenDiv.classList.add("rezeptZutaten");
                zutatenDiv.innerHTML = rezepte[i].zutaten[k];

            }

            //Anleitung
            let anleitungDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            anleitungDiv.classList.add("rezeptTitel");
            anleitungDiv.innerHTML = rezepte[i].anleitung;

            //Autor
            let autorDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            autorDiv.classList.add("rezeptTitel");
            autorDiv.innerHTML = rezepte[i].autor;

            //FavoButton
            let favoButton: HTMLButtonElement = rezeptDiv.appendChild(document.createElement("button"));
            favoButton.classList.add("favoButton");
            favoButton.setAttribute("type", "button");
            favoButton.innerHTML = "Favorisieren";
            favoButton.setAttribute("RezeptIndex", i.toString());

            //Event zum Favorisieren
            favoButton?.addEventListener("click", addToFavs);


        }

        function addToFavs(_event: Event): void {
            //Rezeptauswahl
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("RezeptIndex"));
            let auswahl: Rezepte = rezepte[index];

            
            //Abfrage, ob der nutzer eingeloggt ist
            if (nutzer[index].status == "eingeloggt") {
                for (let n: number = 0; n < nutzer.length; n++) {
                //hinzufügen
                let favorit: Rezepte[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
                console.log(favorit);
                }




                
            } else {
                alert("Loggen Sie sich ein, um Rezepte zu favorisieren.")
            }
            
    

            favorit.push(auswahl);
            localStorage.setItem(favoritenLocalStorage, JSON.stringify(favorit));
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
