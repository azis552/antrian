const express = require('express')
const db = require('../db')

const router = express.Router()

// === ADMISI ===
router.get('/antrean-admisi', async (req, res, next) => {

	try{
		let results = await db.antrean(); //
		res.json(results);
	} catch(e){
		console.log(e);
		res.sendStatus(500);
	}

})

module.exports = router;