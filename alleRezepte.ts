
namespace Rezeptesammlung {

    export interface Rezept {
        _id: string;
        titel: string;
        anleitung: string;
        autor: string;
        zutaten: Zutat[];
        favorisiert: [];
    }

    export interface Zutat {
         _id: string;
         name: string;
         einheit: string;
         anzahl: number;
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
        console.log(textAntwort);
        let rezepte: Rezept[] = JSON.parse(textAntwort);
       // let nutzer: Nutzer[];
        console.log(rezepte);


        //Erstellen der Rezeptdivs
        for (let i: number = 0; i < rezepte.length; i++) {
            console.log(rezepte[i]);
            let rezeptDiv: HTMLDivElement = document.createElement("div");
            rezeptDiv.classList.add("rezeptDiv");

            //wähle den container und gib ihm ein Div-Kind
            document.querySelector("#rezeptContainer").appendChild(rezeptDiv);

            //Rezeptname
            let titelDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            titelDiv.classList.add("rezeptTitel");
            titelDiv.innerHTML = rezepte[i].titel;

            for (let k: number = 0; k < rezepte[i].zutaten.length; k++) {
                console.log(rezepte[i].zutaten[k]);
                //Zutaten
               
                let zutatenAnzahlDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                zutatenAnzahlDiv.classList.add("ZutatenName");
                zutatenAnzahlDiv.innerHTML = JSON.stringify(rezepte[i].zutaten[k].anzahl);
                
                let zutatenEinheitDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                zutatenEinheitDiv.classList.add("ZutatenName");
                zutatenEinheitDiv.innerHTML = rezepte[i].zutaten[k].einheit;
                
                let zutatenNameDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
                zutatenNameDiv.classList.add("ZutatenName");
                zutatenNameDiv.innerHTML = rezepte[i].zutaten[k].name;
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
            let auswahl: Rezept = rezepte[index];
            //let favorisiert: string = document.querySelector("").getAttribute("");

            //Abfrage, ob der nutzer eingeloggt ist
            if (localStorage.getItem("status") == "eingeloggt") {
                //Favorit hinzufügen
                let favorit: Rezept[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
                console.log(favorit);
                favorit.push(auswahl);
                localStorage.setItem(favoritenLocalStorage, JSON.stringify(favorit));
                
                //wie speicher ich den nutzer in dem array favorisiert? Über mehrere Sitzungen hinweg favorisiert dann.

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