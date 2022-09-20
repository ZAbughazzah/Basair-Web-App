const versesByPageStoreName = 'versesByPage';
import * as indexedDB from "../repository/basair-repo.js";

/**
 * For versesByPage
 */
export async function fetchVersesByPage() {
    const url = '../json/versesByPages.json';
    const response = await fetch(url);
    return await response.json();
}
export async function getVersesByPage() {
    const db = await indexedDB.getDB();
    return await db.getAll(versesByPageStoreName);
}