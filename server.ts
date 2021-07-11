import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

interface Rezept {
    _id: string;
    titel: string;
    anleitung: string;
    autor: string;
    zutaten: string[];
}

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

        case "/favoriten":
            let favoritenArray: Rezept[] = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(favoritenArray));

            break;

        case "/meineRezepte":

            let meineRezepteArray: Rezept[] = await mongoClient.db("Rezeptesammlung").collection("Rezepte").find().toArray();
            _response.write(JSON.stringify(meineRezepteArray));

            break;

        case "/meineRezepte/delete":
            console.log("es is heiß hier ersma löschen alla");
            let idParam: string = parameter.get("id");

            //https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#examples löschen von docs
            await mongoClient.db("Rezeptesammlung").collection("Rezepte").deleteOne({ "_id": new Mongo.ObjectId(idParam) });

            break;

        case "/meineRezepte/edit":
            console.log("server edit is initiiert");
            let titelChange: string = parameter.get("titelChange");
            let anleitungChange: string = parameter.get("anleitungChange");
            let zutatenChange: string[] = JSON.parse(parameter.get("zutatenChange"));
            let idPm: string = parameter.get("id");

            await mongoClient.db("Rezeptesammlung").collection("Rezepte").findOneAndUpdate({ "_id": new Mongo.ObjectId(idPm) }, { $set: { "zutaten": zutatenChange, "titel": titelChange, "anleitung": anleitungChange } });

            break;

        case "/meineRezepte/neuesRezept":
            let titel: string = parameter.get("titel");
            let anleitung: string = parameter.get("anleitung");
            let parseZutaten: string[] = JSON.parse(parameter.get("zutaten"));
            let autor: string = parameter.get("autor");
            console.log(parseZutaten);

            await mongoClient.db("Rezeptesammlung").collection("Rezepte").insertOne({ "titel": titel, "anleitung": anleitung, "autor": autor });

            for (let k: number = 0; k < parseZutaten.length; k++) {
                if (parseZutaten[k] != "" || undefined) {
                    console.log(parseZutaten[k]);
                    //https://www.tabnine.com/code/javascript/functions/mongodb/Collection/findOneAndUpdate
                    await mongoClient.db("Rezeptesammlung").collection("Rezepte").findOneAndUpdate({ titel: titel }, { $set: { "zutaten": parseZutaten } });
                }
            }
            break;

        case "/logIn/einloggen":
            console.log("Wir sind am einloggen.");
            let nutzer: string = parameter.get("nutzername");
            let passwort: string = parameter.get("password");

            //vergleiche eingegebene Werte mit Werten in der DB und finde Übereinstimmung. Hör auf, wenn gefunden (hasNext(): https://examples.javacodegeeks.com/software-development/mongodb/mongodb-hasnext-and-next-example/)
            let nutzerVergleich: boolean = await mongoClient.db("Rezeptesammlung").collection("Nutzer").find({ "nutzername": nutzer, "passwort": passwort }).hasNext();

            if (nutzerVergleich) {

                console.log("Eingeloggt als" + nutzer);
                // bei success: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success
                _response.statusCode = 200;

            } else {
                //bei misserfolg: link s.o. (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success)
                _response.statusCode = 401;
            }

            break;

        case "/logIn/registrieren":
            console.log("wir sind am Reg");
            let neuerNutzername: string = parameter.get("neuerNN");
            let neuesPw: string = parameter.get("neuesPW");
            let setStatusEingeloggt: string = "eingeloggt";

            let nutzerVergleichReg: boolean = await mongoClient.db("Rezeptesammlung").collection("Nutzer").find({ "nutzername": neuerNutzername }).hasNext();

            if (nutzerVergleichReg) {

                _response.statusCode = 401;

            } else {
                await mongoClient.db("Rezeptesammlung").collection("Nutzer").insertOne({ "nutzername": neuerNutzername, "passwort": neuesPw, "status": setStatusEingeloggt });
                _response.statusCode = 200;
            }

            break;

    }

    _response.end(); //Antwort wird an den Client geschickt
}

