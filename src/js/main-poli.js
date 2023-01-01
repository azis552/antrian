$(function(){
	
    var socket = io.connect();
    

    $("#poli").change(function(){
        var poli = $("#poli").val();
        const sb = document.querySelector('#dokter');
        
        let option=[];
        option = new Option("- Pilih Dokter","--");
        sb.add(option, undefined);


        setTimeout(function() {
            $.get( "/api/antrean-poli/dokter/"+poli)
            .done(function( data ) {
                if (data['success']==1) 
                {
                    for (let index = 0; index < data['data'].length; index++) {
                        option = new Option(data['data'][index]['nm_dokter'],data['data'][index]['kd_dokter']);       
                        // sb.remove(index, undefined);
                        sb.add(option, undefined);
                    } 
                }
                else
                {
                    document.querySelector('#dokter').innerHTML = '';
                }
            });
        }, 1000);
    });

    // $("#dokter").change(function(){
    //     var dokter = $("#dokter").val();
    //     const sb = document.querySelector('#jam_praktek');

    //     let option=[];

    //     setTimeout(function() {
    //         $.get( "/api/antrean-poli/jam_praktek/"+dokter)
    //         .done(function( data ) {
    //             if (data['success']==1) 
    //             {
    //                 document.querySelector('#jam_praktek').innerHTML = '';
    //                 for (let index = 0; index < data['data'].length; index++) {
    //                     option = new Option(data['data'][index]['jam_mulai']+'-'+data['data'][index]['jam_selesai'],data['data'][index]['jam_mulai']+'-'+data['data'][index]['jam_selesai']);       
    //                     // sb.remove(index, undefined);
    //                     sb.add(option, undefined);
    //                 }
    //             }
    //             else
    //             {
    //                 document.querySelector('#jam_praktek').innerHTML = '';
    //             }
    //         });
    //     }, 1000);
    // });

    $("#akses").click(function(){
		// $("#akses").attr("disabled", true);
		// var poli = $("#poli").val();
        
		var dokter = $("#dokter").val();
        var date= new Date();
		var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

		// var jam_praktek = $("#jam_praktek").val();
        // var pisah = jam_praktek.split("-");
        // var jam_mulai = pisah[0];
        // var jam_selesai = pisah[1];
        const table = document.getElementById("mytab1");
        setTimeout(function() {
            $.ajax("/api/antrean-poli/pasien/"+dokter+"/"+get_date, {
                type: 'GET',  // http method
                beforeSend: function() {
                    table.innerHTML = `<td colspan='7'>Memuat Data...</td>`;   
                },
                success: function (data, status, xhr) {
                    if (data['success']==1) 
                    {
                        var parent ='';
                        data['data'].forEach((element) => {
                            if(element.stts == 'Belum'){
                                parent+= '<tr class="alert alert-danger" role="alert">';
                                    parent+= '<td>' + element.no_reg + '</td>';
                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                    parent+= '<td>' + element.nm_poli + '</td>';
                                    parent+=`<td><button type="button" class="btn btn-info" id='berkas_diterima' data-nomor='`+element.no_rawat+`'><i class="fa fa-book"> Berkas Diterima</i></button></td>`;
                            }else if(element.stts == 'Berkas Diterima'){
                                if (element.jmlh == 0 ) {
                                    parent+= '<tr class="alert alert-default" role="alert">';
                                    parent+= '<td>' + element.no_reg + '</td>';
                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                    parent+= '<td>' + element.nm_poli + '</td>';
                                    parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                    parent+=`<button type="button" class="btn btn-info" id="modal-selesai" data-nomor='`+element.no_rawat+`'><i class="fa fa-edit"> SOAP</i></button><hr>`;
                                    parent+=`<button type="button" class="btn btn-danger" id='batal' data-nomor='`+element.no_rawat+`' ><i class="fa fa-close"> Batal</i></button></td>`;
                                } else {
                                    parent+= '<tr class="alert alert-warning" role="alert">';
                                    parent+= '<td>' + element.no_reg + '</td>';
                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                    parent+= '<td>' + element.nm_poli + '</td>';
                                    parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                    parent+=`<button type="button" class="btn btn-success" id='selesai' data-nomor='`+element.no_rawat+`'><i class="fa fa-check"> Selesai</i></button></td>`;
                                }
                                parent+= '</tr>';
                            }else if (element.stts == 'Batal') {
                                parent+= '<tr class="alert alert-danger" role="alert">';
                                    parent+= '<td>' + element.no_reg + '</td>';
                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                    parent+= '<td>' + element.nm_poli + '</td>';
                                    parent+= `<td><i class="fa fa-close"></i></td>`;
                            } else {
                                parent+= '<tr class="alert alert-success" role="alert">';
                                    parent+= '<td>' + element.no_reg + '</td>';
                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                    parent+= '<td>' + element.nm_poli + '</td>';
                                    parent+= `<td><i class="fa fa-check"></i></td>`;
                            }
                        });
                        table.innerHTML = parent
                    }
                    else
                    {
                        table.innerHTML = `<td colspan='7'>Data Kosong...!!!</td>`;
                    }
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    table.append('Error' + errorMessage);
                }
            });

            
        }, 1000);
	});
    
    $('#mytab1').on('click','#panggil', function(){
        $("button").attr("disabled", true);
        var layanan = 'poli';
        var nomor = Number($(this).data("nomor")) ;
        var kd_poli = $(this).data("kode");
        var nm_poli = $(this).data("poli");
        var nm_dokter = $(this).data("dokter");
        socket.emit('retry-poli', {nomor:nomor,layanan:layanan,pemanggil:kd_poli,nm_depo:nm_poli,dokter:nm_dokter});
        setTimeout(function() {
            $('button').removeAttr("disabled");
        }, 10000);
    })


    $('#mytab1').on('click','#selesai', function(){
        var nomor = $(this).data("nomor");
        const table = document.getElementById("mytab1");
        const myArr = `{
            "stts":"Sudah",
            "no_rawat":"`+ nomor +`"
        }`;
        $.ajax({
            type: "PATCH",
            url: "/api/antrean-poli/status",
            data: myArr,
            contentType:"application/json",
            success: function(data){
                if (data['success']==1) 
                {
                    var dokter = $("#dokter").val();
                    var date= new Date();
                    var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                    setTimeout(function() {
                        $.ajax("/api/antrean-poli/pasien/"+dokter+"/"+get_date, {
                            type: 'GET',  // http method
                            beforeSend: function() {
                                table.innerHTML = `<td colspan='7'>Memuat Data...</td>`;   
                            },
                            success: function (data, status, xhr) {
                                if (data['success']==1) 
                                {
                                    var parent ='';
                                    data['data'].forEach((element) => {
                                        if(element.stts == 'Belum'){
                                            parent+= '<tr class="alert alert-danger" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+=`<td><button type="button" class="btn btn-info" id='berkas_diterima' data-nomor='`+element.no_rawat+`'><i class="fa fa-book"> Berkas Diterima</i></button></td>`;
                                        }else if(element.stts == 'Berkas Diterima'){
                                            if (element.jmlh == 0 ) {
                                                parent+= '<tr class="alert alert-default" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                parent+=`<button type="button" class="btn btn-info" id="modal-selesai" data-nomor='`+element.no_rawat+`'><i class="fa fa-edit"> SOAP</i></button><hr>`;
                                                parent+=`<button type="button" class="btn btn-danger" id='batal' data-nomor='`+element.no_rawat+`' ><i class="fa fa-close"> Batal</i></button></td>`;
                                            } else {
                                                parent+= '<tr class="alert alert-warning" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                parent+=`<button type="button" class="btn btn-success" id='selesai' data-nomor='`+element.no_rawat+`'><i class="fa fa-check"> Selesai</i></button></td>`;
                                            }
                                            parent+= '</tr>';
                                        }else if (element.stts == 'Batal') {
                                            parent+= '<tr class="alert alert-danger" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><i class="fa fa-close"></i></td>`;
                                        } else {
                                            parent+= '<tr class="alert alert-success" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><i class="fa fa-check"></i></td>`;
                                        }
                                    });
                                    table.innerHTML = parent
                                }
                                else
                                {
                                    table.innerHTML = `<td colspan='7'>Data Kosong...!!!</td>`;
                                }
                            },
                            error: function (jqXhr, textStatus, errorMessage) {
                                table.append('Error' + errorMessage);
                            }
                        });

                        
                    }, 1000);
                }
            } 
        });
    })

    $('#mytab1').on('click','#modal-selesai', function(){
        $('#modalku').modal('show')
        document.getElementById("no_rawat").innerHTML = $(this).data("nomor");
        
    })

    $('#simpanSoap').click(function(){
        var date= new Date();
		var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
        var get_time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
        var nomor=document.getElementById("no_rawat").innerHTML;
        var subyektif=document.getElementById("subyektif").value;
        var obyektif=document.getElementById("obyektif").value;
        var assesment=document.getElementById("assesment").value;
        var plan=document.getElementById("plan").value;
        
        if(nomor=='' || subyektif=='' || obyektif=='' || assesment=='' || plan=='')
        {
            alert('Lengkapi isian jangan sampai kosong');
        }
        else
        {
            const myArr = `{
                "no_rawat":"`+nomor+`",
                "tgl_perawatan":"`+get_date+`",
                "jam_rawat":"`+get_time+`",
                "suhu_tubuh":"",
                "tensi":"",
                "nadi":"",
                "respirasi":"",
                "tinggi":"",
                "berat":"",
                "spo2":"",
                "gcs":"",
                "kesadaran":"Compos Mentis",
                "keluhan":"`+subyektif+`",
                "pemeriksaan":"`+obyektif+`",
                "alergi":"-",
                "imun_ke":"-",
                "rtl":"`+plan+`",
                "penilaian":"`+assesment+`",
                "instruksi":"",
                "evaluasi":"",
                "nip":"-"
            }`;
            $.ajax({
                type: "POST",
                url: "/api/antrean-poli/soap",
                data: myArr,
                contentType:"application/json",
                success: function(data){
                    if (data['success']==1) 
                    {
                        const table = document.getElementById("mytab1");
                        var dokter = $("#dokter").val();
                        var date= new Date();
                        var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                        setTimeout(function() {
                            $.ajax("/api/antrean-poli/pasien/"+dokter+"/"+get_date, {
                                type: 'GET',  // http method
                                beforeSend: function() {
                                    table.innerHTML = `<td colspan='7'>Memuat Data...</td>`;   
                                },
                                success: function (data, status, xhr) {
                                    if (data['success']==1) 
                                    {
                                        $('#modalku').modal('hide');
                                        var parent ='';
                                        data['data'].forEach((element) => {
                                            if(element.stts == 'Belum'){
                                                parent+= '<tr class="alert alert-danger" role="alert">';
                                                    parent+= '<td>' + element.no_reg + '</td>';
                                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                                    parent+= '<td>' + element.nm_poli + '</td>';
                                                    parent+=`<td><button type="button" class="btn btn-info" id='berkas_diterima' data-nomor='`+element.no_rawat+`'><i class="fa fa-book"> Berkas Diterima</i></button></td>`;
                                            }else if(element.stts == 'Berkas Diterima'){
                                                if (element.jmlh == 0 ) {
                                                    parent+= '<tr class="alert alert-default" role="alert">';
                                                    parent+= '<td>' + element.no_reg + '</td>';
                                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                                    parent+= '<td>' + element.nm_poli + '</td>';
                                                    parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                    parent+=`<button type="button" class="btn btn-info" id="modal-selesai" data-nomor='`+element.no_rawat+`'><i class="fa fa-edit"> SOAP</i></button><hr>`;
                                                    parent+=`<button type="button" class="btn btn-danger" id='batal' data-nomor='`+element.no_rawat+`' ><i class="fa fa-close"> Batal</i></button></td>`;
                                                } else {
                                                    parent+= '<tr class="alert alert-warning" role="alert">';
                                                    parent+= '<td>' + element.no_reg + '</td>';
                                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                                    parent+= '<td>' + element.nm_poli + '</td>';
                                                    parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                    parent+=`<button type="button" class="btn btn-success" id='selesai' data-nomor='`+element.no_rawat+`'><i class="fa fa-check"> Selesai</i></button></td>`;
                                                }
                                                parent+= '</tr>';
                                            }else if (element.stts == 'Batal') {
                                                parent+= '<tr class="alert alert-danger" role="alert">';
                                                    parent+= '<td>' + element.no_reg + '</td>';
                                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                                    parent+= '<td>' + element.nm_poli + '</td>';
                                                    parent+= `<td><i class="fa fa-close"></i></td>`;
                                            } else {
                                                parent+= '<tr class="alert alert-success" role="alert">';
                                                    parent+= '<td>' + element.no_reg + '</td>';
                                                    parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                    parent+= '<td>' + element.nm_pasien + '</td>';
                                                    parent+= '<td>' + element.nm_poli + '</td>';
                                                    parent+= `<td><i class="fa fa-check"></i></td>`;
                                            }
                                        });
                                        table.innerHTML = parent
                                    }
                                    else
                                    {
                                        table.innerHTML = `<td colspan='7'>Data Kosong...!!!</td>`;
                                    }
                                },
                                error: function (jqXhr, textStatus, errorMessage) {
                                    table.append('Error' + errorMessage);
                                }
                            });
    
                            
                        }, 1000);
                    }
                }
            });
        }
        
    })

    $('#mytab1').on('click','#berkas_dikirim', function(){
        var nomor = $(this).data("nomor");
        const table = document.getElementById("mytab1");
        alert(nomor)
        
    })

    $('#mytab1').on('click','#berkas_diterima', function(){
        var nomor = $(this).data("nomor");
        const table = document.getElementById("mytab1");
        var date= new Date();
        var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
        var get_time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
        const myArr = `{
            "waktu":"`+ get_date+" "+get_time +`",
            "no_rawat":"`+ nomor +`"
        }`;
        const myArr2 = `{
            "stts":"Berkas Diterima",
            "no_rawat":"`+ nomor +`"
        }`;
        
        $.ajax({
            type: "PATCH",
            url: "/api/antrean-poli/mutasi", 
            data: myArr,
            contentType:"application/json",
            success: function(respon){
                $.ajax({
                    type: "PATCH",
                    url: "/api/antrean-poli/status", 
                    data: myArr2,
                    contentType:"application/json",
                    success: function(data){
                        if (data['success']==1) 
                        {
                            var dokter = $("#dokter").val();
                            var date= new Date();
                            var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                            setTimeout(function() {
                                $.ajax("/api/antrean-poli/pasien/"+dokter+"/"+get_date, {
                                    type: 'GET',  // http method
                                    beforeSend: function() {
                                        table.innerHTML = `<td colspan='7'>Memuat Data...</td>`;   
                                    },
                                    success: function (data, status, xhr) {
                                        if (data['success']==1) 
                                        {
                                            var parent ='';
                                            data['data'].forEach((element) => {
                                                if(element.stts == 'Belum'){
                                                    parent+= '<tr class="alert alert-danger" role="alert">';
                                                        parent+= '<td>' + element.no_reg + '</td>';
                                                        parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                        parent+= '<td>' + element.nm_pasien + '</td>';
                                                        parent+= '<td>' + element.nm_poli + '</td>';
                                                        parent+=`<td><button type="button" class="btn btn-info" id='berkas_diterima' data-nomor='`+element.no_rawat+`'><i class="fa fa-book"> Berkas Diterima</i></button></td>`;
                                                }else if(element.stts == 'Berkas Diterima'){
                                                    if (element.jmlh == 0 ) {
                                                        parent+= '<tr class="alert alert-default" role="alert">';
                                                        parent+= '<td>' + element.no_reg + '</td>';
                                                        parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                        parent+= '<td>' + element.nm_pasien + '</td>';
                                                        parent+= '<td>' + element.nm_poli + '</td>';
                                                        parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                        parent+=`<button type="button" class="btn btn-info" id="modal-selesai" data-nomor='`+element.no_rawat+`'><i class="fa fa-edit"> SOAP</i></button><hr>`;
                                                        parent+=`<button type="button" class="btn btn-danger" id='batal' data-nomor='`+element.no_rawat+`' ><i class="fa fa-close"> Batal</i></button></td>`;
                                                    } else {
                                                        parent+= '<tr class="alert alert-warning" role="alert">';
                                                        parent+= '<td>' + element.no_reg + '</td>';
                                                        parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                        parent+= '<td>' + element.nm_pasien + '</td>';
                                                        parent+= '<td>' + element.nm_poli + '</td>';
                                                        parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                        parent+=`<button type="button" class="btn btn-success" id='selesai' data-nomor='`+element.no_rawat+`'><i class="fa fa-check"> Selesai</i></button></td>`;
                                                    }
                                                    parent+= '</tr>';
                                                }else if (element.stts == 'Batal') {
                                                    parent+= '<tr class="alert alert-danger" role="alert">';
                                                        parent+= '<td>' + element.no_reg + '</td>';
                                                        parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                        parent+= '<td>' + element.nm_pasien + '</td>';
                                                        parent+= '<td>' + element.nm_poli + '</td>';
                                                        parent+= `<td><i class="fa fa-close"></i></td>`;
                                                } else {
                                                    parent+= '<tr class="alert alert-success" role="alert">';
                                                        parent+= '<td>' + element.no_reg + '</td>';
                                                        parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                        parent+= '<td>' + element.nm_pasien + '</td>';
                                                        parent+= '<td>' + element.nm_poli + '</td>';
                                                        parent+= `<td><i class="fa fa-check"></i></td>`;
                                                }
                                            });
                                            table.innerHTML = parent
                                        }
                                        else
                                        {
                                            table.innerHTML = `<td colspan='7'>Data Kosong...!!!</td>`;
                                        }
                                    },
                                    error: function (jqXhr, textStatus, errorMessage) {
                                        table.append('Error' + errorMessage);
                                    }
                                });
        
                                
                            }, 1000);
                        }
                    } 
                });
            } 
        });
        
    })

    $('#mytab1').on('click','#batal', function(){
        var nomor = $(this).data("nomor");
        const table = document.getElementById("mytab1");
        const myArr = `{
            "stts":"Batal",
            "no_rawat":"`+ nomor +`"
        }`;
        $.ajax({
            type: "PATCH",
            url: "/api/antrean-poli/status",
            data: myArr,
            contentType:"application/json",
            success: function(data){
                if (data['success']==1) 
                {
                    var dokter = $("#dokter").val();
                    var date= new Date();
                    var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                    setTimeout(function() {
                        $.ajax("/api/antrean-poli/pasien/"+dokter+"/"+get_date, {
                            type: 'GET',  // http method
                            beforeSend: function() {
                                table.innerHTML = `<td colspan='7'>Memuat Data...</td>`;   
                            },
                            success: function (data, status, xhr) {
                                if (data['success']==1) 
                                {
                                    var parent ='';
                                    data['data'].forEach((element) => {
                                        if(element.stts == 'Belum'){
                                            parent+= '<tr class="alert alert-danger" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+=`<td><button type="button" class="btn btn-info" id='berkas_diterima' data-nomor='`+element.no_rawat+`'><i class="fa fa-book"> Berkas Diterima</i></button></td>`;
                                        }else if(element.stts == 'Berkas Diterima'){
                                            if (element.jmlh == 0 ) {
                                                parent+= '<tr class="alert alert-default" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                parent+=`<button type="button" class="btn btn-info" id="modal-selesai" data-nomor='`+element.no_rawat+`'><i class="fa fa-edit"> SOAP</i></button><hr>`;
                                                parent+=`<button type="button" class="btn btn-danger" id='batal' data-nomor='`+element.no_rawat+`' ><i class="fa fa-close"> Batal</i></button></td>`;
                                            } else {
                                                parent+= '<tr class="alert alert-warning" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><button class="btn btn-primary btn-xs" id='panggil' data-nomor='`+element.no_reg+`' data-kode='`+element.kd_poli_bpjs+`' data-poli='`+element.nm_poli+`' data-dokter='`+element.nm_dokter+`'><i class="fa fa-bullhorn"> Panggil</i></button><hr>`;
                                                parent+=`<button type="button" class="btn btn-success" id='selesai' data-nomor='`+element.no_rawat+`'><i class="fa fa-check"> Selesai</i></button></td>`;
                                            }
                                            parent+= '</tr>';
                                        }else if (element.stts == 'Batal') {
                                            parent+= '<tr class="alert alert-danger" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><i class="fa fa-close"></i></td>`;
                                        } else {
                                            parent+= '<tr class="alert alert-success" role="alert">';
                                                parent+= '<td>' + element.no_reg + '</td>';
                                                parent+= '<td>' + element.no_rkm_medis + '</td>';
                                                parent+= '<td>' + element.nm_pasien + '</td>';
                                                parent+= '<td>' + element.nm_poli + '</td>';
                                                parent+= `<td><i class="fa fa-check"></i></td>`;
                                        }
                                    });
                                    table.innerHTML = parent
                                }
                                else
                                {
                                    table.innerHTML = `<td colspan='7'>Data Kosong...!!!</td>`;
                                }
                            },
                            error: function (jqXhr, textStatus, errorMessage) {
                                table.append('Error' + errorMessage);
                            }
                        });

                        
                    }, 1000);
                }
            } 
        });
    })
})
