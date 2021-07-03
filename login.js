"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongodb");
var Rezeptesammlung;
(function (Rezeptesammlung) {
    let mongoClient = new Mongo.MongoClient("mongodb+srv://testUser:1234@cluster.vrtif.mongodb.net/Rezeptesammlung?retryWrites=true&w=majority");
    await mongoClient.connect();
    let result = await fetch(serverUrl + "LogIn");
    let nutzer = JSON.parse(await result.text());
    let benutzer = mongoClient.db("Rezeptesammlung").collection("Nutzer");
    let einlogButton = document.createElement("div");
    einlogButton.classList.add("LogInButton");
    einlogButton.setAttribute("type", "button");
    einlogButton.innerHTML = "Einloggen";
    //Entfern-Event
    einlogButton?.addEventListener("click", einloggen);
    //function einloggen(_event: Event): void {
    //if (benutzer.find() == benutzer. )
    //}
    //function registrieren(_event: Event): void {    
    //benutzer.insert({});
    //}
})(Rezeptesammlung || (Rezeptesammlung = {}));
//# sourceMappingURL=login.js.map