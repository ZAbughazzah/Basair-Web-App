import Mahawer from "../model/quarterMahawerModel.js"

export default class MahawerRepo {

    async addMehwar(mehwar) {
        return Mahawer.create(mehwar)
    }

    async getAllMahawer() {
        return Mahawer.find();
    }

    async getSurahAndMahawerById(surahID) {
        return Mahawer.find({surahID});
    }

}