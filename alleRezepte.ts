namespace Rezeptesammlung {

    export interface Rezept {
        _id: string;
        titel: string;
        anleitung: string;
        autor: string;
    }

    export interface Zutat {
        _id: string;
        referenzName: string;
        name: string;
        einheit: string;
        anzahl: number;
      }

    async function RezepteZeigen(): Promise<void> {
        let result: Response = await fetch(serverUrl + "AlleRezepte");
        let rezepte: Rezept[] = JSON.parse(await result.text());
        let zutaten: Zutat[] = JSON.parse(await result.text()); 
        console.log(rezepte);
        console.log(zutaten);

        
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

            for (let k: number = 0; k < zutaten.length; k++) {
                if (zutaten[k].referenzName == rezepte[i].titel) {
                //Zutatenname
                let zutatenNameDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                zutatenNameDiv.classList.add("rezeptZutaten");
                zutatenNameDiv.innerHTML = zutaten[i].name;

                //Zutateneinheit
                let zutatenUnitDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                zutatenUnitDiv.classList.add("rezeptZutaten");
                zutatenUnitDiv.innerHTML = zutaten[i].einheit;

                //Zutatenanzahl
                let zutatenNumDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                zutatenNumDiv.classList.add("rezeptZutaten");
                zutatenNumDiv.innerHTML = zutaten[i].anzahl.toString();
                } 
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

        function addToFavs (_event: Event): void {
            //Rezeptauswahl
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("RezeptIndex"));
            let auswahl: Rezept = rezepte[index];

            let favorisieren: Rezept[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
            let favorisierenZutaten: Zutat[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
            console.log(favorisieren);
            console.log(favorisierenZutaten);

            favorisieren.push(auswahl);
            localStorage.setItem(favoritenLocalStorage, JSON.stringify(favorisieren));
        }
        async function seiteLaden(): Promise <void> {
            if (!localStorage.getItem(favoritenLocalStorage)) {
                localStorage.setItem(favoritenLocalStorage, "[]");
            }
            
            RezepteZeigen();
        }        

        seiteLaden();
    }

}
