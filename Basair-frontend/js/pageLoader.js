import * as Basair from "./basair.js";


const TafsirPage = document.querySelector('#TafsirPage')
export let tafsirPageContent = null
export let mahawerPageContent = null


export async function loadPage(pageName) {
    const pageContent = await fetch(`partial-views/${pageName}`)
    TafsirPage.innerHTML = await pageContent.text()
    if (pageName === 'tafsir.html') {
        Basair.setHTMLPage("tafsir.html")
        tafsirPageContent = document.getElementById("tafsirPageContent")
        document.querySelector('#showAqsam').style.textDecoration = "none"
        document.querySelector('#showTafsir').style.textDecoration = "overline"
        await Basair.loadWholeQuran()
    } else {
        Basair.setHTMLPage("aqsam.html")
        mahawerPageContent = document.getElementById("mahawerPageContent")
        document.querySelector('#showAqsam').style.textDecoration = "overline"
        document.querySelector('#showTafsir').style.textDecoration = "none"
        await Basair.loadWholeQuran()
    }
}