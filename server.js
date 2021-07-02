"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
//let orders: Mongo.Collection;
let server = Http.createServer(); //Server erschaffen
let port = process.env.PORT; //Port von Heroku
if (port == undefined) {
    port = 8100; //Setzt den Port auf 8100, wenn er nichts findet
}
server.listen(port);
console.log("Listening on Port: " + port);
server.addListener("request", handleRequest); //EventListener für requests erschaffen
async function handleRequest(_request, _response) {
    console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
    let pathName = Url.parse(_request.url).pathname;
    let mongoClient = new Mongo.MongoClient("mongodb://localhost:27017");
    await mongoClient.connect();
    let myURL = new Url.URL(_request.url, "https://example.com");
    let parameter = myURL.searchParams;
    switch (pathName) {
        case "/AlleRezepte":
            let rezeptArray = await mongoClient.db("Database").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(rezeptArray));
    }
    //let databaseUrl: string = "mongodb://localhost:27017";
    //storeNutzer(url.query)
    _response.end(); //Antwort wird an den Client geschickt
    //function storeNutzer(_nutzer: Nutzer): void {
    //orders.insert(_nutzer);
}
//# sourceMappingURL=server.js.map