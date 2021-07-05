import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


interface Nutzer {
    _id: string;
    nutzername: string;
    passwort: string;
    status: string;
}

interface Rezepte {
    _id: string;
    titel: string;
    anleitung: string;
    autor: string;
    zutaten: [];
    favorisiert: [];
}

interface Zutaten {
    _id: string;
    name: string;
    anzahl: number;
    einheit: string;
}

interface favorisiert {
    _id: string;
    nutzername: string;

}

let rezepte: Mongo.Collection;


let port: number | string | undefined = process.env.PORT; //Port von Heroku
if (port == undefined)
    port = 27; //Setzt den Port auf 8100, wenn er nichts findet

let server: Http.Server = Http.createServer(); //Server erschaffen
console.log("Starting on Port: " + port);

server.listen(port);
server.addListener("request", handleRequest); //EventListener für requests erschaffen


async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen

    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://testUser:1234@cluster.vrtif.mongodb.net/Rezeptesammlung?retryWrites=true&w=majority", options);
    await mongoClient.connect();


    let myURL: Url.URL = new Url.URL(_request.url, "https://example.com");
    let parameter: URLSearchParams = myURL.searchParams;
    let path: string = Url.parse(_request.url).pathname;


    switch (path) {
        //wenn bei der Url /alleRezepte angehängt wird, dann...
        case "/alleRezepte":
            //...finde alle Objekte in meiner Rezeptecollection und pack sie in nen Array
            let rezeptArray: Rezepte[] = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            //Gib mir mein Rezept auf der Seite aus.
            _response.write(JSON.stringify(rezeptArray));

            break;

        //wenn bei Url /favoriten dran...    
        case "/favoriten":
            
            let parseRezepte: Rezepte[] = JSON.parse(parameter.get(""));
            //Wer hat das Rezept favorisiert?
            let werFav: string = parameter.get("favorisiert");

            for (let i: number = 0; i < parseRezepte.length; i++) {
            
                //ObjectID wird benötigt da es nicht nur ein String ist sondern ein Object https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
                let findQuery: Object = {
                    _id: new Mongo.ObjectID(parseRezepte[i]._id)
                };

                //https://stackoverflow.com/a/38883596  zum updaten des Werts
                let updateQuery: Object = { $set: { favorisiert: werFav., favorisiert: "" } };

                //FindOneAndUpdate: Mongodb Dokumentation: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/#examples (Erster Parameter sucht, zweiter Paramater updatet das gefundene)
                await mongoClient.db("Rezeptesammlung").collection("Rezepte").findOneAndUpdate(findQuery, updateQuery);
            }
            break;
        case "/meineRezepte":
            let meineRezepteArray: Rezepte[] = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            // console.log(meineRezepteArray);
            _response.write(JSON.stringify(meineRezepteArray));
            break;

        case "/LogIn":
         

    }




    _response.end(); //Antwort wird an den Client geschickt

}
function storeRezept(_rezept: Rezept): void {
    rezepte.insertOne(_rezept);
}