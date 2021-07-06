namespace Rezeptesammlung {

    export interface Nutzer {
        _id: string;
        nutzername: string;
        passwort: string;
        status: string;
    }


    async function LogIn(): Promise<void> {
        let result: Response = await fetch(serverUrl + "LogIn");
        let nutzer: Nutzer[] = JSON.parse(await result.text());


        let einlogButton: HTMLFormElement = document.querySelector("#einlogButton");
        //Einlog-Event
        einlogButton?.addEventListener("click", einloggen);

        let registrierButton: HTMLFontElement = document.querySelector("registrierButton");
        //Registrier-Event
        registrierButton?.addEventListener("click", registrieren);


        let nutzername: string = document.querySelector("#einloggen").getAttribute("#nutzername");
        let passwort: string = document.querySelector("#einloggen").getAttribute("#password");
        let neuerName: string = document.querySelector("#registrieren").getAttribute("#neuerNN");
        let neuesPW: string = document.querySelector("#registrieren").getAttribute("#neuesPW");
        

        
        function einloggen(_event: Event): void {
            for (let i: number = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, dann status auf "einloggen" ändern.
                if ((nutzername == nutzer[i].nutzername) && (passwort == nutzer[i].passwort)) {
                    nutzer[i].status = "eingeloggt";
                    console.log(nutzername + "ist jetzt eingeloggt.");
                    localStorage.setItem("status", "eingeloggt");
                    localStorage.setItem("nutzername", nutzername);
                    location.href = "/alleRezepte.html";
                } else {
                    nutzer[i].status = "ausgeloggt";
                    alert("Anmeldung fehlgeschlagen, Bitte versuchen Sie es erneut oder registrieren Sie sich.");
                }
            }
            
        }

        async function registrieren(_event: Event): Promise <void> {
            for (let i: number = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, Konsolenausgabe dass Nutzer schon existiert.
                if (nutzername == nutzer[i].nutzername) {
                    alert(nutzername + "existiert schon, bitte wählen Sie einen anderen Namen.");
                } else {
                    let urlRegistrieren: string = serverUrl + "Registrieren";
                    urlRegistrieren = urlRegistrieren + "?neuerNN" + neuerName + "?neuesPW" + neuesPW;
                    await fetch(urlRegistrieren); 
                    localStorage.setItem("status", "eingeloggt");
                    localStorage.setItem("nutzername", nutzername);
                    location.href = "/alleRezepte.html";
                }
            }
        }
    }
    LogIn();
}