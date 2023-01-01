const { getPoli,getDokter,getJam,getPasien,getLayan,patchStatus,postSoap,patchSoap,patchBerkas } = require("./antrean.controller");
const router = require("express").Router();

router.get("/poli", getPoli);
router.get("/dokter/:kd_poli", getDokter);
router.get("/jam_praktek/:kd_dokter", getJam);
router.get("/pasien/:kd_dokter/:tanggal", getPasien);
router.get("/layan", getLayan);

router.post("/soap", postSoap);

router.patch("/status", patchStatus);
router.patch("/mutasi", patchBerkas);
router.patch("/soap", patchSoap);

module.exports = router;