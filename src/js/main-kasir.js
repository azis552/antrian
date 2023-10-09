$(function(){
	
    var socket = io.connect();

    $('#mytab1').on('click','#panggil', function(){
        $("button").attr("disabled", true);
        var pasien = $(this).data("pasien").toLowerCase();
        var nm_poli = $(this).data("poli").toLowerCase();
        socket.emit('retry-kasir', {pasien:pasien,poli:nm_poli});
        setTimeout(function() {
            $('button').removeAttr("disabled");
        }, 10000);
    })

})