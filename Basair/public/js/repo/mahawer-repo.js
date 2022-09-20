

export class MahawerRepo {

    async getAllMahawer() {
        const url =`/api/suwar/mahawer`
        const mahawer = await fetch(url)
        return mahawer.json()
    }

    async getSurahAndMahawerById(surahID) {
        const url = `/api/suwar/mahawer/${surahID}`
        const surahAndMahawer = await fetch(url)
        return surahAndMahawer.json()
    }
}

export default new MahawerRepo()