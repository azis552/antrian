const pool = require("../../db")


module.exports = {
	postSoap: (data, callBack) => {
		pool.query(
			`INSERT INTO pemeriksaan_ralan(no_rawat, tgl_perawatan, jam_rawat, suhu_tubuh, tensi, nadi, respirasi, tinggi, berat, spo2, gcs, kesadaran, keluhan, pemeriksaan, alergi, lingkar_perut, rtl, penilaian, instruksi, evaluasi, nip)
				VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
			[
				data.no_rawat,
				data.tgl_perawatan,
				data.jam_rawat,
				data.suhu_tubuh,
				data.tensi,
				data.nadi,
				data.respirasi,
				data.tinggi,
				data.berat,
				data.spo2,
				data.gcs,
				data.kesadaran,
				data.keluhan,
				data.pemeriksaan,
				data.alergi,
				// data.imun_ke,
				'-',
				data.rtl,
				data.penilaian,
				data.instruksi,
				data.evaluasi,
				data.nip
			],
			(error, results, fields) => {

				if(error){
					return callBack(error);
				}
				return callBack(null, results)
			}
		);
	},
	getPoli :(callBack) => {
		pool.query(
			`SELECT * FROM poliklinik`,
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	getDokter :(kd_poli, callBack) => {
		pool.query(
			`SELECT jadwal.kd_dokter,dokter.nm_dokter,maping_poli_bpjs.kd_poli_bpjs,maping_poli_bpjs.nm_poli_bpjs FROM dokter INNER JOIN jadwal ON dokter.kd_dokter=jadwal.kd_dokter INNER JOIN maping_poli_bpjs ON maping_poli_bpjs.kd_poli_rs=jadwal.kd_poli WHERE jadwal.kd_poli=? GROUP BY jadwal.kd_dokter`,
			[kd_poli],
			(error, results, fields) => { 
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	getJam :(kd_dokter, callBack) => {
		pool.query(
			`SELECT jam_mulai,jam_selesai FROM jadwal WHERE kd_dokter=?`,
			[kd_dokter],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	getPasien :(kd_dokter,tanggal, callBack) => {
		pool.query(
			`SELECT reg_periksa.no_reg,reg_periksa.no_rawat,reg_periksa.no_rkm_medis,reg_periksa.stts_daftar,pasien.nm_pasien,dokter.nm_dokter,poliklinik.nm_poli,maping_poli_bpjs.kd_poli_bpjs,maping_poli_bpjs.nm_poli_bpjs, reg_periksa.stts, COUNT(pemeriksaan_ralan.no_rawat) AS jmlh FROM reg_periksa INNER JOIN pasien ON pasien.no_rkm_medis=reg_periksa.no_rkm_medis INNER JOIN maping_poli_bpjs ON maping_poli_bpjs.kd_poli_rs=reg_periksa.kd_poli INNER JOIN dokter ON dokter.kd_dokter=reg_periksa.kd_dokter LEFT JOIN pemeriksaan_ralan ON pemeriksaan_ralan.no_rawat=reg_periksa.no_rawat INNER JOIN mutasi_berkas ON mutasi_berkas.no_rawat=reg_periksa.no_rawat INNER JOIN poliklinik ON poliklinik.kd_poli=maping_poli_bpjs.kd_poli_rs WHERE reg_periksa.kd_dokter=? AND reg_periksa.tgl_registrasi=? GROUP BY reg_periksa.no_rawat`,
			[kd_dokter,tanggal],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			} 
		);
	},
	getLayan :(callBack) => {
		var date= new Date();
		var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
		pool.query(
			`SELECT dokter.nm_dokter,min(reg_periksa.no_reg) as nmr_antian
			FROM reg_periksa INNER JOIN dokter ON dokter.kd_dokter=reg_periksa.kd_dokter  
			WHERE reg_periksa.tgl_registrasi = '`+get_date+`' AND reg_periksa.stts='Berkas Diterima'
			GROUP BY reg_periksa.kd_dokter`,
			(error, results, fields) => { 
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	patchStatus :(data, callBack) =>{
		pool.query(
			`UPDATE reg_periksa SET stts=? WHERE no_rawat=?`,
			[
				data.stts,
				data.no_rawat
			],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	patchBerkas :(data, callBack) =>{
		pool.query(
			`UPDATE mutasi_berkas SET diterima=? WHERE no_rawat=?`,
			[
				data.waktu,
				data.no_rawat
			],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	patchSoap :(data, callBack) =>{
		pool.query(
			`SELECT COUNT(no_rawat) as jml FROM pemeriksaan_ralan WHERE no_rawat=? AND tgl_perawatan = CURRENT_DATE()`,
			[
				data.no_rawat
			],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
};