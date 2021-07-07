import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


interface Nutzer {
    _id: string;
    nutzername: string;
    passwort: string;
    status: string;
}

interface Rezept {
    _id: string;
    titel: string;
    anleitung: string;
    autor: string;
    zutaten: [];
    favorisiert: [];
}

interface Zutat {
    _id: string;
    name: string;
    anzahl: number;
    einheit: string;
}

interface favorisiert {
    _id: string;
    nutzername: string;

}

//let rezepte: Mongo.Collection;


let port: number | string | undefined = process.env.PORT; //Port von Heroku
if (port == undefined)
    port = 8100; //Setzt den Port auf 8100, wenn er nichts findet

let server: Http.Server = Http.createServer(); //Server erschaffen
console.log("Starting on Port: " + port);

server.listen(port);
server.addListener("request", handleRequest); //EventListener für requests erschaffen


async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
   // _response.Content.Headers.Allow.Add("Allow", "POST"); //damit push erlaubt wird?

    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://testUser:1234@cluster.vrtif.mongodb.net/Rezeptesammlung?retryWrites=true&w=majority", options);
    await mongoClient.connect();


    let myURL: Url.URL = new Url.URL(_request.url, "https://example.com");
    let parameter: URLSearchParams = myURL.searchParams;
    let path: string = Url.parse(_request.url).pathname;


    switch (path) {
        //wenn bei der Url /alleRezepte angehängt wird, dann finde alle Objekte in meiner Rezeptecollection, pack sie in array und geb sie mir aus.
        case "/alleRezepte":
            let rezeptArray: Rezept[] = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(rezeptArray));

            break;

        //wenn bei Url /favoriten dran...    
        case "/favoriten":
            let favoritenArray: Rezept[] = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(favoritenArray));

            break;

        case "/meineRezepte":
            let meineRezepteArray: Rezept[] = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(meineRezepteArray));

            break;

        case "/registrieren":
            let neuerNutzername: string = parameter.get("neuerNN");
            let neuesPw: string = parameter.get("neuesPW");
            let nutzerInDb: Nutzer[] = await mongoClient.db("Rezeptesammlung").collection("Nutzer").find().toArray();
            let statusEingeloggt: string = "Eingeloggt";
            let statusAusgeloggt: string = "Ausgeloggt";

            for (let i: number = 0; i < nutzerInDb.length; i++) {
                if (nutzerInDb[i].nutzername == neuerNutzername) {
                    alert("Dieser Nutzername existiert bereits. Bitte wählen Sie einen anderen Namen oder loggen Sie sich mit einem bestehenden Konto ein.");
                } else {
                await mongoClient.db("Rezeptesammlung").collection("Nutzer").insertOne({_id: new Mongo.ObjectID(), nutzername: neuerNutzername, passwort: neuesPw, status: statusEingeloggt});
                }
            }
            break;
        
        case "/einloggen":
            let nutzer: string = parameter.get("nutzername");
            let passwort: string = parameter.get("password");

            for (let i: number = 0; i < nutzerInDb.length; i++) {
                if (nutzerInDb[i].nutzername == nutzer && nutzerInDb[i].passwort == passwort) {
                    mongoClient.db("Rezeptesammlung").collection("Nutzer").find({nutzername: nutzer, passwort: passwort});
                } else {
                    alert("Es gab einen Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.");
                }
            }
           
            break;
    

    }

    _response.end(); //Antwort wird an den Client geschickt
}

