import { variables } from "./config/variables.js";
import { MongoDatabase } from "./data/index.js";
import { AppRouter } from "./presentation/server/app.route.js";
import { AppServer } from "./presentation/server/app.server.js";

(async ()=>{
    await main();
})()



async function main(){
    await MongoDatabase.connect({
        mongoUrl: variables.database.MONGO_URL,
        dbName: variables.database.MONGO_DB_NAME,
    });

    const appRouter =  new AppRouter();
    const appServer = new AppServer(
        variables.servidor.puerto,
        await appRouter.getRouter()
    );

    await appServer.start();
}