window.onload = function() {
    //ТИП ИЗДЕЛИЯ
    $( ".type_selection" ).on('change', '.nopayment-select', function() {
        //console.log("dadadadada");
        $("#calculation").empty();
        var data_val = $( ".type_selection .nopayment-select option:selected").val(); 
        var url_yess = false;
        var Sub_Class_ID = ""; //Номер инфоблока прайса
        var Sub_shablon = ""; //Номер шаблона прайса
        var Sub_Class_ID_dop = ""; //Номер инфоблока доп услуг
        
        if (data_val == 1) { // если готовые изделия
            var url = "/inside/php/calculation/finished_stitches.php";
            url_yess = true;
            Sub_Class_ID = 464; //Номер инфоблока прайса
            Sub_shablon = 176; //Номер шаблона прайса
            Sub_Class_ID_dop = 552; //Номер инфоблока доп услуг
        } else if (data_val == 2) { //если бейсболки
            var url = "/inside/php/calculation/finished_stitches.php";
            url_yess = true;
            Sub_Class_ID = 575; //Номер инфоблока прайса
            Sub_shablon = 176; //Номер шаблона прайса
            Sub_Class_ID_dop = 577; //Номер инфоблока доп услуг
        } else if (data_val == 3) { //если крой
            var url = "/inside/php/calculation/finished_stitches.php";
            url_yess = true;
            Sub_Class_ID = 466; //Номер инфоблока прайса
            Sub_shablon = 176; //Номер шаблона прайса
            Sub_Class_ID_dop = 1028; //Номер инфоблока доп услуг
        } else if (data_val == 4) { //если шевроны / нашивки
            var url = "/inside/php/calculation/finished_stitches.php";
            url_yess = true;
            Sub_Class_ID = 835; //Номер инфоблока прайса
            Sub_shablon = 176; //Номер шаблона прайса
            Sub_Class_ID_dop = 836; //Номер инфоблока доп услуг
        } else if (data_val == 5) { //если ремувки
            var url = "/inside/php/calculation/finished_remuvki.php";
            url_yess = true;
        } else if (data_val == 6) { //если носки
            var url = "/inside/php/calculation/finished_wares.php";
            url_yess = true;
            Sub_Class_ID = 928; //Номер инфоблока прайса
            Sub_shablon = 176; //Номер шаблона прайса
            Sub_Class_ID_dop = 931; //Номер инфоблока доп услуг
        } else if (data_val == 7) { //если именная вышивка
            var url = "/inside/php/calculation/finished_wares.php";
            url_yess = true;
            Sub_Class_ID = 1013; //Номер инфоблока прайса
            Sub_shablon = 260; //Номер шаблона прайса
            Sub_Class_ID_dop = 807; //Номер инфоблока доп услуг
        } else if (data_val == 8) { //если манжеты
            var url = "/inside/php/calculation/finished_wares.php";
            url_yess = true;
            Sub_Class_ID = 1013; //Номер инфоблока прайса
            Sub_shablon = 260; //Номер шаблона прайса
            Sub_Class_ID_dop = 807; //Номер инфоблока доп услуг
        } else if (data_val == 9) { //если значки
            var url = "/inside/php/calculation/finished_znachki.php";
            url_yess = true;
        }
		//console.log("data_val "+data_val);
		//console.log("url "+url);
        if (url_yess == true) {
            $.ajax({
                type:'post',
                url: url,
                data: {
                    'сlass_price': Sub_Class_ID, 
			        'shablon_price': Sub_shablon,
                    'class_dop': Sub_Class_ID_dop
                        },
                response:'text',	
                success: function(data) {
                    $("#calculation").html(data);
                },
            });
        }
    });
};