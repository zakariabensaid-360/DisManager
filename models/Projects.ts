import { getDb } from "../database/connection.ts";

export async function initProjectTable() {
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
    let team: string[] = members.split(",") 
    await db.run(
      `INSERT INTO projects (project_key, project_name, description, team_members) VALUES (?, ?, ?, ?)`,
      [key, name, desc, team]
    );
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
export async function getProject(id: number) {
  const db = getDb();
  try {
    const data = await db.get(
      `SELECT * FROM projects WHERE id = ?`,
      [id]
    );
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

