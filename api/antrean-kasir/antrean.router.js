const { getKasir } = require("./antrean.controller");
const router = require("express").Router();

router.get("/kasir/:tanggal", getKasir);

module.exports = router;