

export class NavigatorRepo {

    async getQuranJuzs() {
        const url = `/api/juzs`
        const Juzs = await fetch(url)
        return Juzs.json()
    }

    async getQuranJuzById(id) {
        const url = `/api/juzs/${id}`
        const Juz = await fetch(url)
        return Juz.json()
    }


    async getQuranSuwar() {
        const url = `/api/suwar`
        const suwar = await fetch(url)
        return suwar.json()
    }
}

export default new NavigatorRepo()