namespace Rezeptesammlung {

    export interface Rezept {
        _id: string;
        titel: string;
        //zutat: string;
        //anzahl: number;
        //einheit: string;
        anleitung: string;
        autor: string;
    }

    async function RezepteZeigen(): Promise<void> {
        let result: Response = await fetch(serverUrl + "AlleRezepte");
        let rezepte: Rezept[] = JSON.parse(await result.text());
        console.log(rezepte);

        let localStorageArray: Rezept[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
        
        //function Zutatenliste(amount: number, einheit: string, name: string) {
           // amount = Rezept.anzahl;

        //}
       
       
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

            //Zutatenliste
            //let zutatenDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            //zutatenDiv.classList.add("rezeptZutat");
            //zutatenDiv.innerHTML = rezepte[i].Zutat;

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

        function addToFavs (_event: Event): void {
            //Rezeptauswahl
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("RezeptIndex"));
            let auswahl: Rezept = rezepte[index];

            let favorisieren: Rezept[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
            console.log(favorisieren);

            favorisieren.push(auswahl);
            localStorage.setItem(favoritenLocalStorage, JSON.stringify(favorisieren));
        }
            

        }

        /*let favButton: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByTagName("favoButton");
        for (let j: number = 0; j < favButton.length; j++) {
            favButton[j].addEventListener("click", addToFavs);

            function addToFavs():void {
                localStorage.setItem();
            }
        }*/
    }


