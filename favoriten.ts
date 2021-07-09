namespace Rezeptesammlung {


    async function RezepteZeigen(): Promise<void> {
        let result: Response = await fetch(serverUrl + "favoriten");
        let rezepte: Rezept[] = JSON.parse(await result.text()); 
        console.log(rezepte);

        let favorisierteRezepte: HTMLDivElement = document.querySelector(".fav");
        let localRez: Rezept[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));

        //Rezepte reinladen
        for (let i: number = 0; i < localRez.length; i++) {
        let rezeptDiv: HTMLDivElement = document.createElement("div");
        rezeptDiv.classList.add("rezeptDiv");
        favorisierteRezepte.appendChild(rezeptDiv);

        //Rezepttitel
        let titelDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
        titelDiv.classList.add("rezeptTitel");
        titelDiv.innerHTML = localRez[i].titel;
        rezeptDiv.appendChild(document.createElement("hr"));

        //Zutaten; für jedes Rezept im local Storage geht es durch die Zutaten. 
        for (let k: number = 0; k < localRez[i].zutaten.length; k++) {

            let zutatenDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            zutatenDiv.classList.add("rezeptZutaten");
            zutatenDiv.innerHTML = (localRez[i].zutaten[k].anzahl) + " " + localRez[i].zutaten[k].einheit + " " + localRez[i].zutaten[k].name;
        }

        rezeptDiv.appendChild(document.createElement("hr"));

        //Anleitung
        let anleitungDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
        anleitungDiv.classList.add("rezeptAnleitung");
        anleitungDiv.innerHTML = localRez[i].anleitung;
        rezeptDiv.appendChild(document.createElement("hr"));

        //Autor
        let autorDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
        autorDiv.classList.add("rezeptAutor");
        autorDiv.innerHTML = localRez[i].autor;
        rezeptDiv.appendChild(document.createElement("br"));

        //Button zum entfernen von Favs
        let deleteButton: HTMLButtonElement = rezeptDiv.appendChild(document.createElement("button"));
        deleteButton.classList.add("deleteButton");
        deleteButton.setAttribute("type", "button");
        deleteButton.innerHTML = "Entfernen";
        deleteButton.setAttribute("RezeptIndex", i.toString());

        //Entfern-Event
        deleteButton?.addEventListener("click", entferneFavorit);
    }

        function entferneFavorit(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let index: number = parseInt(target.getAttribute("RezeptIndex"));

        localRez.splice(index, 1);

        localStorage.setItem(favoritenLocalStorage, JSON.stringify(localRez));
        location.reload();

        
    }
}
    RezepteZeigen();
}