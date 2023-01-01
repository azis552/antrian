const { postAntrean,getAntrean,getMulai,getWaiting,getProses,updatePanggil,updateBatal,updateSelesai } = require("./antrean.controller");
const router = require("express").Router();

router.get("/sisa/:tanggal", getAntrean);
// router.get("/id/:id", getAntreanId);
router.get("/mulai/:loket/:tanggal", getMulai);
router.get("/daftar/:tanggal", getWaiting);
router.get("/loket/layan/:loket", getProses);

router.post("/ambil", postAntrean);

router.patch("/panggil/", updatePanggil);
router.patch("/batal/", updateBatal);
router.patch("/selesai/", updateSelesai);

module.exports = router;