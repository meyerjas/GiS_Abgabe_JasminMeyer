import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


interface Nutzer {
    [type: string]: string | string[];
}

interface Rezept {
  _id: string;
  titel: string;
  anleitung: string;
  autor: string;
}

interface Zutat {
  _id: string;
  name: string;
  einheit: string;
  anzahl: number;
}

//let orders: Mongo.Collection;
let server: Http.Server = Http.createServer(); //Server erschaffen

let port: number | string | undefined = process.env.PORT; //Port von Heroku
if (port == undefined) {
    port = 8100; //Setzt den Port auf 8100, wenn er nichts findet
}

server.listen(port);
console.log("Listening on Port: " + port);

server.addListener("request", handleRequest); //EventListener für requests erschaffen

async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise <void> { 
  console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
  _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
  _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
  let pathName: string = Url.parse(_request.url).pathname;

  
  
  let mongoClient: Mongo.MongoClient = new Mongo.MongoClient("mongodb://localhost:27017");
  await mongoClient.connect();

  let myURL: Url.URL = new Url.URL(_request.url, "https://example.com");
  let parameter: URLSearchParams = myURL.searchParams;
  switch (pathName) {
    case "/AlleRezepte":
      let rezeptArray: Rezept[] = await mongoClient.db("Database").collection("Rezepte").find().toArray();
      _response.write(JSON.stringify(rezeptArray));
  }


  //let databaseUrl: string = "mongodb://localhost:27017";
  
      //storeNutzer(url.query)

  _response.end(); //Antwort wird an den Client geschickt

    //function storeNutzer(_nutzer: Nutzer): void {
      //orders.insert(_nutzer);
    
  }