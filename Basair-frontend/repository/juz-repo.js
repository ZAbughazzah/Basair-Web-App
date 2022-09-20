import * as indexedDB from "../repository/basair-repo.js";
const juzsStoreName = 'juzs';
/**
 * For Juz
 */

export async function fetchJuzs() {
    const url = '../json/juzs.json';
    const response = await fetch(url);
    return await response.json();
}

export async function getJuzs() {
    const db = await indexedDB.getDB();
    return await db.getAll(juzsStoreName);
}