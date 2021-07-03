namespace Rezeptesammlung {

    let favorisierteRezepte: HTMLDivElement = document.querySelector(".fav");
    let localRez: Rezept[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));
    let localZut: Zutat[] = JSON.parse(localStorage.getItem(favoritenLocalStorage));

    //Rezepte reinladen
    for (let i: number = 0; i < localRez.length; i++) {
        let rezeptDiv: HTMLDivElement = document.createElement("div");
        rezeptDiv.classList.add("rezeptDiv");
        favorisierteRezepte.appendChild(rezeptDiv);

       
        //Rezepttitel
        let titelDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
        titelDiv.classList.add("rezeptTitel");
        titelDiv.innerHTML = localRez[i].titel;

        for (let k: number = 0; k < localZut.length; k++) {
            if (localZut[k].referenzName == localRez[i].titel) {
            //Zutatenname
            let zutatenNameDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            zutatenNameDiv.classList.add("rezeptZutatenName");
            zutatenNameDiv.innerHTML = localZut[i].name;

            //Zutateneinheit
            let zutatenUnitDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            zutatenUnitDiv.classList.add("rezeptZutatenUnit");
            zutatenUnitDiv.innerHTML = localZut[i].einheit;

            //Zutatenanzahl
            let zutatenNumDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
            zutatenNumDiv.classList.add("rezeptZutatenAnzahl");
            zutatenNumDiv.innerHTML = localZut[i].anzahl.toString();
            } 
        }

        //Anleitung
        let anleitungDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
        anleitungDiv.classList.add("rezeptTitel");
        anleitungDiv.innerHTML = localRez[i].anleitung;

        //Autor
        let autorDiv: HTMLDivElement = rezeptDiv.appendChild(document.createElement("div"));
        autorDiv.classList.add("rezeptTitel");
        autorDiv.innerHTML = localRez[i].autor;

        //Button zum entfernen von Favs
        let deleteButton: HTMLButtonElement = rezeptDiv.appendChild(document.createElement("button"));
        deleteButton.classList.add("deleteButton");
        deleteButton.setAttribute("type", "button");
        deleteButton.innerHTML = "Entfernen";
        deleteButton.setAttribute("RezeptIndex", i.toString());

        //Entfern-Event
        deleteButton?.addEventListener("click", entferneRezept);
    }

    function entferneRezept(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let index: number = parseInt(target.getAttribute("RezeptIndex"));

        localRez.splice(index, 1);

        localStorage.setItem(favoritenLocalStorage, JSON.stringify(localRez));
        location.reload();
    }








}