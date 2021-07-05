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


        let nutzername: string = document.querySelector("#einloggen").getAttribute("nutzername");
        let passwort: string = document.querySelector("#einloggen").getAttribute("password");
        
        
        function einloggen(_event: Event): void {
            for (let i: number = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, dann status auf "einloggen" ändern.
                if ((nutzername == nutzer[i].nutzername) && (passwort == nutzer[i].passwort)) {
                    nutzer[i].status = "eingeloggt";
                    console.log(nutzername + "ist jetzt eingeloggt.");
                } else {
                    nutzer[i].status = "ausgeloggt";
                    console.log("Anmeldung fehlgeschlagen, Bitte versuchen Sie es erneut oder registrieren Sie sich.");
                }
            }
            
        }

        function registrieren(_event: Event): void {
            for (let i: number = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, Konsolenausgabe dass Nutzer schon existiert.
                if (nutzername == nutzer[i].nutzername) {
                    console.log(nutzername + "existiert schon, bitte wählen Sie einen anderen Namen.");
                } else {
                    //neuen Nutzer anlegen
                }
            }
        }
    }
    LogIn();
}