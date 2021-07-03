import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


interface Nutzer {
  _id: string;
  nutzername: string;
  passwort: string;
}

interface Rezept {
  [type: string]: string | string[];
  /*_id: string;
  titel: string;
  anleitung: string;
  autor: string;]*/
}

interface Zutat {
  _id: string;
  name: string;
  einheit: string;
  anzahl: number;
}

let rezepte: Mongo.Collection;


let port: number | string | undefined = process.env.PORT; //Port von Heroku
if (port == undefined) 
    port = 27; //Setzt den Port auf 8100, wenn er nichts findet

let databaseUrl: string = "mongodb://localhost:27017";

startServer(port);
connectToDatabase(databaseUrl);

function startServer(_port: number | string): void {
let server: Http.Server = Http.createServer(); //Server erschaffen
console.log("Starting on Port: " + _port);

server.listen(_port);
server.addListener("request", handleRequest); //EventListener für requests erschaffen
}

async function connectToDatabase(_url: string): Promise <void> {
  let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
  let mongoClient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://testUser:1234@cluster.vrtif.mongodb.net/Rezeptesammlung?retryWrites=true&w=majority", options);
  await mongoClient.connect();
  rezepte = mongoClient.db("Rezeptesammlung").collection("Rezepte");
  console.log("DB connection", rezepte != undefined);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void { 
  console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
  _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
  _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
  
  if (_request.url) {
    let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
    for (let key in url.query) {
      _response.write(key + ":" + url.query[key] + "<br/>");
    }
    let jsonString: string = JSON.stringify(url.query);
    _response.write(jsonString);

    storeRezept(url.query);
    
  }

      
  function storeRezept (_rezept: Rezept): void {
    rezepte.insertOne(_rezept);
  }
  _response.end(); //Antwort wird an den Client geschickt
    
  }