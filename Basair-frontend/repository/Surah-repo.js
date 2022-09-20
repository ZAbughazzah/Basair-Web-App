import * as indexedDB from "../repository/basair-repo.js";
const surahsStoreName = 'surahs';
/**
 * For Surah
 */

export async function fetchSurahs() {
    const url = '../json/surahs.json';
    const response = await fetch(url);
    return await response.json();
}

export async function getSurahs() {
    const db = await indexedDB.getDB();
    return await db.getAll(surahsStoreName);
}