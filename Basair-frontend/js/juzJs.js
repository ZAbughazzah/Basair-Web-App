import * as JuzsRepo from "../repository/juz-repo.js";
import * as SurahJS from "./surahJs.js";
import * as Basair from "./basair.js";
import * as pageLoader from "./pageLoader.js";
import * as MahawerJs from "./mahawerJs.js";
import {htmlPage} from "./basair.js";


const juzsList = document.querySelector("#juzsList");

export async function loadJuzList() {
    const juzs = await JuzsRepo.getJuzs()
    const loadJuzs = juzs.map(juz => juzName(juz)).join(' ')
    juzsList.innerHTML = `${loadJuzs}`
}

function juzName(juz) {
    const Aljuz = 'الجزء'
    return `<li><a onclick="loadJuz('${juz.page}')" > ${Aljuz} ${juz.index} </a></li>`
}

export async function loadJuz(pageNo) {
    const page = pageNo
    const requiredPage = await Basair.getPageByNumber(page)
    let loadVersus = requiredPage.map(surah => SurahJS.surahToText(surah)).join(` `)
    let loadTafsirs = requiredPage.map(surah => Basair.tafsirToText(surah)).join(` `)
    pageLoader.tafsirPageContent.innerHTML = `${loadTafsirs}`
    Basair.quranPageContent.innerHTML = loadVersus
    Basair.pageNumber.value = page
    await MahawerJs.loadMahawerList(page)
    await MahawerJs.loadMapContentOfPage(requiredPage)
    if (htmlPage === 'aqsam.html') {
        await pageLoader.loadPage("tafsir.html")
    }
}
