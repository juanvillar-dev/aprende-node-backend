import { variables } from "./config/env.js";
import { MongoDatabase } from "./data/index.js";
import { App } from "./presentation/server/app.js";
import { AppRouter } from "./presentation/server/routes.js";

(async ()=>{
    await main();
})()



async function main() {

    await MongoDatabase.connect({
        dbName: variables.database.MONGO_DB_NAME,
        mongoUrl: variables.database.MONGO_URL
    })

    const routers = new AppRouter();
    const app = new App(3000, routers.getRouters());
    app.start()
}