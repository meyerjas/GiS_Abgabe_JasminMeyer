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
        let nutzername = document.querySelector("#einloggen").getAttribute("#nutzername");
        let passwort = document.querySelector("#einloggen").getAttribute("#password");
        let neuerName = document.querySelector("#registrieren").getAttribute("#neuerNN");
        let neuesPW = document.querySelector("#registrieren").getAttribute("#neuesPW");
        function einloggen(_event) {
            for (let i = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, dann status auf "einloggen" ändern.
                if ((nutzername == nutzer[i].nutzername) && (passwort == nutzer[i].passwort)) {
                    nutzer[i].status = "eingeloggt";
                    console.log(nutzername + "ist jetzt eingeloggt.");
                    localStorage.setItem("status", "eingeloggt");
                    localStorage.setItem("nutzername", nutzername);
                    location.href = "/alleRezepte.html";
                }
                else {
                    nutzer[i].status = "ausgeloggt";
                    alert("Anmeldung fehlgeschlagen, Bitte versuchen Sie es erneut oder registrieren Sie sich.");
                }
            }
        }
        async function registrieren(_event) {
            for (let i = 0; i < nutzer.length; i++) {
                //Prüfen, ob Nutzer schon auf DB existiert. wenn ja, Konsolenausgabe dass Nutzer schon existiert.
                if (nutzername == nutzer[i].nutzername) {
                    alert(nutzername + "existiert schon, bitte wählen Sie einen anderen Namen.");
                }
                else {
                    let urlRegistrieren = Rezeptesammlung.serverUrl + "Registrieren";
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
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=login.js.map