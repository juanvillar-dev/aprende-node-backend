import mongoose from 'mongoose';


interface Options {
    mongoUrl: string;
    dbName: string;
}



export class MongoDatabase {
    static async connect(options: Options){
        const {mongoUrl, dbName} = options;

        try {
            console.log(`Mongo connecting to ${mongoUrl} with dbName ${dbName}`);
            await mongoose.connect( mongoUrl, {dbName})

            return true;

        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}