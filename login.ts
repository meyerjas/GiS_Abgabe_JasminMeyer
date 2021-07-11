
namespace Rezeptesammlung {

    window.localStorage.clear(); //Wenn man sich ausloggt kommt man wieder zurück auf die login seite und der lokale speicher wird gelöscht.


    let einlogButton: HTMLFormElement = document.querySelector("#einlogButton");
    einlogButton?.addEventListener("click", einloggen);


    async function einloggen(_event: Event): Promise<void> {
        let nutzername: HTMLInputElement = document.querySelector("#nutzername");
        let passwort: HTMLInputElement = document.querySelector("#password");

        if (nutzername.value != "" && passwort.value != "") {
            let urlEinloggen: string = serverUrl + "logIn/einloggen";
            urlEinloggen = urlEinloggen + "?nutzername=" + nutzername.value + "&password=" + passwort.value;
            let response: Response = await fetch(urlEinloggen);

            if (response.status == 200) {
                localStorage.setItem("status", "eingeloggt");
                localStorage.setItem("nutzername", nutzername.value);
                location.href = "/alleRezepte.html";

            } else {
                localStorage.setItem("status", "augeloggt");
                alert("Die Nutzerdaten stimmen nicht überein, bitte versuchen Sie es noch einmal.");
            }

        } else {
            alert("Bitte geben Sie die erforderlichen Daten an.");
        }
    }

    let registrierButton: HTMLFormElement = document.querySelector("#registrierButton");
    registrierButton?.addEventListener("click", registrieren);

    async function registrieren(_event: Event): Promise<void> {
        let neuerName: HTMLInputElement = document.querySelector("#neuerNN");
        let neuesPW: HTMLInputElement = document.querySelector("#neuesPW");

        if (neuerName.value != "" && neuesPW.value != "") {
            let urlRegistrieren: string = serverUrl + "logIn/registrieren";
            urlRegistrieren = urlRegistrieren + "?neuerNN=" + neuerName.value + "&neuesPW=" + neuesPW.value;
            let response: Response = await fetch(urlRegistrieren);

            if (response.status == 200) {
                localStorage.setItem("status", "eingeloggt");
                localStorage.setItem("nutzername", neuerName.value);
                location.href = "/alleRezepte.html";
            } else {
                localStorage.setItem("status", "augeloggt");
                alert("Dieser Nutzername existiert bereits. Bitte wählen Sie einen anderen Namen oder melden Sie sich mit einem bestehenden Konto an.");
            }

        } else {
            alert("Bitte füllen Sie die erforderlichen Felder aus.");
        }
    }
}
