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
        //wenn bei der Url /alleRezepte angehängt wird, dann...
        case "/alleRezepte":
            //...finde alle Objekte in meiner Rezeptecollection und pack sie in nen Array
            let rezeptArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            //Gib mir mein Rezept auf der Seite aus.
            _response.write(JSON.stringify(rezeptArray));
            break;
        //wenn bei Url /favoriten dran...    
        case "/favoriten":
            let parseRezepte = JSON.parse(parameter.get(""));
            //Wer hat das Rezept favorisiert?
            let werFav = parameter.get("favorisiert");
            for (let i = 0; i < parseRezepte.length; i++) {
                //ObjectID wird benötigt da es nicht nur ein String ist sondern ein Object https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
                let findQuery = {
                    _id: new Mongo.ObjectID(parseRezepte[i]._id)
                };
                //https://stackoverflow.com/a/38883596  zum updaten des Werts
                let updateQuery = { $set: { favorisiert: werFav., favorisiert: "" } };
                //FindOneAndUpdate: Mongodb Dokumentation: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/#examples (Erster Parameter sucht, zweiter Paramater updatet das gefundene)
                await mongoClient.db("Rezeptesammlung").collection("Rezepte").findOneAndUpdate(findQuery, updateQuery);
            }
            break;
        case "/meineRezepte":
            let meineRezepteArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            // console.log(meineRezepteArray);
            _response.write(JSON.stringify(meineRezepteArray));
            break;
        case "/LogIn":
    }
    _response.end(); //Antwort wird an den Client geschickt
}
function storeRezept(_rezept) {
    rezepte.insertOne(_rezept);
}
//# sourceMappingURL=server.js.map