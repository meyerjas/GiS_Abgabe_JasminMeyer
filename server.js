"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
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
        case "/favoriten":
            let favoritenArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(favoritenArray));
            break;
        case "/meineRezepte":
            let meineRezepteArray = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(meineRezepteArray));
            break;
        case "/meineRezepte/delete":
            console.log("es is heiß hier ersma löschen alla");
            let idParam = parameter.get("id");
            //https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#examples löschen von docs
            await mongoClient.db("Rezeptesammlung").collection("Rezepte").deleteOne({ "_id": new Mongo.ObjectId(idParam) });
            break;
        case "/meineRezepte/edit":
            console.log("server edit is initiiert");
            let titelChange = parameter.get("titelChange");
            let anleitungChange = parameter.get("anleitungChange");
            let zutatenChange = JSON.parse(parameter.get("zutatenChange"));
            let idPm = parameter.get("id");
            await mongoClient.db("Rezeptesammlung").collection("Rezepte").findOneAndUpdate({ "_id": new Mongo.ObjectId(idPm) }, { $set: { "zutaten": zutatenChange, "titel": titelChange, "anleitung": anleitungChange } });
            break;
        case "/meineRezepte/neuesRezept":
            let titel = parameter.get("titel");
            let anleitung = parameter.get("anleitung");
            let parseZutaten = JSON.parse(parameter.get("zutaten"));
            let autor = parameter.get("autor");
            console.log(parseZutaten);
            await mongoClient.db("Rezeptesammlung").collection("Rezepte").insertOne({ "titel": titel, "anleitung": anleitung, "autor": autor });
            for (let k = 0; k < parseZutaten.length; k++) {
                if (parseZutaten[k] != "" || undefined) {
                    console.log(parseZutaten[k]);
                    //https://www.tabnine.com/code/javascript/functions/mongodb/Collection/findOneAndUpdate
                    await mongoClient.db("Rezeptesammlung").collection("Rezepte").findOneAndUpdate({ titel: titel }, { $set: { "zutaten": parseZutaten } });
                }
            }
            break;
        case "/logIn/einloggen":
            console.log("Wir sind am einloggen.");
            let nutzer = parameter.get("nutzername");
            let passwort = parameter.get("password");
            //vergleiche eingegebene Werte mit Werten in der DB und finde Übereinstimmung. Hör auf, wenn gefunden (hasNext(): https://examples.javacodegeeks.com/software-development/mongodb/mongodb-hasnext-and-next-example/)
            let nutzerVergleich = await mongoClient.db("Rezeptesammlung").collection("Nutzer").find({ "nutzername": nutzer, "passwort": passwort }).hasNext();
            if (nutzerVergleich) {
                console.log("Eingeloggt als" + nutzer);
                // bei success: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success
                _response.statusCode = 200;
            }
            else {
                //bei misserfolg: link s.o. (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success)
                _response.statusCode = 401;
            }
            break;
        case "/logIn/registrieren":
            console.log("wir sind am Reg");
            let neuerNutzername = parameter.get("neuerNN");
            let neuesPw = parameter.get("neuesPW");
            let setStatusEingeloggt = "eingeloggt";
            let nutzerVergleichReg = await mongoClient.db("Rezeptesammlung").collection("Nutzer").find({ "nutzername": neuerNutzername }).hasNext();
            if (nutzerVergleichReg) {
                _response.statusCode = 401;
            }
            else {
                await mongoClient.db("Rezeptesammlung").collection("Nutzer").insertOne({ "nutzername": neuerNutzername, "passwort": neuesPw, "status": setStatusEingeloggt });
                _response.statusCode = 200;
            }
            break;
    }
    _response.end(); //Antwort wird an den Client geschickt
}
//# sourceMappingURL=server.js.map