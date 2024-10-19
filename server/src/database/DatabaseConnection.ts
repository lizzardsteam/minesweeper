import { sqliteConfig } from "../config/sqlite";
import Database from "better-sqlite3";

const db = new Database(sqliteConfig.path, { verbose: console.log }); 

export default db
