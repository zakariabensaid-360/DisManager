import { getDb } from "../database/connection.ts";

export async function initTable() {
  const db = getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      DISCORD_ID TEXT UNIQUE,
      projects_ID JSON NOT NULL
    )
  `);
}

export async function insertUser(DISCORD_ID: string, project_id: number) {
  const db = getDb();
  try {
    const user = await db.get(
      `SELECT DISCORD_ID FROM users WHERE DISCORD_ID = ?`,
      [DISCORD_ID],
    );
    if (!user) {
      await db.run(
        `INSERT INTO users IF EXISTS (DISCORD_ID, projects_id) VALUES (?, ?)`,
        [DISCORD_ID, JSON.stringify([project_id])],
      );

      return { success: true };
    }
    const data = await db.get(
      `SELECT projects_ID FROM users WHERE DISCORD_ID = ?`,
      [DISCORD_ID],
    );

    const projectsArray: number[] = JSON.parse(data.projects_ID);
    projectsArray.push(project_id);
    await db.run(
      `INSERT INTO users IF EXISTS (DISCORD_ID, projects_id) VALUES (?, ?)`,
      [DISCORD_ID, JSON.stringify(projectsArray)],
    );
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
