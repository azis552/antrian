const { getKasir } = require("./antrean.service");
// const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
	getKasir: (req, res)=>{
		const tanggal = req.params.tanggal;
		getKasir(tanggal, (err, results) => {
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