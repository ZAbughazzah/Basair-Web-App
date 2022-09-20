import fs from 'fs-extra';
import path from "path";
import NavigatorRepo from "./navigator-repo.js";
import MahawerRepo from "./mahawer-repo.js";
import ViewerRepo from "./viewer-repo.js";

import Juz from '../model/juzModel.js'
import Page from '../model/pageModel.js'
import Quarter from '../model/quarterModel.js'
import QuranMahawer from '../model/quarterMahawerModel.js'
import Surah from '../model/surahModel.js'
import Tafsir from '../model/tafsirModel.js'
import Verse from '../model/verseModel.js'

const mahawerRepo = new MahawerRepo();
const navigatorRepo = new NavigatorRepo();
const viewerRepo = new ViewerRepo();

export default class BasairRepo {

    constructor() {
        this.JuzFilePath = path.join(path.resolve(), 'json/juzs.json');
        this.PageFilePath = path.join(path.resolve(), 'json/pages.json');
        this.QuarterFilePath = path.join(path.resolve(), 'json/quaters.json');
        this.QuranMahawerFilePath = path.join(path.resolve(), 'json/quran-mahawer.json');
        this.SurahFilePath = path.join(path.resolve(), 'json/surahs.json');
        this.TafsirFilePath = path.join(path.resolve(), 'json/tasfir.json');
        this.VerseFilePath = path.join(path.resolve(), 'json/verses.json');

    }

    async emptyDB() { //in case needed during testing
        await Juz.deleteMany({});
        await Page.deleteMany({});
        await Quarter.deleteMany({});
        await QuranMahawer.deleteMany({});
        await Surah.deleteMany({});
        await Tafsir.deleteMany({});
        await Verse.deleteMany({});
    }

    async initDb() {
        try {
            //Uncomment to empty the database
            //await this.emptyDB();
            //If the db is empty then init the db with data in json files
            const juzsCount = await navigatorRepo.getJuzsCount();

            console.log(`Juzs Count: ${juzsCount}. `);//Comment out emptyDB() to stop re-initializing the database`);
            if (juzsCount == 0) {
                await this.loadDataFromJsonFiles();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async loadDataFromJsonFiles() {
        const juzs = await fs.readJson(this.JuzFilePath);
        for (const juz of juzs) {
            await navigatorRepo.addQuranJuz(juz);
        }

        const pages = await fs.readJson(this.PageFilePath);
        for (const page of pages) {
            await viewerRepo.addQuranPages(page);
        }

        const quarters = await fs.readJson(this.QuarterFilePath);
        for (const quarter of quarters) {
            await viewerRepo.addQuranQuarter(quarter);
        }

        const quranMahawer = await fs.readJson(this.QuranMahawerFilePath);
        for (const mehwar of quranMahawer) {
            await mahawerRepo.addMehwar(mehwar);
        }

        const surahs = await fs.readJson(this.SurahFilePath);
        for (const surah of surahs) {
            await navigatorRepo.addQuranSurah(surah);
        }

        const tafsir = await fs.readJson(this.TafsirFilePath);
        for (const t of tafsir) {
            await viewerRepo.addQuranTafsir(t);
        }

        const suwarVerses = await fs.readJson(this.VerseFilePath);
        for (const surahVerses of suwarVerses) {
            await viewerRepo.addQuranAyaat(surahVerses);
        }
    }
}