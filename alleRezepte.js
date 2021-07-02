"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function RezepteZeigen() {
        let result = await fetch(Rezeptesammlung.serverUrl + "AlleRezepte");
        let rezepte = JSON.parse(await result.text());
        console.log(rezepte);
        let localStorageArray = JSON.parse(localStorage.getItem(Rezeptesammlung.favoritenLocalStorage));
        //function Zutatenliste(amount: number, einheit: string, name: string) {
        // amount = Rezept.anzahl;
        //}
        //Erstellen der Rezeptdivs
        for (let i = 0; i < rezepte.length; i++) {
            let rezeptDiv = document.createElement("div");
            rezeptDiv.classList.add("rezeptDiv");
            //wähle den container und gib ihm ein Div-Kind
            document.querySelector("#rezeptContainer").appendChild(rezeptDiv);
            //Rezeptname
            let titelDiv = rezeptDiv.appendChild(document.createElement("div"));
            titelDiv.classList.add("rezeptTitel");
            titelDiv.innerHTML = rezepte[i].titel;
            //Zutatenliste
            let zutatenDiv = rezeptDiv.appendChild(document.createElement("div"));
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
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=alleRezepte.js.map