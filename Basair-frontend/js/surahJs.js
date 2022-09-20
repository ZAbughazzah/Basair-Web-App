import * as SurahRepo from "../repository/Surah-repo.js";
import * as Basair from "./basair.js";
import * as pageLoader from "./pageLoader.js";
import * as MahawerJs from "./mahawerJs.js";

const surahsList = document.querySelector("#surahList");

export async function loadSurahList() {
    let surahs = await SurahRepo.getSurahs();
    const loadSurahs = surahs.map(surah => surahNames(surah)).join(' ')
    surahsList.innerHTML = loadSurahs
}

function surahNames(surah) {
    return `<li><a class="surahName" id="surahName" onclick="loadSurah('${surah.name}') ,loadPage('tafsir.html')">${surah.name}</a></li>`
}

function generateLightColorRgb() {
    const red = Math.random() * (220);
    const green = Math.random() * (245 - 180) + 180;
    const blue = Math.random() * (245 - 163) + 163;
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

export function surahToText(surah) {
    let verses = ""
    Basair.chosenColor.length = 0

    surah.ayat.forEach(surah => {
            surah.verses.map(verse => {
                let color = "transparent"
                if (Basair.htmlPage == "tafsir.html") {
                    color = generateLightColorRgb()
                    Basair.chosenColor.push(color)
                } else {
                    if (Basair.selectedQismAyaList) {
                        if (Basair.selectedQismAyaList.includes(verse.id)) {
                            color='rgba(105,216,216,1)'
                        }
                    }
                }
                if ((surah.id == 1 || surah.id == 9) && verse.id == 1) {
                    verses += (`<span class="surahTitle" id="surahTitle">${surah.name}</span>`)
                    verses += (`<span class="ayah" id="ayah" style="background-color: ${color}"  onclick="verseRecitation(${verse.id},${surah.id})">${verse.text} &#xFD3F;${verse.id}&#xFD3E; </span>`)
                } else if (verse.id == 1) {
                    verses += (`<span class="surahTitle" id="surahTitle">${surah.name}</span>`)
                    verses += (`<span class="basmallah" id="basmallah">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</span>`)
                    verses += (`<span class="ayah" id="ayah" style="background-color:${color}" onclick="verseRecitation(${verse.id},${surah.id}),loadPage('tafsir.html')">${verse.text} &#xFD3F;${verse.id}&#xFD3E; </span>`)
                } else {
                    verses += (`<span class="ayah" id="ayah" style="background-color: ${color}" onclick="verseRecitation(${verse.id},${surah.id}),loadPage('tafsir.html')">${verse.text} &#xFD3F;${verse.id}&#xFD3E; </span>`)
                }

            }).join(' ')
        }
    )
    return verses
}
export function verseRecitation(ayahNumber, surahNumber) {
    let url;
    if (surahNumber >= 1 & surahNumber < 10) {
        if (ayahNumber >= 1 & ayahNumber < 10)
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/00${surahNumber}00${ayahNumber}.mp3`
        else if (ayahNumber >= 10 & ayahNumber < 100)
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/00${surahNumber}0${ayahNumber}.mp3`
        else
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/00${surahNumber}${ayahNumber}.mp3`
    } else if (surahNumber >= 10 & surahNumber < 100) {
        if (ayahNumber >= 1 & ayahNumber < 10)
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/0${surahNumber}00${ayahNumber}.mp3`
        else if (ayahNumber >= 10 & ayahNumber < 100)
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/0${surahNumber}0${ayahNumber}.mp3`
        else
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/0${surahNumber}${ayahNumber}.mp3`
    } else {
        if (ayahNumber >= 1 & ayahNumber < 10)
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${surahNumber}00${ayahNumber}.mp3`
        else if (ayahNumber >= 10 & ayahNumber < 100)
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${surahNumber}0${ayahNumber}.mp3`
        else
            url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${surahNumber}${ayahNumber}.mp3`
    }
    let audio = new Audio(url);
    audio.play()
}

export async function loadSurah(name) {
    const requiredIndex = await getPageByName(name)
    const requiredPage = await Basair.getPageByNumber(requiredIndex)
    let loadVersus = requiredPage.map(surah => surahToText(surah)).join(` `)
    Basair.quranPageContent.innerHTML = loadVersus
    let loadTafsirs = requiredPage.map(surah => Basair.tafsirToText(surah)).join(` `)
    pageLoader.tafsirPageContent.innerHTML = `${loadTafsirs}`
    Basair.pageNumber.value = requiredIndex
    await MahawerJs.loadMahawerList(requiredIndex)
    await MahawerJs.loadMapContentOfPage(requiredPage)
}

async function getPageByName(name) {
    const quranSurahs = await SurahRepo.getSurahs()
    let requiredSurah = await quranSurahs.filter(page => page.name == name)
    let requiredIndex = requiredSurah[0].page
    return requiredIndex
}