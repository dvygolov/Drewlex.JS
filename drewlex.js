// Modified by Yellow Web, author unknown, Everad employee may be?..
// Кардинально новый продукт, по производительности превосходящий потенциал целого стака верстальщиков


// === DISCLAMER ===
// данный скрипт написан человеком, почти не имеющим отношения к фронтенду, так что просьба закрыть глаза, досчитать до 10, выдохнуть и положить нож на место.

/* ФУНКЦИОНАЛ:
  1. Блокирование контекстного меню, сохранения страницы, копирования и тд. - в <head> страницы пишем <script>var mv_protect="on"</script>
  2. Динамическая дата минус 10 дней (обычно для статьи и тд.) - добавляем элементу класс mv_mdate
  3. Динамическая дата сегодняшнего числа - добавляем элементу класс mv_tdate
  4. Динамические даты для комментов - нужным элементам добавляем класс mv_rdate
  5. Динамический год (текущий) - нужным элементам добавляем класс mv_tyear
  6. Комменты а-ля фейстбук - лайки и работа формы (кто не понял - тот поймет)
  7. Плавный скролл - добавляем элементу-ссылке  класс .scrollto и href с айди элемента, к которому надо скроллить
  8. Таймер - добавляем элементу id="mv_timer"
  9. Слайдер - добавляем родительскому элементу слайдера класс owl-carousel
 
  10. ФИШЕЧКИ - автокомменты, попапы, рулетка, формы. Для подключения прописываем в нужном месте страницы блок <div class="features-wrapper"></div> и перед закрытием тега <body> ставим настройки, которые ниже. 

  ----В двух словах о настройках фишек----
 
 Блок настроек состоит из 3х основных (обязательных) параметров и 5и дополнительных модулей. Основные отвечают за язык, продукт и половую принадлежность аудитории (например EROGAN это male, BELLINDA это female, а FITOSPRAY это all) все 3 обязательно должны быть указанны! Дополнительные модули отвечают за установку на странице формы (и ее API если надо), автокомментов, попапов и рулетки в любой комбинации: форма - просто форма, рулетка - просто рулетка, форма + рулетка = форма вылезает после вращения рулетки. Модули содержат набор уникальных настроек, позволяющих более точно подогнать фичу на страницу. Не нужные модули можно убрать из настроек чтобы не занимали места.
 
 
<script>
	initFeatures({
        lang : 'ru', // список языков - vn, it, es, co, hr, en, de, fr, ph, cz, id, th, gr, bg, al, ro, sg, en_sg, mk, si, sk, lv, hu, pl, lt, pt
        product : 'СПАЙС', // название продукта
        genderTargetting : 'all', // пол целевой аудитории - all, male, female
        
        form : {
             isNeeded : 1, // 1-включить форму, 0-выключить
			 img: 'https://www.webrotate360.com/campaigns/360-product-view.gif', // путь до картинки продукта
			 price : true, // плашка с ценой
             priceBrFix : true, // фиксит отображение цен в ценике (true - уберает перенос строки)
			 showSelect : false, // показывать или скрывать поле select
             untilExpire : 600 // таймер окончания акции где 600 = 10мин. Ставим 0 если таймер не нужен.
        },

        autoComments : {
            isNeeded : 1, // 1-включить автокомы, 0-выключить
            bgColor : '#d7f2d8' // цвет фона блока комчиков
		},
        
        popups : {
            isNeeded : 1, // 1-включить попы, 0-выключить
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
              
*/





window.onload = function(){
    
  // Защита страницы - в <head> страницы пишем <script>var mv_protect="on"</script>
  if(typeof mv_protect!="undefined") {
    if(mv_protect=="on") {
		document.body.oncontextmenu= function(){return false;};
		window.addEventListener('selectstart', function(e){ e.preventDefault(); });
		document.addEventListener('keydown',function(e) {
			if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
				e.preventDefault();
				e.stopPropagation();
			}
		},false);		
    }
  }

  // Главная дата - нужно добавить класс элементу .mv_mdate
  var mv_mdate = document.getElementsByClassName('mv_mdate');
  var mv_now = Date.now(),
      mv_one_month = 1000 * 60 * 60 * 24 * 10;
  if(mv_mdate) {
    for (i=0; i < mv_mdate.length; i++) {
      mv_mdate[i].innerHTML = new Date(mv_now - mv_one_month).toLocaleDateString();
    }
  }

  // Дата сегодня- нужно добавить класс элементу .mv_tdate
  var mv_tdate = document.getElementsByClassName('mv_tdate');
  if(mv_tdate) {
    for (i=0; i < mv_tdate.length; i++) {
      mv_tdate[i].innerHTML = new Date(mv_now).toLocaleDateString();
    }
  }

  // Даты для комментов - нужно элементам где должна быть дата добавить класс .mv_rdate
  var mv_rdate = document.getElementsByClassName('mv_rdate');
  if(mv_rdate) {
  for (i=0; i<mv_rdate.length; i++) {
    let now = Date.now();
    let one_month = 1000 * 60 * 60 * 24 * (i+2)*0.3;
    let new_rdate = new Date(now - one_month).toLocaleDateString();
    let y = mv_rdate.length-i-1;
    mv_rdate[y].innerHTML = new_rdate;
    }
  }

    // Даты для комментов - нужно элементам где должна быть дата добавить класс .mv_rtdate
  var mv_rtdate = document.getElementsByClassName('mv_rtdate');
  if(mv_rtdate) {
  for (i=0; i<mv_rtdate.length; i++) {
    let now = Date.now();
    let one_month = 1000 * 60 * 60 * 24 * (i+2)*0.3;
    let new_rtdate = new Date(now - one_month).toLocaleDateString();
    let new_rtdateH = (new Date(now - one_month).getHours()>=10) ? new Date(now - one_month).getHours() : ('0'+new Date(now - one_month).getHours());
    let new_rtdateM = (new Date(now - one_month).getMinutes()>=10) ? new Date(now - one_month).getMinutes(): ('0'+new Date(now - one_month).getMinutes());
    let new_rtdateT = new_rtdateH + ':' + new_rtdateM;
    let y = mv_rtdate.length-i-1;
    mv_rtdate[y].innerHTML = new_rtdate + ' ' + new_rtdateT;
    }
  }

  // Текущий год - нужно добавить класс элементу .mv_tyear
  var mv_tyear = document.getElementsByClassName('mv_tyear');
  if(mv_tyear) {
    for (i=0; i < mv_tyear.length; i++) {
      mv_tyear[i].innerHTML = new Date().getFullYear();
    }
  }

//ТАЙМЕР
var mv_timer = document.getElementById("mv_timer");
if(mv_timer) {
  setInterval(function() {
   var newDate = new Date();
   var hours = 24 - newDate.getHours();
   var minutes = 60 - newDate.getMinutes();
   var seconds = 60 - newDate.getSeconds();
     if (seconds<10&&minutes<10) {
         mv_timer.innerHTML = hours+":"+0+minutes+":"+0+seconds
       } else if (seconds<10){
         mv_timer.innerHTML = hours+":"+minutes+":"+0+seconds
       } else if (minutes<10){
          mv_timer.innerHTML = hours+":"+0+minutes+":"+seconds
       } else {
       mv_timer.innerHTML = hours+":"+minutes+":"+seconds
     }}, 1000);
} 
var mv_timer_class = document.getElementsByClassName("mv_timer");
if(mv_timer_class) {
  setInterval(function() {
   var newDate = new Date();
   var hours = 24 - newDate.getHours();
   var minutes = 60 - newDate.getMinutes();
   var seconds = 60 - newDate.getSeconds();
   for(i=0; i<mv_timer_class.length; i++){
     if (seconds<10&&minutes<10) {
         mv_timer_class[i].innerHTML = hours+":"+0+minutes+":"+0+seconds
       } else if (seconds<10){
         mv_timer_class[i].innerHTML = hours+":"+minutes+":"+0+seconds
       } else if (minutes<10){
          mv_timer_class[i].innerHTML = hours+":"+0+minutes+":"+seconds
       } else {
       mv_timer_class[i].innerHTML = hours+":"+minutes+":"+seconds
     }}}, 1000); 
}

var mv_slider = document.querySelector('.owl-carousel');
if(mv_slider) {
  var mv_slider_js = document.createElement('script');
  mv_slider_js.src="/cdn/js/owl.carousel.js";
  document.head.appendChild(mv_slider_js);
  //добавляем главные стили слайдера
  var mv_slider_main_css = document.createElement('link');
  mv_slider_main_css.rel="stylesheet";
  mv_slider_main_css.href="/cdn/css/owl.carousel.min.css";
  document.body.appendChild(mv_slider_main_css);
  //добавляем главные стили темы
  var mv_slider_default_css = document.createElement('link');
  mv_slider_default_css.rel="stylesheet";
  mv_slider_default_css.href="/cdn/css/owl.theme.default.css";
  document.body.appendChild(mv_slider_default_css);
}


//НУЖЕН JQuery! - плавный скролл - элементу даем класс scrollto и пишем href с айди элемента к которому надо скроллить
if(window.jQuery) {
    $(".scrollto").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
 
        // получем идентификатор блока из атрибута href
        var id  = $(this).attr('href'),
 
        // находим высоту, на которой расположен блок
            top = $(id).offset().top;
         
        // анимируем переход к блоку, время: 800 мс
        $('body,html').animate({scrollTop: top}, 800);
    });
}


//КОММЕНТЫ №1 - А-ЛЯ ФЕЙСБУК
  // Объявляем переменные
  var send = document.querySelector(".send-btn"),
  textarea = document.querySelector(".textarea"),
  sendContainer = document.querySelector(".input-action"),
  commentNameInput =  document.querySelector(".comment-name-input");


  
  // Работа кнопок 'лайк'
  if (sendContainer) {
    function likeCount(){
        var like = document.querySelectorAll('.like');
        var likeCountOutput = document.querySelectorAll('.like-count');
        [].forEach.call(like, function(item, i){
          item.onclick = function() {
            if (item.classList.contains('liked')) {
              item.classList.remove('liked');
              item.style.fontWeight = "normal";
              --likeCountOutput[i].innerHTML;
              likeCountOutput[i].classList.remove('like-count-liked');
              likeCountOutput[i].classList.add('like-count-unliked');
            } else {
              item.classList.add('liked');
              item.style.fontWeight = "bold";
              ++likeCountOutput[i].innerHTML;
              likeCountOutput[i].classList.add('like-count-liked');
              likeCountOutput[i].classList.remove('like-count-unliked');
            }
          }
        });
    };
  likeCount();

  // Если JS не загрузится, то кнопка отправки комментария будет доступна по-умолчанию
  sendContainer.classList.remove('input-action-focus');
  // И ширина инпута тоже будет больше
   textarea.classList.remove('textarea-focus');


  // При фокусировке на поле ввода появляется кнопка отправления комментария, а также увеличивается высота поля ввода
    textarea.addEventListener("focus", function(event) {
      sendContainer.classList.add("input-action-focus");
      textarea.classList.add("textarea-focus");
    });

  // При потере фокуса поле ввода схлопнется, если оно пустое
    textarea.addEventListener("blur", function() {
      if(!textarea.value) {
        textarea.classList.remove("textarea-focus");
      } else {
        return false;
      }
    });

  // Добавление коммента и проверка заполненности полей
    send.addEventListener("click", function(event) {
      if (!textarea.value) {
        alert("WRITE YOUR COMMENT!");
      } else {
      var allComments = document.querySelectorAll('.comments-item');
      var newComment = document.createElement('div');
      newComment.classList.add('comments-item');
      newComment.classList.add('comment-appear');
      newComment.innerHTML = allComments[0].innerHTML;
      newComment.querySelector('.comment-username').innerHTML= textarea.value;
      newComment.querySelector('.like-count').classList.remove('like-count-liked');
      newComment.querySelector('.like').classList.remove('liked');
      newComment.querySelector('.like').style.fontWeight = 'normal';
       newComment.querySelector('.like-count').innerHTML= 0;
       newComment.querySelector('.comment-date').innerHTML= '';
          // вставляем данные в новый коммент, если есть инпут имени
       if(commentNameInput){
        newComment.querySelector('.comment-text').innerHTML =  '<span class="comment-username">' + commentNameInput.value + '</span>' + textarea.value;
        textarea.value = '';
        commentNameInput.value = '';
        document.querySelector('.comments').insertBefore(newComment, document.querySelector('.comment-input'));
        likeCount();
       } else {
        alert('Your comment is sent for moderation!');
        textarea.value = '';
       }
      }
    });
  }

}


function initFeatures(settings) {
    
    //Проверка настроек
    if (!settings) {
        console.log('%c%s', 'font-size: 30px; color: red;background-color: #ffe7e8', 'Хей, а скрипт настроить? ');
        throw new Error('No Settings Found');
    }
    if (!settings.product) {
        console.log('%c%s', 'font-size: 30px; color: red;background-color: #ffe7e8', 'А продукт кто будет указывать??');
        throw new Error('Product is not set!');
    }
    if (!settings.lang) {
        console.log('%c%s', 'font-size: 30px; color: red;background-color: #ffe7e8', 'А язык??');
        throw new Error('Language is not set!');
    };
    var checkLang = (window.countryList) ? Object.keys(window.countryList)[0] : false;
	if (!!checkLang && (checkLang != settings.lang)) {
		console.log('%c Кантрилист не соотвутствует выбранному языку (но это не точно)', 'font-size: 20px;color: red;background-color: #ffe7e8');
	}
	if ($('.features-wrapper').length == 0) {
		console.log('%c Надо вставить контейнер Фич!', 'font-size: 20px;color: red;background-color: #ffe7e8');
		throw new Error('No features block!');
	};

    
    //Хранилище импортируемых файлов
    if (!settings.formApi || !settings.formApi.isNeeded) {
        var featuresFilesSrc = (window.location.protocol == 'file:') ? {
                 userAva: 'features_files/img/autoCommentsAva.jpg',
            refreshingArrow: 'features_files/img/autoCommentsRefreshing.gif',
            autoCommStyles: 'features_files/css/autoComments.css',
            popupsStyles: 'features_files/css/popups.css',
            popupsIconUser: 'features_files/img/count-user_black.png',
            popupsIconOrder: 'features_files/img/count-order-984_black.png',
            prizeWheel: 'features_files/img/prizewheel.png',
            wheelCursor: 'features_files/img/wheel-cursor.png',
            wheelStyles: 'features_files/css/wheel.css',
            formStyles: 'features_files/css/formStyles.css'
        } : {
                 userAva: 'features_files/img/autoCommentsAva.jpg',
            refreshingArrow: 'features_files/img/autoCommentsRefreshing.gif',
            autoCommStyles: 'features_files/css/autoComments.css',
            popupsStyles: 'features_files/css/popups.css',
            popupsIconUser: 'features_files/img/count-user_black.png',
            popupsIconOrder: 'features_files/img/count-order-984_black.png',
            prizeWheel: 'features_files/img/prizewheel.png',
            wheelCursor: 'features_files/img/wheel-cursor.png',
            wheelStyles: 'features_files/css/wheel.css',
            formStyles: 'features_files/css/formStyles.css'
        };
    } else {
        var featuresFilesSrc = {
            userAva: 'features_files/img/autoCommentsAva.jpg',
            refreshingArrow: 'features_files/img/autoCommentsRefreshing.gif',
            autoCommStyles: 'features_files/css/autoComments.css',
            popupsStyles: 'features_files/css/popups.css',
            popupsIconUser: 'features_files/img/count-user_black.png',
            popupsIconOrder: 'features_files/img/count-order-984_black.png',
            prizeWheel: 'features_files/img/prizewheel.png',
            wheelCursor: 'features_files/img/wheel-cursor.png',
            wheelStyles: 'features_files/css/wheel.css',
            formStyles: 'features_files/css/formStyles.css'
        }
    }
   
    
    
    //Функция- генератор формы
    function genLocalForm () {
        var localForms = {
            'en' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Discount!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Make an order before the discount is given to another reader. <br>Offer expires in:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + '  <label for="name" class="data_label">Write your name:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="John Smith"><label for="phone" class="data_label">Write your phone number:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+7 977 777 77 77"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Buy ' + settings.product + ' with discount 50%!</button> </form> </div><center> <h2 class="time_remains_title">The last day of discount giveaway: <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'en_sg' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Discount!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Make an order before the discount is given to another reader. <br>Offer expires in:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + '  <label for="name" class="data_label">Write your name:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="John Smith"><label for="phone" class="data_label">Write your phone number:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+65 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Buy ' + settings.product + ' with discount 50%!</button> </form> </div><center> <h2 class="time_remains_title">The last day of discount giveaway: <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
             'pt' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">É rentável!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Corra para pedir um desconto até que a oferta seja transferida para o próximo leitor! <br> A oferta ficará inválida em:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  +  '<label for="name" class="data_label">Seu nome:</label><input class="wheel_input" type="text" name="name" id="name" placeholder="Miguel Castro "><label for="phone" class="data_label">Telefone:</label> <input class="wheel_input" type="tel" id="phone" name="phone" placeholder="+351....."> <input type="hidden" name="landing" value="' + window.location.host + '"> <button class="main-link" type="submit">Encomendar ' + settings.product + ' com 50% de desconto!</button> </form> </div><center> <h2 class="time_remains_title">Oferta válida até (inclusive): <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'ph': '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Diskwento!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Umorder na  bago maibigay ang diskwento sa ibang mambabasa.  <br>Ang alok ay matatapos sa loob ng:   <span class="time_remains" id="min">10</span> : <span class="time_remains" id="sec">00</span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Isulat ang pangalan:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Pangalan"><label for="phone" class="data_label">Isulat ang numero ng telepono</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="Telepono"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Order ' + settings.product + ' na may 50% na diskwento!</button> </form> </div><center> <h2 class="time_remains_title">Ang huling araw ng pagbibigay ng diskwento:  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'mk' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Поволно!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Искористете ја можноста за попуст, дури тоа не му е понудено на наредниот читател! <br> Понудата ќе престане да важи по: <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Вашето име:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Јован Ѓорѓиев "><label for="phone" class="data_label">Номер телефона:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+389 70 123 456"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Нарачај ' + settings.product + ' со попуст 50%!</button> </form> </div><center> <h2 class="time_remains_title">Понудата важи до вклучително): <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'si' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Ugodno je!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Utegnite naročiti po nižji ceni, dokler ni ponudba šla za naslednjega bralca! <br>Ponudba je veljavna do:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Vaše ime:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Jure Slavič"><label for="phone" class="data_label">Telefonska številka:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+7 ......."> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Naročiti ' + settings.product + ' s popustom 50%!</button> </form> </div><center> <h2 class="time_remains_title">Ponudba velja do (vključujoč):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'ru' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Выгодно!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Успейте заказать со скидкой, пока предложение не будет передано следующему читателю! <br>Предложение станет недействительным через:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Ваше имя:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Юрий Петров "><label for="phone" class="data_label">Номер телефона:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+7 977 777 77 77"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Заказать ' + settings.product + ' со скидкой 50%!</button> </form> </div><center> <h2 class="time_remains_title">Предложение действует до (включительно):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'lt' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Pelninga!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Paskubėkite užsakyti su nuolaida, kol pasiūlymas bus perkeltas į kitą skaitytoją! <br>Pasiūlymas pasibaigs po to, kai:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Jūsų vardas:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Gokhan Karakoc"><label for="phone" class="data_label">Telefono numeris:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+370 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">UŽSAKYTI ' + settings.product + ' su 50% nuolaida!</button> </form> </div><center> <h2 class="time_remains_title">Pasiūlymas galioja iki (imtinai):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
           'pl' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Opłacalne!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Pospiesz się, aby zamówić z rabatem, aż oferta zostanie przekazana do następnego czytelnika! <br>Oferta straci ważność po:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Twoje imię i nazwisko:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Tom Czerniak "><label for="phone" class="data_label">Numer telefonu:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+48 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">ZAMÓWIĆ ' + settings.product + ' z 50% zniżką!</button> </form> </div><center> <h2 class="time_remains_title">Oferta ważna do (włącznie):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'hu' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Nyereséges!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Sietj megrendelésre kedvezménnyel, amíg az ajánlat át nem kerül a következő olvasónak! <br>Az ajánlat érvénytelen lesz, miután:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Az Ön neve:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Tóth Vera "><label for="phone" class="data_label">Telefonszám:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+36 12345678"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">RENDELÉS ' + settings.product + ' kedvezményes áron 50%!</button> </form> </div><center> <h2 class="time_remains_title">Ajánlat (egészen):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
             'lv' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Izdevīgi!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Pasteidzieties, lai pasūtītu ar atlaidi, līdz piedāvājums tiek nodots nākamajam lasītājam! <br>Piedāvājums kļūs nederīgs pēc:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Jūsu vārds:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder=" Aivars Janis "><label for="phone" class="data_label">Tālruņa numurs:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+371 0123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">PASŪTĪT ' + settings.product + ' ar atlaidi 50%!</button> </form> </div><center> <h2 class="time_remains_title">Piedāvājums ir spēkā līdz (ieskaitot):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            'sk' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Ziskový!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Ponáhľajte sa na objednávku so zľavou, kým sa ponuka neprevedie na ďalšiu čitateľku! <br> Ponuka bude neplatná po: <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Vaše meno:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Vladimir Gordik "><label for="phone" class="data_label">Telefónne číslo:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+421 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Objednať ' + settings.product + ' s 50% zľavou!</button> </form> </div><center> <h2 class="time_remains_title">Ponuka je platná do (vrátane):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'sg' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">贏利！</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">快點訂購，直到優惠轉移到下一位讀者! <br>優惠將在以下情況後失效： <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">你的名字：</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="王心><label for="phone" class="data_label">电话号码:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="电话号码"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">訂購' + settings.product + '享受50％的折扣！</button> </form> </div><center> <h2 class="time_remains_title">優惠有效期至： <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'bg' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Изгодно!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Успейте да поръчате с отстъпка, докато офертата не се предаде на следващия читател! <br>Офертата ще стане невалидна след:   <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Вашето име:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Име"><label for="phone" class="data_label">Телефонен номер:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="Телефон"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Поръчайте ' + settings.product + ' с 50% отстъпка!</button> </form> </div><center> <h2 class="time_remains_title">Офертата е валидна до (включително):  <span class="time_remains"> ' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'hr' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Ovo je korisno!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Požurite na narudžbu uz popust dok se ponuda ne prenese na sljedeći čitatelj! <br>Ponuda će postati nevažeća:   <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Vaše ime:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Ime "><label for="phone" class="data_label">Telefonski broj:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="Telefon"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Naručiti ' + settings.product + ' popustom 50%!</button> </form> </div><center> <h2 class="time_remains_title">Ponuda vrijedi do (uključivo):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'al' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Çmim i ulët!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Arrini ta porositni me zbritje përpara se oferta ti kalojë një lexuesi tjetër! <br>Oferta do të jetë e pavlefshme pas: <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Emri i plote:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Florjan Fejzollari"><label for="phone" class="data_label">Numri i celularit:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="ex: +355 1234567890"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Porositeni ' + settings.product + ' me një zbritje prej 50%!</button> </form> </div><center> <h2 class="time_remains_title"> Oferta është e vlefshme deri në (përfshirë):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'id' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' +  settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Menguntungkan!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Punya wakti untuk memesan dengan harga diskon,<br>sampai penawaran akan ditransfer ke pembaca lain!<br>Diskon akan tidak aktif setelah:<br> <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Masukkan nama:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Nama"><label for="phone" class="data_label">Masukkan nomor telepon:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="Misalnya +62 12345678"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Beli dengan diskon 50%!</button> </form> </div><center> <h2 class="time_remains_title">Penawaran ini berlaku hingga (inklusif): <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'vn' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"> <span class="discountс">Giảm giá!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Hãy đặt với giá khuyến mãi trước khi ưu đãi này được chuyển qua cho người đọc tiếp theo! Mức giá ưu đãi của bạn sẽ kết thúc sau:<br> <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Xin hãy nhập tên:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Chung Đình Toản"><label for="phone" class="data_label">Xin hãy nhập số điện thoại:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+84 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Đặt hàng ' + settings.product + ' với giảm giá 50%!</button> </form> </div><center> <h2 class="time_remains_title">Xin lưu ý! Chương trình khuyến mãi đặc biệt chỉ có hiệu lực đến hết ngày: <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'it' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"> <span class="discountс">Conveniente!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Affrettatevi a fare l\'ordine prima che lo sconto passi al prossimo lettore, la vostra offerta unica termina tra: <br> <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Nome e cognome:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Francesco Rossi"><label for="phone" class="data_label">Telefono cellulare:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="Per esempio, +39 0123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Ordinare ' + settings.product + ' con lo sconto 50%!</button> </form> </div><center> <h2 class="time_remains_title">Ricordate, l\'offerta speciale è valida fino al: <span class="time_remains">' + outputDat(0, false) + '</span> (compreso)</h2> <br> </center>',
            
            'es' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">DESCUENTO</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Reserve con el precio de promoción antes de que la oferta se pase al siguiente lector! <br>Su tarifa promocional finalizará después de:<br> <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Nome/Cognome</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Alejandro Rodriguez"><label for="phone" class="data_label">Mob.telefono</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+34 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Ordene ' + settings.product + ' con 50% de descuento!</button> </form> </div><center> <h2 class="time_remains_title">EL NÚMERO DE PRODUCTOS DE OFERTA ES LIMITADO. LOS DESCUENTOS TODAVÍA ESTÁN DISPONIBLES <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'co' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">DESCUENTO</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Reserve con el precio de promoción antes de que la oferta se pase al siguiente lector! <br>Su tarifa promocional finalizará después de:<br> <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Nome/Cognome</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Alejandro Rodriguez"><label for="phone" class="data_label">Mob.telefono</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+57 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Ordene ' + settings.product + ' con 50% de descuento!</button> </form> </div><center> <h2 class="time_remains_title">EL NÚMERO DE PRODUCTOS DE OFERTA ES LIMITADO. LOS DESCUENTOS TODAVÍA ESTÁN DISPONIBLES <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'ro' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Reducere!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Cantitatea produsului este limitata, grăbiți-vă să comandați până nu e prea târziu!<br>Reducerea dvs. expiră peste: <br> <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Introduceți numele dvs </label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Mihai Orbulescu"><label for="phone" class="data_label">Introduceți numarul dvs de telefon </label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+40 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">COMANDĂ ' + settings.product + '</button> </form> </div><center> <h2 class="time_remains_title">Fiți atenți, oferta este limitată și e valabilă până <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'cz' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Speciální nabídka</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Stíhnete si objednat se slevou, zatím nabídka nepřešla k jinému čtenářovi! <br>Nabídka vyprší za: <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Uveďte jméno a příjmení</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Pavel Smejkal"><label for="phone" class="data_label">Uveďte tel.číslo</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+420 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">OBJEDNAT ' + settings.product + ' SE SLEVOU 50%!</button> </form> </div><center> <h2 class="time_remains_title">Pozor, akce se speciální slevou trvá pouze do  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'th' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">ราคาถูก!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">จนกว่าสินค้าจะสิ้นสุดโปรโมชั่น <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">ชื่อเต็ม </label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="ทวีเดช หยาดทอง"><label for="phone" class="data_label">ใส่หมายเลขโทรศัพท์</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+66 123456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">สั่งซื้อ ' + settings.product + ' พร้อมส่วนลด 50%!</button> </form> </div><center> <h2 class="time_remains_title">มองหาโปรโมชั่นด้วยราคาพิเศษ ไม่เกิน - 50%  <span class="time_remains">' + outputDat(0, false) + '</span> (รวมทั้ง)</h2> <br> </center>',
            
            'gr' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Κερδοφόρα!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Έχετε χρόνο για παραγγελία με έκπτωση, έως ότου η προσφορά μεταφερθεί σε άλλους αναγνώστες! <br>Οι εκπτώσεις θα είναι ανενεργές μετά από: <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Εισαγάγετε ένα όνομα</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Πλήρες όνομα"><label for="phone" class="data_label">Εισαγάγετε το τηλέφωνο</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="Τηλέφωνο"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Αγορά με έκπτωση 50%!</button> </form> </div><center> <h2 class="time_remains_title">Αυτή η προσφορά ισχύει μέχρι (συμπεριλαμβάνεται):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'de' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Rabatt!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Beeilen Sie sich, um die Bestellung mit einem Rabatt abzuschließen, bis das Angebot nicht an einen anderen Leser übergeht! <br>Das Angebot wird ungültig nach:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Name:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Tomas Mann "><label for="phone" class="data_label">Telefonnummer:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+49 151 23456789"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">BESTELLEN ' + settings.product + ' MIT RABATT 50%!</button> </form> </div><center> <h2 class="time_remains_title">Das Angebot gilt bis (einschließlich):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'bg' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Това е изгодно!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Имате време да поръчате това лекарство с отстъпка, докато тази оферта не бъде предадена на други читатели! След това отстъпките ще бъдат деактивирани:<br>  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Въведи име</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="ИМЕ "><label for="phone" class="data_label">Въведи телефонен номер</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="Телефон"> <input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Вземи с отстъпка от 50%!</button> </form> </div><center> <h2 class="time_remains_title">Тази оферта е валидна до (включително):<span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>',
            
            'fr' : '<div class="order_block"> <div class="prod_img_wrapper"> <img src="' + settings.form.img + '" width="300" class="prod_img">' + ((settings.form.price) ? '<div class="priceс"><span class="discountс">Réduction!</span> <s><span class="js_old_price price_old">' + settings.priceMain * 2 + settings.currencyMain + '</span></s><br> <b class="new_price js_new_price price_main">' + settings.priceMain + settings.currencyMain + '</b> </div>' : '') + '</div> <center> <h3 style="text-align: center">Dépêchez-vous de faire une commande un rabais, jusqu\'à ce que l\'offre soit transmise à un autre lecteur! <br>L\'offre sera            invalide dans:  <span class="time_remains" id="min"></span> : <span class="time_remains" id="sec"></span> </h3> </center> <form class="order_form" action="getform.php" method="POST"> <select class="country_select wheel_input" name="country">' + ((!!settings.formApi && settings.formApi.isNeeded) ? formApiCode : '</select>')  + ' <label for="name" class="data_label">Nom:</label><input class="wheel_input" type="text" name="name" required="" id="name" placeholder="Élise Mercier"><label for="phone" class="data_label">Numéro de téléphone:</label> <input class="wheel_input" type="tel" id="phone" name="phone" required="" placeholder="+33 6 12 345678"><input type="hidden" name="landing" value="' + ((!!settings.formApi && settings.formApi.isNeeded) ? settings.formApi.landingValue : window.location.host) + '"> <button class="main-link" type="submit">Commandez ' + settings.product + ' avec 50% de réduction!</button> </form> </div><center> <h2 class="time_remains_title"> L\'offre est valable jusqu\'au (y compris):  <span class="time_remains">' + outputDat(0, false) + '</span></h2> <br> </center>'
    }
        
        return localForms[settings.lang] + (!!settings.form.showSelect ? '<style>@import url("' + featuresFilesSrc.formStyles + '");\n.country_select {display: block!important} \n  </style>' : '<style>@import url("' + featuresFilesSrc.formStyles + '");\n </style>') + ((!!settings.wheel && settings.wheel.isNeeded) ? '<style>.order_block {display: none;}</style>' : '') + (settings.form.untilExpire == 0 ? '<style>.order_block h3 {display: none;}</style>' : '') + (settings.form.priceBrFix == 1 ? '<style>.priceс br{display: none;}</style>' : '')
        
        }
    
    //Функция- генератор городов
    function genLocalCity() {
        var localCities = {
                'si': ["Ljubljana", "Maribor", "Celje", "Ptuj", "Koper", "Portorož", "Nova Gorica", "Kranjska Gora", "Murska Sobota", "Novo mesto", "Izola", "Kranj", "Škofja loka", "Zreče", "Postojna", "Trbovlje", "Litija", "Šentjernej", "Kočevje", "Ilirska Bistrica"],
                'mk': ["Скопје", "Битола", "Прилеп", "Велес", "Охрид", "Струга", "Дебар", "Гостивар", "Тетово", "Кичево", "Ресен", "Куманово", "Крива Паланка", "Кочани", "Делчево", "Штип", "Струмица", "Кавадарци", "Неготино", "Гевгелија"],
             'pt': ["Lisboa", "Porto", "Aveiro", "Cascais", "Coimbra", "Albufeira", "Alfena", "Braga", "Chaves", "Beja", "Castelo Branco", "Elvas", "Funchal", "Figueiras", "Guarda", "Ovar", "Pinhel", "Lagoa", "Fátima", "Espinho"],
                'vn': ["Hà Nội", "Tp. Hồ Chí Minh", "Hải Phòng", "Nha Trang", "Vũng Tàu", "Thanh Hóa", "Huế", "Đà Nẵng", "Đà Lạt", "Cần Thơ", "Biên Hòa", "Buôn Ma Thuột", "Vinh", "Quy Nhơn", "Long Xuyên", "Thái Nguyên", "Nam Định", "Rạch Giá", "Thủ Dầu Một", "Hạ Long", "Phan Thiết", "Thanh Hóa"],
                'ro': ["Bucureşti", "Iași", "Cluj-Napoca", "Timișoara", "Constanța", "Craiova", "Galați", "Brașov"],
                'it' :  ["Roma", "Napoli", "Palermo", "Pisa", "Firenze", "Siena", "Milano", "Torino", "Verona", "Venezia", "Catania", "Perugia", "Genova", "Bologna", "Bergamo"],
                'es' : ["Madrid", "Vitoria-Gasteiz", "Segovia", "Salamanca", "Badajoz", "Santander", "A Coruña", "València", "Murcia", "Granada", "Barcelona", "Sevilla", "Toledo", "Cáceres", "Ávila"],
            'co' : ["Madrid", "Vitoria-Gasteiz", "Segovia", "Salamanca", "Badajoz", "Santander", "A Coruña", "València", "Murcia", "Granada", "Barcelona", "Sevilla", "Toledo", "Cáceres", "Ávila"],
                'id' : ["Banda Aceh", "Langsa", "Meulaboh", "Sabang", "Denpasar", "Cilegon", "Tangerang", "Medan", "Yogyakarta", "Palembang", "Surabaya", "Jambi", "Gorontalo", "Bandung", "Bogor", "Bekasi", "Depok", "Cirebon", "Purwokerto", "Semarang", "Surakarta", "Malang", "Pontianak", "Tarakan", 'Palu', 'Makassar', 'Pekanbaru', 'Bukittinggi', 'Sibolga', 'Bima', 'Samarinda', 'Bau-Bau', 'Kotamobagu', 'Pagaralam', 'Tanjungbalai'],
                'de' :  ["Leipzig", "München", "Düsseldorf", "Hamburg", "Berlin", "Köln", "Frankfurt", "Nürnberg", "Stuttgart", "Dortmund", "Lübeck", "Dresden", "Hannover", "Bremen", "Heidelberg"],
                'th' : ['กรุงเทพฯ', 'เชียงใหม่', 'น่าน', 'พังงา', 'กระบี่', 'จันทบุรี', 'ปทุมธานี', 'ราชบุรี', 'ลำปาง', 'ชลบุรี', 'ร้อยเอ็ด', 'ภูเก็ต', 'กำแพงเพชร', 'นนทบุรี', 'พะเยา', 'ตราด', 'ขอนแก่น', 'อำนาจเจริญ', 'เชียงราย', 'สุรินทร์', 'ชุมพร', 'นครราชสีมา', 'แม่ฮ่องสอน', 'แพร่', 'ลพบุรี', 'นครพนม', 'สระแก้ว', 'หนองคาย', 'มุกดาหาร', 'อ่างทอง', 'สุโขทัย', 'ระยอง', 'ตรัง', 'สุพรรณบุรี', 'พิจิตร' ],
                'gr' : ["Αθήνα", "Καλλιθέα", "Τρίπολη", "Αγρίνιο", "Ιωάννινα", "Θεσσαλονίκη", "Αλεξανδρούπολη", "Καβάλα", "Άρτα", "Πάτρα", "Καλαμάτα", "Σπάρτη", "Ηράκλειο", "Χανιά", "Λαγανάς"],
                'bg' : ["София", "Варна", "Бургас", "Пловдив", "Плевен", "Благоевград", "Сливен", "Велико Търново", "Габрово", "Враца", "Стара Загора", "Русе", "Хасково", "Добрич", "Шумен", "Монтана", "Кърджали", "Перник", "Ямбол", "Пазарджик"],
                'ph' : ["Manila", "General Santos City", "Zamboanga", "Cebu City", "Cagayan de Oro", "Davao City", "Bacolod", "Dasmariñas", "Muntinlupa", "Las Pinas", "Parañaque", "Taguig", "Baguio", "Vigan City"],
                'ru': ["Москва", "Санкт-Петербург", "Коломна", "Волгоград", "Челябинск", "Ярославль", "Тула", "Магнитогорск", "Тамбов", "Саратов", "Астрахань", "Витебск", "Можайск", "Дубна", "Нижний Новгород", "Ростов на Дону", "Воронеж", "Симферополь", "Ижевск", "Нижний Тагил"],
                'lt': ["Akmenė", "Alytus", "Anykščiai", "Baltoji Vokė", "Biržai", "Vabalninkas", "Varėna", "Vievis", "Viekšniai", "Vilkija", "Virbalis", "Gargždai", "Garliava", "Gelgaudiškis", "Daugai", "Dūkštas", "Dusetos", "Jieznas", "Joniškis", "Kalvarija"],
                'pl': ["Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań	", "Gdańsk", "Szczecin	", "Bydgoszcz", "Lublin	", "Katowice", "Gdynia	", "Radom", "Toruń	", "Gliwice	", "Rzeszów", "Olsztyn", "Ruda Śląska", "Rybnik", "Tychy", "Płock"],
                'hu': ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", "Kecskemét", "Szolnok", "Kaposvár", "Sopron", "Veszprém", "Békéscsaba", "Eger", "Nagykanizsa", "Dunaújváros"],
                'lv': ["Aizkraukle", "Aizpute", "Ainaži", "Aknīste", "Aloja", "Alūksne", "Ape", "Auce", "Balvi", "Baldone", "Baloži", "Bauska", "Brocēni", "Valdemārpils", "Valka", "Valmiera", "Viļaka", "Viļāni", "Grobiņa", "Dagda", "Daugavpils", "Dobele"],
                'sk': ["Bánovce nad Bebravou", "Banská Bystrica", "Banská Štiavnica", "Bardejov", "Bytča", "Bojnice", "Bratislava", "Brezno", "Brezová pod Bradlom", "Veľké Kapušany", "Veľký Krtíš", "Veľký Šariš", "Vráble", "Vrbové", "Vrútky"],
                'fr': ["Paris", "Marseille", "Bordeaux", "Montpellier", "Lille", "Nice", "Strasbourg", "Nantes", "Lyon", "Toulouse", "Avignon", "Orléans", "Cannes", "Rouen", "Le Havre", "Tours"],
                'en': ["London", "Manchester", "Liverpool", "Oxford", "Cambridge", "York", "Birmingham", "Nottingham", "Sheffield", "Salisbury", "Plymouth", "Brighton", "Chester", "Leicester", "Canterbury"],
            'en_sg': ["Bedok", "Jurong West", "Tampines", "Woodlands", "Hougang", "Sengkang", "Yishun", "Ang Mo Kio", "Choa Chu Kang", "Bukit Merah", "Pasir Ris", "Bukit Batok", "Bukit Panjang", "Toa Payoh", "Serangoon"],
                'al': ["Tiranë", "Durrës", "Shkodër", "Berat", "Gjirokastër", "Sarandë", "Vlorë", "Korçë", "Elbasan", "Pogradec", "Krujë", "Butrint", "Fier", "Tepelenë", "Përmet"],
                'hr': ["Zagreb", "Dubrovnik", "Split", "Pula", "Zadar", "Rijeka", "Trogir", "Makarska", "Poreč", "Šibenik", "Opatija", "Varaždin", "Osijek", "Omiš", "Umag", "Karlovac"],
                'cz': ["Praha", "Brno", "Karlovy Vary", "Plzeň", "Český Krumlov", "Kutná Hora", "Olomouc", "České Budějovice", "Ostrava", "Mariánské Lázně", "Liberec", "Telč", "Pardubice"],
                'sg': ["丹帕沙", "马尼拉", "台北", "北京", "新加坡", "泉州", "台南", "马拉西亚", "深圳", "台中", "高雄", "行呗", "三重", "新竹", " 上海", "屏东", "宜兰", "东京", "花莲", "云林"],
        }
        var b = localCities[settings.lang][Math.floor(Math.random() * (localCities[settings.lang].length))];
        return b;
    }
    
    //Функция- генератор имен
    function genLocalName() {
        var localNames = {
            'mk' : ["Атанас", "Димитар", "Дејан", "Александар", "Иван", "Никола", "Васил", "Јован", "Владимир", "Павле", "Петре", "Андреј", "Бобан", "Виктор", "Ѓорѓи", "Стојан", "Илија", "Тодор", "Љупчо", "Филип", 'Зорица', 'Валентина', 'Јасминка', 'Ана', 'Тања', 'Елизабета', 'Аница', 'Василка', 'Кристина', 'Елена', 'Катерина', 'Наташа', 'Виолета', 'Силвана', 'Светлана', 'Владанка', 'Гордана', 'Иванка', 'Сузана', 'Благојка'],
            
            'pt' : ["Mário", "Antônio", "Alex", "Alexandre", "Andre", "Antenor", "", "Maurício", "Valdir", "Paulo", "Pedro", "Miguel", "Michel", "Sandro", "Jorge", "Vitor", "Victor", "Sérgio", "Saulo", "Fernando", 'Alícia', 'Valentina', 'Julia', 'Ana', 'Leona', 'Tatianaя', 'Anita', 'Tati', 'Alessandra', 'Olívia', 'Flávia', 'Natália', 'Nathy', 'Priscila', 'Carolina', 'Helena', 'Maria', 'Catarina', 'Cristina', 'Emília'],
            
            
            'si' : ["Aleš", "Miran", "Tine", "Tone", "Jure", "Marko", "Milan", "Iztok", "Janez", "Pavle", "Lojze", "Anže", "Luka", "Miha", "Tilen", "Igor", "Ciril", "Damjan", "Boštjan", "Borut", 'Ana', 'Mojca', 'Julija', 'Manca', 'Tjaša', 'Nada', 'Anja', 'Sanja', 'Jelena', 'Sandra', 'Barbara', 'Marija', 'Mateja', 'Mina', 'Lana', 'Katarina', 'Milena', 'Lina', 'Katra', 'Petra'],
            
            'vn': ["Hoàng", "Đức", "Minh", "Mạnh", "Bách", "Quý", "Phú", "Hải", "Quân", "Trường", "Sơn", "Đăng", "Lâm", "Đông", "Nam", "Bắc", "Vinh", "Huy", "Thiện", "Duy", "Việt", "Tuấn", "Duy Anh", "Việt Anh", "Đức Anh", "Thuận", "Hưng", 'Linh', 'Mai', 'Huyền', 'Thúy', 'Tâm', 'Ngọc', 'Quỳnh', 'Nhi', 'Thảo', 'Vân', 'Tiên', 'Ánh', 'My', 'Thu', 'Thư', 'Thủy', 'Oanh', 'Tú', 'Hương', 'Xuân', 'Vân Anh', 'Ngọc Anh', 'Quỳnh Anh', 'Lan Anh', 'Khanh', 'Hiền', 'Kim Anh'],
            
            'ro': ["Dorel", "Nicu", "Ştefan", "Ionuţ", "Anton", "Matei", "Ion", "Georghe", "Florentin", "Emanoil", "Costel", "Vitalie", "Daniel", "Nichita", "Marius", "Andrei", "Alex", "Vasile", "Constantin", "Dumitru", 'Nicoleta', 'Carmen', 'Vasilica', 'Roxana', 'Mariana', 'Daniela', 'Olga', 'Simona', 'Delia', 'Marieta', 'Anamaria', 'Ileana', 'Mihaela', 'Sara', 'Emilia', 'Adelina', 'Ilinca', 'Amalia', 'Stela', 'Florina'  ],
            
            
            'es' : ["Cristián", "Gonzalo", "Gustavo", "César", "José", "Felipe", "Carlos", "Eduardo", "Adrián", "Cristóbal", "Miguel", "Juan Carlos", "Roberto", "Alberto", "Ricardo", "Santiago", "Juan Daniel", "Gabriel", "Diego", 'Inés', 'Felisa', 'Rocío', 'Marta', 'Josefa', 'Beatriz', 'Manuela', 'Margarita', 'Esperanza', 'Carla', 'Francisca', 'Elvira', 'Irene', 'Lorena', 'Monica', 'Julia', 'Carmen', 'Verónica', 'Laura', 'Teresa'],
            
            'co' : ["Cristián", "Gonzalo", "Gustavo", "César", "José", "Felipe", "Carlos", "Eduardo", "Adrián", "Cristóbal", "Miguel", "Juan Carlos", "Roberto", "Alberto", "Ricardo", "Santiago", "Juan Daniel", "Gabriel", "Diego", 'Inés', 'Felisa', 'Rocío', 'Marta', 'Josefa', 'Beatriz', 'Manuela', 'Margarita', 'Esperanza', 'Carla', 'Francisca', 'Elvira', 'Irene', 'Lorena', 'Monica', 'Julia', 'Carmen', 'Verónica', 'Laura', 'Teresa'],
            
            'id' : ["Said", "Andin", "Rizki", "Mahmud", "Muhammad", "Rahim", "Joko", "Agus", "Wahyu", "Ahmad", "Kurniawan", "Budi", "Arief", "Yusuf", "Fajar", "Indra", "Abdul", "Nugroho", "Hidayat", "Brian", "Taufik", "Aki", "Rudi", "Hanif", "Rian", "Puji", "Subhar", 'Nur', 'Dwi', 'Putri', 'Siti', 'Ainun', 'Aurelia', 'Maria', 'Lidya', 'Ratna', 'Fitri', 'Pratiwi', 'Lestari', 'Rahma', 'Anita', 'Kurnia', 'Yunita', 'Widya', 'Agustina', 'Intan', 'Rini', 'Maya', 'Devi', 'Utami', 'Mimin', 'Cantika', 'Yuni', 'Diana'],
            
            'de' :  ["Georg", "Manfred", "Hans", "Otto", "Alfred", "Stefan", "Tomas", "Rudolph", "Til", "Sebastian", "Karl", "Kristian", "Günther", "Hermann", "Calvin", "Frank", "Tim", "Jürgen", "Julian", "Moritz", 'Theresa', 'Johanna', 'Nina', 'Simone', 'Rebecca', 'Franka', 'Sofie', 'Karoline', 'Frida', 'Maria', 'Anke', 'Elisabeth', 'Elsa', 'Louisa', 'Miriam', 'Herta', 'Helene', 'Edwina', 'Ingrid', 'Andrea'],
            
            'th' : ['ต้น', 'ภาษณ์', 'กันต์', 'คิง',  'พิชญ์', 'มิกกี้', 'บีม', 'ซันนี่', 'วิน', 'เบส', 'เรน', 'นาวิน', 'ออกัส', 'อะตอม', 'แมน', 'โดม,', 'อาร์ต', 'โอม',  'ภีม', 'เพชร', 'พัช', 'แอน', 'น้ำทิพย์', 'ทราย', 'นุดา', 'ฝน', 'จ๋า', 'ผึ้ง','แต้ว', 'ต้นตาล', 'น้ำอุ่น', 'ต้นข้าว', 'เก๋', 'พิมพ์', 'ไอด้า', 'ดาว', 'แจน', 'จอมใจ', 'แพท', 'พลอยใส'],
            
            'gr' : ["Γεώργιος", "Δημήτριος", "Κωνσταντίνος", "Ιωάννης", "Νικόλαος", "Χρήστος", "Παναγιώτης", "Βασίλειος", "Αθανάσιος", "Ευάγγελος", "Ραφαήλ", "Σεβαστιανός", "Στέφανος", "Φάνης", "Διονύσιος", "Καλλίστρατος", 'Μαρία', 'Ελένη', 'Αικατερίνη', 'Βασιλική', 'Γεωργία', 'Σοφία', 'Αναστασία', 'Ευαγγελία', 'Ιωάννα', 'Δήμητρα', 'Δωροθέα', 'Κίρα', 'Ηλιάνα', 'Ιρίδα', 'Γιωργία', 'Αγάπη'],
            
            'bg' : ["Стоян", "Станимир", "Симеон", "Николай", "Никола", "Пламен", "Ангел", "Георги", "Димитър", "Иван", "Добрин", "Ивайло", "Васил", "Антон", "Марин", "Стефан", "Мирослав", "Венцислав", "Любомир", "Илиян", "Александър", "Росен", "Радослав", "Цветан", "Цветомир", "Йордан", "Атанас", 'Мария', 'Марияна', 'Весислава', 'Боряна',  'Стефка', 'Силвия', 'Павлина', 'Елена', 'Милена', 'Моника', 'Даниела', 'Ралица', 'Радостина', 'Зорница', 'Галя', 'Вера', 'Юлияна', 'Богдана', 'Теодора', 'Маргарита', 'Сийка', 'Людмила', 'Радка', 'Екатерина', 'Калина', 'Адриана', 'Стоянка', 'Тонка' ],
            
            'ph' : ["Ramon", "Jeff", "Shane", "Darius", "Ed", "Diego", "Bryan", "Jhonell", "Ciro", "Giacomo", "Georgio", "Aaron", "David", "Vince", "Allan", "Derik", 'Jean', 'Mira', 'Janine', 'Rhizza', 'Millie', 'Rosemarie', 'Grace', 'Gina', 'Lorena', 'Elena', 'Kyth', 'Amabella', 'Janivie', 'Amaya', 'Rosita', 'Jane'],
            
            'ru' : ["Ашот", "Денис", "Саша", "Александр", "Антон", "Дима", "Дмитрий", "Алексей", "Владимир", "Паша", "Павел", "Андрей", "Слава", "Вячеслав", "Георгий", "Витя", "Виктор", "Стас", "Станислав", "Федор", 'Зульнара', 'Валентина', 'Юля', 'Аня', 'Татьяна', 'Таня', 'Анна', 'Даша', 'Дарья', 'Саша', 'Александра', 'Наташа', 'Наталья', 'Света', 'Светлана', 'Лена', 'Елена', 'Катя', 'Екатерина', 'Кристина'],
            
            'lt' : ["Augustas", "Danielius", "Dominykas", "Dovydas", "Emilis", "Gustas", "Ignas", "Kajus", "Lukas", "Mantas", "Matas", "Nojus", "Jokubas", "Jonas", "Rokas", "Austeja", "Emilija", "Gabija", "Gabriele", "Goda", 'Kamile', 'Ieva', 'Migle', 'Ugne', 'Urte'],
            
            'pl' : ["Piotr", "Krzysztof", "Andrzej", "Jan", "Stanisław", "Tomasz", "Paweł", "Marcin", "Michał", "Marek", "Grzegorz", "Łukasz", "Adam", "Józef", "Zbigniew", "Jerzy", "Mateusz", "Tadeusz", "Dariusz", "Mariusz", 'Anna', 'Maria', 'Katarzyna', 'Małgorzata', 'Agnieszka', 'Barbara', 'Krystyna', 'Ewa', 'Elżbieta', 'Zofia', 'Teresa', 'Magdalena', 'Monika', 'Janina', 'Danuta', 'Aleksandra', 'Jadwiga', 'Halina', 'Irena'],
            
            'hu' : ["Ágoston", "Ákos", "Alajos", "Andor", "András", "Antal", "Béla", "Benedek", "Bálint", "Barnabás", "Balázs", "Valér", "Vazul", "Gábor", "Géza", "Dávid", "Dezső", "Dömötör", "Dénes", "Zsolt", 'Kázmér', 'Kálmán', 'Márton', 'Marcel', 'Anikó', 'Borbála', 'Erzsébet', 'Éva', 'Gyöngyi', 'Hajnalka', 'Ildikó', 'Jolán', 'Katalin', 'Magdolna', 'Margit', 'Marietta', 'Orsolya', 'Piroska', 'Rózsa', 'Szilvia'],
            
            'lv' : ["Agate", "Agita", "Agnese", "Aija", "Airita", "Gaida", "Gaļina", "Gita", "Gunita", "Helēna", "Katarīna", "Keita", "Laima", "Laimdota", "Lāsma", "Lija", "Līna", "Lūcija", "Luīze", "Mārīte", 'Modra', 'Natalija', 'Natālija', 'Janis', 'Peteris', 'Paulus', 'Andris', 'Edgars', 'Aivars', 'Peteris', 'Kaspars', 'Valdis', 'Roberts', 'Markuss', 'Artjoms', 'Daniels', 'Gustavs', 'Arturs'],
            
             'sk' : ["Alanna", "Alena", "Alina", "Andrej", "Andrik", "Ani", "Ania", "Arron", "Bela", "Beyla", "Bohdan", "Boris", "Borka", "Bozica", "Brencis"],
            
            'fr' : ["Jean", "Hugo", "Théo", "Mathis", "Jules", "Louis", "Nicolas", "Christophe", "Léo", "Renaud", "Bernard", "Alexandre", "Emmanuel", "Romain", "Francis", "Joseph", "Michel", "Xavier", "Rémi", "Sébastien", 'Sarah', 'Camille', 'Christine', 'Léa', 'Chloé', 'Nathalie', 'Isabelle', 'Valérie', 'Monique', 'Ségolène', 'Delphine', 'Florine', 'Ève', 'Mireille', 'Agnès', 'Laure', 'Cécile', 'Angèline', 'Laurence', 'Diane'],
            
            'hr' : ["Mario", "Damir", "Duje", "Stipe", "Vice", "Petar", "Nikola", "Ante", "Mate", "Tomislav", "Vlatko", "Lovre", "Luka", "Ivan", "Marin", "Slaven", "Zvonimir", "Hrvoje", 'Josipa', 'Marjana', 'Marta', 'Marina', 'Dragica', 'Sara', 'Matea', 'Nina', 'Petra', 'Dajana', 'Ana', 'Mila', 'Anabela', 'Tatjana', 'Ivona', 'Mima', 'Mia', 'Viktorija'],
            
            'it' : ["Leonardo", "Marco", "Federico", "Marcello", "Giulio", "Mimmo", "Valerio", "Gennaro", "Mirko", "Camillo", "Arturo", "Sergio", "Jacopo", "Amedeo", "Paolo", "Michele", "Valentino", "Pietro", "Pasquale", "Vincenzo", 'Larissa', 'Giovanna', 'Giorgia', 'Valeria', 'Valentina', 'Giovanna', 'Sara', 'Chiara', 'Erica', 'Antonella', 'Assunta', 'Roberta', 'Emma', 'Michela', 'Giorgina', 'Emilia', 'Marisa', 'Diana', 'Brigida', 'Alessia'],
            
            'en' : ["Nick", "Andrew", "Randy", "Tom", "Harry", "Jack", "Steven", "Justin", "Bob", "Sam", "Peter", "Stan", "John", "Chris", "Zak", "Tim", "Brian", "Mark", "Derel", "Michael", 'Lily', 'Annabel', 'Mary', 'Ashlie', 'Ann', 'Sheila', 'Liza', 'Kourtney', 'Ella', 'Hellen', 'Michelle', 'Eva', 'Jane', 'Margaret', 'Ashlyn', 'Amie', 'Jennifer', 'Molly', 'Lucy', 'Caroline'],
            
            'en_sg' : ["Nick", "Andrew", "Randy", "Tom", "Harry", "Jack", "Steven", "Justin", "Bob", "Sam", "Peter", "Stan", "John", "Chris", "Zak", "Tim", "Brian", "Mark", "Derel", "Michael", 'Lily', 'Annabel', 'Mary', 'Ashlie', 'Ann', 'Sheila', 'Liza', 'Kourtney', 'Ella', 'Hellen', 'Michelle', 'Eva', 'Jane', 'Margaret', 'Ashlyn', 'Amie', 'Jennifer', 'Molly', 'Lucy', 'Caroline'],
            
            'cz' : ["Ladislav", "Vítězslav", "Zdeněk", "Miroslav", "Viktor", "Arnošt", "Marek", "Lukáš", "Alois", "Ján", "Jiří", "Antonín", "Kryštof", "Luděk", "Aleš", "Jaroslav", "Tomáš", "Bohumil", "Jozef", "Ondřej", 'Jaroslava', 'Petra', 'Drahomíra', 'Vendula', 'Ladislava', 'Věra', 'Natálie', 'Božena', 'Milena', 'Silvie', 'Sára', 'Emilie', 'Zdeňka', 'Hana', 'Ivana', 'Libuše', 'Zuzana', 'Markéta', 'Jitka', 'Kamila'],
            
            'al' : ["Alban", "Genci", "Klajdi", "Vasjan", "Dorjan", "Edison", "Edjon", "Tedi", "Julian", "Redion", "Arbër", "Gentjan", "Erton", "Ledjo", "Gëzim", "Liridon", "Renis", "Arben", 'Fjoralba', 'Jonida', 'Sonila', 'Dorina', 'Daniela', 'Paola', 'Denisa', 'Ejona', 'Amela', 'Ina', 'Suada', 'Besjana', 'Mirela', 'Yllka', 'Klodiana', 'Jetmira', 'Alketa', 'Blerina'],
            
            'sg' : ["月柱", "屈原", " 孔融", "白居易", "宝贝", "司马光", "司马", "江龙", "海龙", "卡琳娜", "魄乐", "平林哎", "龙海", "洋洋", "赵洋", "塔尼亚", "卫国疆", "东德", "王平", "林醉美", '，奥东兴', '铝平王', '梁思', '安娜', '林徽因', '梁思成', '王力闰', '张嘉敏', '尾鍀汉', '安东', '高朱', 'Н伯呼', '李萧', '高', '金子', '莲娜', '莫言', '琳娜', '吕颗', '玛斯'],
        }
        
        
        if (settings.genderTargetting == 'all') {
            var asx = Math.floor(Math.random() * (localNames[settings.lang].length));
            if (asx > localNames[settings.lang].length / 2) {
                
                localStorage.setItem('sex', '0')
            } else {
                
                localStorage.setItem('sex', '1')
            }
            var d = localNames[settings.lang][asx];
            
        } else if (settings.genderTargetting == 'male') {
            
            localStorage.setItem('sex', '1');
            var d = localNames[settings.lang][Math.floor(Math.random() * (localNames[settings.lang].length / 2))];
            
        } else if (settings.genderTargetting == 'female') {
            
            localStorage.setItem('sex', '0');
            var d = localNames[settings.lang][Math.floor((Math.random() * (localNames[settings.lang].length) + localNames[settings.lang].length) / 2)];
            
        } else {
            alert('vvedi pol v nastroykah');
        }
        
       
        return d;
    }
    
    //Функция выодит привальное слово в зависимости от пола сгенерированного имени - сказал\сказала, ебал\ебала 
    function genGenderWords (whichWord) {
        if (localStorage['sex'] == 1) {
            
            var genderWord = {             
                'ru': ['Сделал', 'Успел', 'получил', 'заказывал', 'Заказал', 'Успел', 'успел', 'знал', 'Почитал', ' заказал'],
                'lt': ['Padaryti', 'Tvarko', 'jį gavo', 'užsakyta', 'Užsakyta', 'Tvarko', 'turėjo laiko', 'žinojo', 'Aš perskaičiau', ' užsakyta'],
                'pl': ['Zrobiłem', 'Miałem czas', 'rozumiem', 'zamówione', 'Zamówione', 'Zarządzane', 'miał czas!', 'wiedziałem', 'Czytam', ' zamówione'],
                'hu': ['Kész', 'Sikerült', 'megvan', 'rendelhető', 'Rendelhető', 'Sikerült', 'volt ideje', 'Tudtam', 'Olvastam', ' rendelhető'],
                'lv': ['Vai', 'Bija laiks', 'ieguva', 'pasūtīts', 'Pasūtīts', 'Bija laiks', 'bija laiks', 'zināja', 'Es izlasīju', ' pasūtīts'],
                'sk': ['Vyrobené', 'Riadené', 'prijaté', 'objednané', 'objednané', 'riadené', 'riadené', ' vedeli'],
                'hr': ['Napravio', 'Uspio', 'primio', 'naredio', 'Naručio', 'Uspio', 'uspio', 'znao', 'Čitao', ' naručio'],
                'cz': ['Objednal', 'Stihl', 'dostal', 'objednával', 'Objednal', 'Stihl', 'stihl', 'nevědel', 'Přečetl', ' objednal'],
                'fr': ['', '', '', '', '', '', '', '', '', ''],
                'it': ['', '', '', '', '', '', '', '', '', ''],
                'vn': ['', '', '', '', '', '', '', '', '', ''],
                'en': ['', '', '', '', '', '', '', '', '', ''],
                'en_sg': ['', '', '', '', '', '', '', '', '', ''],
                'de': ['', '', '', '', '', '', '', '', '', ''],
                'bg': ['', '', '', 'поръчвал', '', '', '', '', '', ''],
                'al': ['', '', '', '', '', '', '', '', '', ''],
                'ph': ['', '', '', '', '', '', '', '', '', ''],
                'th': ['', '', '', '', '', '', '', '', '', ''],
                'ro': ['', '', '', '', '', '', '', '', '', ''],
                'gr': ['', '', '', '', '', '', '', '', '', ''],
                'es': ['', '', '', '', '', '', '', '', '', ''],
                'co': ['', '', '', '', '', '', '', '', '', ''],
                'id': ['', '', '', '', '', '', '', '', '', ''],
                'sg': ['', '', '', '', '', '', '', '', '', ''],
                'pt': ['', '', '', '', '', '', '', '', '', ''],
                'mk': ['', '', '', '', '', '', '', '', '', ''],
                'pt': ['', '', '', '', '', '', '', '', '', ''],
                'si': ['Naročil', 'Utegnil', 'dobil', 'naročal', 'poskusil. Naročil', 'Utegnil', 'utegnil', 'slišal', 'Prebral', 'je naročil', ' uporabljal'],
            }
        } else {
            
            var genderWord = {
                'ru': ['Сделала', 'Успела', 'получила', 'заказывала', 'Заказала', 'Успела', 'успела', 'знала', 'Почитала', ' заказала'],
                'lt': ['Atliko', 'Buvo laikas', 'gavo', 'užsakyta', 'Užsakyta', 'Buvo laikas', 'turėjo laiko', 'žinojo', 'Aš perskaičiau', ' užsakyta'],
                'pl': ['Dokonał', 'Miałem czas', 'otrzymane', 'zamówione', 'Zamówione', 'Miałem czas', 'miał czas', 'wiedziałem', 'Czytam', ' zamówione'],
                'hu': ['Kész', 'Volt idő', 'nyert', 'rendelhető', 'Rendelje meg most', 'Volt idő', 'volt ideje', 'Tudtam', 'Olvastam', ' Rendelje meg most'],
                'lv': ['Ir veikts', 'Bija laiks', 'saņemts', 'pasūtīts', 'Pasūtīts', 'Bija laiks',  'zināja', 'Es izlasīju', ' pasūtīts'],
                'sk': ['Vyrobil', 'urobil', 'prijal', 'objednal', 'objednal', 'urobil', 'mal ', 'poznal', 'ctí', ' objednal'],
                'hr': ['Napravila', 'Uspila', 'primila', 'naredila', 'Naručila', 'Uspila', 'uspila', 'znala', 'Čitala', ' naručila'],
                'cz': ['Objednala', 'Stihla', 'dostala', 'objednávala', 'Objednala', 'Stihla', 'stihla', 'nevědela', 'Přečetla', ' objednala'],
                'fr': ['', '', '', '', '', '', '', '', '', ''],
                'it': ['', '', '', '', '', '', '', '', '', ''],
                'vn': ['', '', '', '', '', '', '', '', '', ''],
                'en': ['', '', '', '', '', '', '', '', '', ''],
                'en_sg': ['', '', '', '', '', '', '', '', '', ''],
                'de': ['', '', '', '', '', '', '', '', '', ''],
                'bg': ['', '', '', 'поръчвала', '', '', '', '', '', ''],
                'al': ['', '', '', '', '', '', '', '', '', ''],
                'ph': ['', '', '', '', '', '', '', '', '', ''],
                'th': ['', '', '', '', '', '', '', '', '', ''],
                'ro': ['', '', '', '', '', '', '', '', '', ''],
                'gr': ['', '', '', '', '', '', '', '', '', ''],
                'es': ['', '', '', '', '', '', '', '', '', ''],
                'co': ['', '', '', '', '', '', '', '', '', ''],
                'id': ['', '', '', '', '', '', '', '', '', ''],
                'sg': ['', '', '', '', '', '', '', '', '', ''],
                'pt': ['', '', '', '', '', '', '', '', '', ''],
                'mk': ['', '', '', '', '', '', '', '', '', ''],
                'si': ['Naročila', 'Utegnila', 'dobila', 'naročala', 'poskusila. Naročila', 'Utegnila', 'utegnila', 'slišala', 'Prebrala', 'je naročila', ' uporabljala'],
            }
        }
        
        return genderWord[settings.lang][whichWord]
    }
  
    //Функция выводит строку в формате - ИМЯ из г. ГОРОД
    function orderName() {

        var localFromWord = {
            'vn' : ' từ ',
            'ro' : ' din ',
            'it' : ' da ',
            'es' : ' de la ciudad ',
            'co' : ' de la ciudad ',
            'id' : ' dari kota ',
            'de' : ' aus ',
            'th' : 'จาก',
            'gr' : ' από την πόλη ',
            'bg' : ' от гр. ',
            'ph' : ' mula sa lungsod ng ',
            'ru' : ' из г. ',
            'lt' : ' iš miesto ',
            'pl' : ' z miasta ',
            'hu' : ' a városból ',
            'lv' : ' no pilsētas ',
            'sk' : ' z mesta ',
            'al' : ' nga qyteti i ',
            'cz' : ' z města ',
            'en' : ' from ',
            'en_sg' : ' from ',
            'hr' : ' iz grada ',
            'fr' : ' de ',
            'sg' : ' 自',
            'mk' : ' од ',
            'si' : ' iz m. ',
            'pt' : ' de cidade '
        }

        return genLocalName() + localFromWord[settings.lang] + genLocalCity() + genGenderWords(9) ;
    }
    
    
    
    
    //Блок автокомментов
    if (!!settings.autoComments && settings.autoComments.isNeeded) {   
    
    var commActions = {
        'ru' : {
            likeWord: 'Мне нравится',
            replyWord: 'Ответить',
            justNowWord: 'Только что'
        },
        'lt' : {
            likeWord: 'Man patinka',
            replyWord: 'Atsakyti',
            justNowWord: 'Tiesiog dabar'
        },
        'pl' : {
            likeWord: 'Podoba mi się',
            replyWord: 'Odpowiedz',
            justNowWord: 'Właśnie teraz'
        },
        'hu' : {
            likeWord: 'Szeretem',
            replyWord: 'Válasz',
            justNowWord: 'Csak most'
        },
        'lv' : {
            likeWord: 'Man patīk',
            replyWord: 'Atbildēt',
            justNowWord: 'Tikai tagad'
        },
        'sk' : {
            likeWord: 'Mám rád',
            replyWord: 'odpoveď',
            justNowWord: 'Práve teraz'
        },
        'si' : {
            likeWord: 'Všeč mi je',
            replyWord: 'Odgovori',
            justNowWord: 'Pravkar'
        },
        'gr' : {
            likeWord: 'Μου αρέσει',
            replyWord: 'Απαντήστε',
            justNowWord: 'Μόλις τώρα'
        },
        'bg' : {
            likeWord: 'Харесва ми',
            replyWord: 'Отговор',
            justNowWord: 'Току що'
        },
        'vn' : {
            likeWord: 'Thích',
            replyWord: 'Trả lời',
            justNowWord: 'Vừa xong'
        },
        'fr' : {
            likeWord: 'J’aime',
            replyWord: 'Répondre',
            justNowWord: 'Tout de suite'
        },
        'hr' : {
            likeWord: 'Sviđa mi se',
            replyWord: 'Odgovoriti',
            justNowWord: 'Upravo sada'
        },
        'it' : {
            likeWord: 'Mi piace',
            replyWord: 'Rispondere',
            justNowWord: 'Ora'
        },
        'en' : {
            likeWord: 'Like',
            replyWord: 'Reply',
            justNowWord: 'Just now'
        },
        'en_sg' : {
            likeWord: 'Like',
            replyWord: 'Reply',
            justNowWord: 'Just now'
        },
        'de' : {
            likeWord: 'Gefällt mir',
            replyWord: 'Antworten',
            justNowWord: 'Jetzt'
        },
        'es' : {
            likeWord: 'Me Gusta',
            replyWord: 'Responder',
            justNowWord: 'Hace un momento'
        },
         'co' : {
            likeWord: 'Me Gusta',
            replyWord: 'Responder',
            justNowWord: 'Hace un momento'
        },
        'ph' : {
            likeWord: 'Gusto',
            replyWord: 'Kumento',
            justNowWord: 'Kalilipas lang'
        },
        'cz' : {
            likeWord: 'Líbí se mi',
            replyWord: 'Odpovědět',
            justNowWord: 'Teď'
        },
        'id' : {
            likeWord: 'Saya suka',
            replyWord: 'Jawab',
            justNowWord: 'Baru saja'
        },
        'th' : {
            likeWord: 'ฉันชอบ',
            replyWord: 'ตอบคำถาม',
            justNowWord: 'ตอนนี้เท่านั้น'
        },
        'al' : {
            likeWord: 'Më pëlqen',
            replyWord: 'Përgjigju',
            justNowWord: 'Sapo'
        },
        'ro' : {
            likeWord: 'Îmi place',
            replyWord: 'Răspunde',
            justNowWord: 'Chiar acum'
        },
        'sg' : {
            likeWord: '我喜歡',
            replyWord: '回复',
            justNowWord: '剛才'
        },
        'mk' : {
            likeWord: 'Ми се допаѓа',
            replyWord: 'Одговори',
            justNowWord: 'Токму сега'

        },
          'pt' : {
            likeWord: 'Curtir',
            replyWord: 'Responder',
            justNowWord: 'Agora'
        },

    }
    
   
    
    var commBlocks = {
        'mk': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Последен коментар</p><div class="comments-refreshing"><i>Коментарите се обновуваат</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Нарачав. Со попуст! Се надевам дека сè ќе биде во ред</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Не бери гајле! Не ми е прв пат да нарачувам ' + settings.product + ', сите нарачки ги доставуваат цели и во пакување</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Денеска ми стаса  ' + settings.product + '. Ќе го употребувам, треба да помогне.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Фала за можноста да се нарача со попуст! И порано имам нарачувано ' + settings.product + ', но многу поскапо. Нема што, за ефикасност треба да се плаќа, ама вредеше.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Импресивен напис, ќе пробам. Нарачав неколку, се надевм ќе помогне </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Се разбира дека ќе помогне! За мене овој производ не е актуален, но неколку мои пријатели го користеа и многу го фалеа.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Произведувач ' + settings.product + '</span>Внимание! Во врска со тоа што ' + settings.product + ' скоро ќе почне да се продава во аптеките, количината е ограничена, за сите нема да стаса. Денеска се купени над 5000 пакувања.  </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Нарачав неколку, скоро ќе престане он-лајн купувањето. А во аптеките цените ќе бидат повисоки.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Мојот другар се врати денес од Јапонија и замислете само – видел во аптека ' + settings.product + '. Таму коштал околу $70 за 1 пакување, и дури и за таа цена купуваат! Чудно!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Да, нарачав. Фала, порано не знаев за  ова средство. Ги читав одзивите и коментарите – па сите се задоволни, главно е да купиш фалсификат, така што подобро е овде за нарачување.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        
              'pt': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Último comentário</p><div class="comments-refreshing"><i>Comentários atualizados...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Fiz um pedido. Consegui comprar com desconto! Espero que tudo corra bem</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Não se preocupe! Esta não é a primeira vez que encomendo '+ settings.product +', todos os pedidos são entregues com segurança dentro do pacote </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hoje recebi '+ settings.product +'. Vou usar, deve ajudar.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Obrigado pela oportunidade de comprar com desconto! Eu comprava anteriormente '+ settings.product +', mas saía muito mais caro. O que fazer, é necessário pagar pela eficácia, mas valeu a pena.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Estou muito impressionado com o artigo, vou experimentar. Eu pedi alguns pacotes de uma só vez, espero que ajude</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Claro que ajuda! Para mim, este produto não é relevante, mas alguns dos meus amigos usaram e o elogiaram muito.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Fabricante '+ settings.product +' </span>Atenção! Devido ao fato de que '+ settings.product +' em breve começará a ser vendido em farmácias, a quantidade de mercadoria é limitada, pode não haver produto suficiente para todos. Mais de 5.000 pacotes foram comprados hoje. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Eu consegui encomendar alguns pacotes, porque estão planejando parar a venda online logo. E nas farmácias os preços serão mais altos.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hoje meu amigo voltou do Japão e imagina - ele viu na farmácia '+ settings.product +'. Lá um pacote custa cerca de US $ 70, e as pessoas ainda compram até por esse preço! Isso é demais!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ufa, consegui encomendar. Obrigado, não sabia desse produto antes. Eu li comentários na Internet - todo mundo parece estar feliz, o principal é não comprar um produto falsificado, então é melhor encomendar aqui.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        
        'ru': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Последний комментарий</p><div class="comments-refreshing"><i>добавляется новый комментарий</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' заказ. ' + genGenderWords(1) + ' со скидкой! Надеюсь все будет хорошо</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Не волнуйся! Я уже не первый раз заказываю ' + settings.product + ', все заказы доставляются в целости в упаковке</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Сегодня ' + genGenderWords(2) + ' ' + settings.product + '. Буду использовать, должно помочь.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Спасибо за возможность заказать со скидкой! Я и раньше ' + genGenderWords(3) + ' ' + settings.product + ', но значительно дороже. Что поделать, за эффективность нужно было платить, но оно того стоило.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Очень впечатлила статья, буду пробовать. ' + genGenderWords(4) + ' сразу несколько штук, надеюсь поможет</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Конечно поможет! Для меня этот продукт не актуален, но несколько моих знакомых пользовались  и все очень хвалили.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Производитель ' + settings.product + '</span>Внимание! В связи с тем, что ' + settings.product + ' скоро начнет продаваться в аптеках, количество товара ограничено, товара на всех может не хватить. За сегодня куплено более 5 000 упаковок. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' заказать несколько штук ,ведь скоро планируют прекратить онлайн-продажу. А в аптеках точно цены будут выше.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Мой друг сегодня вернулся из Японии и представляете - он видел в аптеке ' + settings.product + '. Там он стоил около $70 за одну упаковку, и люди даже за эту цену покупают! Обалдеть!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Фух, ' + genGenderWords(6) + ' заказать. Спасибо, раньше не ' + genGenderWords(7) + ' про это средство. ' + genGenderWords(8) + ' отзыва в интернете - вроде все довольны, главное не купить подделку, так что лучше тут заказывать.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
            
            
              },
        
        
         'lt': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Paskutinis komentaras</p><div class="comments-refreshing"><i>pridėti naują komentarą</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' tvarka. ' + genGenderWords(1) + ' su nuolaida! Tikiuosi, kad viskas bus gerai</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Nesijaudinkite! Aš ne pirmas kartas ' + settings.product + ', visi užsakymai pristatomi saugiai pakuotėje</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Šiandien ' + genGenderWords(2) + ' ' + settings.product + '. Aš naudosiu, turėčiau padėti.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Dėkojame už galimybę užsakyti su nuolaida! Aš anksčiau ' + genGenderWords(3) + ' ' + settings.product + ', bet daug brangiau. Ką daryti, reikėjo mokėti už efektyvumą, bet tai buvo verta.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Labai sužavėtas straipsnis, aš pabandysiu. ' + genGenderWords(4) + ' tik kelis gabalus, tikiuosi padėti</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Žinoma, tai padės! Man šis produktas nėra aktualus, tačiau keletas mano draugų jį naudojo ir labai gyrė visus.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Gamintojas ' + settings.product + '</span>Dėmesio! Dėl to, kad ' + settings.product + ' Netrukus jis bus parduodamas vaistinėse, prekių kiekis yra ribotas, prekės visiems gali būti nepakankamos. Šiandien nupirkta daugiau nei 5000 paketų. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' užsakyti kelis gabalus, nes netrukus planuojate sustabdyti pardavimą internetu. Ir vaistinėse kainos bus didesnės.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mano draugas šiandien grįžo iš Japonijos ir įsivaizduoja - jis matė vaistinėje ' + settings.product + '. Ten jis kainuoja apie 70 JAV dolerių už vieną paketą, o žmonės netgi nusipirko už šią kainą! Tai nuostabus!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Wow, ' + genGenderWords(6) + ' pagal. užsakymą Ačiū, ne anksčiau ' + genGenderWords(7) + ' apie šį įrankį. ' + genGenderWords(8) + ' atsiliepimai internete - visi atrodo laimingi, svarbiausia yra ne pirkti netikrą, todėl geriau užsisakyti čia.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
            
            
              },
        
        
        
        
        
        
        
        
          'pl': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Ostatni komentarz</p><div class="comments-refreshing"><i>dodaj nowy komentarz</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' zamówienie ' + genGenderWords(1) + ' ze zniżką! Mam nadzieję, że wszystko będzie dobrze</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Nie martw się! Nie po raz pierwszy zamawiam ' + settings.product + ', wszystkie zamówienia są dostarczane bezpiecznie w paczce</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Dzisiaj ' + genGenderWords(2) + ' ' + settings.product + '. Będę używał, powinien pomóc.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Dziękujemy za możliwość zamówienia ze zniżką! Ja wcześniej ' + genGenderWords(3) + ' ' + settings.product + ', ale znacznie droższe. Co trzeba zrobić, trzeba było zapłacić za wydajność, ale było warto.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Pod wrażeniem tego artykułu, spróbuję. ' + genGenderWords(4) + ' tylko kilka kawałków, mam nadzieję, że pomogę</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Oczywiście, że pomoże! Dla mnie ten produkt nie jest istotny, ale kilku moich znajomych go użyło i bardzo chwalił wszystkich.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Producent ' + settings.product + '</span>Uwaga! Ze względu na to, że ' + settings.product + ' Wkrótce będzie sprzedawany w aptekach, ilość towarów jest ograniczona, towary dla wszystkich mogą nie wystarczyć. Ponad 5000 paczek zostało dzisiaj kupionych. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' zamów kilka sztuk, ponieważ wkrótce planują zatrzymać sprzedaż online. A w aptekach ceny będą wyższe.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mój przyjaciel dzisiaj wrócił z Japonii i wyobraził sobie - zobaczył w aptece ' + settings.product + '. Tam kosztuje około 70 dolarów za jedną paczkę, a ludzie nawet kupują za tę cenę! To niesamowite!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Wow, ' + genGenderWords(6) + ' zamówić. Dzięki, nie wcześniej ' + genGenderWords(7) + ' o tym narzędziu. ' + genGenderWords(8) + ' recenzje w Internecie - wszyscy wydają się szczęśliwi, najważniejsze, żeby nie kupować fałszywek, więc lepiej tu zamówić.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
            
            
              },
        
        
        'hu': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Utolsó hozzászólás</p><div class="comments-refreshing"><i>új megjegyzés hozzáadása</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' megbízás. ' + genGenderWords(1) + ' kedvezménnyel! Remélem, minden rendben lesz</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ne aggódj! Nem én vagyok az első alkalom, amikor megrendelek ' + settings.product + ', az összes megrendelést biztonságosan szállítjuk a csomagban</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ma' + genGenderWords(2) + ' ' + settings.product + '. Segíteni fogok.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Köszönjük a lehetőséget, hogy kedvezményt kapjon! Én korábban ' + genGenderWords(3) + ' ' + settings.product + ', de sokkal drágább. Mi a teendő, a hatékonyságért kellett fizetni, de megéri.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Nagyon megdöbbent a cikk, megpróbálom. ' + genGenderWords(4) + ' csak néhány darab, remélem, hogy segítek</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Természetesen segít! Számomra ez a termék nem releváns, de néhány barátom ezt használta, és mindenkit dicsérte.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Gyártó ' + settings.product + '</span>Figyelem! Az a tény, hogy ' + settings.product + ' Hamarosan a gyógyszertárakban értékesítik, az áruk mennyisége korlátozott, lehet, hogy nem lesz elég áru mindenkinek. Több mint 5000 csomag vásárolt ma. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' rendeljen néhány darabot, mert hamarosan meg akarja állítani az online értékesítést. És a gyógyszertárakban az árak magasabbak lesznek.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>A barátom ma Japánból jött vissza és elképzelte - látta a gyógyszertárban ' + settings.product + '. Ott körülbelül 70 dollárba kerül egy csomag, és az emberek még ezt az árat is megvásárolják! Ez félelmetes!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Wow, ' + genGenderWords(6) + ' rendelésre Köszönöm, nem korábban ' + genGenderWords(7) + ' erről az eszközről. ' + genGenderWords(8) + ' vélemények az interneten - mindenki boldognak tűnik, a fő dolog nem hamisítvány megvásárlása, ezért jobb itt megrendelni.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
            
            
              },
        
        
        
        
        
        
        
        
        'lv': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Pēdējais komentārs</p><div class="comments-refreshing"><i>pievienot jaunu komentāru</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' kārtībā. ' + genGenderWords(1) + ' ar atlaidi! Es ceru, ka viss būs labi</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Neuztraucieties! Es neesmu pirmā reize, kad es pasūtu ' + settings.product + ', visi pasūtījumi tiek piegādāti drošā iepakojumā </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Šodien ' + genGenderWords(2) + ' ' + settings.product + '. Man būs jāpalīdz.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Paldies par iespēju pasūtīt ar atlaidi! Es iepriekš ' + genGenderWords(3) + ' ' + settings.product + ', bet daudz dārgāk. Ko darīt, bija jāmaksā par efektivitāti, bet tas bija tā vērts.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ļoti pārsteigts ar rakstu, es centīšos. ' + genGenderWords(4) + ' tikai daži gabali, es ceru palīdzēt</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Protams, tas palīdzēs! Man šis produkts nav būtisks, bet daži no maniem draugiem to izmantoja un ļoti slavēja ikvienu.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Ražotājs ' + settings.product + '</span>Uzmanību! Sakarā ar to, ka ' + settings.product + ' Drīz tas tiks pārdots aptiekās, preču daudzums ir ierobežots, preces visiem var nebūt pietiekamas. Šodien ir nopirkti vairāk nekā 5000 iepakojumu. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' pasūtīt dažus gabalus, jo drīz plāno pārtraukt pārdošanu tiešsaistē. Un aptiekās cenas būs augstākas.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mans draugs šodien atgriezās no Japānas un iedomāties - viņš redzēja aptiekā ' + settings.product + '. Tur tas maksā apmēram 70$ dolārus par vienu paketi, un cilvēki pat par šo cenu pērk! Tas ir awesome!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Wow, ' + genGenderWords(6) + ' pēc pasūtījuma Paldies, ne agrāk ' + genGenderWords(7) + ' par šo rīku. ' + genGenderWords(8) + ' pārskati internetā - visi šķiet laimīgi, galvenais nav pirkt viltotu, tāpēc ir labāk pasūtīt šeit.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
            
            
              },
            
             'sk': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Posledná poznámka</p><div class="comments-refreshing"><i>pridajte nový komentár</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' objednávky. ' + genGenderWords(1) + ' so zľavou! Dúfam, že všetko bude v poriadku</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Nebojte sa! Nie som prvýkrát, čo som si objednal ' + settings.product + ', všetky objednávky sú dodávané bezpečné v balení</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Dnes ' + genGenderWords(2) + ' ' + settings.product + '. Budem používať, by som mal pomôcť.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ďakujeme Vám za možnosť objednať si zľavu! Ja predtým ' + genGenderWords(3) + ' ' + settings.product + ', ale oveľa drahšie. Čo robiť, bolo potrebné zaplatiť za efektívnosť, ale stálo to za to.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span> Veľmi dojem na článok, budem sa snažiť ' + genGenderWords(4) + ' len pár kusov, dúfam, že pomôžem </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Samozrejme to pomôže! Pre mňa tento produkt nie je relevantný, ale niektorí z mojich priateľov to využili a všetci veľmi chválili.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Výrobca ' + settings.product + '</span>Varovanie! Vzhľadom k tomu, že ' + settings.product + ' Čoskoro sa bude predávať v lekárňach, množstvo tovaru je obmedzené, nemusí byť dostatok tovaru pre každého. Dnes bolo zakúpených viac ako 5000 balíčkov.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' objednať niekoľko kusov, pretože čoskoro plánujú zastaviť online predaj. A v lekárňach budú ceny vyššie.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Moja priateľka sa dnes vrátila z Japonska a predstavila si - videl v lekárni ' + settings.product + '. Tam to stálo asi 70 dolárov za jeden balík, a ľudia dokonca kúpiť za túto cenu! To je úžasné!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Wow, ' + genGenderWords(6) + ' na objednávku Ďakujem, predtým ste to nevedeli ' + genGenderWords(7) + ' o tomto nástroji. ' + genGenderWords(8) + ' recenzie na internete - všetci sa zdajú šťastní, hlavnou vecou nie je kúpiť falošný, takže je lepšie objednať tu.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',		

        },
        'si': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Zadnji komentar</p><div class="comments-refreshing"><i>Komentarji so posodobljeni</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' sem. ' + genGenderWords(1) + ' sem naročiti po nižji ceni! Upam, da bo vse v redu</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Brez skrbi! Ne naročam prvič ' + settings.product + ', vsa naročila dobim v celoti</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Danes sem ' + genGenderWords(2) + ' ' + settings.product + '. Bom  ' + genGenderWords(10) + ', moralo bi pomagati.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hvala za možnost naročila po nižji ceni! Prej sem tudi  ' + genGenderWords(3) + ' ' + settings.product + ', bilo je veliko dražje. Kaj češ, učinkovitost nekaj stane.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Članek je name naredil vtis, bom  ' + genGenderWords(4) + ' sem takoj nekaj kosov, upam, da bo šlo na boljše</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Seveda bo! Zame ta izdelek ni potreben, ampak ga je nekaj mojih znancev uporabljalo, so zelo zadovoljni.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Proizvajalec ' + settings.product + '</span>Pozor! Glede dejstva da se bo ' + settings.product + ' začel prodajati tudi v lekarnah, količina je omejena, možno je da ne bo dovolj za vse. Danes so kupili 5 000 paketov.  </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' sem naročiti nekaj kosov, saj se bo kmalu končala spletna prodaja. V lekarnah pa bodo cene ziher višje.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Moj prijatelj se je danes vrnil iz Japonske in si lahko zamislite - da je videl v lekarni ' + settings.product + '. Stal je tam približno $70 en paket, tudi to kupujejo! Ne morem verjeti!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Joj, ' + genGenderWords(6) + ' sem naročiti. Hvala, nisem prej ' + genGenderWords(7) + ' za tole sredstvo.  ' + genGenderWords(8) + ' sem vtise na spletu - vsi so nekakor zadovoljni, pomembno je da ne kupite ponaredka, tako da je bolje naročiti kar tu.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        
        'sg': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">最後評論</p><div class="comments-refreshing"><i>評論已更新</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>訂單。 管理（一）折扣！ 我希望一切都會好起來的</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>別擔心！ 我不是第一次訂購' + settings.product + ', 所有訂單都在包裹中安全送達</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>今天收到' + settings.product + '. 我會用，應該幫忙。</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>感謝您有機會以折扣價訂購！ 我以前訂購了' + settings.product + '但要貴得多。 該怎麼做，有必要為效率付出代價，但這是值得的。</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>文章印象非常深刻，我會盡力。 我一次訂購了幾件，我希望它會有所幫助</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>當然會有所幫助！ 對我來說，這個產品並不重要，但我的一些朋友使用它並非常讚揚所有人。</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">生產廠家' + settings.product + '</span>注意! 由于' + settings.product + '很快就會在藥店出售，商品數量有限，所有商品可能都不夠。 今天已經購買了5,000多個包裹 </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span> 管理到訂購幾件，因為很快計劃停止在線銷售。 在藥店，價格會更高。</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>我的朋友今天從日本回來想像 - 他在藥店看到了' + settings.product + '. 一個套餐的價格大約是70美元，人們甚至買這個價格！ 太棒了！</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>啊，訂購了。 謝謝，之前不知道這個工具。 我在互聯網上閱讀評論 - 每個人似乎都很開心，最主要的不是購買假貨，所以最好在這裡訂購。</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'ro': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Ultimele comentarii</p><div class="comments-refreshing"><i>Comentariile se actualizează...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Am făcut comandă, Am prins cu reducere! Sper că totul va fi bine</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Nu îți face griji! Nu e prima oară când fac comandă ' + settings.product + ', toate comenzile se adaugă întregi în pachet</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Azi am primit ' + settings.product + '. Îl voi folosi, îmi trebuie ajutor.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mulțumesc pentru posibilitatea de a comanda cu reducere! Și înainte făceam comenzi ' + settings.product + ' dar erau mai scumpe. Nu aveam ce face, pentru efectivitate trebuia să plătesc, dar a meritat aceasta.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>M-a impresionat foarte mult articolul, voi încerca. Am comandat deodată câteva bucăți, sper că mă v-a ajuta.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sigur că te ajută! Pentru mine, acest produs nu este actual, dar câteva dintre cunoștințele mele l-au folosit și l-au lăudat.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Producător ' + settings.product + '</span>Atenție! Datorită faptului, că ' + settings.product + ' în curând se va vinde în farmacii , iar cantitatea produsului este limitată, produsul nu va fi îndeajuns pentru toți. Azi au fost cumpărate mai mult de 5000 de pachete. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Am reușit să comand câteva bucăți, deoarece în curând se plănuiește să se întrerupă vânzarea online. Iar în farmacii sigur prețurile vor fi mai mari.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Prietenul meu s-a întors din Japonia și imaginați-vă – l-a văzut în farmacie ' + settings.product + '. Acolo costă în jur de $70 pentru un pachet, și lumea cumpără chiar și la acest preț! Uimitor!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Pff, am reușit să comand. Mulțumesc, înainte nu știam de acest mijloc, Am citit pe internet recenzii – toți par mulțumiți, important este să nu cumperi făcături, așa că cel mai bine comandă aici.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'cz': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Poslední komentář</p><div class="comments-refreshing"><i>Aktualizace komentářů</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + '  si. ' + genGenderWords(1) + ' se slevou! Doufám, že bude vše v pořádku</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Nebojte se! Objednávám si ne poprvé  ' + settings.product + ', všechny objednávky se doručují v pořádku v balení</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Dnes ' + genGenderWords(2) + ' ' + settings.product + '. Budu používat, mělo by zabrat.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Děkuji za možnost si objednat se slevou! I dřív jsem ' + genGenderWords(3) + ' ' + settings.product + ', ale dražší. Nedá se nic dělat, za efektivitu se musí platit, ale stálo to za to.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Překvapil mě moc článek, budu zkoušet. ' + genGenderWords(4) + ' jsem si hned několik balení, doufám, že pomůže</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Určitě pomůže! Pro mě tento výrobek není aktuální, ale několik známých ho zkoušeli a moc doporučovali.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Výrobce ' + settings.product + '</span>Pozor! Vzhledem k tomu, že ' + settings.product + ' začne se brzy prodávat v lékárnách, je množství výrobků omezené, může se stát, že pro někoho už nezbyde. Dnes je zakoupeno vice než 5000 balení. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' jsem objednat několik balení, vždyť brzy plánují přestat prodávat online. A v lékárnách ceny budou vyšší.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Můj kamarád se dnes vrátil z Japonska a představte si – viděl v lékárnách ' + settings.product + '. Tam to stálo kolem $70 za jedno balení, a lidé dokonce kupují i za takovou cenu! To je něco!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ufff, ' + genGenderWords(6) + ' jsem. Děkuji, dřív jsem ' + genGenderWords(7) + ' o tomto přípravku. ' + genGenderWords(8) + ' jsem si recenze na internetu – všichni jsou spokojeni, hlavně nenarazit na padělek, takže lepší objednávejte tady.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'ph': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Ang Pinakabagong Kumento</p><div class="comments-refreshing"><i>Nag lo-load ng kumento…</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Umorder. Nakakuha ng diskwento! Sana ay ayos ang lahat.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Huwag mag alala! Hindi ito ang unang beses kong pag order ng  ' + settings.product + ' Lahat ng order ay naibibigay ng ligtas at maayos na nakaimpake.  </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Natanggap ang ' + settings.product + '. ngayong araw. Gagamitin ito para makatulong. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Salamat sa pagkakataon na maka order ng may diskwento! Naka order na ako ng ' + settings.product + ', noon pa, ngunit ito ay mas mahal. Pero ano ang magagawa mo? Dapat bayaran ang magandang serbisyo at ito ay sulit.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Kahanga-hangang artikulo kaya susubukan ito. Umorder ng ilang piraso, sana makakatulong ito. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Siguradong makakatulong ito! Ang produktong ito ay hindi nakakabagay sa akin, pero ang ilang kaibigan ko ay gumagamit nito at tuwang-tuwa sila sa naging resulta.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Tagagawa ng ' + settings.product + '</span>Atensyon!  Dahil ang  ' + settings.product + ' ay malapit ng ibebenta sa parmasya, at limitado lang ang pwedeng ibenta, kaya maaaring hindi sapat para sa lahat. Mahigit 5000 na pakete ang naibenta ngayon. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Nagawang umorder ng ilang piraso bago matapos ang online sale. Mas mataas ang presyo nito sa mga parmasya.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Kauuwi lang ng kaibigan ko galing Japan at alam mo ba kung ano ang nakita niya – nakita niya ang ' + settings.product + '. sa mga lokal na parmasya. Nagkakahalaga ng $70 sa bawat pakete doon, at binibili pa rin ng mga tao! Wow!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Phew, nagawang umorder sa tamang oras, Maraming salamat, hindi ko alam ang tungkol sa gamot na ito dati. Nabasa ko ang mga kumento sa internet – mukhang masaya ang lahat. Ang pinaka mahalaga ay huwag makabili ng peke, kaya mas mabuting umorder dito. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'vn': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Bình luận cuối cùng</p><div class="comments-refreshing"><i>Thêm bình luận mới...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mình vừa đặt mua hàng xong. Vẫn kịp mua giá khuyến mãi! Hy vọng là mọi thứ đều tốt đẹp.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Đừng lo! Đây không phải là lần đầu tiên tôi đặt mua ' + settings.product + ', tất cả các đơn hàng đều được mang đến nguyên vẹn trong bỏ vọc.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hôm nay tôi đã nhận dược ' + settings.product + '. Tôi sẽ dùng thử, chắc chắn là phải có hiệu quả.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Xin cảm ơn về giá khuyến mãi! Trước đây tôi cũng đã từng đặt mua ' + settings.product + ', nhưng với giá cao hơn khá nhiều. Biết phải làm sao bây giờ, của nào thì tiền đấy thôi, nhưng mà phải công nhận là rất đáng đồng tiền bát gạo.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',	
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Bài viết rất ấn tượng, tôi sẽ dùng thử. Tôi đã đặt mua liền mấy gói, hy vọng là đạt được kết quả mong muốn.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Tất nhiên là có hiệu quả rồi! Tôi thì bây giờ không còn cần đến nó nữa, nhưng nhiều người quen của tôi đã dùng thử và nói dùng rất thích.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Nhà sản xuất ' + settings.product + '</span>Xin lưu ý! Vì lý do ' + settings.product + ' sắp được bày bán tại các hiệu thuốc, số lượng sản phẩm có hạn, có thể không đủ cho tất cả nhu cầu người dùng. Ngày hôm nay đã bán được hơn 5 000 sản phẩm.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Tôi đã kịp đặt mua vài gói bởi vì sắp tới họ dự kiến ngừng việc bán hàng online. Mà ở ngoài hiệu thuốc thì giá chắc chắn là sẽ cao hơn rồi.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Bạn tôi vừa đi Nhật về và mọi người có biết điều gì không? Cậu ấy đã nhìn thấy ' + settings.product + ' ở trong hiệu thuốc. Ở đó, nó được bày bán với giá khoảng $70 cho một sản phẩm mà người ta vẫn đổ xô đi mua nó! Thật không thể tin được!</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Phù, may quá đã kịp đặt mua. Xin cảm ơn vì trước đây tôi không hề biết đến sản phẩm này. Sau khi đọc các bình luận trên mạng internet, có vẻ như tất cả mọi người đều rất hài lòng, quan trọng là không mua phải hàng giả, vì vậy nên đặt mua ở đây luôn.</div><div class="comment-action"><span class="like">Thích</span><span class="reply">Trả lời</span><span class="like-count">0</span><span class="comment-date">Vừa xong</span></div></div></div>',	
        },
        'fr': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Dernier commentaire</p><div class="comments-refreshing"><i>Les commentaires se renouvellent</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>J’ai fait la commande. J’ai eu le temps de le faire au rabais! J\'espère que tout ira bien</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ne t\'inquiète pas! Ce n\'est pas la première fois que je commande ' + settings.product + ', toutes les commandes sont livrées en toute sécurité dans le colis.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Aujourd\'hui j’ai reçu ' + settings.product + '. Je vais l’utiliser, cela devrait aider.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Merci pour l\'opportunité de commander au rabais! J\'ai déjà commandé ' + settings.product + ', mais beaucoup plus cher. Que faire! Il fallait payer pour l\'efficacité, mais ça valait la peine.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>L\'article est impressionnant, je vais essayer. J\'ai commandé plusieurs pièces à la fois, j\'espère que cela aidera. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Bien sûr, ça va aider! Pour moi, ce produit n\'est pas d\'actualité, mais plusieurs de mes amis l\'ont utilisé et tout le monde en louait. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Fabricant de  ' + settings.product + '</span>Attention! En raison du fait que ' + settings.product + ' va bientôt commencer à être vendu dans les pharmacies, la quantité du produit est limitée, il est possible qu’il n’y ait pas de quantité suffisante pour tout le monde. Plus de 5 000 plaquettes ont été achetées aujourd\'hui. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>J’ai eu le temps de commander quelques pièces, car bientôt, il planifie d\'arrêter les ventes en ligne. Et dans les pharmacies, les prix seront plus élevés..</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mon ami est revenu aujourd\'hui du Japon et imagine - il a vu dans la pharmacie ' + settings.product + '. Là, son prix était environ 70 $ pour une plaquette, et les gens achètent même pour ce prix! C\'est génial!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Whew, j’ai eu le temps de faire la commande. Merci, je ne connaissais pas ce produit auparavant. J’ai lu des avis sur Internet - tout le monde semble heureux, l\'essentiel est de ne pas acheter d’imitation, il est donc préférable de commander ici.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',		
        },
        'hr': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Zadnji komentar</p><div class="comments-refreshing"><i>komentari se obnavljaju</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(0) + ' sam narudžbu. ' + genGenderWords(1) + ' sam kupiti na popust! Nadam se da će sve biti u redu.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ne brini! Već kupujem mnogo puta ' + settings.product + ', sve online narudžbe dostavljaju se u cijelosti.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Danas sam  ' + genGenderWords(3) + ' ' + settings.product + '. Koristit ću, nadam se da će vam pomoći.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hvala vam na prilici da naručite na popust!! Ja sam ' + genGenderWords(4) + ' već ' + settings.product + ', ali mnogo skuplji. Što mi možemo učiniti, učinkovitost je morala biti plaćena, ali to je bilo vrijedno.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Vrlo zanimljiv članak, pokušat ću. ' + genGenderWords(5) + ' sam nekoliko komada odjednom, nadam se da će to pomoći.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Naravno, to će vam pomoći! Za mene ovaj proizvod nije relevantan, ali moji prijatelji su se to koristili i svi su bili vrlo zadovoljni</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Proizvođač ' + settings.product + '</span>Upozorenje! Zbog činjenice, da ' + settings.product + ' če se uskoro prodati u ljekarni, količina robe je ograničena, možda neće biti dovoljno robe za sve. Danas su ljudi kupili više od 5.000 paketa. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>' + genGenderWords(5) + ' sam naručiti nekoliko paketa , jer ubrzo neće biti online prodaja. А cijene u ljekarnama će biti znatno veće.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Moj prijatelj danas se vratio iz Japana, i zamislite - on je vidio u lijekarni ' + settings.product + '. Tamo on košta oko $70 za jedan paket, i ljudi ga ionako kupuju za ovu cijenu! Ovo je šok!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Fuuh, ' + genGenderWords(6) + ' sam naručiti. Hvala, nisam ' + genGenderWords(7) + ' o ovom lijeku. ' + genGenderWords(8) + ' sam recenzije na internetu - svi su ljudi sretni, glavna stvar je ne kupiti varanje, pa mislim da je bolje naručiti ovdje.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'it': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Ultimo commento</p><div class="comments-refreshing"><i>commenti si rinnovano</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ho effettuato l\'ordine. Con lo sconto! Spero andrà tutto bene</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Non ti preoccupare! Non è la prima volta che ordino ' + settings.product + ', tutti gli ordini arrivano senza problemi</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Oggi ho riveuto ' + settings.product + '. Lo userò, dovrebbe aiutarmi.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Grazie per la possibilità di ordinare con lo sconto! Io anche proma ordinavo ' + settings.product + ', ma costava di più. Che dire, costava tanto, ma per questa efficacia non ho paura a spendere.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>L\'articolo è interessante, ci proverò. Ne ho ordinato subito diversi, spero aiuti.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Certo che aiuta! Per me già non è necessario, ma conosco molte persone che lo usano</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Produttore ' + settings.product + '</span>Attenzione! Per via del fatto che ' + settings.product + ' a breve sarà in vendita nelle farmacie, la quantità di prodotto disponibile è limitata, potrebbe non bastare per tutti. Solo oggi ne abbiamo vendute 5000 confezioni. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ne ho ordinate diverse confezioni visto che tra poco sarà in vendita solo in farmacia. E si sa che costerà il doppio.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Un mio amico è appena tornato dal Giappone e li già vendono in farmacia ' + settings.product + '. Li costa $70 una confezione, e la gente lo compra! Incredibile!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Meno male, appena in tempo. Grazie, prima non conoscevo questo prodotto. Ho letto una recensione su internet, sono tutti contenti, basta non comprarlo falso, meglio ordinare qui.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'en': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">The Newest Comment</p><div class="comments-refreshing"><i>comments refreshing...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Made an order. Managed to get it with a discount! I hope everything will be okay</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Don’t worry! It’s not the first time I order ' + settings.product + ', all orders are delivered safe and sound in a package </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Received ' + settings.product + ' today. Will use it, it must help.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Thank you for the opportunity to order with a discount! I’ve ordered ' + settings.product + ', before, but it cost much more. But what can you do? One has to pay for the efficiency, but it was worth it.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Very impressed by the article, will try it. Ordered several pieces, hope it will help.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sure it will help! This product is not relevant for me, but a few of my friends used it and were very happy with the results.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + settings.product + ' Manufacturer </span>Attention! Due to the fact, that ' + settings.product + ' will soon be sold in pharmacies, the number of pieces is limited, there may not be enough packages for everyone. More than 5000 packages were bought today. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Managed to order a few pieces, as they soon plan to close online sale. In pharmacies the price will be definitely be higher.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>My friend just got back from Japan and guess what – he saw ' + settings.product + ' in the local pharmacies. It costs about $70 per one package there, and people still buy it! Wow!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Phew, managed to order in time. Thank you, didn’t know about this remedy before. Read reviews on the Internet – everyone seems happy, the most important thing is not to buy a fake one, so it’s better to order here.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'en_sg': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">The Newest Comment</p><div class="comments-refreshing"><i>comments refreshing...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Made an order. Managed to get it with a discount! I hope everything will be okay</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Don’t worry! It’s not the first time I order ' + settings.product + ', all orders are delivered safe and sound in a package </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Received ' + settings.product + ' today. Will use it, it must help.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Thank you for the opportunity to order with a discount! I’ve ordered ' + settings.product + ', before, but it cost much more. But what can you do? One has to pay for the efficiency, but it was worth it.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Very impressed by the article, will try it. Ordered several pieces, hope it will help.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sure it will help! This product is not relevant for me, but a few of my friends used it and were very happy with the results.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + settings.product + ' Manufacturer </span>Attention! Due to the fact, that ' + settings.product + ' will soon be sold in pharmacies, the number of pieces is limited, there may not be enough packages for everyone. More than 5000 packages were bought today. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Managed to order a few pieces, as they soon plan to close online sale. In pharmacies the price will be definitely be higher.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>My friend just got back from Japan and guess what – he saw ' + settings.product + ' in the local pharmacies. It costs about $70 per one package there, and people still buy it! Wow!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Phew, managed to order in time. Thank you, didn’t know about this remedy before. Read reviews on the Internet – everyone seems happy, the most important thing is not to buy a fake one, so it’s better to order here.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'th': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">ความคิดเห็นล่าสุด</p><div class="comments-refreshing"><i>อัปเดตความคิดเห็น</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>ทำการสั่งซื้อ พร้อมส่วนลด! ฉันหวังว่าทุกอย่างจะเป็นไปได้ด้วยดี</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>ไม่ต้องกังวล! นี่ไม่ใช่ครั้งแรกที่ฉันสั่งซื้อ ' + settings.product + ', สินค้าทั้งหมดจะถูกจัดส่งอย่างปลอดภัยในกล่อง </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>ฉันได้รับสินค้าวันนี้ ' + settings.product + '.และฉันจะใช้มันวันนี้</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>ขอบคุณสำหรับส่วนลดสินค้า! ฉันเคยสั่งซื้อสินค้าตัวนี้มาก่อน ' + settings.product + ', ซึ่งมันแพงมาก แต่ตอนนั้นฉันก็สั่งซื้อมันเพื่อประสิทธิภาพที่คุ้มค่า</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>เป็นบทความที่น่าสนใจมาก ฉันอยากลองมัน ฉันสั่งซื้อมันมาหลายชิ้น และหวังว่ามันจะช่วย</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>แน่นอนว่ามันจะช่วย! ส่วนตัวฉันมองว่ามันอาจจะไม่ได้ผล แต่คนที่ฉันรู้จักหลายคนบอกว่าใช้ดีมากและพวกเขาก็ชอบมัน</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">ผู้ผลิต ' + settings.product + ' </span>คำเตือน! เนื่องจาก '+ settings.product +' จะเริ่มจำหน่ายในร้านขายยาในเร็ว ๆ นี้ สินค้ามีจำนวนจำกัดซึ่งอาจมีสินค้าไม่เพียงพอสำหรับทุกคน ซื้อสินค้าวันนี้ จำนวน  5,000 ชิ้น</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>ฉันทำการสั่งซื้อสินค้ามาไว้แล้วบางส่วนเพราะจะมีการยุติการขายทางออนไลน์ในเร็วๆนี้ และร้านขายยาก็จะขึ้นราคาสินค้าตัวนี้</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>เพื่อนของฉันเพิ่งกลับมาจากญี่ปุ่น เขาเห็น ' + settings.product + ' ตามร้านขายยาทั่วไปในราคา $70 นั่นเป็นราคาที่แพงมาก</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>ฉันได้ทำการสั่งซื้อสินค้าตัวนี้แล้ว ขอบคุณมาก ฉันไม่เคยรู้จักสินค้าตัวนี้มาก่อนเลย ฉันอ่านรีวิวจากอินเทอร์เน็ต – ทุกคนที่ใช้ดูจะชอบมัน สิ่งสำคัญคือการไม่ซื้อของปลอมเพราะฉะนั้นจึงควรสั่งซื้อมัน</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'de': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Letzter Kommentar</p><div class="comments-refreshing"><i>Kommentare werden aktualisiert</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ich habe die Bestellung aufgegeben. Mit dem Rabatt! Ich hoffe, alles wird gut gehen.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mach dir keine Sorgen! Ich bestelle nicht zum ersten Mal ' + settings.product + ', alle Bestellungen kommen problemlos an </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Heute habe ich ' + settings.product + ' erhalten. Ich werde es benutzen, es sollte mir helfen.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Danke für die Möglichkeit, mit dem Rabatt zu bestellen! Ich habe vorher auch ' + settings.product + ' bestellt, aber es hat mehr gekostet. Was zu sagen ist, es kostete viel, aber für diese Wirksamkeit habe ich keine Angst Geld auszugeben.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Der Artikel ist interessant, ich werde es ausprobieren. Ich habe gleich mehrere bestellt, ich hoffe, es hilft</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Natürlich hilft es! Für mich ist das nicht schon notwendig, aber ich kenne viele Leute, die es benutzen</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Hersteller ' + settings.product + ' </span>Achtung! Aufgrund der Tatsache, dass ' + settings.product + ' in Kürze in Apotheken erhältlich sein wird, ist die Menge des verfügbaren Produkts begrenzt und kann nicht für jeden ausreichend sein. Nur heute haben wir 5000 Packungen verkauft. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ich habe mehrere Packungen bestellt, da es bald nur in der Apotheke erhältlich sein wird. Und man weiß, dass es doppelt so viel kosten wird</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ein Freund von mir ist gerade aus Japan zurückgekehrt und dort verkauft man schon ' + settings.product + ' in den Apotheken. Dort kostet eine Packung $70 und die Leute kaufen es! Unglaublich!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Zum Glück, gerade noch rechtzeitig. Danke, ich kannte dieses Produkt vorher nicht. Ich habe eine Rezension im Internet gelesen, alle sind zufrieden, Hauptsache man kauft es nicht gefälscht, es ist besser hier zu bestellen.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'es': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Último comentario</p><div class="comments-refreshing"><i>los comentarios son actualizados</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡Lo conseguí con el descuento! Espero que vaya todo bien.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡No te preocupes! No es la primera vez que pido ' + settings.product + ', todos los pedidos se entregan intactos en su caja.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hoy mismo recibí ' + settings.product + '. Lo voy a usar, debería ayudar.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡Gracias por la posibilidad de hacer el pedido con descuento! Antes también pedía ' + settings.product + ', pero salía mucho más caro. Qué le vamos a hacer, la eficacia tiene su precio, pero vale la pena.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Artículo muy interesante, voy a intentarlo. Pedí enseguida unos cuantos, espero que me ayude.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡Claro que te va ayudar! Para mí este producto no es muy actual, sin embargo mucho de mis amigos lo usan y no paran de elogiarlo.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Productor ' + settings.product + ' </span>¡Cuidado! Puesto que pronto ' + settings.product + ' solo se va a vender en las farmacias, la cantidad disponible es limitada y puede que no haya para todos. Tan solo hoy se compraron más de 5000. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Conseguí pedir unos cuantos, puesto que pronto van a cerrar la tienda online.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mi amigo ha vuelto hoy de Japón y vio ' + settings.product + ' en una farmacia. Allí cuesta más o menos 70 $, ¡pero a pesar del precio la gente lo compra igualmente! ¡Increíble! </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Logré hacer un pedido por los pelos. Gracias, antes no conocía este producto. Leí los comentarios en internet, y todos estaban muy satisfechos. Lo más importante es no comprar una falsificación, por eso mejor pedir en este sitio.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
         'co': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Último comentario</p><div class="comments-refreshing"><i>los comentarios son actualizados</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡Lo conseguí con el descuento! Espero que vaya todo bien.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡No te preocupes! No es la primera vez que pido ' + settings.product + ', todos los pedidos se entregan intactos en su caja.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hoy mismo recibí ' + settings.product + '. Lo voy a usar, debería ayudar.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡Gracias por la posibilidad de hacer el pedido con descuento! Antes también pedía ' + settings.product + ', pero salía mucho más caro. Qué le vamos a hacer, la eficacia tiene su precio, pero vale la pena.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Artículo muy interesante, voy a intentarlo. Pedí enseguida unos cuantos, espero que me ayude.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>¡Claro que te va ayudar! Para mí este producto no es muy actual, sin embargo mucho de mis amigos lo usan y no paran de elogiarlo.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Productor ' + settings.product + ' </span>¡Cuidado! Puesto que pronto ' + settings.product + ' solo se va a vender en las farmacias, la cantidad disponible es limitada y puede que no haya para todos. Tan solo hoy se compraron más de 5000. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Conseguí pedir unos cuantos, puesto que pronto van a cerrar la tienda online.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mi amigo ha vuelto hoy de Japón y vio ' + settings.product + ' en una farmacia. Allí cuesta más o menos 70 $, ¡pero a pesar del precio la gente lo compra igualmente! ¡Increíble! </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Logré hacer un pedido por los pelos. Gracias, antes no conocía este producto. Leí los comentarios en internet, y todos estaban muy satisfechos. Lo más importante es no comprar una falsificación, por eso mejor pedir en este sitio.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'id': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Komentar terakhir</p><div class="comments-refreshing"><i>Komentar diperbarui...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sudah pesan. Dapat diskon pula! Semoga semua baik-baik saja</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Jangan khawatir! Saya sudah sering pesan ' + settings.product + ', semua pesanan dikemas dalam kemasan yang aman </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Hari ini saya menerima ' + settings.product + '. Akan saya coba gunakan, semoga manjur.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Terima kasih atas diskon yang diberikan saat saya memesannya! Saya sebelumnya juga pernah memesan ' + settings.product + ', meski tidak begitu mahal. Mau bagaimana lagi, demi produk manjur harus siap bayar, meski tanpa potongan harga.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Artikel yang mengesankan, saya akan coba juga. Saya sudah pesan beberapa bungkus, semoga manjur</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Tentu saja manjur! Bagi saya produk ini sudah tidak aneh, soalnya semua kenalan saya juga pakai dan memuji kemanjurannya.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Pemroduksi ' + settings.product + '</span>Perhatian! Seiring kabar bahwa  ' + settings.product + ' segera dipasarkan di apotek, maka jumlah barang akan dibatasi, persediaan mungkin tidak akan cukup. Untuk hari ini sudah terjual lebih dari 5000 paket.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sudah pesan langsung beberapa bungkus karena kabarnya tidak akan dijual secara online lagi. Sedangkan harga di apotek biasanya lebih mahal.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Teman saya baru saja pulang dari Jepang dan dia bilang kalau sudah lihat  ' + settings.product + ' di apotek. Dia lihat harga sekitar $70 untuk satu bungkus, orang-orang tetap beli meski semahal itu! Gila!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Fiuh, saya sudah berhasil pesan. Terima kasih, sebelumnya saya tidak tahu tentang produk ini. Saya baca ulasannya di internet, tampaknya semua puas. Yang terpenting jangan beli barang tiruan, jadi mending pesan di sini langsung.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'al': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Komenti i fundit</p><div class="comments-refreshing"><i>Komentet përditësohen...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sapo e porosita. Arrita ta marr me zbritje! Shpresoj që gjithçka të shkoj mirë</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Mos u shqetësoni! Nuk është hera e parë që unë porosis ' + settings.product + ', të gjitha porositë i sjellin të paketuara me kujdes</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sot më në fund morra ' + settings.product + '. Do filloj ta përdor menjëherë, me siguri do më ndihmojë.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ju faleminderit për mundësinë që na ofroni, që porosinë ta bëjmë me zbritje! E kam porositur edhe më parë ' + settings.product + ', por sigurisht me një çmim më të lart. Çfarë të bëja, për efektivitetin duhet të paguash, por mund të them që ia ka vlejtur.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Më ka bërë përshtypje të madhe artikulli, do ta provoj patjetër. Kam porositur menjëherë disa copë, shpresoj se do më ndihmojë.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Sigurisht që ndihmon! Për mua ky produkt nuk është aktual, por disa të njohurit e mi e kanë përdorur dhe të gjithë e mburrin shumë.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Prodhuesi ' + settings.product + ' </span>Vëmendjen këtu! Duke qenë se, ' + settings.product + ' së shpejti do të filloj të shitet nëpër farmaci, sasia e produktit është e limituar, ky produkt mund të mos mjaftojë për të gjithë. Vetëm sot janë blerë më shumë se 5 000 pako. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Arrita të porosis disa copë, duke qenë se së shpejti ky produkt nuk do të shitet më përmes internetit. Ndërkohë që nëpër farmaci çmimi me siguri që do të jetë më i lartë.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Një miku im sot u kthye nga Japonia dhe e merrni dot me mend – ai kishte parë në farmaci atje ' + settings.product + '. Çmimi atje ishte rreth $70 për një copë, dhe njerëzit edhe me këtë çmim e blejnë! E çuditshme!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Uhh, arrita ta porosis. Ju faleminderit shumë, nuk kisha dëgjuar më parë për këtë produkt. Pastaj lexova komentet në internet – me aq sa pashë të gjithë pak a shumë janë të kënaqur, e rëndësishme është të mos blesh produkt fallco, kështu që më mirë porositeni këtu.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'bg': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Последен коментар</p><div class="comments-refreshing"><i>Коментарите се актуализират...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Направих поръчка. Хванах промоцията! Надявам се, че всичко ще бъде наред</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Не се притеснявай! Аз вече не за пръв път поръчвам ' + settings.product + ', всички поръчки се доставят в здрава опаковка </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Днес получих ' + settings.product + '. Ще го използвам, трябва да помогне.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Благодаря Ви за възможността да поръчам с отстъпка! Аз и преди съм си ' + genGenderWords(3) + ' ' + settings.product + ', но доста по-скъпо. Какво да правя, за ефективността трябваше да се плащат, но си струва.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Много се впечатлих от тази статия, ще опитам. Поръчах веднага няколко броя, надявам се да помогне</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Разбира се, че ще помогне! За мен този продукт не е важен, но някои мои познати са го използвали и всички много го хвалят.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Производител на ' + settings.product + ' </span>Внимание! Във връзка с това, че ' + settings.product + ' скоро ще започне да се продава в аптеките, количеството стока е ограничено, продуктът  може да не стигне за всички. Днес са купени над 5 000 опаковки. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Успях да си поръчам няколко бройки, защото скоро се канят да спрат онлайн продажбата. А в аптеките, със сигурност, цените ще са по-високи.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Един мой приятел днес се върна от Япония и познайте - той виждал в аптеките ' + settings.product + '. Там той е струвал около $70 за една опаковка, и хората, дори и на такава цена го купуват! Невереятно!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ох, успях да поръчам. Благодаря, не знаех за това лекарство преди. Прочетох коментарите в интернет, изглежда всички са доволни, важното е да не си купите фалшификат, така че по-добре поръчайте от тук.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
        'gr': {
            autoCommWrap: '<div class="comments-refreshing-wrapper"><p class="comments-refreshing-title">Τελευταίο σχόλιο</p><div class="comments-refreshing"><i>Τα σχόλια ενημερώνονται...</i> <br><img src="' + featuresFilesSrc.refreshingArrow + '" alt=""></div>',
            autoComm1: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Έκανα την παραγγελία. Πρόλαβα με έκπτωση! Ελπίζω ότι όλα θα είναι καλά</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm2: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Μην ανησυχείς! Δεν είναι η πρώτη φορά που παραγγέλνω ' + settings.product + ', όλες οι παραγγελίες αποστέλλονται σε ασφαλή συσκευασία</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm3: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Σήμερα έλαβα ' + settings.product + '. Θα χρησιμοποιήσω, θα πρέπει να βοηθήσει.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm4: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ευχαριστώ για την ευκαιρία να παραγγείλω με έκπτωση! Εγώ και παλιά είχα παραγγείλει  ' + settings.product + ', αλλά ήταν σημαντικά πιο ακριβά. Τι να κάνω, για την αποτελεσματικότητα έπρεπε να πληρώσω, αλλά άξιζε τον κόπο.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm5: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Εξαιρετικά εντυπωσιασμένος είμαι με το άρθρο, θα το δοκιμάσω. Παρήγγειλα αμέσως μερικά κομμάτια, ελπίζω θα βοηθήσει</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm6: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Θα βοηθήσει σίγουρα! Για μένα αυτό το προϊόν είναι άσχετο, αλλά κάποιοι από τους γνωστούς μου είχαν χρησιμοποιήσει, και όλοι έμειναν πολύ ευχαριστημένοι.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm7: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">Κατασκευαστής ' + settings.product + '</span>Προσοχή! Σχετικά με ό,τι ' + settings.product + ' σύντομα θα αρχίσει να πωλείται στα φαρμακεία, ο αριθμός των προϊόντων είναι περιορισμένος και το προϊόν σε όλους μπορεί να μην φτάσει. Για σήμερα πουλήθηκε πάνω από 5 000 συσκευασίες. </div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
            autoComm8: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Πρόλαβα να παραγγείλω μερικά κομμάτια, γιατί σύντομα σχεδιάζουν να σταματήσουν την πώληση στο διαδίκτυο. Και στα φαρμακεία σίγουρα οι τιμές θα είναι υψηλότερες.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',
			autoComm9: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ο φίλος μου σήμερα επέστρεψε από την Ιαπωνία και φαντάζεστε – αυτός είδε στο φαρμακείο ' + settings.product + '. Εκεί κοστίζει περίπου $70 για ένα πακέτο, και οι άνθρωποι ακόμα και για αυτή την τιμή αγοράζουν! Είμαι σοκαρισμένος!</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div>',			
			autoComm10: '<div class="comments-item"><div class="comment-avatar"><img src="' + featuresFilesSrc.userAva + '" width="32" height="32"></div><div class="comment-text"><span class="comment-username">' + genLocalName() + '</span>Ουχ, πρόλαβα να παραγγείλω. Ευχαριστώ, δεν το ήξερα για αυτό το σκεύασμα. Διάβασα σχόλια στο διαδίκτυο - φαίνεται να είναι όλοι ευχαριστημένοι, το βασικό είναι να μην αγοράσετε μια απομίμηση, οπότε καλύτερα είναι εδώ να παραγγείλετε.</div><div class="comment-action"><span class="like">' + commActions[settings.lang].likeWord + '</span><span class="reply">' + commActions[settings.lang].replyWord + '</span><span class="like-count">0</span><span class="comment-date">' + commActions[settings.lang].justNowWord + '</span></div></div></div>',
					
        },
    }

    $('.features-wrapper').append(commBlocks[settings.lang].autoCommWrap + commBlocks[settings.lang].autoComm1 + commBlocks[settings.lang].autoComm2 + commBlocks[settings.lang].autoComm3 + commBlocks[settings.lang].autoComm4 + commBlocks[settings.lang].autoComm5 + commBlocks[settings.lang].autoComm6 + commBlocks[settings.lang].autoComm7 + commBlocks[settings.lang].autoComm8 + commBlocks[settings.lang].autoComm9 + commBlocks[settings.lang].autoComm10 + '<style>@import url("' + featuresFilesSrc.autoCommStyles + '");.comments-refreshing-wrapper {background-color: ' + settings.autoComments.bgColor + ' !important}</style>' );
  
    
   
    
 
         // функция обновления комментов
    var commentRefresh = function(a,b) {
      counter = Math.floor(Math.random()*10000)+5000;
      if(document.querySelector('.comments-newly-showed')){
      document.querySelector('.comments-newly-showed').classList.remove('comments-newly-showed');
    }
      document.querySelector('.comments-refreshing').classList.add('refresh-appear');
      
      // убираем анимацию набора текста
      setTimeout(function(){document.querySelector('.comments-refreshing').classList.remove('refresh-appear')}, counter);
      // добавляем коммент
      setTimeout(function(){
      a[b].classList.add('comments-newly-showed');
      ++b;
      
      if(b < a.length){
      setTimeout(commentRefresh,(counter+6000), a,b);
    }
  }, 
            // через одну секунду после того как анимация убралась
  counter+1000)
    }
  var commentsRefreshing = document.querySelector('.comments-refreshing-wrapper');
    if (commentsRefreshing && commentsRefreshing.querySelector('.comments-item')){
      var commentFlag = 0;
       commentsRefreshing.querySelector('.comments-item').classList.add('comments-newly-showed');
      var commentsRefreshingCords = commentsRefreshing.getBoundingClientRect().top + pageYOffset;
        
        window.addEventListener('scroll', function() {
          
          if(commentsRefreshing.getBoundingClientRect().top <= 500 && commentFlag == 0) {
              ++commentFlag;
              var counter = 4000;
              setTimeout(commentRefresh, counter, commentsRefreshing.querySelectorAll('.comments-item'),1);
          } 
        })
    }
    }

    
    //Блок всплывашек
    if (!!settings.popups && settings.popups.isNeeded) {
    
        
        


    // вставляем стили и блок
    
         var popupsBlock = '<div class="show-message"></div><style>@import url("' + featuresFilesSrc.popupsStyles + '");.show-message__item, .show-message__item-first{background-color:' +  ((!settings.popups.bgColor) ? ' ' : settings.popups.bgColor) + ';}.show-message__info{color: ' + ((!settings.popups.textColor) ? ' ' : settings.popups.textColor) + ';} .show-message__info #js-user-id {color: ' + ((!settings.popups.textColor) ? ' ' : settings.popups.textColor) + '} .show-message__emph { color: ' + ((!settings.popups.emphColor) ? ' ' : settings.popups.emphColor) + '}  ' + ((!settings.popups.blackIcons) ? ' ' : '.show-message__info.icon-box::before {  content: " ";  background-image: url("' + featuresFilesSrc.popupsIconUser + '");} .everad-sprite-bucket+.show-message__info.icon-box::before { background-image: url("' + featuresFilesSrc.popupsIconOrder + '");}') + '</style>';
         
    
    document.body.insertAdjacentHTML('beforeend', popupsBlock);
    count_class = ".count-people";

    //функция определения размера скидки (если есть колесо - то будут выводиться разне значения, если нет - то 50%)
    function getDiscount() {
        if (!!settings.wheel && settings.wheel.isNeeded) {
            var discountVal = ['10%', '30%', '15%', '35%'];
            return discountVal[Math.floor(Math.random() * 4)];
        } else {
            var discountVal = '50%';
            return discountVal;
        }
    }
        
        
    lastpack_class = ".lastpack";
    var packages =  Math.ceil(Math.random() * 15 + 15);

    function reducePackages() {
         if(packages == 2) {
            return 2;
        }
        
                --packages;
        return packages;
       
    }
        
        
    // тексты сообщений
    var popupsMsg = {
        'vn': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Số lượng người truy cập trang web:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> vừa đặt mua ' + settings.product + ' <span class="show-message__emph">với giá khuyến mãi ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;"> Còn <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> sản phẩm với giá khuyễn mãi.</span></p></div>'
        },
        'ro': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Utilizatori pe pagină:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> a comandat  ' + settings.product + ' <span class="show-message__emph">cu o reducere de  ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;"> Ambalaje rămase cu reducere: <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span></span></p></div>'
        },
        'it': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Utenti sulla pagine:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ha ordinato  ' + settings.product + ' <span class="show-message__emph">con lo sconto del ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;"> Confezioni rimanenti in offerta: <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span></span></p></div>'
        },
          'pt': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Visitantes online agora:   <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> encomendou  ' + settings.product + ' <span class="show-message__emph"> com desconto  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Sobrou  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span>  pacotes na promoção</span></p></div>'
        },
        'es': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Usuarios on-line:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ha pedido ' + settings.product + ' <span class="show-message__emph">con el descuento de ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Quedan con la oferta especial:  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span></span></p></div>'
        },
        'co': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Usuarios on-line:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ha pedido ' + settings.product + ' <span class="show-message__emph">con el descuento de ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Quedan con la oferta especial:  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span></span></p></div>'
        },
        'id': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Jumlah pengunjung situs ini: <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> telah membeli ' + settings.product + ' <span class="show-message__emph">dengan diskon ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Tersisa  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> buah selama masa promo</span></p></div>'
        },
        'de': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Anzahl der Besucher auf der Webseite:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> bestellte  ' + settings.product + ' <span class="show-message__emph"> mit einem Rabatt von  ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Nur noch  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> St. zum Aktionspreis</span></p></div>'
        },
        'th': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">ผู้เยี่ยมชมเว็บไซต์ในขณะนี้:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> สั่ง  ' + settings.product + ' <span class="show-message__emph"> ได้รับส่วนลด  ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">สินค้าโปรโมชั่นคงเหลือ  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> ชิ้น</span></p></div>'
        },
        'gr': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Ο αριθμός των επισκεπτών στην ιστοσελίδα:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> παρήγγειλα ' + settings.product + ' <span class="show-message__emph">με έκπτωση ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Έμειναν <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> τεμ. με έκπτωση</span></p></div>'
        },
        'bg': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Посетители на сайта:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> поръча  ' + settings.product + ' <span class="show-message__emph"> с отстъпка ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Остават още  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> опаковки в наличност</span></p></div>'
        },
        'ph': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Mga gumagamit:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> Inorder na ' + settings.product + ' <span class="show-message__emph">na may ' + getDiscount() + ' na diskwento</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;"> Natirang pakete na may diskwento: <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span></span></p></div>'
        },
        'cz': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Návštěvníků je teď na webu:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> se slevou   ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Zbývá  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> balení za akční cenu</span></p></div>'
        },
        'ru': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Посетителей сейчас на сайте:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> со скидкой  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Осталось  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> упаковок по акции</span></p></div>'
        },
        'lt': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Dabar lankytojai lankytojai:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> su nuolaida  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Liko daugiau  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> atsargų paketai</span></p></div>'
        },
        
         'pl': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Odwiedzający teraz online:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> ze zniżką  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Pozostało  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> pakiety magazynowe</span></p></div>'
        },
        
            'hu': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Látogatók most online:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> kedvezménnyel  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Maradt  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> készletcsomagok</span></p></div>'
        },
        
          'lv': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Apmeklētāji tagad tiešsaistē: <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> ar atlaidi  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Pa kreisi  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> krājumu paketes</span></p></div>'
        },
          'sk': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Návštevníci teraz online:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> so zľavou  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Zostáva  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> skladových balíkov</span></p></div>'
        },
        'si': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Zdaj je na spletni strani obiskovalcev:   <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> s popustom ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Ostalo je  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> paketov po nižji ceni</span></p></div>'
        },
        'mk': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Посетители на веб-страната сега:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> нарачал   ' + settings.product + ' <span class="show-message__emph"> со попуст  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Останаа  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> пакувања за промоција</span></p></div>'
        },
        'sg': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">網站的訪問者數量:   <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> 訂購' + settings.product + ' 折扣  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">还有   <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> 促销产品</span></p></div>'
        },
        'hr': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Posjetitelji sada online:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span>   ' + settings.product + ' <span class="show-message__emph"> s ' + getDiscount() + ' popusta!</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Sada postoji samo  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> paketa po dionici.</span></p></div>'
        },
        'fr': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Visiteurs sur le site en ce moment:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> commandé   ' + settings.product + ' <span class="show-message__emph"> avec une réduction de  ' + getDiscount() + ' !</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Il reste  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span> paquets de promotion</span></p></div>'
        },
        'en': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Vizitors Online:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ordered  ' + settings.product + ' <span class="show-message__emph"> with a  ' + getDiscount() + ' discount!</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Only  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span>  packages with a discount left</span></p></div>'
        },
          'en_sg': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Vizitors Online:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ordered  ' + settings.product + ' <span class="show-message__emph"> with a  ' + getDiscount() + ' discount!</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Only  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span>  packages with a discount left</span></p></div>'
        },
        'al': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Vizitorët online tani:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ka porositur  ' + settings.product + ' <span class="show-message__emph"> me zbritje  ' + getDiscount() + '!</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Kanë mbetur edhe  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph"><span class="js-leftpacks"></span></span></span>  pako me ofertë</span></p></div>'
        },
    }
    
    
    
    flag_phone = true;
    flag_five = true;
    flag_key = true;
    idleTimer = null;
    idleState = false;
    idleWait = 30000;
    if (parseInt($(".price_land_s1:first").text()) > 0) {
        price = parseInt($(".price_land_s1:first").text()) || 990
    } else {
        price = 0
    }
    var d = first_count();
    var c = new Date();
    var e = parseInt(c.getDate());
    var b = "27";
    changeBlink(b);
    var a = [4, 4, 4, 5, 5];
    if (localStorage.getItem("___cp")) {
        tm = parseInt(localStorage.getItem("___tm"));
        if (e - tm == 0) {
            d = localStorage.getItem("___cp");
            b = localStorage.getItem("___lp");
            changeBlink(b);
        } else {
            setLS(e, b, a, d)
        }
    } else {
        setLS(e, b, a, d)
    }
    $(count_class).text(d);
    $(lastpack_class).text(b);
    if ($(window).width() > 991) {
        $(document).bind("keydown", function() {
            if (flag_key) {
                clearTimeout(idleTimer);
                idleState = false;
                idleTimer = setTimeout(function() {
                    flag_key = false;
                    idleState = true
                }, idleWait)
            }
        });
        $("body").trigger("keydown")
    }
    $(".show-message").on("click", function() {
        $(".show-message__item").fadeOut(100);
        setTimeout(function() {
            $(".show-message").empty()
        }, 200)
    });
    setTimeout(function() {
        popUp()
    }, 8000)

    function first_count() {
        var e = new Date();
        var c = e.getHours();
        var a = e.getMinutes();
        var b = 100;
        var f = b + c * 12 + Math.floor(a / 5);
        return f
    }

    function popUp() {
        var a = rand(321, 769);
        localStorage.setItem("___rp", a);
        shwMsg(popupsMsg[settings.lang].message02, "", a);
        setTimeout(function() {
            var b = parseInt(localStorage.getItem("___lp"));
            if (b <= 5) {
                if (flag_five) {
                    shwMsg(popupsMsg[settings.lang].message04, "", 0, reducePackages());
                    flag_five = false;
                    setTimeout(function() {
                        showPopupEnd()
                    }, 12000)
                }
            } else {
                var c = JSON.parse(localStorage.getItem("___sp"));
                showPopupBegin(b, c)
            }
        }, 12000)
    }

    function showPopupBegin(e, b) {
        var a = orderName();
        var g;
        var c;
        var i;
        var f;
        var h;
        var d;
        if ((b.length == 2) && (flag_phone)) {
            shwMsg(popupsMsg[settings.lang].message03, a, 0);
            flag_phone = false;
            setTimeout(function() {
                h = e;
                showPopupBegin(h, b)
            }, 13000)
        } else {
            g = Math.floor(Math.random() * (b.length));
            c = b[g];
            i = parseInt(window.price777) * parseInt(c) + window.curr777;
            f = parseInt(localStorage.getItem("___cp")) + 1;
            h = e - c;
            if ((price == 0) || (price == 1)) {
            } else {
                // d = '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name">' + a + '</span></span>, сделал(а) заказ на сумму ' + i + ', заказано <span class="bay">' + c + '</span> <span class="paced">упаковок</span><br><span class="package_left"> Осталось <span class="pacedNamed"></span> по акции <span class="blink_me">' + h + "</span></span></p></div>";
                changeBlink(h);
            }
            b.splice(g, 1);
            localStorage.setItem("___lp", h);
            localStorage.setItem("___sp", JSON.stringify(b));
            localStorage.setItem("___cp", f);
            $(count_class).text(f);
            $(lastpack_class).text(h);
            shwMsg(popupsMsg[settings.lang].message04, "", 0, reducePackages());
            setTimeout(function() {
                if (h > 5) {
                    showPopupBegin(h, b)
                } else {
                    if (flag_five) {
                        shwMsg(popupsMsg[settings.lang].message04, "", 0, reducePackages());
                        flag_five = false;
                        setTimeout(function() {
                            showPopupEnd()
                        }, 12000)
                    } else {
                        showPopupEnd()
                    }
                }
            }, 13000)
        }
    }

    function showPopupEnd() {
        var b = true;
        var a = "";
        setInterval(function() {
            var c = new Array(0, 1);
            var d = c[Math.floor(Math.random() * (c.length))];
            if (d == 0) {
                kindx = rand(1, 33);
                rp = parseInt(localStorage.getItem("___rp"));
                if (b) {
                    rp = rp + kindx;
                    b = false
                } else {
                    rp = rp - kindx;
                    b = true
                }
                localStorage.setItem("___rp", rp);
                var nextMsg = Math.round(Math.random());
                if(nextMsg == 0){

                shwMsg(popupsMsg[settings.lang].message02, "", rp)
            } else {
                shwMsg(popupsMsg[settings.lang].message04, "", 0, reducePackages());
            }
            } else {
                a = orderName();
                shwMsg(popupsMsg[settings.lang].message03, a, 0)
            }
        }, 13000)
    }

   

    function rand(b, a) {
        b = parseInt(b);
        a = parseInt(a);
        return Math.floor(Math.random() * (a - b + 1)) + b
    }

    function shwMsg(c, a, b, x) {
        $(".show-message").append(c);
        if (x != "") {
             $(".js-leftpacks").text(x);
        }
        if (a != "") {
            $(".js-name").text(a)
        }
        if (b != 0) {
            $("#js-user-id").text(b)
        }
        $(".show-message__item").slideDown(500).delay(5000).slideUp(500).delay(5000);
        setTimeout(function() {
            $(".show-message").empty()
        }, 6500)
    }

    function setLS(d, b, a, c) {
        localStorage.setItem("___cp", c);
        localStorage.setItem("___tm", d);
        localStorage.setItem("___lp", b);
        localStorage.setItem("___sp", JSON.stringify(a))
    };

    function changeBlink(e) {
        var elem = document.body.querySelectorAll('.left.blink');
        for (var i = 0; i < elem.length; i++) {
            elem[i].innerHTML = e;
        };
    }
}            
       
    
    //Блок рулетки
    if (!!settings.wheel && settings.wheel.isNeeded) {
        
	
	var wheelBlocks = {
		'id': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Mencoba keberuntungan Anda!</b><br>Situs kami memberi Anda peluang untuk mendapatkan diskon -50% pada ' + settings.product + '. Untuk melakukan ini, tekan tombol "SPIN" dan tunggu sampai roda keberuntungan berhenti. Mungkin Anda akan beruntung hari ini! Semoga berhasil!</p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Selamat!</span> <p class="pop-up-text">Anda memenangkan diskon 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',

		},
		'vn': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Xin chú ý!</b><br>Cổng thông tin của chúng tôi cung cấp cho các độc giả của mình khuyến mãi giảm giá cho sản phẩm ' + settings.product + '. Hãy thử vận may của bạn và nhấp vào nút "SPIN". Nếu may mắn, bạn có thể đặt mua thuốc với mức giá thấp hơn bình thường! Chúc may mắn!</p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Chúc mừng!</span> <p class="pop-up-text">Bạn đã nhận được giảm giá -50% cho sản phẩm ' + settings.product + '</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'it': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Attenzione!</b><br>Il nostro portale mette in palio uno sconto aggiuntivo su ' + settings.product + '. Tentate la fortuna e premete il tasto "SPIN". Se sarete fortunati potrete ordinare il preparato ad ancora meno! Buona fortuna!</p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Congratulazioni!</span> <p class="pop-up-text">Potete ordinare ' + settings.product + ' con lo sconto del 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'es': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Por favor ten cuidado!</b><br>En nuestro sitio ofrecemos descuentos a los lectores en toda la producción. Prueba tu suerte y presiona el botón "SPIN". ¡Si tiene suerte, puede solicitar nuestra producción a un precio inferior al habitual! Buena suerte! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Felicitaciones!</span> <p class="pop-up-text">¡Has obtenido un descuento del 50% en ' + settings.product + '!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
          'pt': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Atenção!</b><br>Os visitantes do nosso site têm a oportunidade exclusiva de encomendar '+ settings.product +' com um desconto de até 50%! Para fazer isso, inicie a roda da fortuna clicando no botão "SPIN" e espere que ele pare completamente. Quem sabe, talvez você seja o sortudo que consiga economizar muito dinheiro hoje! Boa sorte! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Parabéns!</Span> <p class="pop-up-text">Você pode encomendar '+ settings.product +' com 50% de desconto!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        'co': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Por favor ten cuidado!</b><br>En nuestro sitio ofrecemos descuentos a los lectores en toda la producción. Prueba tu suerte y presiona el botón "SPIN". ¡Si tiene suerte, puede solicitar nuestra producción a un precio inferior al habitual! Buena suerte! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Felicitaciones!</span> <p class="pop-up-text">¡Has obtenido un descuento del 50% en ' + settings.product + '!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'ro': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Atenţie!</b><br>Portalul nostru oferă o reducere pentru ' + settings.product + '. Încercaţi-vă norocul şi apăsaţi pe butonul "SPIN". Dacă vă v-a zîmbi norocul veţi putea comanda medicamentul cu un preţ încă mai scăzut! Succes! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Vă felicităm!</span> <p class="pop-up-text">Aţi primit o reducere de -50% pentru ' + settings.product + '!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'cz': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Pozor!</b><br>Náš webový portál daruje možnost získat slevu na ' + settings.product + '. Stiskněte Spin a mějte štěstí. Pokud se vám bude dařit, získáte zboží se slevou. Hodně štěstí! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Gratulujeme!</span> <p class="pop-up-text">Teď si můžete objednat ' + settings.product + ' se slevou 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'th': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>โปรดทราบ!</b><br>ตอนนี้กำลังมีการจับรางวัลเพื่อส่วนลดเพิ่มเติมสำหรับ ' + settings.product + ' ใช้โชคดีที่มีของคุณและกดปุ่ม "SPIN" ถ้าโชคดี คุณจะสามารถสั่งผลิตภัณฑ์ได้ในราคาพิเศษสุดๆ! ขอให้คุณโชคดี! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">ยินดีด้วย!</span> <p class="pop-up-text">คุณสามารถสั่ง ' + settings.product + ' พร้อมส่วนลด 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'gr': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Δοκιμάστε την τύχη σας!</b><br>Ο ιστότοπός μας σας δίνει την ευκαιρία να πάρετε μια έκπτωση 50% στο ' + settings.product + '. Για να το κάνετε, πιέστε το πλήκτρο "SPIN" και περιμένετε να σταματήσει ο τυχερός τροχός. Ίσως να είστε τυχεροί σήμερα! Καλή τύχη!  </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Συγχαρητήρια!</span> <p class="pop-up-text">Κερδίστε έκπτωση 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'de': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Achtung!</b><br>Unser Portal spielt einen zusätzlichen Rabatt auf ' + settings.product + ' aus. Fordern Sie Ihr Glück heraus und klicken Sie auf die Schaltfläche "SPIN". Wenn Sie Glück haben, können Sie ein Präparat zu einem niedrigeren Preis bestellen! Viel Glück! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Herzlichen Glückwunsch!</span> <p class="pop-up-text">Sie können ' + settings.product + ' mit einem Rabatt von 50% bestellen!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
		
		},
        'bg': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Опитай късмета си!</b><br>Нашият сайт ви дава възможност да получите 50% отстъпка от цената на лекарството Erogan. За да направите, това натиснете бутона "SPIN" и изчакайте, докато спре колелото на късмета. Може би, днес ще имаш късмет точно ти! Успех!</p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Честито!</span> <p class="pop-up-text">Ти печелиш 50% отстъпка!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
				
        },
		'fr': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Attention!</b><br>Notre portail offre des rabais supplémentaires sur ' + settings.product + ' . Découvrez la fortune et cliquez sur le bouton "SPIN". Si vous aurez de la chance, vous pouvez commander ce remède au prix encore plus bas. Bonne chance!</p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Félicitations!</span> <p class="pop-up-text">Vous pouvez commander ' + settings.product + ' avec la réduction 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
		'al': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Kujdes!</b><br>Portali ynë i ofron lexuesve mundësinë të përfitojë një zbritje deri në -50% për ' + settings.product + '. Shtypni butonin “SPIN”, dhe prisni deri sa te ndalojë rrota e fatit! Ndoshta pikërisht juve do t’iu buzëqesh sot fati, dhe do të keni mundësinë të bëni porosinë me vetëm gjysëm çmimi! Ju urojmë fat!</p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Ju përgëzojmë!</span> <p class="pop-up-text">Ju mund ta porositni ' + settings.product + ' me një zbritje prej 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
        'ru': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Внимание!</b><br>У поситителей нашего сайта есть эксклюзивная возможность заказать ' + settings.product + ' со скидкой до 50%! Для этого запустите колесо фортуны нажатием на кнопку "SPIN", и затем дождитесь его полной остановки. Кто знает, может именно Вы тот счастливчик, которому сегодня удастся неплохо сэкономить! Удачи! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Поздравляем!</span> <p class="pop-up-text">Вы можете заказать ' + settings.product + ' со скидкой 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        
        
          'lt': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Dėmesio!</b><br>Mūsų svetainės lankytojai turi išskirtinę galimybę užsisakyti. ' + settings.product + ' iki 50% nuolaida! Norėdami tai padaryti, paleiskite likimo ratą paspaudę mygtuką „SPIN“ ir palaukite, kol jis visiškai sustos. Kas žino, gal jūs esate laimingas, kuris šiandien galės sutaupyti pinigų! Sėkmės! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Sveikiname!</span> <p class="pop-up-text">Galite užsisakyti ' + settings.product + ' su 50% nuolaida!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        
        
         'pl': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Dėmesio!</b><br>Mūsų svetainės lankytojai turi išskirtinę galimybę užsisakyti ' + settings.product + ' iki 50% nuolaida! Norėdami tai padaryti, paleiskite likimo ratą paspaudę mygtuką „SPIN“ ir palaukite, kol jis visiškai sustos. Kas žino, gal jūs esate laimingas, kuris šiandien galės sutaupyti pinigų! Sėkmės! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Sveikiname!</span> <p class="pop-up-text">Galite užsisakyti ' + settings.product + ' su 50% nuolaida!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        
        
        'pl': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Uwaga!</b><br>Odwiedzający naszą stronę mają wyłączną możliwość zamówienia. ' + settings.product + ' do 50% taniej! Aby to zrobić, uruchom koło fortuny, naciskając przycisk "SPIN", a następnie zaczekaj, aż całkowicie się zatrzyma. Kto wie, może jesteś szczęściarzem, który może dziś zaoszczędzić dużo pieniędzy! Powodzenia! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Gratulacje!</span> <p class="pop-up-text">Możesz zamówić ' + settings.product + ' z 50% zniżką!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        
        
         'hu': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Figyelem!</b><br>Honlapunk látogatói kizárólagos lehetőséget biztosítanak a megrendelésre. ' + settings.product + ' akár 50% kedvezmény! Ehhez indítsa el a szerencse kerékét a "SPIN" gomb megnyomásával, majd várja meg, amíg teljesen leáll. Ki tudja, talán te vagy a szerencsés ember, aki ma sok pénzt takaríthat meg! Sok szerencsét! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Gratulálunk!</span> <p class="pop-up-text">Rendelhet ' + settings.product + ' 50% kedvezmény!</p> <a class="pop-up-button" href="landing/index.php">Ok</a> </div> </div>',
			
        },
         'lv': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Uzmanību!</b><br>Mūsu vietnes apmeklētājiem ir ekskluzīva iespēja pasūtīt. ' + settings.product + ' līdz 50% atlaide! Lai to izdarītu, ieslēdziet laimes riteni, nospiežot pogu "SPIN", un pēc tam pagaidiet, līdz tas pilnībā apstājas. Kas zina, varbūt esat laimīgs, kurš šodien var ietaupīt daudz naudas! Good luck! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Apsveicam!</span> <p class="pop-up-text">Jūs varat pasūtīt ' + settings.product + ' ar 50% atlaidi!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        'sk': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Varovanie!</b><br>Naši návštevníci stránok majú exkluzívnu príležitosť objednať ' + settings.product + ' až 50% z ceny! Ak to chcete urobiť, spustite kolo šťastia stlačením tlačidla "SPIN" a počkajte, kým sa úplne zastaví. Kto vie, možno ste šťastný, kto dnes ušetrí peniaze! Veľa šťastia! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Blahoželáme!</span> <p class="pop-up-text">Môžete si ho objednať ' + settings.product + ' s 50% zľavou!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        'si': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Pozor!</b><br>Obiskovalci naše spletne strani imajo enkratno možnost naročila ' + settings.product + ' s popustom do 50%! Za to zavrtite kolo fortune s pritiskom gumba "SPIN" in počakajte da se zaustavi. Kdo ve, mogoče ste Vi ta srečnež, ki bo lahko danes privarčeval z denarjem! Srečno! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Čestitamo!</span> <p class="pop-up-text">Lahko naročite ' + settings.product + ' s popustom 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        'mk': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Внимание!</b><br> Посетителите на нашата веб-страна имаат ексклузивна можност да нарачаат ' + settings.product + ' со попуст до 50%! Потребно е да си ја пробате среќата со притискање на копчето "SPIN", и потоа да почекате до неговото целосно запирање. Кој знае, можеби токму Вие сте тој среќник, кој што денеска добро ќе заштеди! Среќно! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Ви честитаме!</span> <p class="pop-up-text"> Вие можете да нарачате ' + settings.product + ' со попуст 50%!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        'sg': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>注意!</b><br>我們網站的訪客有獨家訂購的機會' + settings.product + ' 折扣高達50％！ 要做到這一點，啟動命運之輪按下"SPIN"按鈕, 然後等待它完全停止。 誰知道，也許你是幸運的人今天可以節省一些錢！ 祝你好運！ </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">稱慶!</span> <p class="pop-up-text">你可以訂購' + settings.product + '享受50％的折扣！</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        'bg': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Внимание!</b><br>Посетителите на нашия сайт имат изключителната възможност да поръчат ' + settings.product + ' с 50% отстъпка! За тази цел трябва да завъртите колелото на късмета като натиснете бутона "SPIN" и след това да изчакате докато то спре напълно. Кой знае, може би точно Вие сте този късметлия, който днес ще успее хубаво да спести! Късмет! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Честито!</span> <p class="pop-up-text">Можете да поръчате ' + settings.product + ' с 50% отстъпка! </p> <a class="pop-up-button" href="landing/index.php">Ok</a> </div> </div>',
			
        },
        'hr': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Pozor!</b><br>Posjetitelji naše stranice imaju ekskluzivnu mogućnost naručivanja ' + settings.product + ' s popustima do 50%! Za ovo morate pokreniti kotač sreće pritiskom na gumb "SPIN", i onda pričekajte da se potpuno zaustavi. Tko zna, možda Vi ste sretni koji će danas uspjeti uštedjeti svoj novac! Sretno! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Čestitamo!</span> <p class="pop-up-text">Možete naručiti ' + settings.product + ' popustom 50%!</p> <a class="pop-up-button" href="landing/index.php">Ok</a> </div> </div>',
			
        },
        'ph': {
			wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Atensyon!</b><br> Ang aming mambabasa ay may eksklusibong pagkakataong umorder ' + settings.product + '  na may diskwento hanggang 50%! Pindutin ang “SPIN” button para maumpisahan ang fortune wheel at antaying tumigil. Malay mo, baka ikaw ang maswerteng tao na makakuha ng pinakamagandang diskwento ngayon! Good luck! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Binabati kita!</span> <p class="pop-up-text">Pwedeng umorder ' + settings.product + ' na may 50% na diskwento !</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
		},
        'en': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Attention!</b><br>Our readers have an exclusive opportunity to order ' + settings.product + ' with discount up to 50%! Just launch the fortune wheel by pressing the "SPIN" button, and wait for it to stop. Who knows, maybe it is you that lucky guy, who will get the best discount today! Good Luck! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Congratulations!</span> <p class="pop-up-text">You can order ' + settings.product + ' with a 50% discount!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
        'en_sg': { 
            wheel: '<span class="toform"></span><div class="spin-wrapper"><p><b>Attention!</b><br>Our readers have an exclusive opportunity to order ' + settings.product + ' with discount up to 50%! Just launch the fortune wheel by pressing the "SPIN" button, and wait for it to stop. Who knows, maybe it is you that lucky guy, who will get the best discount today! Good Luck! </p> <div class="wheel-wrapper"> <div class="wheel"> <img alt="" class="wheel-img" src="' + (settings.wheel.customWheel || featuresFilesSrc.prizeWheel) + '"> <div class="wheel-cursor"> <img alt="" src="' + featuresFilesSrc.wheelCursor + '"><span class="cursor-text">SPIN</span></div> </div> </div> </div>',
			popup: '<div class="spin-result-wrapper"> <div class="pop-up-window"> <div class="close-popup"></div> <span class="pop-up-heading">Congratulations!</span> <p class="pop-up-text">You can order ' + settings.product + ' with a 50% discount!</p> <a class="pop-up-button" href="#">Ok</a> </div> </div>',
			
        },
	};
        
	 $('body').append(wheelBlocks[settings.lang].popup + '<style>@import url("' + featuresFilesSrc.wheelStyles + '");\n </style>' );

	(!!settings.form && settings.form.isNeeded) ? $('.features-wrapper').prepend(wheelBlocks[settings.lang].wheel + genLocalForm()): $('.features-wrapper').prepend(wheelBlocks[settings.lang].wheel)
	var wheel = document.querySelector('.wheel-img');
	var resultWrapper = document.querySelector('.spin-result-wrapper');
	// направляем все ссылки на форму, если это ленд
	
	// запускаем колесо по клику
	$('.cursor-text').click(function() {
		if (wheel.classList.contains('rotated')) {
			resultWrapper.style.display = "block";
		} else {
			wheel.classList.add('super-rotation');
			setTimeout(function() {
				resultWrapper.style.display = "block";
			}, 8000);
			setTimeout(function() {
				if (!!settings.form && settings.form.isNeeded) {
					$('.spin-wrapper').slideUp();
					$('.order_block').slideDown();
				start_timer();
				}
			}, 10000);
			wheel.classList.add('rotated');
		}
	});
	if (!!settings.form && settings.form.isNeeded) {
		$('.close-popup, .pop-up-button').click(function(e) {
			e.preventDefault();
			$('.spin-result-wrapper').fadeOut();
			var top = $('.toform').offset().top;
			$('body,html').animate({
				scrollTop: top
			}, 800);
		});
	} else {
		$('.close-popup').click(function(e) {
			e.preventDefault();
			$('.spin-result-wrapper').fadeOut();
			
		});
	}
        
        
}
    
    
    //Блок формы
    if (!!settings.form && settings.form.isNeeded) {

        if ($('.order_form').length == 0) {
            $('.features-wrapper').prepend(genLocalForm());
            
            var timerFlag = 0;
            $(window).scroll(function () {
                var timerOffset = $('.order_form').offset().top - $(window).height() * 1.5;
                if ($(this).scrollTop() > timerOffset && timerFlag === 0) {
                    start_timer();
                    ++timerFlag;
                }
            })
        } 
        if (settings.form.scrollAllLinks){
        
			$('a').click(function(e) {
				var top = $((!!settings.wheel && settings.wheel.isNeeded) ? '.toform' : '.order_block').offset().top;
				e.preventDefault();
				$('body,html').animate({
					scrollTop: top
				}, 800);
			})
		}
	}
    

        

                     

function outputDat(m, fullM) {
	var d = new Date();
	var p = new Date(d.getTime() - m * 86400000);
	var monthA = (fullM === false) ? '01,02,03,04,05,06,07,08,09,10,11,12'.split(',') : 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
	var w = p.getDate();
	var ret = (fullM === false) ? p.getDate() + '.' + monthA[p.getMonth()] + '.' + p.getFullYear() : p.getDate() + ' ' + monthA[p.getMonth()] + ' ' + p.getFullYear();
	return ret;
}
var time = settings.form.untilExpire;
var intr;

	 function start_timer() {
		intr = setInterval(tick, 1000);
	}


function tick() {
	time = time - 1;
	var mins = Math.floor(time / 60);
	var secs = time - mins * 60;
	if (mins == 0 && secs == 0) {
		clearInterval(intr);
	}
	secs = secs >= 10 ? secs : "0" + secs;
    mins = mins >= 10 ? mins : "0" + mins;
	$("#min").html(mins);
	$("#sec").html(secs);
}
    
    
}