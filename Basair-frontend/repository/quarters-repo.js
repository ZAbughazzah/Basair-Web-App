const quartersStoreName = 'quarters';
import * as indexedDB from "../repository/basair-repo.js";
/**
 * For quarters
 */
export async function fetchQuarters() {
    const url = '../json/quarters.json';
    const response = await fetch(url);
    return await response.json();
}
export async function getQuarters() {
    const db = await indexedDB.getDB();
    return await db.getAll(quartersStoreName);
}