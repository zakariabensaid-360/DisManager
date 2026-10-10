import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

let db: Database;

export async function connectDatabase() {
  if (!db) {
    db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });
    console.log("Database connected successfully!");
  }
  return db;
}

export function getDb(): Database {
  if (!db) {
    throw new Error("Database not initialized! Call connectDatabase() first.");
  }
  return db;
}