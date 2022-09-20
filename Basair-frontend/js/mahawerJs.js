import * as MahawerRepo from "../repository/mahawer-repo.js";
import * as pageLoader from "./pageLoader.js";
import * as SurahJS from "./surahJs.js";
import {getPageByNumber, htmlPage, pageNumber, quranPageContent} from "./basair.js";
import * as VersesRepo from "../repository/verses-repo.js";
import {mahawerPageContent} from "./pageLoader.js";
import * as Basair from "./basair.js";

let selectedQism

export async function loadMahawerList(currentPage = 0) {
    let current
    let requiredQism
    if (!currentPage) {
        current = pageNumber.value
    } else {
        current = currentPage
    }
    let aqsamList = await MahawerRepo.getMahawerMap();
    requiredQism = aqsamList.filter(ss => ((current >= ss.pageStart) && (current <= ss.pageEnd)))
    if (requiredQism.length == 0) {
        treeBtn.options.length = 0
        while (treeBtn.firstChild) {
            treeBtn.removeChild(treeBtn.firstChild)
        }
    } else {
        let mahawerOptions = requiredQism[0].mahawer.map(mehwar => mehwarToList(mehwar)).join(' ')
        treeBtn.innerHTML = `${mahawerOptions}`
    }
}

function mehwarToList(mehwar) {
    let list = ``
    let aqsam = ``
    mehwar.content.forEach(qism => {
            if (qism.name.indexOf("البصيرة") !== -1) {
                aqsam += `<option class="MahawerListOption" value="${qism.content}" style="color: #1c8586">${qism.name}</option>`
            }else{
                aqsam += `<option class="MahawerListOption" value="${qism.content}">${qism.name}</option>`
            }
        }
    )
    list += `<optgroup class="MahawerListGroup" id="MahawerListGroup" label="${mehwar.title}">${aqsam}</optgroup>`
    return list
}

export async function loadMahawerContent() {
    if (htmlPage != "aqsam.html") {
        Basair.setHTMLPage("aqsam.html")
        await pageLoader.loadPage(htmlPage)
    }
    //gets the selected qism in order to highlight it and the ayas in it
    let content = this.value
    console.log("content" + content)
    let mahawerMap
    let requiredMehwar
    let requiredQism
    let aqsamList = await MahawerRepo.getMahawerMap();

    aqsamList.forEach(ss => {
        ss.mahawer.forEach(mehwar => {
            mehwar.content.forEach(q => {
                if (q.content == content) {
                    requiredQism = q
                    requiredMehwar = mehwar
                    mahawerMap = ss
                }
            })
        })
    })
    selectedQism = content
    const page = await getPageForAyas(requiredQism.ayas[0], mahawerMap.name)
    const requiredPage = await getPageByNumber(page)
    Basair.setselectedQismAyaList(requiredQism.ayas)
    await loadMapContentOfPage(requiredPage)
    let loadVersus = requiredPage.map(surah => SurahJS.surahToText(surah)).join(` `)
    quranPageContent.innerHTML = loadVersus
    pageNumber.value = requiredPage[0].index
}

export async function loadMapContentOfPage(requiredPage) {
    let current
    let requiredQisms = []
    const qismsInPage = new Set()
    let mahawerContent = ``
    let aqsamList = await MahawerRepo.getMahawerMap();

    if (!requiredPage) {
        current = pageNumber.value
    } else {
        current = requiredPage
    }

    let pageAyas = []
    console.log(current[0])
    current[0].ayat.forEach(surah => {
        let suraAyaList = []
        surah.verses.forEach(verse => {
            suraAyaList.push(verse.id)
        })
        pageAyas.push(suraAyaList)
    })

    console.log(current)
    let requiredMap = aqsamList.filter(map => map.id == current[0].sura)

    if (requiredMap.length != 0) {
        let index = 0
        current[0].ayat.forEach(surah => {
            requiredMap[0].mahawer.forEach(mehwar => {
                if (mehwar.name == surah.name) {
                    mehwar.content.forEach(qism => {
                        for (const v in qism.ayas) {
                            if (pageAyas[0].includes(qism.ayas[v])) {
                                qismsInPage.add(mehwar.title)
                                qismsInPage.add(mehwar.main)
                                qismsInPage.add(qism)
                            }
                        }
                    })
                }
            })
            index++
        })

        requiredQisms = Array.from(qismsInPage)
        for (const q in requiredQisms) {
            if (typeof requiredQisms[q] === 'string') {
                if (requiredQisms[q].length > 15) {
                    mahawerContent += `<h2 class="mehwarMain" id="mehwarMain">${requiredQisms[q]}</h2>`
                } else {
                    mahawerContent += `<h1 class="mehwarName" id="mehwarName">${requiredQisms[q]}</h1>`
                }
            } else {
                if (requiredQisms[q].content == selectedQism) {
                    if(requiredQisms[q].name.indexOf("البصيرة") !== -1){
                        mahawerContent += `<h3 class="qismName" id="qismName" style="background-color: rgba(105,216,216,1); color: white">${requiredQisms[q].name}</h3><span class="qismContent" id="qismContent">${requiredQisms[q].content}</span>`
                    }else{
                        mahawerContent += `<h3 class="qismName" id="qismName" style="background-color: rgba(105,216,216,1); color: white">${requiredQisms[q].name}</h3><span class="qismContent" id="qismContent">${requiredQisms[q].content}</span>
                                    <br>
                                    <a href="#" class="aqsam-links" onclick="loadPage('tafsir.html')">تفسير</a>
                                    <a href="https://www.youtube.com/watch?v=nzN2O0CaTJU" class="aqsam-links" target="_blank">الفيديو</a>
                                    <a href="https://hefzmoyaser.com" class="aqsam-links" target="_blank">تصميم غرافيك</a>`
                    }
                } else {
                    if(requiredQisms[q].name.indexOf("البصيرة") !== -1){
                        mahawerContent += `<h3 class="qismName" id="qismName">${requiredQisms[q].name}</h3><span class="qismContent" id="qismContent">${requiredQisms[q].content}</span>`
                    }else{
                        mahawerContent += `<h3 class="qismName" id="qismName">${requiredQisms[q].name}</h3><span class="qismContent" id="qismContent">${requiredQisms[q].content}</span>
                    <br>
                    <a href="#" class="aqsam-links" onclick="loadPage('tafsir.html')">تفسير</a>
                    <a href="https://www.youtube.com/watch?v=nzN2O0CaTJU" class="aqsam-links" target="_blank">الفيديو</a>
                    <a href="https://i.pinimg.com/736x/6d/2b/22/6d2b229f09eafb0b897817c74fb9541a.jpg" class="aqsam-links" target="_blank">تصميم غرافيك</a>`
                    }
                }
            }
        }
        console.log(`mahawerContent: ${mahawerContent}`)
        mahawerPageContent.innerHTML = mahawerContent

    } else {
        if ( mahawerPageContent != null) {
            while (mahawerPageContent.firstChild) {
                mahawerPageContent.removeChild(mahawerPageContent.firstChild)
            }
        }
    }
}

async function getPageForAyas(ayaNumber, surahName) {
    let quranPages = await VersesRepo.getVersesByPage()
    let requiredPage
    quranPages.forEach(page => {
        page.ayat.forEach(
            surah => {
                if (surah.name == surahName) {
                    let verse = 0
                    verse = surah.verses.filter(v => v.id == ayaNumber)
                    if (verse != 0) {
                        requiredPage = page.index
                    }
                }
            })
    })
    return requiredPage
}
