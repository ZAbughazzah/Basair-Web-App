import Juz from "../model/juzModel.js"
import Surah from "../model/surahModel.js"

export default class NavigatorRepo {

    async getJuzsCount() {
        return Juz.countDocuments({});
    }

    async addQuranJuz(juz) {
        return Juz.create(juz)
    }

    async getQuranJuzs() {
        return Juz.find()
    }

    async getQuranJuzById(index) {
        return Juz.findOne({index})
    }

    async addQuranSurah(surah) {
        return Surah.create(surah)
    }

    async getQuranSuwar() {
        return Surah.find()
    }

}