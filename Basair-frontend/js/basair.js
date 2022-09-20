import * as VersesRepo from "../repository/verses-repo.js";
import * as SurahJS from "./surahJs.js";
import * as hizbJs from "./hizbJs.js";
import * as juzJs from "./juzJs.js";
import * as pageLoader from "./pageLoader.js";
import * as mahawerJs from "./mahawerJs.js";


export let chosenColor = []
export let selectedQismAyaList
export let htmlPage = "tafsir.html"
export const quranPageContent = document.getElementById("quranPageContent")
const treeBtn = document.getElementById("treeBtn")
export const pageNumber = document.querySelector('#pageNumber')


window.onload = async () => {
    window.loadPage = pageLoader.loadPage
    await pageLoader.loadPage('tafsir.html')
    await loadWholeQuran()
    await mahawerJs.loadMahawerList()
    await SurahJS.loadSurahList();
    await juzJs.loadJuzList();
    window.loadSurah = SurahJS.loadSurah
    window.loadJuz = juzJs.loadJuz
    window.gotoHizb = hizbJs.gotoHizb
    window.verseRecitation = SurahJS.verseRecitation
    window.loadMahawerContent = mahawerJs.loadMahawerContent

}

export function setHTMLPage(pageName){
    htmlPage = pageName
}

export function setselectedQismAyaList(qismAyaList){
    selectedQismAyaList = qismAyaList
}

treeBtn.onclick = await mahawerJs.loadMahawerContent
pageNumber.addEventListener("input", loadWholeQuran)
pageNumber.addEventListener("input", mahawerJs.loadMahawerList)

export async function loadWholeQuran() {
    const page = pageNumber.value
    const requiredPage = await getPageByNumber(page)
    let loadVersus = requiredPage.map(surah => SurahJS.surahToText(surah)).join(` `)
    let loadTafsirs = requiredPage.map(surah => tafsirToText(surah)).join(` `)
    pageLoader.tafsirPageContent.innerHTML = `${loadTafsirs}`
    quranPageContent.innerHTML = loadVersus
    await mahawerJs.loadMahawerList(page)
    await mahawerJs.loadMapContentOfPage(requiredPage)
    console.log(`req page: ${requiredPage}`)
}

export async function getPageByNumber(pageNumber) {
    let quranPages = await VersesRepo.getVersesByPage()
    let requiredPage = quranPages.filter(page => page.index == pageNumber)
    return requiredPage
}

/////////////////////////////////////////////////////////////////////// Loading tafsir /////////////////////////////////////////////////////////////////////////////////////////

export function tafsirToText(surah) {
    let tafsirs = ""
    let index = 0
    surah.ayat.forEach(surah => surah.tafsir.map(
        verse => {
            const color = chosenColor[index]
            if (verse.index == 1) {
                tafsirs += (`<span class="tafsirSuraName" id="tafsirSuraName">${surah.name}</span>`)
                tafsirs += (`<span class="tafsirSuraNumber" id="tafsirSuraNumber" style="background-color: ${color}">${verse.index}</span>`)
                tafsirs += (`<span class="tafsirSuraText" id="tafsirSuraText" >${verse.text}</span>`)
            } else {
                tafsirs += (`<span class="tafsirSuraNumber" id="tafsirSuraNumber" style="background-color: ${color}">${verse.index}</span>`)
                tafsirs += (`<span class="tafsirSuraText" id="tafsirSuraText" >${verse.text}</span>`)
            }
            index++
        }
    ))
    return tafsirs
}


