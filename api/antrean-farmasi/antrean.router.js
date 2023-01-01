const { getFarmasi } = require("./antrean.controller");
const router = require("express").Router();

router.get("/farmasi/:tanggal", getFarmasi);

module.exports = router;