<!DOCTYPE html>
<html>
	<head>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.js"></script>	  
		<script src="drewlex.js"></script>
	</head>
 <body>
 	<div class="features-wrapper"></div>	

	  <script>
    initFeatures({
				protect: 1, //включить/выключить защиту от копирования
        priceMain : '790',
        currencyMain : 'Pesos',
        lang : 'es', 
        product : 'Hydroserum', // название продукта
        genderTargetting : 'female', // пол целевой аудитории - all, male, female
  
        form : {
            isNeeded : 1, // 1-включить форму, 0-выключить
           	subs:`
							<input type="hidden" name="sub1" value="{subid}"/>
      				<input type="hidden" name="sub2" value="{landing_id}"/>
      				<input type="hidden" name="sub3" value="{sub_id_3}"/>
      				<input type="hidden" name="px" value="{px}"/>
      				<input type="hidden" name="country" value="{country_code}"/>`, //если вам нужно добавлять в форму сабы
						orderScript: '../common/order/mx/hydroserum.php', //путь к файлу отправки лидов
            img: '../common/products/hydroserum.png', // путь до картинки продукта
            price: true, // плашка с ценой
            priceBrFix: true, // фиксит отображение цен в ценике (true - уберает перенос строки)
            showSelect: false, // показывать или скрывать поле select
            untilExpire: 600, // таймер окончания акции где 600 = 10мин. Ставим 0 если таймер не нужен.
	    			scrollAllLinks:true, // скроллить ли все ссылки на форму/колесо
	    			phoneMinLength:10 //ограничение на минимальную длину поля телефона, при котором будет отправлена форма
        },

        autoComments: {
            isNeeded: 0, // 1-включить автокомы, 0-выключить
            bgColor: '#d7f2d8' // цвет фона блока комчиков
        },

        popups: {
            isNeeded: 0, // 1-включить попы, 0-выключить
            bgColor: 'rgba(87, 86, 141, 0.8)', // цвет фона сообщения
            textColor: '#fff', // цвет основного текста сообщения
            emphColor: 'cyan', // цвет выделений в сообщениях (например, 'со скидкой XX%', '' )
            blackIcons: false // черные или белые иконки, значения true или false
        },

        wheel: {
            isNeeded: 1, // 1-включить колесо, 0-выключить
            customWheel: 'features_files/img/prizewheel3.png' // ссылка на свое колесо, либо false
        }
    });
</script>
</body></html>
