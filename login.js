"use strict";
var Rezeptesammlung;
(function (Rezeptesammlung) {
    window.localStorage.clear();
    async function LogInSetup() {
        let result = await fetch(Rezeptesammlung.serverUrl + "logIn");
        await result.text();
    }
    let einlogButton = document.querySelector("#einlogButton");
    einlogButton?.addEventListener("click", einloggen);
    async function einloggen(_event) {
        let nutzername = document.querySelector("#nutzername");
        let passwort = document.querySelector("#password");
        if (nutzername.value != "" && passwort.value != "") {
            let urlEinloggen = Rezeptesammlung.serverUrl + "logIn/einloggen";
            urlEinloggen = urlEinloggen + "?nutzername=" + nutzername.value + "&password=" + passwort.value;
            let response = await fetch(urlEinloggen);
            if (response.status == 200) {
                localStorage.setItem("status", "eingeloggt");
                localStorage.setItem("nutzername", nutzername.value);
                location.href = "/alleRezepte.html";
            }
            else {
                localStorage.setItem("status", "augeloggt");
                alert("Die Nutzerdaten stimmen nicht überein, bitte versuchen Sie es noch einmal.");
            }
        }
        else {
            alert("Bitte geben Sie die erforderlichen Daten an.");
        }
    }
    let registrierButton = document.querySelector("#registrierButton");
    registrierButton?.addEventListener("click", registrieren);
    async function registrieren(_event) {
        let neuerName = document.querySelector("#neuerNN");
        let neuesPW = document.querySelector("#neuesPW");
        if (neuerName.value != "" && neuesPW.value != "") {
            let urlRegistrieren = Rezeptesammlung.serverUrl + "logIn/registrieren";
            urlRegistrieren = urlRegistrieren + "?neuerNN=" + neuerName.value + "&neuesPW=" + neuesPW.value;
            let response = await fetch(urlRegistrieren);
            if (response.status == 200) {
                localStorage.setItem("status", "eingeloggt");
                localStorage.setItem("nutzername", neuerName.value);
                location.href = "/alleRezepte.html";
            }
            else {
                localStorage.setItem("status", "augeloggt");
                alert("Dieser Nutzername existiert bereits. Bitte wählen Sie einen anderen Namen oder melden Sie sich mit einem bestehenden Konto an.");
            }
        }
        else {
            alert("Bitte füllen Sie die erforderlichen Felder aus.");
        }
    }
    LogInSetup();
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=login.js.map