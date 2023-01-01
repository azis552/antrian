const { create,getAntrean,getMulai,getWaiting,getProses,updatePanggil,updateBatal,updateSelesai } = require("./antrean.service");
// const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
	postAntrean: (req, res) => {
		const body = req.body;
		create(body, (err, results) => {

			if(err){
				console.log(err);
				return res.status(500).json({
					success:0,
					message:"Database connection error"
				});
			}
			return res.status(200).json({
				success:1,
				data: results
			});			
		});
	},
	getAntrean: (req, res)=>{
		const tanggal = req.params.tanggal;
		getAntrean(tanggal, (err, results) => {
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
	},
	getMulai: (req, res)=>{
		const loket = req.params.loket;
		const tanggal = req.params.tanggal;
		getMulai(loket,tanggal, (err, results) => {
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
	},
	getWaiting: (req, res)=>{
		const tanggal = req.params.tanggal;
		getWaiting(tanggal, (err, results) => {
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
	},
	getProses: (req, res)=>{
		const loket = req.params.loket;
		getProses(loket, (err, results) => {
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
	},
	updatePanggil: (req, res) =>{
		const body = req.body; 
		updatePanggil(body, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			return res.json({
				success : 1,
				message : "update successfully"
			});
		});
	},
	updateBatal: (req, res) =>{
		const body = req.body; 
		updateBatal(body, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			return res.json({
				success : 1,
				message : "update successfully"
			});
		});
	},
	updateSelesai: (req, res) =>{
		const body = req.body; 
		updateSelesai(body, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			return res.json({
				success : 1,
				message : "update successfully"
			});
		});
	}
};