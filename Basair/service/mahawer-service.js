import MahawerRepo from "../repository/mahawer-repo.js";
const mahawerRepo = new MahawerRepo();


export default class MahawerService {

    //getAllMahawer
    async getAllMahawer(req, res) {
        try {
            const mahawer = await mahawerRepo.getAllMahawer()
            res.status(200).json(mahawer)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    //getSurahAndMahawerById(surahID)
    async getSurahAndMahawerById(req, res) {
        try {
            const surahAndMahawer = await mahawerRepo.getSurahAndMahawerById(req.params.surahId)
            res.status(200).json(surahAndMahawer)
        } catch (e) {
            res.status(500).json(e)
        }
    }

}
