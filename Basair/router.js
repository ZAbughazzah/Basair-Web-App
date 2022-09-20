import express from 'express';
import MahawerService from "./service/mahawer-service.js";
import NavigatorService from "./service/navigator-service.js";
import ViewerService from "./service/viewer-service.js";

const router = express.Router();

const navigatorService = new NavigatorService();
const mahawerService = new MahawerService();
const viewService = new ViewerService();

router.route('/suwar')
    .get(navigatorService.getQuranSuwar)

router.route('/juzsCount')
    .get(navigatorService.getJuzsCount)

router.route('/juzs')
    .get(navigatorService.getQuranJuzs)

router.route('/juzs/:index')
    .get(navigatorService.getQuranJuzById)

router.route('/suwar/mahawer')
    .get(mahawerService.getAllMahawer)

router.route('/suwar/mahawer/:surahId')
    .get(mahawerService.getSurahAndMahawerById)

router.route('/suwar/pageByIndex/:index')
    .get(viewService.getQuranPageByIndex)

router.route('/suwar/pageBySurahId/:surahId')
    .get(viewService.getQuranPageBySurahId)

router.route('/suwar/page/:surahId/:ayahNo')
    .get(viewService.getQuranPageBySurahAyaId)

router.route('/suwar/:surahId/ayaat')
    .get(viewService.getSurahAyaatById)

router.route('/suwar/quarters/:index')
    .get(viewService.getQuranQuarterByIndex)

router.route('/suwar/:surahId/tafsir')
    .get(viewService.getQuranTafsirById)

export default router;