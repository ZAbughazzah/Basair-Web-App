import * as indexedDB from "../repository/basair-repo.js";
const mahawerMapStoreName = 'mahawerMap';
/**
 * For mahawerMap
 */

export async function fetchMahawerMap() {
    const url = '../json/mahawerMap.json';
    const response = await fetch(url);
    return await response.json();
}

export async function getMahawerMap() {
    const db = await indexedDB.getDB();
    return await db.getAll(mahawerMapStoreName);
}