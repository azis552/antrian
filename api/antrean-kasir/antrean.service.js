const pool = require("../../db")


module.exports = {
	getKasir :(tanggal, callBack) => {
		pool.query(
			`select a.no_rawat,a.no_resep,a.jam_peresepan,b.no_rkm_medis,c.png_jawab,d.nm_pasien,e.nm_poli_bpjs from resep_obat a inner join reg_periksa b inner join penjab c inner join pasien as d on d.no_rkm_medis=b.no_rkm_medis inner join maping_poli_bpjs as e on e.kd_poli_rs=b.kd_poli where  a.no_rawat=b.no_rawat and b.kd_pj=c.kd_pj and a.tgl_peresepan=? order by a.jam_peresepan`,
			[tanggal],
			(error, results, fields) => {
				if(error){
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},	
};