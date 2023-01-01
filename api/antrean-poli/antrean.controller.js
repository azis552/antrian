const { getPoli,getDokter,getJam,getPasien,getLayan,patchStatus,postSoap,patchSoap,patchBerkas } = require("./antrean.service");
// const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
	postSoap: (req, res) => {
		const body = req.body;
		postSoap(body, (err, results) => {

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
	getPoli: (req,res)=>{
		getPoli((err, results) => {
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
	getDokter: (req, res)=>{
		const kd_poli = req.params.kd_poli;
		getDokter(kd_poli, (err, results) => {
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
	getJam: (req, res)=>{
		const kd_dokter = req.params.kd_dokter;
		getJam(kd_dokter, (err, results) => {
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
	getPasien: (req, res)=>{
		const kd_dokter = req.params.kd_dokter;
		const tanggal = req.params.tanggal;
		getPasien(kd_dokter,tanggal, (err, results) => {
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
	getLayan: (req, res)=>{
		getLayan((err, results) => {
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
	patchStatus: (req, res) => {
		const body = req.body;
		patchStatus(body, (err, results) => {

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
	patchBerkas: (req, res) => {
		const body = req.body;
		patchBerkas(body, (err, results) => {

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
	patchSoap: (req, res) => {
		const body = req.body;
		patchSoap(body, (err, results) => {

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
	}
};