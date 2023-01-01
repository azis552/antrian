const { getFarmasi } = require("./antrean.service");
// const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
	getFarmasi: (req, res)=>{
		const tanggal = req.params.tanggal;
		getFarmasi(tanggal, (err, results) => {
			if(err){
				console.log(err);
				return;
			}
			else{
				if (results.length>0) {
					return res.json({
						success:1,
						data:results
					});		
				}
				else{
					return res.json({
						success:0,
						data:'Not Found'
					});
				}
			}
			
		});
	}
};