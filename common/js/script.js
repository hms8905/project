$(() => {
	script.init();

	const secLecSl = new Swiper('.sec_lec .sl .swiper-container', {
		loop: true,
		direction: 'vertical',
		allowTouchMove: false,
		autoplay: {
			delay: 1000,
		},
	})

	const sec07Sl = new Swiper('.sec_lec .cont .swiper-container', {
		loop: false,
		slidesPerView: 'auto',
		navigation: {
			nextEl: '.sec_lec .cont .next',
			prevEl: '.sec_lec .cont .prev',
		},
	});

});

/* 유튜브 영상재생(공통) */
function playYoutubeComm(src){
	var serviceUrl = 'https://www.youtube.com';
	var src = src.toString();
	var setting = playSrc = '';

	if(src.indexOf('?')==-1) setting = '?autoplay=1&rel=0&modestbranding=1';
	if(src.indexOf('/embed/')==-1) serviceUrl = serviceUrl + '/embed/';

	playSrc = serviceUrl + src + setting;

	$('<div class="wrap_layer_popup" id="youtube_pop"><iframe width="1000" height="563" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <a href="javascript:closeYoutubeComm();" class="close_layer"><img src="http://img.siwonschool.com/spain/comm/video_close_img.gif" alt="닫기"></a></div>').appendTo('body');
	$('#youtube_pop iframe').attr({'src':playSrc});
	layerPopId('youtube_pop', 'fixed');
}

//유튜브 영상닫기(공통)
function closeYoutubeComm(){
	$('#youtube_pop iframe').attr({'src':''});
	layerPopClose();
	$('#youtube_pop').remove();
}

//레이어 팝업창 열기
function layerPopId(layerId, boxPosition){
	if (layerId == 'layer_login') {
		loginChk();
		return;
	}else if(layerId=="device_Layer"){
		//초기화
		$('#device_Layer .contbox').removeClass('on');
		$('#device_Layer .contbox').eq(0).addClass('on');
		$('#deviceLayer_device').val('');
		$('#deviceLayer_device_idx').val('');
		//인증번호창
		$('#device_Layer .num').css('display','none');
		$('.btn_phone_send').text('인증번호 발송');
		$('.btn_email_send').text('인증번호 발송');

		// 텍스트 바꾸기
		$('#device_Layer #device_tit span').text("PC / 모바일(web) 등록정보");
	}
	if( layerId == 'pop_mydata' ){ myDataChart(); }

	if ( !boxPosition ) boxPosition = 'absolute';
	// set size of popup box
	var winHeight = $(window).height();
	var popHeight = $('.wrap_layer_popup#'+layerId).height() + parseInt( $('.wrap_layer_popup#'+layerId).css('padding-top') );

	// top position of popup box
	if ( winHeight > popHeight ){ //컨텐츠 height가 window보다 작은 경우
		if (boxPosition == 'absolute') 	var positionTop = (winHeight-popHeight)/2 + $(window).scrollTop() +'px';
		else var positionTop =  (winHeight-popHeight)/2 +'px';
	} else { //컨텐츠 height가 window보다 큰 경우
		if (boxPosition == 'absolute') var positionTop = $(window).scrollTop() + 20 +'px';
		else var positionTop = 20 +'px';
	}
	// left position of popup box
	var popWidth = $('.wrap_layer_popup#'+layerId).width();
	var positionLeft = -popWidth/2+'px';
	$('.wrap_layer_popup#'+layerId).css({
		'position' : boxPosition,
		'top' : positionTop,
		'margin-left' : positionLeft
	});

	// 팝업창 띄우기
	if(!$("div.layer_popup_bg").length){
		if ( $('#'+layerId).hasClass('nopopclose') ){
			$("body").append('<div class="layer_popup_bg nopopclose"></div>');
		}else{
			$("body").append('<div class="layer_popup_bg"></div>');			
		}
	}
	$('.layer_popup_bg').fadeIn();

	$('.wrap_layer_popup#'+layerId).fadeIn(function(){
		$('.wrap_layer_popup#'+layerId).css('display','block');
	});
}
// 레이어 팝업창 닫기
function layerPopClose(){
	$('.wrap_layer_popup').fadeOut();
	$('.layer_popup_bg').fadeOut(function(){
		$(this).remove();
		closeYoutubeComm();
	});
}

const script = {
	init: function () {
		let fn = this;
		fn.mouse('.sec_visual_container');
		fn.mouse('.balloon-container', 40);
		fn.scrollMagic.init();
		fn.rolling('.sec_step .card');
		fn.airplane();
		//parallax.scroll.init();
	},
	mouse: ( container = '.parallax-container', gab = 30 ) => {

		$(container).each(function(idx,el){
			let dim = $(el),
				bg = dim.children('.parallax-element');

			$(document).on('mousemove', el, function (e) {
				
				let	mouseX = e.offsetX,
					mouseY = e.offsetY,
					offsetX = -(mouseX / dim.width() - 0.5),
					offsetY = -(mouseY / dim.height() - 0.5),
					x = offsetX * gab * -1,
					y = offsetY * gab * -1;
				
				if ( x >= ( gab / 2 ) ) x = 15;
				else if ( x <= ( gab / 2 * -1 ) ) x = -15;
				else if ( y >= ( gab / 2 ) ) y = 15;
				else if (y <= (gab / 2 * -1)) y = -15;
				
				bg.css('transform', `translate(${x}px, ${y}px)`);
			});

			$(document).on('mouseleave', el, function (e) {
				bg.css('transform', 'translate(0px, 0px)');
			})
		})
	},
	scrollMagic: {
		init: function () {
			let fn = this;

			let controller = new ScrollMagic.Controller({
				triggerHook: 'onLeave',
			});

			fn.visual(controller);
			fn.needs(controller);
			fn.map(controller);
			fn.career(controller);
			fn.review(controller);
			fn.count(controller);
		},
		visual: (controller) => {

			// 첫 번째 타임라인
			var timeline1 = new TimelineMax();
			timeline1.to(".sec_visual .sec_visual_step_intro p", 0.5, { scale: 0 });
			timeline1.to(".sec_visual .sec_visual_step_end", 1, { opacity: 1 });

			// 두 번째 타임라인
			var timeline2 = new TimelineMax();
			timeline2.to(".sec_visual .sec_visual_step_intro", 1, { opacity: 0 });
			timeline2.from(".sec_visual .sec_visual_step_end .balloon", 1, { scale: 0.86, x: 500, y: -200 });

			// 첫 번째 타임라인을 ScrollMagic에 추가
			var scene1 = new ScrollMagic.Scene({
				triggerElement: '.sec_visual_trigger', // trigger the animation when this element appears on screen
				triggerHook: "onLeave",
				duration: 800 // the animation duration
			})
			.setPin(".sec_visual")
			.setTween(timeline1)
			.addTo(controller)
			.on("end", function (e) {
				$('.sec_visual').addClass("fixed");
			});

			// 두 번째 타임라인을 ScrollMagic에 추가
			var scene2 = new ScrollMagic.Scene({
				triggerElement: '.sec_visual_trigger', // trigger the animation when this element appears on screen
				triggerHook: "onLeave",
				duration: 800 // the animation duration
			})
			.setTween(timeline2)
			.addTo(controller);
		},
		needs: (controller) => {
			var timeline1 = new TimelineMax();
			timeline1.to(".sec_visual .sec_visual_step_end .balloon", 1, { x: -200, y: -400 });

			var timeline2 = new TimelineMax();
			timeline2.to(".sec_visual .sec_visual_step_end p", 1, { opacity: 0 });

			var scene1 = new ScrollMagic.Scene({
				triggerElement: '.sec_needs_trigger', // trigger the animation when this element appears on screen
				triggerHook: "onEnter",
				duration: 1000 // the animation duration
			})
			.setTween(timeline1)
			.addTo(controller);

			var scene2 = new ScrollMagic.Scene({
				triggerElement: '.sec_needs_trigger', // trigger the animation when this element appears on screen
				triggerHook: "onEnter",
				duration: 1000 // the animation duration
			})
			.setTween(timeline2)
			.addTo(controller);
			
			var scene3 = new ScrollMagic.Scene({
				triggerElement: '.sec_needs_trigger', // trigger the animation when this element appears on screen
				triggerHook: "0.5",
			})
			.setClassToggle('.sec_needs','active')
			.addTo(controller);
		},
		map: (controller) => {
			var scene = new ScrollMagic.Scene({
				triggerElement: '.sec_map_trigger', // trigger the animation when this element appears on screen
				triggerHook: "0.5",
			})
			.setClassToggle('.sec_map','active')
			.addTo(controller);
		},
		career: (controller) => {
			var scene = new ScrollMagic.Scene({
				triggerElement: '.sec_career_trigger', // trigger the animation when this element appears on screen
				triggerHook: "0.5",
			})
			.setClassToggle('.sec_career','active')
			.addTo(controller);
		},
		review: (controller) => { 

			var Scene = new ScrollMagic.Scene({
				triggerElement: ".sec_review_trigger",
				triggerHook: "0.5",
				duration: $('.sec_review .content-container').height(),
			})
			.on('progress', function (e) {
				if ( e.progress >= 0 && e.progress < '0.40' ){
					$('.sec_review .content-container .left-content li').eq(0).addClass('on').siblings().removeClass('on');
				}else if ( e.progress > '0.33' && e.progress <= '0.75' ) {
					$('.sec_review .content-container .left-content li').eq(1).addClass('on').siblings().removeClass('on');
				}else if ( e.progress > '0.66' && e.progress <= 1 ){
					$('.sec_review .content-container .left-content li').eq(2).addClass('on').siblings().removeClass('on');
				}
			})
			.addTo(controller);
			
			var scene1 = new ScrollMagic.Scene({
				triggerElement: '.sec_career_trigger1', // trigger the animation when this element appears on screen
				triggerHook: "0.5",
			})
			.setClassToggle('.sec_career_trigger1','on')
			.addTo(controller);
			
			var scene2 = new ScrollMagic.Scene({
				triggerElement: '.sec_career_trigger2', // trigger the animation when this element appears on screen
				triggerHook: "0.5",
			})
			.setClassToggle('.sec_career_trigger2','on')
				.addTo(controller);
			
			var scene3 = new ScrollMagic.Scene({
				triggerElement: '.sec_career_trigger3', // trigger the animation when this element appears on screen
				triggerHook: "0.5",
			})
			.setClassToggle('.sec_career_trigger3','on')
			.addTo(controller);
		},
		count: (controller) => { 
			// 첫 번째 타임라인을 ScrollMagic에 추가
			var scene = new ScrollMagic.Scene({
				triggerElement: '.sec_count_trigger', // trigger the animation when this element appears on screen
				triggerHook: "onLeave",
				duration: 800 // the animation duration
			})
			.setPin(".sec_count")
			.addTo(controller)
			.on('progress', function (e) {
				$('.amount').html(Math.round(e.progress * 180));

				if ( e.progress >= 0 && e.progress < '0.20' ){
					$('.sec_count').attr("style","background-image:url('images/project/sec_count_bg1.png')");
				}else if ( e.progress > '0.20' && e.progress <= '0.35' ) {
					$('.sec_count').attr("style","background-image:url('images/project/sec_count_bg2.png')");
				}else if ( e.progress > '0.35' && e.progress <= '0.55' ) {
					$('.sec_count').attr("style","background-image:url('images/project/sec_count_bg3.png')");
				}else if ( e.progress > '0.55' && e.progress <= '0.70' ){
					$('.sec_count').attr("style","background-image:url('images/project/sec_count_bg4.png')");
				}else if ( e.progress > '0.70' && e.progress <= '0.85' ){
					$('.sec_count').attr("style","background-image:url('images/project/sec_count_bg5.png')");
				}else if ( e.progress > '0.85' && e.progress <= 1 ){
					$('.sec_count').attr("style","background-image:url('images/project/sec_count_bg6.png')");
				}
			
			})
		},
	},
	rolling: (obj,time = 1300) => {
		var num = 0;
		var maxNum = $(obj).find('li').length;
		setInterval(function() {
			$(obj).each(function() {
				$(this).find('li').removeClass('on');
				$(this).find('li').eq(num).addClass('on');
			});
			num++;
			if ( num == maxNum ) num = 0;
		}, time);
	},
	airplane: () => {
		// 비행기 요소를 가져옵니다.
		var airplane = document.getElementById('airplane');

		// 비행기의 초기 위치와 각도를 설정합니다.
		var airplaneX = 0;
		var airplaneY = 0;
		var airplaneAngle = 0;

		// 비행기를 마우스 움직임에 따라 이동시키는 함수입니다.
		function moveAirplane(event, x = 0, y = 0) {
			
			// 마우스의 현재 위치를 가져옵니다.
			var mouseX = event.clientX;
			var mouseY = event.clientY;

			// 비행기의 위치를 마우스의 위치로 설정합니다.
			airplane.style.left = mouseX + x - airplane.offsetWidth / 2 + 'px';
			airplane.style.top = mouseY + y - airplane.offsetHeight / 2 + 'px';

			// 비행기의 각도를 계산합니다.
			var deltaX = mouseX - airplaneX;
			var deltaY = mouseY - airplaneY;
			var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

			// 비행기의 방향을 마우스의 방향으로 설정합니다.
			airplane.style.transformOrigin = 'center center';
			airplane.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'deg)';
			airplane.style.position = 'fixed';

			// 비행기의 현재 위치와 각도를 업데이트합니다.
			airplaneX = mouseX;
			airplaneY = mouseY;
			airplaneAngle = angle;
		}

		// 마우스 움직임 이벤트에 moveAirplane 함수를 연결합니다.

		$('.sec_map').on('mousemove', function (e) {
			moveAirplane(e,54);
		})

		$('.sec_map').on('mouseleave', function () {
			$('#airplane').attr('style', '');
		})
	},
	/*
	scroll: {
		init: function(){
			//this.bg();
		},
		bg: () => {

			const	parallax = $('.parallax-scroll'),
					stopScrollAt = $('.parallax-scroll-end').offset().top; // 중지할 스크롤 위치 (예: 500px)

			let scrolled = $(window).scrollTop();

			$(window).on('scroll', function() {
				const scrollTop = $(window).scrollTop();
				const scrollDelta = scrollTop - scrolled;
				scrolled = scrollTop;

				if (scrollTop >= stopScrollAt) {
					parallax.css('transform', `translate3d(0, ${-stopScrollAt}px, 0)`);
					return;
				}

				parallax.css('transform', `translate3d(0, ${-scrollTop}px, 0)`);
			});

		}
	}
	*/
}