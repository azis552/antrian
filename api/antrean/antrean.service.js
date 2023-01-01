const pool = require("../../db")


module.exports = {
	create: (data, callBack) => {
		pool.query(
			`INSERT INTO mlite_antrian_loket(kd, type, noantrian, no_rkm_medis, postdate, start_time, end_time, status, loket)
				VALUES(?,?,?,?,?,?,?,?,?)`,
			[
				data.kd,
				data.type,
				data.noantrian,
				data.no_rkm_medis,
				data.postdate,
				data.start_time,
				data.end_time,
				data.status,
				data.loket
			],
			(error, results, fields) => {

				if(error){
					return callBack(error);
				}
				return callBack(null, results)
			}
		);
	},
	getAntrean :(tanggal, callBack) => {
		pool.query(
			`SELECT kd,IFNULL(MAX(noantrian),0) as noantrian,IFNULL(SUM(CASE WHEN status='0' THEN 1 ELSE 0 END),0) as sisa_antrean FROM mlite_antrian_loket WHERE type='Loket' AND postdate=?`,
			[tanggal],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	
	// getAntreanId :(id, callBack) => {
	// 	pool.query(
	// 		`UPDATE mlite_antrian_loket SET status='1' WHERE kd=?`,
	// 		[id],
	// 		(error, results, fields) => {
	// 			if(error){
	// 				callBack(error);
	// 			}
	// 			return callBack(null, results[0]);
	// 		}
	// 	);
	// },

	getMulai :(loket,tanggal, callBack) => {
		pool.query(
			`SELECT * FROM mlite_antrian_loket WHERE loket=? AND postdate=? AND status='2'`,
			[loket,tanggal],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},

	getWaiting :(tanggal, callBack) => {
		pool.query(
			`SELECT * FROM mlite_antrian_loket WHERE loket < 1 AND postdate=? AND status='0'`,
			[tanggal],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	}, 

	getProses :(loket, callBack) => {
		var date= new Date();
		var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
		pool.query(
			`SELECT * FROM mlite_antrian_loket WHERE loket=? AND postdate='`+get_date+`' AND status='2' ORDER BY kd DESC`,
			[loket],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	}, 

	updatePanggil :(data, callBack) =>{
		pool.query(
			`UPDATE mlite_antrian_loket SET loket=?,end_time=?,status='2' WHERE kd=?`,
			[
				data.loket,
				data.end_time,
				data.kd
			],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},

	updateBatal :(data, callBack) =>{
		pool.query(
			`UPDATE mlite_antrian_loket SET loket=?,end_time=?,status='3' WHERE kd=?`,
			[
				data.loket,
				data.end_time,
				data.kd
			],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},

	updateSelesai :(data, callBack) =>{
		pool.query(
			`UPDATE mlite_antrian_loket SET no_rkm_medis=?,status='1' WHERE kd=?`,
			[data.no_rkm_medis,data.kd],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
};