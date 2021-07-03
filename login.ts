import * as Mongo from "mongodb";

namespace Rezeptesammlung {

    export interface Nutzer {
        _id: string;
        nutzername: string;
        passwort: string;
    }
    
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://testUser:1234@cluster.vrtif.mongodb.net/Rezeptesammlung?retryWrites=true&w=majority");
    await mongoClient.connect();
    
    let result: Response = await fetch(serverUrl + "LogIn");
    let nutzer: Nutzer[] = JSON.parse(await result.text());
    let benutzer: Mongo.Collection = mongoClient.db("Rezeptesammlung").collection("Nutzer");

    let einlogButton: HTMLDivElement = document.createElement("div");
    einlogButton.classList.add("LogInButton");
    einlogButton.setAttribute("type", "button");
    einlogButton.innerHTML = "Einloggen";

    //Entfern-Event
    einlogButton?.addEventListener("click", einloggen);

    

    //function einloggen(_event: Event): void {
        //if (benutzer.find() == benutzer. )
    
   
    //}

    //function registrieren(_event: Event): void {    
    //benutzer.insert({});
//}
}