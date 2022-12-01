import { MongoClient, Document, Db } from "mongodb"
import { AuthService } from "./AuthService";

export class MongoService {
    private static client: MongoClient
    private static db: Db

    static async connect() {
        MongoService.client = new MongoClient(process.env.MONGODB_URL as string)
        await MongoService.client.connect();
        
        MongoService.db = MongoService.client.db(process.env.MONGODB_NAME)

        await MongoService.populateDatabase()
    }

    static async getCollection<T extends Document>(collectionName: string) {        
        return MongoService.db.collection<T>(collectionName)
    }

    private static async populateDatabase() {
        if (process.env.NODE_ENV === "development") {
          // Dans le cadre de l'exercie et pour tester l'app, on crée un utilisateur par défaut
            const defaultEmail = "admin@exemple.com"
            const userExists = await AuthService.getUserByEmail(defaultEmail)
            if (!userExists) {
                AuthService.signup(defaultEmail, "admin", "admin")
            }
        }
    }
}