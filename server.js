"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
//let rezepte: Mongo.Collection;
let port = process.env.PORT; //Port von Heroku
if (port == undefined)
    port = 8100; //Setzt den Port auf 8100, wenn er nichts findet
let server = Http.createServer(); //Server erschaffen
console.log("Starting on Port: " + port);
server.listen(port);
server.addListener("request", handleRequest); //EventListener für requests erschaffen
async function handleRequest(_request, _response) {
    console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
    // _response.Content.Headers.Allow.Add("Allow", "POST"); //damit push erlaubt wird?
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient("mongodb+srv://testUser:1234@cluster.vrtif.mongodb.net/Rezeptesammlung?retryWrites=true&w=majority", options);
    await mongoClient.connect();
    let myURL = new Url.URL(_request.url, "https://example.com");
    let parameter = myURL.searchParams;
    let path = Url.parse(_request.url).pathname;
    switch (path) {
        //wenn bei der Url /alleRezepte angehängt wird, dann finde alle Objekte in meiner Rezeptecollection, pack sie in array und geb sie mir aus.
        case "/alleRezepte":
            let rezeptArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(rezeptArray));
            break;
        //wenn bei Url /favoriten dran...    
        case "/favoriten":
            let favoritenArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(favoritenArray));
            break;
        case "/meineRezepte":
            let meineRezepteArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(meineRezepteArray));
            break;
        case "/registrieren":
            let neuerNutzername = parameter.get("neuerNN");
            let neuesPw = parameter.get("neuesPW");
            let nutzerInDb = await mongoClient.db("Rezeptesammlung").collection("Nutzer").find().toArray();
            let statusEingeloggt = "Eingeloggt";
            let statusAusgeloggt = "Ausgeloggt";
            for (let i = 0; i < nutzerInDb.length; i++) {
                if (nutzerInDb[i].nutzername == neuerNutzername) {
                    alert("Dieser Nutzername existiert bereits. Bitte wählen Sie einen anderen Namen oder loggen Sie sich mit einem bestehenden Konto ein.");
                }
                else {
                    await mongoClient.db("Rezeptesammlung").collection("Nutzer").insertOne({ _id: new Mongo.ObjectID(), nutzername: neuerNutzername, passwort: neuesPw, status: statusEingeloggt });
                }
            }
            break;
        case "/einloggen":
            let nutzer = parameter.get("nutzername");
            let passwort = parameter.get("password");
            for (let i = 0; i < nutzerInDb.length; i++) {
                if (nutzerInDb[i].nutzername == nutzer && nutzerInDb[i].passwort == passwort) {
                    mongoClient.db("Rezeptesammlung").collection("Nutzer").find({ nutzername: nutzer, passwort: passwort });
                }
                else {
                    alert("Es gab einen Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.");
                }
            }
            break;
    }
    _response.end(); //Antwort wird an den Client geschickt
}
//# sourceMappingURL=server.js.map