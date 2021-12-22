<!DOCTYPE html>
<html>
	<head>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.js"></script>	  
		<script src="drewlex.js"></script>
		<script>var mv_protect="on"</script>
	</head>
 <body>

	  <script>
	var formApiCode='</select><input type="hidden" name="ip" value="<?=$_SERVER['REMOTE_ADDR']?>"><input type="hidden" name="flow_hash" value="TQhV"><input type="hidden" name="sub1" value="{sub_id_11}"><input type="hidden" name="sub2" value="{subid}"><input type="hidden" name="sub3" value=""><input type="hidden" name="sub4" value="{sub_id_10}"><input type="hidden" name="sub5" value=""><input type="hidden" name="referrer" value="<?=$_SERVER['HTTP_REFERER']?>">';
	initFeatures({
	lang : 'cz', 
	priceMain: 790,
	currencyMain:"CZK",
	product : 'Predstavit', // название продукта
	genderTargetting : 'male', // пол целевой аудитории - all, male, female
	formApiCode:formApiCode,
        
        form : {
             isNeeded : 1, // 1-включить форму, 0-
	     scrollAllLinks: false,
	     orderScript: 'order.php', //путь к скрипту отправки лидов, по умолчанию getform.php
	     img: 'img/product.png', // путь до картинки продукта
	     price : true, // плашка с ценой
             priceBrFix : true, // фиксит отображение цен в ценике (true - уберает перенос строки)
	     showSelect : false, // показывать или скрывать поле select
             untilExpire : 600 // таймер окончания акции где 600 = 10мин. Ставим 0 если таймер не нужен.
        },
	formApi:{
	     isNeeded: 1,
	     landingValue: 'cz1.predstavitnd.com'
	},

        autoComments : {
            isNeeded : 1, // 1-включить автокомы, 0-выключить
            bgColor : '#d7f2d8' // цвет фона блока комчиков
	},
        
        popups : {
            isNeeded : 0, // 1-включить попы, 0-выключить
            bgColor: 'rgba(87, 86, 141, 0.8)', // цвет фона сообщения
            textColor : '#fff', // цвет основного текста сообщения
            emphColor : 'cyan', // цвет выделений в сообщениях (например, 'со скидкой XX%', '' )
            blackIcons :  false // черные или белые иконки, значения true или false
        },
        
        wheel : {
            isNeeded : 1, // 1-включить колесо, 0-выключить
		    customWheel : false // ссылка на свое колесо, либо false
        }
	});
</script>
</body></html>
