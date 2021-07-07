"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    async function LogInSetup() {
        let result = await fetch(Rezeptesammlung.serverUrl + "logIn");
        await result.text();
        let einlogButton = document.querySelector("#einlogButton");
        //Einlog-Event
        einlogButton?.addEventListener("click", einloggen);
        let registrierButton = document.querySelector("registrierButton");
        //Registrier-Event
        registrierButton?.addEventListener("click", registrieren);
    }
    async function einloggen(_event) {
        let nutzername = document.querySelector("#einloggen").getAttribute("nutzername");
        let passwort = document.querySelector("#einloggen").getAttribute("password");
        let urlEinloggen = Rezeptesammlung.serverUrl + "einloggen";
        urlEinloggen = urlEinloggen + "?nutzername=" + nutzername + "?password=" + passwort;
        await fetch(urlEinloggen);
        location.href = "/alleRezepte.html";
    }
    async function registrieren(_event) {
        let nutzername = document.querySelector("#einloggen").getAttribute("#nutzername");
        let neuerName = document.querySelector("#registrieren").getAttribute("#neuerNN");
        let neuesPW = document.querySelector("#registrieren").getAttribute("#neuesPW");
        let urlRegistrieren = Rezeptesammlung.serverUrl + "registrieren";
        urlRegistrieren = urlRegistrieren + "?neuerNN" + neuerName + "&neuesPW" + neuesPW;
        await fetch(urlRegistrieren);
        localStorage.setItem("status", "eingeloggt");
        localStorage.setItem("nutzername", nutzername);
        location.href = "/alleRezepte.html";
    }
    LogInSetup();
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=login.js.map