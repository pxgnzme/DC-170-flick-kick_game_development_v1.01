// VERSION 1.01

var winWidth,winHeight,gameOb,resizeTimer;

var postsWidth = 250;
var postsHeight = 500;

var postsHFactor = postsWidth/postsHeight;
var postsWFactor = postsHeight/postsWidth;

var myElement,mc;

var initLoad = 0;

var mobile = false;

var skyRatio = 394/2000;

var myLoader = html5Preloader();

//makeFullscreen();

var playerTicker = 0;

var players = [

	{
		name:'Shaun Johnson',
		src:'player_01.jpg'
	},

	{
		name:'Manu Vatuvei',
		src:'player_02.jpg'
	},

	{
		name:'Sam Tomkins',
		src:'player_03.jpg'
	},

	{
		name:'Konrad Hurrell',
		src:'player_04.jpg'
	},

	{
		name:'Stacey Jones',
		src:'player_05.jpg'
	},

	{
		name:'Ruben Wiki',
		src:'player_06.jpg'
	}

];

var num_players = players.length;

var selectedPlayer = {

};

$(document).ready(function(){

	if(jQuery.browser.mobile){

		mobile = true;

	}else{

		$('#mobileModal').foundation('reveal', 'open');

	}

	//$.logThis("num_players :> "+num_players);

	myLoader.addFiles('img/stadium_01_front.png','img/stadium_01_right.png','img/stadium_01_left.png','img/warriors-logo.png','img/game_logo.png','img/player_01.jpg','img/app_bg.jpg','img/grass_01_left.jpg','img/grass_01_right.jpg','img/grass_01_front.jpg','img/share_btn.png','img/play_now_btn.png','img/again_btn.png','img/signup_btn.png','img/next_btn.png','img/login_btn.png','img/sky_bg_grad.jpg'); 
	
	myLoader.on('finish', function(){
		
		$('#loading').fadeOut(500,function(){
			
			//$('#stage1').fadeIn(1000,function(){

				loadNextStage("#loading","#stage1");
		
				gameLoaded();
				
			//});
		
		});
	
	});

	

});

function loadNextStage(prev,next){

	$.logThis(prev +" / "+next);

	$(prev).removeClass('current').hide();
	$(next).addClass("current").show();

	positionInitScreen();

}

function gameLoaded(){

	myElement = document.getElementById('action_layer');
	mc = new Hammer(myElement);

	winWidth = $("#container").innerWidth();
	winHeight = $("#container").innerHeight();

	resizeListeners();

	$(".current .init_info").css('margin-top', ((winHeight - $(".current .init_info").outerHeight())/2)*0.8);

	$('.enter_btn').on('click',function(e){

		e.preventDefault();

		$.logThis("enter");

		if(mobile){
		
			$("#game").fullScreen(true);

		}

		loadNextStage("#stage1","#stage2");

	});

	$('#login_btn').on('click',function(e){

		e.preventDefault();
		
		loadNextStage("#stage2","#stage3");

		loadSelectionScreen(0);
		

	});

	$('#signup_btn').on('click',function(e){

		e.preventDefault();

	});

	$('.play_now').on('click',function(e){

		e.preventDefault();

		selectedPlayer.name = players[playerTicker].name;

		selectedPlayer.src = players[playerTicker].src;

		loadNextStage("#stage3","#stage4");

		launchGame();

	});

	$('#select_left').on('click',function(){

		$.logThis("left :> "+playerTicker);

		if(playerTicker == 0){

			playerTicker = num_players-1;

		}else{

			playerTicker --;

		}
		
		loadSelectionScreen(1);

	});

	$('#select_right').on('click',function(){

		$.logThis("right");

		if(playerTicker == (num_players-1)){

			playerTicker = 0;

		}else{

			playerTicker ++;

		}

		loadSelectionScreen(1);

	});

};

function loadSelectionScreen(mode){

	if(mode == 0){

		$('.player_select .avartar').html("<img src='img/"+players[playerTicker].src+"' alt='"+players[playerTicker].name+"' />");


		$('#pname').html(players[playerTicker].name);

		positionInitScreen();


	}else{

		$('#pname').hide();

		$('.player_select .avartar').fadeOut(500,function(){

			$('.player_select .avartar').html("<img src='img/"+players[playerTicker].src+"' alt='"+players[playerTicker].name+"' />").fadeIn(500,function(){

					$('#pname').html(players[playerTicker].name).fadeIn(500);

					positionInitScreen();

				}
			);

			

		});

	}

	

};

function launchGame(){

	$('#game_container').show();
	$('#action_layer').show();

	winWidth = $("#container").innerWidth();
	winHeight = $("#container").innerHeight();

	gameOb = new flickKick();
	gameOb.createGame(winWidth, winHeight);

	setupHammer();

};

function setupHammer(){

	mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL, velocity:0});


	mc.on("swipe", function(ev) {

	    if(!kickDisabled){

	    	kickDisabled = true;
	    
	    	gameOb.launchKick(ev);
		
		}else{

			$.logThis("kick disabled");

		}

	});

}

function positionInitScreen(){

	winWidth = $("#container").innerWidth();
	winHeight = $("#container").innerHeight();

	$(".current .init_info").css('margin-top', ((winHeight - $(".current .init_info").outerHeight())/2)*0.8);

}

function resizeListeners(){

	$(window).on('resize',function(){

		//gameOb.wipeCanvas();

		//clearTimeout(resizeTimer);
		//resizeTimer = setTimeout(resizeCanvas, 100);

		winWidth = $("#container").innerWidth();
		winHeight = $("#container").innerHeight();

		positionInitScreen();
		

	});

	$(window).on('orientationchange',function(){

		positionInitScreen();

		//alert("changed orientation");

		//gameOb.wipeCanvas();

		//gameOb.wipeCanvas();

		//clearTimeout(resizeTimer);
		//resizeTimer = setTimeout(resizeCanvas, 100);

	});

	

}

function goFullScreenApi(){

	// full-screen available?
	if (
	    document.fullscreenEnabled ||
	    document.webkitFullscreenEnabled ||
	    document.mozFullScreenEnabled ||
	    document.msFullscreenEnabled 
	){
		//alert("Full screen enabled");

		//$('#fullscreen').on('click',function(){

			//var i = document.getElementById("game_stage");
			var i = document.getElementById("game");
			 
			// go full-screen
			if (i.requestFullscreen) {
			    i.requestFullscreen();
			   
			} else if (i.webkitRequestFullscreen) {
			    i.webkitRequestFullscreen();
			    
			} else if (i.mozRequestFullScreen) {
			    i.mozRequestFullScreen();
			    
			} else if (i.msRequestFullscreen) {
			    i.msRequestFullscreen();
			    
			}

			launchGame();

		//});
		
	}else{

		launchGame();
		
		//alert("for best experience please pin this to your home page");
		
	}

};

$(document).bind("fullscreenchange", function() {
    //console.log("Fullscreen " + ($(document).fullScreen() ? "on" : "off"));

    //alert("full screen change");

    if(initLoad < 1){

    	setTimeout(function(){
    		//launchGame();
    		positionInitScreen();
    	},1500);
    	
    	initLoad ++;
    }
    

});

/*function resizeCanvas(){

	$.logThis("resize");

	winWidth = $(window).innerWidth();
	winHeight = $(window).innerHeight();

	gameOb.resizeGame(winWidth, winHeight);

}*/

// =====================================================================================================
// ADDITIONAL FUNCTIONS
// =====================================================================================================
// validate email

function validateEmail(email){ 

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
	
	if(!reg.test(email)){ 
	
		return false;
	
	}else{
		
		return true;
		
	} 

} 

function getUniqueTime() {
	var time = new Date().getTime();
	while (time == new Date().getTime());
	return new Date().getTime();
}

// resize event

//Make full screen

function makeFullscreen(){

	window.addEventListener("load", function(){ 
       if(document.height <= window.outerHeight)
       {
           document.body.style.height = (window.outerHeight + 50) + 'px';
           setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
       }
       else
       {
           setTimeout( function(){ window.scrollTo(0, 50); }, 0 );
       }
   }
   );

}

//detect mobile

(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


// CONSOLE LOG FUNCTION ---------------------------------------------
// taken from http://www.nodans.com/index.cfm/2010/7/12/consolelog-throws-error-on-Internet-Explorer-IE

jQuery.logThis = function(text){
  
   if((window['console'] !== undefined)){
     
        console.log(text);
    
   }

}

