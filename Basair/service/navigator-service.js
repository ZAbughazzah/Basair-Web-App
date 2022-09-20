import NavigatorRepo from "../repository/navigator-repo.js";

const navigatorRepo = new NavigatorRepo();

export default class NavigatorService {

    //getJuzsCount()
    async getJuzsCount(req, res) {
        try {
            const juzsCount = await navigatorRepo.getJuzsCount()
            res.status(200).json(juzsCount)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    //getQuranJuzs()
    async getQuranJuzs(req, res) {
        try {
            const quranJuzs = await navigatorRepo.getQuranJuzs()
            res.status(200).json(quranJuzs)
        } catch (e) {
            res.status(500).json(e)
        }
    }


    //getQuranJuzById(index)
    async getQuranJuzById(req, res) {
        try {
            const requiredJuz = await navigatorRepo.getQuranJuzById(req.params.index)
            res.status(200).json(requiredJuz)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    //getQuranSuwar()
    async getQuranSuwar(req, res) {
        try {
            const quranSuwar = await navigatorRepo.getQuranSuwar()
            res.status(200).json(quranSuwar)
        } catch (e) {
            res.status(500).json(e)
        }
    }

}