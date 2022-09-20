import Page from "../model/pageModel.js"
import Quarter from "../model/quarterModel.js"
import Tafsir from "../model/tafsirModel.js"
import Verse from "../model/verseModel.js"

export default class ViewerRepo {

    async getQuranPageByIndex(index){
        return Page.findOne({index})
    }

    async getQuranPageBySurahId(surahId){
        return Page.findOne({
            startingSura: { $lte: surahId },
            endingSura: { $gte: surahId }
        })
    }

    async getQuranPageBySurahAyaId(surahId, ayahNo){
        return Page.findOne({
            startingSura: { $lte: surahId },
            endingSura: { $gte: surahId },
            startingAya: { $lte: ayahNo},
            endingAya: { $gte: ayahNo},
            })
        }

    async addQuranPages(page) {
        return Page.create(page)
    }

    async addQuranAyaat(surahVerses) {
        return Verse.create(surahVerses)
    }

    async getSurahAyaatById(id){
        return Verse.findOne({id: id})
    }

    async addQuranQuarter(quarter) {
        return Quarter.create(quarter)
    }

    async getQuranQuarterByIndex(index){
        return Quarter.findOne({index: index})
    }

    async addQuranTafsir(tafsir) {
        return Tafsir.create(tafsir)
    }

    async getQuranTafsirById(id){
        return Tafsir.findOne({index: id})
    }

}