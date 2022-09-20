import ViewerRepo from "../repository/viewer-repo.js";

const viewerRepo = new ViewerRepo();

export default class ViewerService {

    async getQuranPageByIndex(req, res) {
        try {
            const requiredPage = await viewerRepo.getQuranPageByIndex(req.params.index);
            res.status(200).json(requiredPage)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getQuranPageBySurahId(req, res) {
        try {
            const requiredPage = await viewerRepo.getQuranPageBySurahId(req.params.surahId);
            res.status(200).json(requiredPage)
        } catch (e) {
            res.status(500).json(e)
        }
    }


    async getQuranPageBySurahAyaId(req, res) {
        try {
            const requiredPage = await viewerRepo.getQuranPageBySurahAyaId(req.params.surahId, req.params.ayahNo);
            res.status(200).json(requiredPage)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getSurahAyaatById(req, res) {
        try {
            const SurahAyaat = await viewerRepo.getSurahAyaatById(req.params.surahId)
            res.status(200).json(SurahAyaat)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getQuranQuarterByIndex(req, res) {
        try {
            const requiredQuarter = await viewerRepo.getQuranQuarterByIndex(req.params.index)
            res.status(200).json(requiredQuarter)
        } catch (e) {
            res.status(500).json(e)
        }
    }


    //getQuranTafsirById(id)
    async getQuranTafsirById(req, res) {
        try {
            const quranTafsir = await viewerRepo.getQuranTafsirById(req.params.surahId)
            res.status(200).json(quranTafsir)
        } catch (e) {
            res.status(500).json(e)
        }
    }


}