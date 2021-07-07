namespace Rezeptesammlung {

    export interface Nutzer {
        _id: string;
        nutzername: string;
        passwort: string;
        status: string;
    }


    async function LogInSetup(): Promise<void> {
       
        let einlogButton: HTMLFormElement = document.querySelector("#einlogButton");
        //Einlog-Event
        einlogButton?.addEventListener("click", einloggen);

        let registrierButton: HTMLFontElement = document.querySelector("registrierButton");
        //Registrier-Event
        registrierButton?.addEventListener("click", registrieren);

    }
    async function einloggen(_event: Event): Promise <void> {
        let nutzername: string = document.querySelector("#einloggen").getAttribute("#nutzername");
        let passwort: string = document.querySelector("#einloggen").getAttribute("#password");
        
        let urlEinloggen: string = serverUrl + "einloggen";
        urlEinloggen = urlEinloggen + "?nutzername" + nutzername + "?password" + passwort;
        await fetch(urlEinloggen);

        console.log(nutzername + "ist jetzt eingeloggt.");
        localStorage.setItem("status", "eingeloggt");
        localStorage.setItem("nutzername", nutzername);
        location.href = "/alleRezepte.html";
            
    }

    async function registrieren(_event: Event): Promise<void> {
        let nutzername: string = document.querySelector("#einloggen").getAttribute("#nutzername");
        let neuerName: string = document.querySelector("#registrieren").getAttribute("#neuerNN");
        let neuesPW: string = document.querySelector("#registrieren").getAttribute("#neuesPW");
       
        let urlRegistrieren: string = serverUrl + "registrieren";
        urlRegistrieren = urlRegistrieren + "?neuerNN" + neuerName + "?neuesPW" + neuesPW;
        await fetch(urlRegistrieren);
        
        localStorage.setItem("status", "eingeloggt");
        localStorage.setItem("nutzername", nutzername);
        location.href = "/alleRezepte.html";
    }
    LogInSetup();
}