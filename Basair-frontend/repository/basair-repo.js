import { openDB, deleteDB } from 'https://unpkg.com/idb?module';
import * as SurahRepo from "./Surah-repo.js";
import * as JuzRepo from "./juz-repo.js";
import * as MahawerRepo from "./mahawer-repo.js";
import * as VersesRepo from "./verses-repo.js";
import * as QuartersRepo from "./quarters-repo.js";

const dbName = 'basair-db';   // string, database name
const dbVersion = 1;   // integer, YOUR database version (not IndexedDB version)
const surahsStoreName = 'surahs';  // Name of your collection of documents
const juzsStoreName = 'juzs';
const mahawerMapStoreName = 'mahawerMap';
const quartersStoreName = 'quarters';
const versesByPageStoreName = 'versesByPage';

export async function getDB() {
    //await deleteDB(dbName);
    const db = await openDB(dbName, dbVersion, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(surahsStoreName)) {
                    db.createObjectStore(surahsStoreName, {
                        keyPath: 'id', autoIncrement: true,
                    });
                }
                if (!db.objectStoreNames.contains(juzsStoreName)) {
                    db.createObjectStore(juzsStoreName, {
                        keyPath: 'id', autoIncrement: true,
                    });
                }
                if (!db.objectStoreNames.contains(mahawerMapStoreName)) {
                    db.createObjectStore(mahawerMapStoreName, {
                        keyPath: 'id', autoIncrement: true,
                    });
                }
                if (!db.objectStoreNames.contains(quartersStoreName)) {
                    db.createObjectStore(quartersStoreName, {
                        keyPath: 'id', autoIncrement: true,
                    });
                }

                if (!db.objectStoreNames.contains(versesByPageStoreName)) {
                    db.createObjectStore(versesByPageStoreName, {
                        keyPath: 'id', autoIncrement: true,
                    });
                }

            },
        }
    );
    const surahsCount = await db.count(surahsStoreName);
    if (surahsCount === 0) {
        const surahs = await SurahRepo.fetchSurahs();
        for (const s of surahs) {
            await db.add(surahsStoreName,s);
        }
    }
    const juzsCount = await db.count(juzsStoreName);
    if (juzsCount === 0) {
        const juzs = await JuzRepo.fetchJuzs();
        for (const j of juzs) {
            await db.add(juzsStoreName,j);
        }
    }
    const mahawerMapCount = await db.count(mahawerMapStoreName);
    if (mahawerMapCount === 0) {
        const mahawerMap = await MahawerRepo.fetchMahawerMap();
        for (const m of mahawerMap) {
            await db.add(mahawerMapStoreName,m);
        }
    }
    const quartersCount = await db.count(quartersStoreName);
    if (quartersCount === 0) {
        const quarters = await QuartersRepo.fetchQuarters();
        for (const q of quarters) {
            await db.add(quartersStoreName,q);
        }
    }

    const versesByPageCount = await db.count(versesByPageStoreName);
    if (versesByPageCount === 0) {
        const versesByPage = await VersesRepo.fetchVersesByPage();
        for (const vp of versesByPage) {
            await db.add(versesByPageStoreName,vp);
        }
    }

    return db;
}