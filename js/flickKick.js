/*
WARRIORS FLICK KICK OBJECT
AUTHOR: FRAZER CAMERON @pixelgiantnz NZME
VERSION 1.01
*/

var kickDisabled = false;

var canvas,context;

var curSkyPos = 0;



function flickKick(){

	var obj = this;

	this.score = {

		totalKicks:0,
		totalOver:0,
		curScore:0,
		curLevel:1

	};

	this.level = {

		curtime:40,
		stage1:0.50,
		stage2:0.75,
		stage3:0.90,
		stage4:1,
		multi1:2,
		multi2:3,
		multi3:4,
		multi4:5,
		multi1Hex:"#B85C43",
		multi2Hex:"#A5C8D6",
		multi3Hex:"#D9B655",
		multi4Hex:"#E5E5E5",
		levelScore:0,
		parScore:20,
		alive:true
	
	};

	//this.paused = true;
	this.inflight = false;

	this.skyTimer;

	this.world = {

		postHeight:1510,
		postThick:15,
		barheight:450,
		postWidth:400,
		dToPosts:600,
		cameraHeight:125,
		fovAddedMaxHtAtPosts:300,
		gravity:30,
		pitchAngle:60,
		dToScreen:15,
		dSceenToBall:50,
		balllength:50,
		ballWidth:35,
		flightFrames:30,
		vfactor:70,
		windFactor:0,
		windCap:0.5,
		curView:1,
		ballPos:0

	};

	this.ball = {

		speed:180,
		angle:70,
		gravity:30,
		gAngle:0,
		gDir:0,
		curFF:0,
		state:0,
		curX:0,
		curY:0,
		teebase:0,
		hitV:false,
		hitH:false,
		postHitW:0,
		curWind:0,
		curDtoPosts:0

	};

	this.indicator = {
		x:0,
		y:0,
		totalFrames:10,
		alive:false,
		mode:0,
		curFrame:0,
		radius:2
	}

	this.posts = {

		postsScreenWidth:0,
		topPostsScreenY:0,
		postsScreenHeight:0,
		sideDiff:0,
		padHeight: 0.65,
		centerAngle:0,
		postsBaseRScreen:0

	};

	this.logoImageObj = new Image();

	this.vodaObj = new Image();

	this.vodaObjL = new Image();

	this.curPostsVars = {

	};
	

	this.createGame = function(w,ht){

		//obj.runSkyTimer();

		obj.canvasWidth = w;
		obj.canvasheight = ht;
		obj.worldHeight = obj.canvasheight;
		obj.worldWidth = obj.worldHeight;

		$('#game_container').html("<canvas width='"+w+"' height = '"+ht+"' id = 'game_stage'/>");

		obj.midX = w/2;

		obj.world.ballHfactor = obj.world.ballWidth/obj.world.balllength;

		obj.world.fov = (Math.atan((obj.world.fovAddedMaxHtAtPosts+(obj.world.postHeight-obj.world.cameraHeight))/(obj.world.dToPosts+obj.world.dToScreen+obj.world.dSceenToBall)))/(Math.PI/180);

		obj.world.fov = 70;
		canvas = document.getElementById('game_stage');
		context = canvas.getContext('2d');

		obj.drawWorld();

		var bgWFactor = 1600/405;

		$('#bg'+obj.world.curView).show();
		$('#grass'+obj.world.curView).show();
		$('#line'+obj.world.curView).show();

		$('.bg').css("background-size", (winHeight/2)*bgWFactor+"px "+winHeight/2+"px");

		$('.bg').css("background-position", "center "+winHeight*0.03+"px");

		$('.grass').css("background-size", "100% "+winHeight*0.5+"px");
		obj.updateWind();

		$('#game_skin .avartar').html("<img src='img/"+selectedPlayer.src+"' alt='"+selectedPlayer.name+"' />");

		ga('send', 'event', 'game stats', 'Game created', 1);
	
	};

	//wipe canvas -- 
	this.wipeCanvas = function() {
	
		context.clearRect(0,0,obj.canvasWidth,obj.canvasheight);	
		
	};

	this.drawWorld = function(){

		obj.drawPosts();

		$('#line1').css('background-position', 'center '+obj.posts.postsBaseRScreen+"px");

		$('#line2').css('background-position', 'center '+(obj.posts.postsBaseMid-22)+"px");

		$('#line3').css('background-position', 'center '+(obj.posts.postsBaseRScreen-22)+"px");

		obj.getBallSteps(0);

	};

	this.drawTee = function(){

		context.save();

		context.translate(obj.midX,obj.ball.teebase);

		context.beginPath();

		context.moveTo(obj.ball.teeWidth*-1, 0);
      	context.lineTo(0, obj.ball.teeWidth*-1);
      	context.lineTo(obj.ball.teeWidth, 0);

      	context.quadraticCurveTo(0, 30, obj.ball.teeWidth*-1, 0);
    
      	context.lineJoin = 'round';
      	context.fillStyle = '#fff568';
	    context.fill();

	    context.clip();

	    context.beginPath();
	    context.arc(0, obj.ball.teeWidth*-1, obj.ball.teeWidth/1.5, 0, 2 * Math.PI, false);
	    context.fillStyle = '#d6ce57';
	    context.fill();

      	context.restore();

	};

	this.drawPosts = function(){

		if (typeof obj.curPostsVars.init === 'undefined') {
		    
			obj.curPostsVars.init = true;

		}

		var inside = true;
		var left = false;

		if(obj.posts.sideDiff > ((obj.world.postWidth/2)*-1) && obj.posts.sideDiff < (obj.world.postWidth/2)){

			var rPostDiffToBall = (obj.world.postWidth/2)-obj.posts.sideDiff;
		
		}else{

			var rPostDiffToBall = obj.posts.sideDiff-(obj.world.postWidth/2);

			 inside = false;

			 if(obj.posts.sideDiff < 0){

			 	left = true;

			 }

		}

		var rPostd = Math.sqrt(Math.pow(rPostDiffToBall,2)+Math.pow(obj.world.dToPosts,2));

		var rPostAngle = Math.atan(700/rPostDiffToBall);
		
		if(obj.posts.sideDiff > ((obj.world.postWidth/2)*-1) && obj.posts.sideDiff < (obj.world.postWidth/2)){

			var centerAngle = ((90 * (Math.PI/180)) - Math.atan(700/obj.posts.sideDiff))+(90 * (Math.PI/180));

			var rPostAngleFromCemter = centerAngle - rPostAngle;

		}else{

			var centerAngle = Math.atan(700/obj.posts.sideDiff);

			var rPostAngleFromCemter = rPostAngle - centerAngle;

		}

		obj.posts.centerAngle = centerAngle;

		var rPostwidthFromCenter =  Math.sin(rPostAngleFromCemter)*rPostd;

		var rPostToCamera = rPostwidthFromCenter/Math.tan(rPostAngleFromCemter);

		var WidthOfFovAtRPost = Math.tan(obj.world.fov * Math.PI/180)*rPostToCamera;

		var rthickness = (obj.world.postThick/WidthOfFovAtRPost)*(obj.worldHeight/2);

		var screenRPost = (rPostwidthFromCenter/(WidthOfFovAtRPost/2))*(obj.worldHeight/2); 

		obj.posts.screenRPost = screenRPost;

		var rPostHeight = (obj.world.postHeight/WidthOfFovAtRPost)*(obj.worldHeight/2);

		var topRPostProjY = (obj.world.postHeight-obj.world.cameraHeight)/WidthOfFovAtRPost;

		var topRPostsScreenY = (obj.worldHeight/2) - ((obj.worldHeight/2)*topRPostProjY);

		obj.posts.postsBaseRScreen = topRPostsScreenY +rPostHeight;

		var rCrossBarHeight = (obj.world.barheight/WidthOfFovAtRPost)*(obj.worldHeight/2);

		context.save();
		context.translate(obj.midX,topRPostsScreenY);

		context.beginPath();

		context.rect(screenRPost, 0, rthickness, rPostHeight);

		var grd1 = context.createLinearGradient(screenRPost, 0, screenRPost+rthickness, 0);
	 
	    grd1.addColorStop(0, '#AAA');   
	  
	    grd1.addColorStop(1, '#FFF');
	
		context.fillStyle = grd1;

	    context.fill();

	    context.beginPath();

	    context.rect(screenRPost-(rthickness*3), rPostHeight-(rCrossBarHeight*obj.posts.padHeight), rthickness*7, rCrossBarHeight*obj.posts.padHeight);

	    var grd4 = context.createLinearGradient(screenRPost-(rthickness*3), 0, screenRPost+(rthickness*3), 0);

	    if(inside){

		    grd4.addColorStop(0.2, '#b52624');

		    grd4.addColorStop(0.3, '#c02a2c');
	


	    }else{

	    	if(left){

		    	grd4.addColorStop(0.3, '#b52624');    
		    	
		    	grd4.addColorStop(0.4, '#c02a2c');

	    	}else{
		    	
		    	grd4.addColorStop(0.7, '#c02a2c');    
		    	
		    	grd4.addColorStop(0.8, '#cc3634');

			}

	    }

	    context.fillStyle = grd4;

	    context.fill();

	    obj.vodaObj.src = 'img/voda.png';

	    if(inside){

		    context.drawImage(obj.vodaObj, screenRPost-(rthickness*1), rPostHeight-(((rCrossBarHeight*obj.posts.padHeight)/2)+((rthickness*4)/2)),rthickness*4,rthickness*4);


	    }else{

	    	if(left){

		    	$.logThis("left :> "+left);

		    	context.drawImage(obj.vodaObj, screenRPost, rPostHeight-(((rCrossBarHeight*obj.posts.padHeight)/2)+((rthickness*3)/2)),rthickness*3,rthickness*3);

	    	}else{

	    		$.logThis("right :> "+left);
		    	
		    	context.drawImage(obj.vodaObj, screenRPost-(rthickness*2), rPostHeight-(((rCrossBarHeight*obj.posts.padHeight)/2)+((rthickness*3)/2)),rthickness*3,rthickness*3);

			}

	    }

	    var sx = -5;

	    var sy = 0;

	    context.transform(1, sy, sx, 1, 0, 0);

	    context.beginPath();

	    if(obj.posts.sideDiff < 0){

	    	var rShearAjustment = 22.8;

	    }else if(obj.posts.sideDiff == 0){

	    	var rShearAjustment = 22.6;

	    }else{

	    	var rShearAjustment = 23.78;

	    }

	    context.rect(screenRPost*rShearAjustment, rPostHeight, rthickness*7, rCrossBarHeight*obj.posts.padHeight*0.2);

	    var grd10 = context.createLinearGradient(screenRPost*rShearAjustment, rPostHeight, screenRPost*rShearAjustment, rPostHeight+rCrossBarHeight*obj.posts.padHeight*0.2);

	    grd10.addColorStop(1, 'rgba(1,1,1,0.0)'); 

        grd10.addColorStop(0, 'rgba(0,0,0,0.3)');

	    context.fillStyle = grd10;

	    context.fill();

		context.restore();

		var lPostDiffToBall = obj.posts.sideDiff+(obj.world.postWidth/2);

		var lPostd = Math.sqrt(Math.pow(lPostDiffToBall,2)+Math.pow(obj.world.dToPosts,2));

		var lPostAngle = Math.atan(700/lPostDiffToBall);

		var lPostAngleFromCemter = centerAngle-lPostAngle;

		var lPostwidthFromCenter =  Math.sin(lPostAngleFromCemter)*lPostd;

		var lPostToCamera = lPostwidthFromCenter/Math.tan(lPostAngleFromCemter);

		var WidthOfFovAtLPost = Math.tan(obj.world.fov * Math.PI/180)*lPostToCamera;

		var screenLPost = (lPostwidthFromCenter/(WidthOfFovAtLPost/2))*(obj.worldHeight/2); 

		obj.posts.screenLPost = screenLPost;

		var lPostHeight = (obj.world.postHeight/WidthOfFovAtLPost)*(obj.worldHeight/2);

		var topLPostProjY = (obj.world.postHeight-obj.world.cameraHeight)/WidthOfFovAtLPost;

		var topLPostsScreenY = (obj.worldHeight/2) - ((obj.worldHeight/2)*topLPostProjY);

		obj.posts.postsBaseLScreen = topLPostsScreenY +lPostHeight;

		obj.posts.postsBaseMid = ((obj.posts.postsBaseRScreen - obj.posts.postsBaseLScreen)/2)+obj.posts.postsBaseLScreen;

		var lthickness = (obj.world.postThick/WidthOfFovAtLPost)*(obj.worldHeight/2);

		var lCrossBarHeight = (obj.world.barheight/WidthOfFovAtLPost)*(obj.worldHeight/2);

		context.save();
		context.translate(obj.midX,topLPostsScreenY);

		context.beginPath();

		context.rect((screenLPost+lthickness)*-1, 0, lthickness, lPostHeight);

		var grd2 = context.createLinearGradient((screenLPost+lthickness)*-1, 0, screenLPost*-1, 0);

	    grd2.addColorStop(0, '#AAA');   
	    
	    grd2.addColorStop(1, '#FFF');
	
		context.fillStyle = grd2;

	    context.fill();

	    context.beginPath();

	    context.rect((screenLPost+lthickness+(lthickness*3))*-1, lPostHeight-(lCrossBarHeight*obj.posts.padHeight), lthickness*7, lCrossBarHeight*obj.posts.padHeight);

	    var grd5 = context.createLinearGradient((screenLPost+lthickness+(lthickness*3))*-1, 0, (screenLPost-(lthickness*3))*-1, 0);

	    if(inside){
		    
		    grd5.addColorStop(0.7, '#c02a2c'); 

		    grd5.addColorStop(0.8, '#cc3634');


	    }else{

	    	if(left){

		    	grd5.addColorStop(0.3, '#b52624');    
		    	
		    	grd5.addColorStop(0.4, '#c02a2c');

	    	}else{

			    grd5.addColorStop(0.6, '#c02a2c');    
			   
			    grd5.addColorStop(0.7, '#cc3634');

			}

	    }

	    context.fillStyle = grd5;

	    context.fill();

	    obj.vodaObjL.src = 'img/voda.png';

	    if(inside){

		    context.drawImage(obj.vodaObjL, (screenLPost+(lthickness*3))*-1, lPostHeight-(((lCrossBarHeight*obj.posts.padHeight)/2)+((lthickness*4)/2)),lthickness*4,lthickness*4);


	    }else{

	    	if(left){

		    	$.logThis("left :> "+left);

		    	context.drawImage(obj.vodaObjL, (screenLPost+lthickness)*-1, lPostHeight-(((lCrossBarHeight*obj.posts.padHeight)/2)+((lthickness*3)/2)),lthickness*3,lthickness*3);

	    	}else{

	    		$.logThis("right :> "+left);
		    	
		    	context.drawImage(obj.vodaObjL, (screenLPost+(lthickness*3))*-1, lPostHeight-(((lCrossBarHeight*obj.posts.padHeight)/2)+((lthickness*3)/2)),lthickness*3,lthickness*3);

			}

	    }

	    var sx = -5;

	    var sy = 0;

	    context.transform(1, sy, sx, 1, 0, 0);

	    context.beginPath();

	    if(obj.posts.sideDiff < 0){

	    	var lShearAjustment = 21.7;

	    }else if(obj.posts.sideDiff == 0){

	    	var lShearAjustment = 20.6;
	    }else{

	    	var lShearAjustment = 20.8;

	    }

	    context.rect(screenLPost*lShearAjustment, lPostHeight, lthickness*7, lCrossBarHeight*obj.posts.padHeight*0.2);

	     var grd11 = context.createLinearGradient(screenLPost*lShearAjustment, lPostHeight, screenLPost*lShearAjustment, lPostHeight+lCrossBarHeight*obj.posts.padHeight*0.2);

	    grd11.addColorStop(1, 'rgba(1,1,1,0.0)'); 

        grd11.addColorStop(0, 'rgba(0,0,0,0.3)');

	    context.fillStyle = grd11;

	    context.fill();

		context.restore();

		context.beginPath();

		context.moveTo(obj.midX + screenRPost,topRPostsScreenY+(rPostHeight-rCrossBarHeight+(rthickness/2)));

		context.lineTo(obj.midX-screenLPost, topLPostsScreenY + (lPostHeight-lCrossBarHeight+(lthickness/2)));

		context.lineTo(obj.midX-screenLPost, topLPostsScreenY + (lPostHeight-lCrossBarHeight-(lthickness/2)));

		context.lineTo(obj.midX + screenRPost, topRPostsScreenY + (rPostHeight-rCrossBarHeight- (rthickness/2)));

		context.lineTo(obj.midX + screenRPost,topRPostsScreenY+(rPostHeight-rCrossBarHeight+(rthickness/2)));

	    var grd3 = context.createLinearGradient(obj.midX+screenRPost, 0, obj.midX+(screenLPost*-1), 0);

	    grd3.addColorStop(0, '#AAA');   

	    grd3.addColorStop(0.3, '#FFF');
	    grd3.addColorStop(1, '#ccc');
	
		context.fillStyle = grd3;

      	context.fill();

		context.restore();

	};

	this.refreshWorld = function(){

		obj.drawPosts();

		obj.drawTee();

		obj.getBallTrad();

	};

	this.getBallTrad = function(){

		if(obj.ball.curFF <= obj.world.flightFrames){
		
			obj.getBallSteps(1);
			obj.ball.curFF++;

		}else{

			obj.indicator.x = obj.ball.curX;
			obj.indicator.y = obj.ball.curY;

			obj.ball.hitV = obj.hitV();
			obj.ball.hitH = obj.hitH();

			obj.ball.curFF = 0;
			obj.ball.state = 0;
			obj.getBallSteps(0);

		}

	};

	this.hitV = function(){

		//return true;

		if (obj.getBallHeightAtX(obj.getDistance()) > obj.world.barheight){

			return true;

		}else{

			return false;

		}

	};

	this.hitH = function(){

		var hX = Math.tan(obj.ball.gAngle * Math.PI/180)*obj.getDistance();

		var cameraToBall = obj.getDistance() + obj.world.dToScreen + obj.world.dSceenToBall;

		var widthOfFovAtBall = Math.tan(obj.world.fov * Math.PI/180)*cameraToBall;

		var hXFactor = hX/(widthOfFovAtBall/2);

		if(mobile){

			var wind = (obj.ball.curWind*obj.world.windCap)*obj.ball.curFF;
		
		}else{

			var wind = obj.ball.curWind*obj.ball.curFF;

		}

		var distanceFromCenter = (obj.midX*hXFactor)+wind;

		if(obj.ball.gDir > 0){

			distanceFromCenter = (obj.midX*hXFactor)-wind;

		}

		if(distanceFromCenter < 0 ){

			distanceFromCenter = distanceFromCenter*-1;

		}

		if(obj.ball.gDir > 0 ){

			var postDiff =  obj.posts.screenLPost;
		
		}else{
			var postDiff = obj.posts.screenRPost;
		}

		if(distanceFromCenter < postDiff){

			return true;

		}else{

			return false;

		}

	};


	this.getBallSteps = function(mode){

		var ts =  obj.getDistance()/obj.world.flightFrames;

		if(obj.getBallHeightAtX(ts*obj.ball.curFF) < 0 ){

			obj.ball.curFF = obj.world.flightFrames;

		}else{

			var curBallLenght = obj.ballLenghtAtX(ts*obj.ball.curFF);
			var curBallWidth = curBallLenght*obj.world.ballHfactor;

			// get current vertical
			var curBallV =  obj.getTradScreenV(ts*obj.ball.curFF,obj.getBallHeightAtX(ts*obj.ball.curFF));

			var curBallH = obj.getTradScreenH(ts*obj.ball.curFF);

			obj.ball.curX = curBallH;
			obj.ball.curY = curBallV;

			if(!obj.inflight){

				obj.ball.teebase = (curBallV + (curBallLenght/2));
				obj.ball.teeWidth = (curBallLenght/2)/2;
			
			}

			obj.drawTee();

			if(mode == 0){

				obj.drawBall(curBallH, curBallV, curBallLenght,1);

				obj.inflight = false;
				obj.updateWind();
			}else{

				obj.drawBall(curBallH, curBallV, curBallLenght,0);

			}

		}


	}

	this.drawBall = function(h,v,ballL,logo){

		var curState;

		context.save();

		context.translate(h,v);

		var ballAngle = obj.ball.gAngle;

		if(obj.ball.gDir > 0){

			ballAngle = ballAngle*-1;

		}

		context.rotate(ballAngle * Math.PI/180);	

		if(obj.ball.state > 0){

			curState = 0.7;
			obj.ball.state = 0;

		}else{

			curState = 1;
			obj.ball.state = 1;

		}

		context.scale(obj.world.ballHfactor, curState);	

		context.beginPath();
      	context.arc(0, 0, ballL/2, 0, 2 * Math.PI, false);	

		var grd = context.createRadialGradient((ballL/2)*-0.8,(ballL/2)*-0.8, ((ballL/2)/10), 0,0, (ballL/2)*2);
		// light blue
		grd.addColorStop(0, '#eee');

		// dark blue
		grd.addColorStop(1, '#666');
		
		context.fillStyle = grd;
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = '#999';
		context.stroke();


		context.beginPath();
		context.moveTo(0, 0-(ballL/2));
		context.lineTo(0, 0+(ballL/2));
		context.stroke();

		var logoFactor = 50/69;

		if(logo == 1){

			obj.logoImageObj.src = 'img/ball-logo.png';

			context.drawImage(obj.logoImageObj, ((ballL*0.8)*obj.world.ballHfactor)/-2, ((ballL*0.8)*obj.world.ballHfactor)/-2.8,(ballL*0.8)*obj.world.ballHfactor,(ballL*0.8)*obj.world.ballHfactor);

			context.restore();

		}else{
			context.restore();
		}
		

	};

	this.showIndicator = function(){

		obj.drawIndicator();

		kickDisabled = false;
		

	};

	this.drawIndicator = function(){


		var indicatorColor = 'red'

		obj.kickResult();

		obj.ball.hitV = false;
		obj.ball.hitH = false;

		

	}

	this.kickResult = function(){

		obj.score.totalKicks ++;

		var resTxt = "MISS!";

		if(obj.ball.hitV && obj.ball.hitH){

			resTxt = "GOAL!";

			obj.score.totalOver ++;

		}

		ga('send', 'event', 'game stats', resTxt, 1);

		$('#result_container').html("<h2>"+resTxt+"</h2>");

		if(obj.level.alive){

			$("#result_container").fadeIn(200,function(){

				$("#result_container").delay(500).fadeOut(200);

			});

			$("#score-fraction").html(obj.score.totalOver+"/"+obj.score.totalKicks);

			var hitPercent = obj.score.totalOver/obj.score.totalKicks;

			var tokenHex = "";

			if(hitPercent < obj.level.stage1){

				$('#score-percent').hide();

			}

			if(hitPercent >= obj.level.stage1){

				$('#score-percent').show();
				tokenHex = obj.level.multi1Hex;

			}

			if(hitPercent > obj.level.stage2){

				$('#score-percent').show();
				tokenHex = obj.level.multi2Hex;

			}

			if(hitPercent > obj.level.stage3){

				$('#score-percent').show();
				tokenHex = obj.level.multi3Hex;

			}

			if(hitPercent == obj.level.stage4){

				$('#score-percent').show();
				tokenHex = obj.level.multi4Hex;

			}

			$('#score-percent .fi-star').css('color', tokenHex);

		}else{

			$("#result_container").fadeIn(200,function(){

				$("#result_container").delay(500).fadeOut(200,function(){

					obj.endLevel();

				});

			});

		}

	};

	this.getBallHeightAtX = function(x){

		var vX = obj.ball.speed * Math.cos(obj.ball.angle * Math.PI/180);
		
		var vY = obj.ball.speed * Math.sin(obj.ball.angle * Math.PI/180);

		var hAtX = ((x * vY)/vX) - (0.5 * obj.ball.gravity * (Math.pow(x,2)/Math.pow(vX,2)));

		return hAtX;

	};



	this.getTradScreenV = function(d,ht){

		//$.logThis("d :> "+d+" h :> "+ht);

	 	var cameraToBall = d + obj.world.dToScreen + obj.world.dSceenToBall;

		var heightOfFovAtBall = Math.tan(obj.world.fov * Math.PI/180)*cameraToBall;

		var ballProjYFactor = (obj.world.cameraHeight-ht)/heightOfFovAtBall;

		var topBallScreenY;

		if(ballProjYFactor < 0){

			ballScreenY = (obj.worldHeight/2) - ((obj.worldHeight/2)*(ballProjYFactor*-1));

		}else{

			ballScreenY = (obj.worldHeight/2) + ((obj.worldHeight/2)*ballProjYFactor);

		}

		return ballScreenY;

	};

	this.getTradScreenH = function(d){

		var cameraToBall = d + obj.world.dToScreen + obj.world.dSceenToBall;

		if(mobile){

			var wind = (obj.ball.curWind*obj.world.windCap)*obj.ball.curFF;
		
		}else{

			var wind = obj.ball.curWind*obj.ball.curFF;

		}

		var hX = Math.tan(obj.ball.gAngle * Math.PI/180)*d;

		var widthOfFovAtBall = Math.tan(obj.world.fov * Math.PI/180)*cameraToBall;

		var hXFactor = hX/(widthOfFovAtBall/2);

		var ballScreenH;

		if(obj.ball.gDir > 0){

			ballScreenH = obj.midX - (obj.midX*hXFactor);

		}else{

			ballScreenH = obj.midX + (obj.midX*hXFactor);

		}

		return ballScreenH+wind;

	};


	this.ballLenghtAtX = function(d){

		var cameraToBall = d + obj.world.dToScreen + obj.world.dSceenToBall;

		var heightOfFovAtBall = Math.tan(obj.world.fov * Math.PI/180)*cameraToBall;

		var ballHeightFovFactor = obj.world.balllength/heightOfFovAtBall;

		var ballLenght = (obj.worldHeight/2)*ballHeightFovFactor;

		return ballLenght;

	};

	this.getDistance = function(){

		if(obj.posts.sideDiff == 0){

			var angleToBaseline = obj.posts.centerAngle-(obj.ball.gAngle*(Math.PI/180));

			var distanceToTravel = obj.world.dToPosts/Math.sin(angleToBaseline);

		}else{

			if(obj.ball.gDir > 0){

				var angleToBaseline = (90*(Math.PI/180)) - (obj.posts.centerAngle-(obj.ball.gAngle*(Math.PI/180)));

			}else{

				var angleToBaseline = (90*(Math.PI/180)) - (obj.posts.centerAngle+(obj.ball.gAngle*(Math.PI/180)));

			}	

			var distanceToTravel = obj.world.dToPosts/Math.cos(angleToBaseline);

		}
		

		if(distanceToTravel < 0){

			distanceToTravel = distanceToTravel*-1;

		}

		return distanceToTravel;

	};

	this.launchKick = function(ev){

		$.logThis("inflight :> "+obj.inflight+" :: alive :> "+obj.level.alive);
	
		if(!obj.inflight && obj.level.alive){


			ga('send', 'event', 'game stats', 'kick', 1);

			obj.inflight = true; 

			var velocityFactor;

		    obj.ball.gDir = 0;
		    var gestureAngle = 0;

		    if(ev.angle < 0){
		    	gestureAngle = ev.angle*-1;
			}else{
				 gestureAngle = ev.angle;
			}

			if(gestureAngle > 90){

				gestureAngle = gestureAngle-90;
				obj.ball.gDir = 1;

			}else{
				gestureAngle = 90-gestureAngle;
			} 

			if(gestureAngle > 60){
				gestureAngle = 60;
			}


			obj.ball.gAngle = gestureAngle;

		    if(ev.velocity < 0){

		    	velocityFactor = ev.velocity*-1;

		    }else{

		    	velocityFactor = ev.velocity;
		    }


		    if (velocityFactor < 2.8){

		    	velocityFactor = 2.8;

		    }else if(velocityFactor > 4){

		    	velocityFactor = 4;

		    }

		    obj.ball.speed = Number(velocityFactor)*obj.world.vfactor;

			obj.gameLoop();

			
		}else{


		}

	}

	this.launchTimer = function(){

		$('#result_container').html("<h2>GO</h2>");

		$("#result_container").fadeIn(200,function(){

			$("#result_container").delay(500).fadeOut(200,function(){

				setupHammer();
          		obj.runTimer();
			});

		});

	};

	this.runTimer = function(){

		$('#time-secs').html(obj.level.curtime);

		var timer = setTimeout(function(){

			obj.updateTime();

		},1000);

	}

	this.moveSky = function(){

		curSkyPos = curSkyPos +-1;

		$('#sky').css("background-position", curSkyPos+"px top");

		obj.runSkyTimer();

	};

	this.stopSkyTimer = function(){

		clearTimeout(skyTimer);

		$('#sky').css("background-position", "0px top");

	}

	this.updateTime = function(){

		obj.level.curtime--;

		if(obj.level.curtime > 0){

			$('#time-secs').html(obj.level.curtime);

	      	obj.runTimer(obj.level.curtime);
	    
		}else{

			obj.level.alive = false;

			$('#time-secs').html("END");

			if(!obj.inflight){

				obj.endLevel();

			}


		}

	}

	this.endLevel = function(){

		$('#time-secs').html("END");

			//obj.stopSkyTimer();

			var scoreFraction = obj.score.totalOver/obj.score.totalKicks;

			var multiplier = "0";

			var tokenHex = "";

			if(scoreFraction >= obj.level.stage1 && scoreFraction < obj.level.stage2){

				multiplier = obj.level.multi1;

				obj.level.levelScore = obj.score.totalOver * obj.level.multi1;

			}else if(scoreFraction >= obj.level.stage2 && scoreFraction < obj.level.stage3){

				multiplier = obj.level.multi2;

				obj.level.levelScore = obj.score.totalOver * obj.level.multi2;

			}else if(scoreFraction >= obj.level.stage3 && scoreFraction < obj.level.stage4){

				multiplier = obj.level.multi3;

				obj.level.levelScore = obj.score.totalOver * obj.level.multi3;

			}else if(scoreFraction == obj.level.stage4){

				multiplier = obj.level.multi4;

				obj.level.levelScore = obj.score.totalOver * obj.level.multi4;

			}else{

				obj.level.levelScore = obj.score.totalOver;

			}

			obj.score.curScore += obj.level.levelScore;

		
			if(scoreFraction < obj.level.stage1){

				$('#score-percent').hide();

			}

			if(scoreFraction >= obj.level.stage1){

				$('#score-percent').show();
				tokenHex = obj.level.multi1Hex;

			}

			if(scoreFraction > obj.level.stage2){

				$('#score-percent').show();
				tokenHex = obj.level.multi2Hex;

			}

			if(scoreFraction > obj.level.stage3){

				$('#score-percent').show();
				tokenHex = obj.level.multi3Hex;

			}

			if(scoreFraction == obj.level.stage4){

				$('#score-percent').show();
				tokenHex = obj.level.multi4Hex;

			}

			$('#score-percent .fi-star').css('color', tokenHex);

			if(obj.level.levelScore < obj.level.parScore){

				$("#endGame").html("<h2>TOO BAD!</h2><p>You got : "+obj.score.totalOver+"/"+obj.score.totalKicks+" <span class = 'score_multi'><i class='fi-star' id = 'score-star'></i> <small>x</small>"+multiplier+"</span><br />Level score: "+obj.level.levelScore+"<br />But you needed at least "+obj.level.parScore+" points to pass level "+obj.score.curLevel+"<br />You finished with "+obj.score.curScore+" total points</p><div class = 'row large-8 medium-12 small-10 large-centered medium-centered small-centered column'><ul class= 'button-group radius even-2'><li><a href='#' class = 'btn share_btn button brag' data-reveal-id='shareModal'>Brag to ya mates</a></li><li><a href='#' class = 'btn replay_btn button'>play again <i class='fi-refresh'></i></a></li></ul></div><div class = 'row large-8 medium-12 small-10 large-centered medium-centered small-centered column'><ul class= 'button-group radius even-2 leaders_btns'><li><a href='#' class = 'tiny leaders_btn secondary button leaders_daily'>Daily<br />Top Ten</a></li><li><a href='#' class = 'tiny leaders_btn button secondary leaders_all'>Overall<br />Top Ten</a></li></ul></div>");

				$('.score_multi').css('color',tokenHex);

				loadNextStage("#stage4","#endGame");

				$.post(

					'includes/log_score.php',
					
					{

						score:obj.score.curScore,
						level:obj.score.curLevel,
						nonce:nonce

					},

					function(data){

						if(data.status){

							$.logThis("successfull score save");
							ga('send', 'event', 'game stats', 'end game', 1);

						}else{

							$.logThis("failed score save");

						}

					},

					'json'

				);


			}else{

				$("#level_screen").html("<h2>NICE!</h1><p>You got : "+obj.score.totalOver+"/"+obj.score.totalKicks+" <span class = 'score_multi'><i class='fi-star' id = 'score-star'></i> <small>x</small>"+multiplier+"</span><br />Level score: "+obj.level.levelScore+"<br />Total score: "+obj.score.curScore+"</p><a href='#' class = 'btn next_btn button'>Continue</a>");

				$('.score_multi').css('color',tokenHex);

				$("#endLevel").show();


			}

			$('.replay_btn').on('click',function(e){

				e.preventDefault();

				ga('send', 'event', 'game stats', 'replay', 1);

				obj.startAgain();

			});

			$('.next_btn').on('click',function(e){

				e.preventDefault();

				switch(obj.world.curView){

					case 1:

					obj.world.curView = 2;
					obj.posts.sideDiff = 201;
	

					break;

					case 2: 

					obj.world.curView = 3;
					obj.posts.sideDiff = -201;
					
					break;

					case 3:

					obj.world.curView = 1;
					obj.posts.sideDiff = 0;

					break;

				}

				obj.resetLevel();

			});

	}

	this.resetLevel = function(){

		

		obj.level.levelScore = 0;
		obj.level.curtime = 40;
		obj.score.totalOver = 0;
		obj.score.curLevel++;
		obj.score.totalKicks = 0;
		obj.ball.curFF = 0;
		obj.ball.state = 0;

		obj.curPostsVars = {};

		$('#score-percent').hide();

		if(obj.world.windFactor != 6){

			obj.world.windFactor += 1;

		}

		if(obj.level.parScore < 90){

			obj.level.parScore += 5;
		}

		obj.updateWind();

		$('.bg').hide();
		$('#bg'+obj.world.curView).show();

		$('.grass').hide();
		$('#grass'+obj.world.curView).show();

		$('.line').hide();
		$('#line'+obj.world.curView).show();

		$("#endLevel").hide();

		$("#score-fraction").html(obj.score.totalOver+"/"+obj.score.totalKicks);

		obj.runTimer();

		obj.wipeCanvas();

		obj.drawWorld();

		obj.level.alive = true;


	};

	this.startAgain = function(){

		

		obj.world.curView = 1;
		obj.posts.sideDiff = 0;
		obj.score.curScore = 0;
		obj.world.windFactor = 0;
		obj.ball.curWind = 0;
		obj.score.curLevel = 1;

		obj.level.levelScore = 0;
		obj.level.curtime = 40;
		obj.score.totalOver = 0;
		obj.score.totalKicks = 0;
		obj.ball.curFF = 0;
		obj.ball.state = 0;

		obj.curPostsVars = {};

		$('#score-percent').hide();

		obj.updateWind();

		$('.bg').hide();
		$('#bg'+obj.world.curView).show();

		$('.grass').hide();
		$('#grass'+obj.world.curView).show();

		$('.line').hide();
		$('#line'+obj.world.curView).show();

		$("#endLevel").hide();

		$("#score-fraction").html(obj.score.totalOver+"/"+obj.score.totalKicks);

		$.post(

			'includes/log_play.php',
			
			{

				avartar:players[playerTicker].name,
				avartarId:playerTicker+1,
				nonce:nonce

			},

			function(data){

				if(data.status){

					user.pid = data.play_id;

					$.logThis("pid :> "+user.pid);

					loadNextStage("#endGame","#stage4");

					obj.runTimer();

					obj.wipeCanvas();

					obj.drawWorld();

					obj.level.alive = true;


				}else{

					$('#alert_text').html("<p>encounted an issue reconecting to the server please refresh your browser ERROR:05</p>");
					$('#alertModal').foundation('reveal', 'open');

				}

			},

			'json'

		);

	};

	this.updateWind = function(){

		$('.wind').show();
		$('.wind-indicator').html("");

		if(obj.world.windFactor > 2){

			var windSelector = Math.round(Math.random() * (obj.world.windFactor - (obj.world.windFactor-2)) + (obj.world.windFactor-2));

			var windSwitcher = Math.random() * (1 - (-1)) + (-1);

			if(windSwitcher < 0){

				windSelector = windSelector*-1;

			}

		}else{

			var windSelector = Math.round(Math.random() * (obj.world.windFactor - (obj.world.windFactor*-1)) + (obj.world.windFactor*-1));

		}

		obj.ball.curWind = windSelector;

		var displayWind = obj.ball.curWind;

		if(obj.ball.curWind == 0){

			$('.wind-indicator').html("");

		}else if(obj.ball.curWind < 0){

			$('.wind-right').html("");
			$('.wind-left').html("<i class='fi-arrow-left'></i>");

			displayWind = displayWind*-1;

		}else{

			$('.wind-left').html("");
			$('.wind-right').html("<i class='fi-arrow-right'></i>");

		}

		$('.wind').html(displayWind+"<small>km</small>");

			

	};

	//game loop
	this.gameLoop = function() {
		
		if(obj.inflight){
			
			obj.wipeCanvas();
			obj.refreshWorld();
	
			var gameInterval = setTimeout(obj.gameLoop, 1000 / 30);

		}else{

			obj.showIndicator();

		}
	  
	}

	
}