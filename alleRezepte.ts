namespace Rezeptesammlung {

    export interface Rezept {
        _id: string;
        titel: string;
        zutat: string;
        anzahl: number;
        einheit: string;
        anleitung: string;
        autor: string;
        favorit: boolean;
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
            let zutatenDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            titelDiv.classList.add("rezeptZutat");
            titelDiv.innerHTML = rezepte[i].zutat;













        }

        /*let favButton: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByTagName("favoButton");
        for (let j: number = 0; j < favButton.length; j++) {
            favButton[j].addEventListener("click", addToFavs);

            function addToFavs():void {
                localStorage.setItem();
            }*/
        }









    }






















}