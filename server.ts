import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace abgabeServer {
  interface Nutzer {
    [type: string]: string | string[];
  }

  let orders: Mongo.Collection;

  let port: number = Number(process.env.PORT); //Sucht ein Port
  if (!port)
    port = 8100; //Setzt den Port auf 8100, wenn er nichts findet

  let databaseUrl: string = "mongodb://localhost:27017";

  startServer(port);
  connectToDatabase(databaseUrl);

  function startServer(_port: number | string): void {
    let server: Http.Server = Http.createServer(); //Server erschaffen
    server.addListener("request", handleRequest); //EventListener für requests erschaffen
    server.addListener("listening", handleListen); //Eventlistener fürs zuhören schaffen
    server.listen(_port); //Server hört auf den Port
    }

  async function connectToDatabase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    orders = mongoClient.db("Database").collection("");
    console.log("Database connection", orders != undefined);
  }
  
  function handleListen(): void {
    console.log("Listening"); //wenn die funktion handleListen ausgeführt wird, gibt die Konsole "Listening" aus
    }
  
  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void { //
    console.log("I hear voices!"); //wenn die funktion handleRequest ausgeführt wird, gibt die Konsole "I hear voices!" aus.
    
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Antwort ist vom typ Text
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Alle können auf die Antwort zugreifen
  
    _response.write(_request.url); //URL wird geschrieben
    console.log("Ausgabe: " + _request.url);
    

    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

      let jsonString: string = JSON.stringify(url.query);
      _response.write(jsonString);

      storeNutzer(url.query);
    }


    _response.end(); //Antwort wird an den Client geschickt

    function storeNutzer(_nutzer: Nutzer): void {
      orders.insert(_nutzer);
    }
  }
}