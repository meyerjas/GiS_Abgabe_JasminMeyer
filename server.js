"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
let rezepte;
let port = process.env.PORT; //Port von Heroku
if (port == undefined)
    port = 27; //Setzt den Port auf 8100, wenn er nichts findet
let databaseUrl = "mongodb://localhost:27017";
startServer(port);
connectToDatabase(databaseUrl);
function startServer(_port) {
    let server = Http.createServer(); //Server erschaffen
    console.log("Starting on Port: " + _port);
    server.listen(_port);
    server.addListener("request", handleRequest); //EventListener für requests erschaffen
}
async function connectToDatabase(_url) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient("mongodb+srv://testUser:1234@cluster.vrtif.mongodb.net/Rezeptesammlung?retryWrites=true&w=majority", options);
    await mongoClient.connect();
    rezepte = mongoClient.db("Rezeptesammlung").collection("Rezepte");
    console.log("DB connection", rezepte != undefined);
}
function handleRequest(_request, _response) {
    console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
    if (_request.url) {
        let url = Url.parse(_request.url, true);
        for (let key in url.query) {
            _response.write(key + ":" + url.query[key] + "<br/>");
        }
        let jsonString = JSON.stringify(url.query);
        _response.write(jsonString);
        storeRezept(url.query);
    }
    function storeRezept(_rezept) {
        rezepte.insertOne(_rezept);
    }
    _response.end(); //Antwort wird an den Client geschickt
}
//# sourceMappingURL=server.js.map