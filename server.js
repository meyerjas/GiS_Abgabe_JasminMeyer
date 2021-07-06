"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
let rezepte;
let port = process.env.PORT; //Port von Heroku
if (port == undefined)
    port = 27; //Setzt den Port auf 8100, wenn er nichts findet
let server = Http.createServer(); //Server erschaffen
console.log("Starting on Port: " + port);
server.listen(port);
server.addListener("request", handleRequest); //EventListener für requests erschaffen
async function handleRequest(_request, _response) {
    console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
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
            break;
        case "/meineRezepte":
            let meineRezepteArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            // console.log(meineRezepteArray);
            _response.write(JSON.stringify(meineRezepteArray));
            break;
        case "/LogIn":
            break;
        case "/Registrieren":
            let neuerNutzername = parameter.get("neuerNN");
            let neuesPw = parameter.get("neuesPW");
            await mongoClient.db("Rezeptesammlung").collection("Nutzer").insertOne({ _id: new Mongo.ObjectID, nutzername: neuerNutzername, passwort: neuesPw, status: "eingeloggt" });
            break;
    }
    _response.end(); //Antwort wird an den Client geschickt
}
//function storeRezept(_rezept: Rezept): void {
//rezepte.insertOne(_rezept);
//# sourceMappingURL=server.js.map