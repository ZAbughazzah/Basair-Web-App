import * as JuzsRepo from "../repository/juz-repo.js";
import * as SurahJS from "./surahJs.js";
import * as Basair from "./basair.js";
import * as VersesRepo from "../repository/verses-repo.js";
import * as QuarterRepo from "../repository/quarters-repo.js";
import * as pageLoader from "./pageLoader.js";
import * as MahawerJs from "./mahawerJs.js";


export async function gotoHizb(quarterNumber) {
    const currentPage = Basair.pageNumber.value;
    const juzs = await JuzsRepo.getJuzs()
    let currentJuz = juzs.filter(juz => (currentPage >= juz.page) && (currentPage <= juz.pageEnd))
    console.log("1"+currentJuz)
    console.log("2"+currentJuz[0].index)
    const requiredPage = await getQuarterByNumber(quarterNumber, currentJuz[0].index)
    const requiredPage2 = await convert(requiredPage)
    const requiredPage3 = await Basair.getPageByNumber(requiredPage2[0].index)
    const loadVersus = requiredPage3.map(surah => SurahJS.surahToText(surah)).join(`{ surahName }`)
    let loadTafsirs = requiredPage3.map(surah => Basair.tafsirToText(surah)).join(` `)
    pageLoader.tafsirPageContent.innerHTML = `${loadTafsirs}`
    Basair.quranPageContent.innerHTML = loadVersus
    Basair.pageNumber.value = requiredPage[0].page
    await MahawerJs.loadMahawerList(requiredPage[0].page)
    await MahawerJs.loadMapContentOfPage(requiredPage3)
}
async function convert(requiredPage) {
    let quranPages = await VersesRepo.getVersesByPage()
    let newRequiredPage = quranPages.filter(page => page.index == requiredPage[0].page)
    return newRequiredPage
}

async function getQuarterByNumber(quarterNumber, juz) {
    let quranQuarters = await QuarterRepo.getQuarters()
    let requiredPage = quranQuarters.filter(quarter => quarter.quarterNumber == quarterNumber && quarter.juz == juz)
    return requiredPage
}