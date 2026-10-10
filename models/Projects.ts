import { getDb } from "../database/connection.ts";

export async function initTable() {
  const db = getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_key TEXT UNIQUE,
      project_name TEXT,
      description TEXT,
      team_members TEXT
    )
  `);
}

export async function insertProject(key: string, name: string, desc: string, members: string) {
  const db = getDb();
  try {
    await db.run(
      `INSERT INTO projects (project_key, project_name, description, team_members) VALUES (?, ?, ?, ?)`,
      [key, name, desc, members]
    );
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getProject(id: string,) {
  const db = getDb();
  try {
    await db.run(
      `SELECT * FROM project WHERE id = ?`,
      [id]
    );
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


