
export class ViewerRepo {

    async getQuranSuwar() {
        const url = `/api/suwar`
        const suwar = await fetch(url)
        return suwar.json()
    }

    async getQuranPageByIndex(index) {
        const url = `/api/suwar/pageByIndex/${index}`
        const page = await fetch(url)
        return page.json()
    }

    async getQuranPageBySurahId(surahId) {
        const url = `/api/suwar/pageBySurahId/${surahId}`
        const page = await fetch(url)
        return page.json()
    }

    async getQuranPageBySurahAyaId(surahId, aya) {
        const url =`/api/suwar/page/${surahId}/${aya}`
        const page = await fetch(url)
        return page.json()
    }

    async getSurahAyaatById(id) {
        const url =`/api/suwar/${id}/ayaat`
        const surahAyas = await fetch(url)
        return surahAyas.json()
    }

    async getQuranQuarterByIndex(index) {
        const url = `/api/suwar/quarters/${index}`
        const quarter = await fetch(url)
        return quarter.json()
    }

    async getQuranTafsirById(id) {
        const url = `/api/suwar/${id}/tafsir`
        const tafsir = await fetch(url)
        return tafsir.json()
    }
}

export default new ViewerRepo()