import { MongoClient, type Db } from "mongodb";


let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;


export async function connectToDatabase(mongoUri: string,mongoDb: string): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  console.log("Connecting to MongoDB...");
  console.log("MONGODB_URI:", mongoUri);
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(mongoDb);

  cachedClient = client;
  cachedDb = db;
  console.log("Connected to MongoDB");
  return { client, db };
}
