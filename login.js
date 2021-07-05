"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function LogIn() {
        let result = await fetch(Rezeptesammlung.serverUrl + "LogIn");
        let nutzer = JSON.parse(await result.text());
        let einlogButton = document.querySelector("#einlogButton");
        //Einlog-Event
        einlogButton?.addEventListener("click", einloggen);
        let registrierButton = document.querySelector("registrierButton");
        //Registrier-Event
        registrierButton?.addEventListener("click", registrieren);
        let nutzername = document.querySelector("#einloggen").getAttribute("nutzername");
        let passwort = document.querySelector("#einloggen").getAttribute("password");
        function einloggen(_event) {
            for (let i = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, dann status auf "einloggen" ändern.
                if ((nutzername == nutzer[i].nutzername) && (passwort == nutzer[i].passwort)) {
                    nutzer[i].status = "eingeloggt";
                    console.log(nutzername + "ist jetzt eingeloggt.");
                }
                else {
                    nutzer[i].status = "ausgeloggt";
                    console.log("Anmeldung fehlgeschlagen, Bitte versuchen Sie es erneut oder registrieren Sie sich.");
                }
            }
        }
        function registrieren(_event) {
            for (let i = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, Konsolenausgabe dass Nutzer schon existiert.
                if (nutzername == nutzer[i].nutzername) {
                    console.log(nutzername + "existiert schon, bitte wählen Sie einen anderen Namen.");
                }
                else {
                    //neuen Nutzer anlegen
                }
            }
        }
    }
    LogIn();
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=login.js.map