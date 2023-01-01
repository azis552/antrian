$(function(){
	
	var socket = io.connect();
	var pathname = new URL(window.location.href).pathname;
	var loket=pathname.slice(8);

	//MULAI
	$("#start").click(function(){
		
		var date= new Date();
		var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

		$.get( "/api/antrean/mulai/"+loket+"/"+get_date)
		.done(function( data ) {
			if (data['success']==0) 
			{
				$.get( "/api/antrean/daftar/"+get_date+"")
				.done(function( data ) {
					if (data['success']==1) 
					{
						document.getElementById("nm_dilayani").innerHTML = 'A-'+data['data'][0]['noantrian'];
						document.getElementById("kode").innerHTML = data['data'][0]['kd'];
						$.get( "/api/antrean/sisa/"+get_date+"")
						.done(function( data ) {
							if (data['success']==1) 
							{
								document.getElementById("start").style.display = "none";
								document.getElementById("call").style.display = "block";
								document.getElementById("btl").style.display = "none";
							}
						});
						
					}
					else
					{	
						alert("Antrian Habis");
					}
				});
			} 
			else 
			{
				document.getElementById("nm_dilayani").innerHTML = 'A-'+data['data'][0]['noantrian'];
				document.getElementById("kode").innerHTML = data['data'][0]['kd'];
				$("button").attr("disabled", true);
				var antrean = document.getElementById('nm_dilayani').innerHTML.split("-");
				var layanan = 'loket';
				var abjad = antrean[0];
				var nomor = antrean[1];
				socket.emit('retry', {abjad:abjad,nomor:nomor,layanan:layanan,pemanggil:loket});
				setTimeout(function() {
					$('button').removeAttr("disabled");
					document.getElementById("start").style.display = "none";
					document.getElementById("call").style.display = "none";
					document.getElementById("btl").style.display = "block";
					document.getElementById("retry").style.display = "block";
					document.getElementById("next").style.display = "block";
				}, 10000);
			}
		});
		
	});
	//PANGGIL
	$("#call").click(function(){
		var antrean = document.getElementById('nm_dilayani').innerHTML.split("-");
		var kode = document.getElementById('kode').innerHTML;
		var layanan = 'loket';
		var abjad = antrean[0];
		var nomor = antrean[1];
		var date= new Date();
		var get_time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
		const myArr = `{
			"kd":`+ kode +`,
			"loket":`+loket+`,
			"end_time":"`+ get_time +`"
		}`;
		if( document.getElementById("nm_dilayani").innerHTML === 'A-0' ){
			console.log('Habis');
		}
		else{
			$.ajax({
				type: "PATCH",
				url: "/api/antrean/panggil",
				data: myArr,
				contentType:"application/json",
					success: function(data){
						socket.emit('retry', {abjad:abjad,nomor:nomor,layanan:layanan,pemanggil:loket});
						$("button").attr("disabled", true);
						setTimeout(function() {
							$('button').removeAttr("disabled");
							document.getElementById("call").style.display = "none";
							document.getElementById("btl").style.display = "block";
							document.getElementById("retry").style.display = "block";
							document.getElementById("next").style.display = "block";
						}, 10000);
					} 
			});
		}
		
	})
	//BATAL
	$("#btl").click(function(){
		var antrean = document.getElementById('nm_dilayani').innerHTML.split("-");
		var kode = document.getElementById('kode').innerHTML;
		var layanan = 'loket';
		var abjad = antrean[0];
		var nomor = antrean[1];
		var date= new Date();
		var get_time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
		const myArr = `{
			"kd":`+ kode +`,
			"loket":`+loket+`,
			"end_time":"`+ get_time +`"
		}`;
		if( document.getElementById("nm_dilayani").innerHTML === 'A-0' ){
			console.log('Habis');
		}
		else{
			$.ajax({
				type: "PATCH",
				url: "/api/antrean/batal",
				data: myArr,
				contentType:"application/json",
					success: function(data){
						$("button").attr("disabled", true);
						setTimeout(function() {
							$('button').removeAttr("disabled");
							document.getElementById("call").style.display = "none";
							document.getElementById("btl").style.display = "none";
							document.getElementById("retry").style.display = "none";
							document.getElementById("next").style.display = "none";
							document.getElementById("start").style.display = "block";
						}, 1000);
					} 
			});
		}
		
	})
	//ULANGI
	$("#retry").click(function(){
		$("button").attr("disabled", true);
		var antrean = document.getElementById('nm_dilayani').innerHTML.split("-");
		var layanan = 'loket';
		var abjad = antrean[0];
		var nomor = antrean[1];
		socket.emit('retry', {abjad:abjad,nomor:nomor,layanan:layanan,pemanggil:loket});
		setTimeout(function() {
			$('button').removeAttr("disabled");
			document.getElementById("call").style.display = "none";
			document.getElementById("btl").style.display = "block";
			document.getElementById("retry").style.display = "block";
			document.getElementById("next").style.display = "block";
		}, 10000);
	});
	//SELANUTNA
	$("#next").click(function(){
		var kode = document.getElementById('kode').innerHTML;
		var number=/^[0-9]+$/;
		let no_rm = prompt("Masukkan no rm", "");
		if (no_rm == null || no_rm == "") {
			alert('NO.RM tidak boleh kosong');
		}else if (no_rm.length!=6) {
			alert('Panjang tidak valid');
		}else if (no_rm.length>6) {
			alert('Panjang harus 6 digit');
		}else if (!no_rm.match(number)) {
			alert('MO.RM tidak valid');
		}else{
			const myArr = `{
				"kd":"`+ kode +`",
				"no_rkm_medis":"`+ no_rm +`"
			}`;
			$.ajax({
				type: "PATCH",
				url: "/api/antrean/selesai",
				data: myArr,
				contentType:"application/json",
				success: function(data){
					if (data['success']==1) 
					{
						var date= new Date();
						var get_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
						$.get( "/api/antrean/daftar/"+get_date+"")
						.done(function( data ) {
							if (data['success']==1) 
							{
								document.getElementById("nm_dilayani").innerHTML = 'A-'+data['data'][0]['noantrian'];
								document.getElementById("kode").innerHTML = data['data'][0]['kd'];
								$.get( "/api/antrean/sisa/"+get_date+"")
								.done(function( data ) {
									if (data['success']==1) 
									{
										document.getElementById("retry").style.display = "none";
										document.getElementById("start").style.display = "none";
										document.getElementById("next").style.display = "none";
										document.getElementById("btl").style.display = "block";
										document.getElementById("call").style.display = "block";
										
										
									}
								});
								
							}
							else
							{	
								document.getElementById("retry").style.display = "none";
								document.getElementById("start").style.display = "block";
								document.getElementById("next").style.display = "none";
								document.getElementById("btl").style.display = "none";
								alert("Antrian Habis");
							}
						});
					}
				} 
			});
		}
		
		
	})
	//Tes
	$("#try").click(function(){
		var layanan = 'loket';
		socket.emit('try', {layanan:layanan,pemanggil:loket});
		
	});
	//Checkin
	$("#checkin").click(function(){
		var kode = document.getElementById('kode').innerHTML;
		var number=/^[0-9]+$/;
		let no_booking = prompt("Masukkan no booking jkn mobile", "");
		var time = new Date().getTime();
		if (no_booking == null || no_booking == "") {
			alert('Kode booking tidak boleh kosong');
		}else if (!no_booking.match(number)) {
			alert('Kode booking tidak valid');
		}else{
			$.ajax({
				url:"https://rsuratih.simkeskhanza.com:5000/api-bpjsfktl/auth",
				method:"get",
				headers:{
					"username":"admin"
				},
				successL:function(resp){
					console.log(resp);
				}
			})

		}
		
		
	})
}) // End function

// function plus(count) {
	
	// var nextCount= Number(count)+1;
	// document.getElementById('nm_dilayani').innerHTML = "A-"+nextCount;

// }
