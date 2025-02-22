'use server'
import pool from "@/lib/db"; // データベースの接続プールをインポート

type Company = {
  id: number;
  name: string;
}
type Project = {
    id: number;
    code: string;
}

type Worker = {
  id: number;
  name: string
}

export async function getCompany() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        company.id AS id,
        company.name AS name
      FROM company;
    `);
    return rows as Company[];
  } catch (error) {
    console.error("データ取得エラー:", error);
    throw new Error("データの取得に失敗しました");
  }
}

export async function getProjects() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        project.id AS id,
        project.code AS code
      FROM  project;
    `);
    return rows as Project[];
  } catch (error) {
    console.error("データ取得エラー:", error);
    throw new Error("データの取得に失敗しました");
  }
}

export async function getWorkers() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        worker.id AS id,
        worker.name AS name
      FROM  worker;
    `);
    return rows as Worker[];
  } catch (error) {
    console.error("データ取得エラー:", error);
    throw new Error("データの取得に失敗しました");
  }
}
