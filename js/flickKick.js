function flickKick(){var e=this;this.score={totalKicks:0,totalOver:0,curScore:0,curLevel:1},this.level={curtime:40,stage1:.5,stage2:.75,stage3:.9,stage4:1,multi1:2,multi2:3,multi3:4,multi4:5,multi1Hex:"#B85C43",multi2Hex:"#A5C8D6",multi3Hex:"#D9B655",multi4Hex:"#E5E5E5",levelScore:0,parScore:20,alive:!0},this.inflight=!1,this.skyTimer,this.world={postHeight:1510,postThick:15,barheight:450,postWidth:400,dToPosts:600,cameraHeight:125,fovAddedMaxHtAtPosts:300,gravity:30,pitchAngle:60,dToScreen:15,dSceenToBall:50,balllength:50,ballWidth:35,flightFrames:30,vfactor:70,windFactor:0,windCap:.5,curView:1,ballPos:0},this.ball={speed:180,angle:70,gravity:30,gAngle:0,gDir:0,curFF:0,state:0,curX:0,curY:0,teebase:0,hitV:!1,hitH:!1,postHitW:0,curWind:0,curDtoPosts:0},this.indicator={x:0,y:0,totalFrames:10,alive:!1,mode:0,curFrame:0,radius:2},this.posts={postsScreenWidth:0,topPostsScreenY:0,postsScreenHeight:0,sideDiff:0,padHeight:.65,centerAngle:0,postsBaseRScreen:0},this.logoImageObj=new Image,this.vodaObj=new Image,this.vodaObjL=new Image,this.curPostsVars={},this.createGame=function(t,l){e.canvasWidth=t,e.canvasheight=l,e.worldHeight=e.canvasheight,e.worldWidth=e.worldHeight,$("#game_container").html("<canvas width='"+t+"' height = '"+l+"' id = 'game_stage'/>"),e.midX=t/2,e.world.ballHfactor=e.world.ballWidth/e.world.balllength,e.world.fov=Math.atan((e.world.fovAddedMaxHtAtPosts+(e.world.postHeight-e.world.cameraHeight))/(e.world.dToPosts+e.world.dToScreen+e.world.dSceenToBall))/(Math.PI/180),e.world.fov=70,canvas=document.getElementById("game_stage"),context=canvas.getContext("2d"),e.drawWorld();var o=1600/405;$("#bg"+e.world.curView).show(),$("#grass"+e.world.curView).show(),$("#line"+e.world.curView).show(),$(".bg").css("background-size",winHeight/2*o+"px "+winHeight/2+"px"),$(".bg").css("background-position","center "+.03*winHeight+"px"),$(".grass").css("background-size","100% "+.5*winHeight+"px"),e.updateWind(),$("#game_skin .avartar").html("<img src='img/"+selectedPlayer.src+"' alt='"+selectedPlayer.name+"' />"),ga("send","event","game stats","Game created",1)},this.wipeCanvas=function(){context.clearRect(0,0,e.canvasWidth,e.canvasheight)},this.drawWorld=function(){e.drawPosts(),$("#line1").css("background-position","center "+e.posts.postsBaseRScreen+"px"),$("#line2").css("background-position","center "+(e.posts.postsBaseMid-22)+"px"),$("#line3").css("background-position","center "+(e.posts.postsBaseRScreen-22)+"px"),e.getBallSteps(0)},this.drawTee=function(){context.save(),context.translate(e.midX,e.ball.teebase),context.beginPath(),context.moveTo(-1*e.ball.teeWidth,0),context.lineTo(0,-1*e.ball.teeWidth),context.lineTo(e.ball.teeWidth,0),context.quadraticCurveTo(0,30,-1*e.ball.teeWidth,0),context.lineJoin="round",context.fillStyle="#fff568",context.fill(),context.clip(),context.beginPath(),context.arc(0,-1*e.ball.teeWidth,e.ball.teeWidth/1.5,0,2*Math.PI,!1),context.fillStyle="#d6ce57",context.fill(),context.restore()},this.drawPosts=function(){"undefined"==typeof e.curPostsVars.init&&(e.curPostsVars.init=!0);var t=!0,l=!1;if(e.posts.sideDiff>e.world.postWidth/2*-1&&e.posts.sideDiff<e.world.postWidth/2)var o=e.world.postWidth/2-e.posts.sideDiff;else{var o=e.posts.sideDiff-e.world.postWidth/2;t=!1,e.posts.sideDiff<0&&(l=!0)}var a=Math.sqrt(Math.pow(o,2)+Math.pow(e.world.dToPosts,2)),r=Math.atan(700/o);if(e.posts.sideDiff>e.world.postWidth/2*-1&&e.posts.sideDiff<e.world.postWidth/2)var s=90*(Math.PI/180)-Math.atan(700/e.posts.sideDiff)+90*(Math.PI/180),i=s-r;else var s=Math.atan(700/e.posts.sideDiff),i=r-s;e.posts.centerAngle=s;var c=Math.sin(i)*a,n=c/Math.tan(i),d=Math.tan(e.world.fov*Math.PI/180)*n,h=e.world.postThick/d*(e.worldHeight/2),g=c/(d/2)*(e.worldHeight/2);e.posts.screenRPost=g;var v=e.world.postHeight/d*(e.worldHeight/2),u=(e.world.postHeight-e.world.cameraHeight)/d,p=e.worldHeight/2-e.worldHeight/2*u;e.posts.postsBaseRScreen=p+v;var w=e.world.barheight/d*(e.worldHeight/2);context.save(),context.translate(e.midX,p),context.beginPath(),context.rect(g,0,h,v);var f=context.createLinearGradient(g,0,g+h,0);f.addColorStop(0,"#AAA"),f.addColorStop(1,"#FFF"),context.fillStyle=f,context.fill(),context.beginPath(),context.rect(g-3*h,v-w*e.posts.padHeight,7*h,w*e.posts.padHeight);var m=context.createLinearGradient(g-3*h,0,g+3*h,0);t?(m.addColorStop(.2,"#b52624"),m.addColorStop(.3,"#c02a2c")):l?(m.addColorStop(.3,"#b52624"),m.addColorStop(.4,"#c02a2c")):(m.addColorStop(.7,"#c02a2c"),m.addColorStop(.8,"#cc3634")),context.fillStyle=m,context.fill(),e.vodaObj.src="img/voda.png",t?context.drawImage(e.vodaObj,g-1*h,v-(w*e.posts.padHeight/2+4*h/2),4*h,4*h):l?($.logThis("left :> "+l),context.drawImage(e.vodaObj,g,v-(w*e.posts.padHeight/2+3*h/2),3*h,3*h)):($.logThis("right :> "+l),context.drawImage(e.vodaObj,g-2*h,v-(w*e.posts.padHeight/2+3*h/2),3*h,3*h));var b=-5,x=0;if(context.transform(1,x,b,1,0,0),context.beginPath(),e.posts.sideDiff<0)var S=22.8;else if(0==e.posts.sideDiff)var S=22.6;else var S=23.78;context.rect(g*S,v,7*h,w*e.posts.padHeight*.2);var H=context.createLinearGradient(g*S,v,g*S,v+w*e.posts.padHeight*.2);H.addColorStop(1,"rgba(1,1,1,0.0)"),H.addColorStop(0,"rgba(0,0,0,0.3)"),context.fillStyle=H,context.fill(),context.restore();var T=e.posts.sideDiff+e.world.postWidth/2,M=Math.sqrt(Math.pow(T,2)+Math.pow(e.world.dToPosts,2)),P=Math.atan(700/T),F=s-P,k=Math.sin(F)*M,y=k/Math.tan(F),I=Math.tan(e.world.fov*Math.PI/180)*y,D=k/(I/2)*(e.worldHeight/2);e.posts.screenLPost=D;var W=e.world.postHeight/I*(e.worldHeight/2),A=(e.world.postHeight-e.world.cameraHeight)/I,C=e.worldHeight/2-e.worldHeight/2*A;e.posts.postsBaseLScreen=C+W,e.posts.postsBaseMid=(e.posts.postsBaseRScreen-e.posts.postsBaseLScreen)/2+e.posts.postsBaseLScreen;var L=e.world.postThick/I*(e.worldHeight/2),O=e.world.barheight/I*(e.worldHeight/2);context.save(),context.translate(e.midX,C),context.beginPath(),context.rect(-1*(D+L),0,L,W);var B=context.createLinearGradient(-1*(D+L),0,-1*D,0);B.addColorStop(0,"#AAA"),B.addColorStop(1,"#FFF"),context.fillStyle=B,context.fill(),context.beginPath(),context.rect(-1*(D+L+3*L),W-O*e.posts.padHeight,7*L,O*e.posts.padHeight);var _=context.createLinearGradient(-1*(D+L+3*L),0,-1*(D-3*L),0);t?(_.addColorStop(.7,"#c02a2c"),_.addColorStop(.8,"#cc3634")):l?(_.addColorStop(.3,"#b52624"),_.addColorStop(.4,"#c02a2c")):(_.addColorStop(.6,"#c02a2c"),_.addColorStop(.7,"#cc3634")),context.fillStyle=_,context.fill(),e.vodaObjL.src="img/voda.png",t?context.drawImage(e.vodaObjL,-1*(D+3*L),W-(O*e.posts.padHeight/2+4*L/2),4*L,4*L):l?($.logThis("left :> "+l),context.drawImage(e.vodaObjL,-1*(D+L),W-(O*e.posts.padHeight/2+3*L/2),3*L,3*L)):($.logThis("right :> "+l),context.drawImage(e.vodaObjL,-1*(D+3*L),W-(O*e.posts.padHeight/2+3*L/2),3*L,3*L));var b=-5,x=0;if(context.transform(1,x,b,1,0,0),context.beginPath(),e.posts.sideDiff<0)var V=21.7;else if(0==e.posts.sideDiff)var V=20.6;else var V=20.8;context.rect(D*V,W,7*L,O*e.posts.padHeight*.2);var X=context.createLinearGradient(D*V,W,D*V,W+O*e.posts.padHeight*.2);X.addColorStop(1,"rgba(1,1,1,0.0)"),X.addColorStop(0,"rgba(0,0,0,0.3)"),context.fillStyle=X,context.fill(),context.restore(),context.beginPath(),context.moveTo(e.midX+g,p+(v-w+h/2)),context.lineTo(e.midX-D,C+(W-O+L/2)),context.lineTo(e.midX-D,C+(W-O-L/2)),context.lineTo(e.midX+g,p+(v-w-h/2)),context.lineTo(e.midX+g,p+(v-w+h/2));var j=context.createLinearGradient(e.midX+g,0,e.midX+-1*D,0);j.addColorStop(0,"#AAA"),j.addColorStop(.3,"#FFF"),j.addColorStop(1,"#ccc"),context.fillStyle=j,context.fill(),context.restore()},this.refreshWorld=function(){e.drawPosts(),e.drawTee(),e.getBallTrad()},this.getBallTrad=function(){e.ball.curFF<=e.world.flightFrames?(e.getBallSteps(1),e.ball.curFF++):(e.indicator.x=e.ball.curX,e.indicator.y=e.ball.curY,e.ball.hitV=e.hitV(),e.ball.hitH=e.hitH(),e.ball.curFF=0,e.ball.state=0,e.getBallSteps(0))},this.hitV=function(){return e.getBallHeightAtX(e.getDistance())>e.world.barheight?!0:!1},this.hitH=function(){var t=Math.tan(e.ball.gAngle*Math.PI/180)*e.getDistance(),l=e.getDistance()+e.world.dToScreen+e.world.dSceenToBall,o=Math.tan(e.world.fov*Math.PI/180)*l,a=t/(o/2);if(mobile)var r=e.ball.curWind*e.world.windCap*e.ball.curFF;else var r=e.ball.curWind*e.ball.curFF;var s=e.midX*a+r;if(e.ball.gDir>0&&(s=e.midX*a-r),0>s&&(s=-1*s),e.ball.gDir>0)var i=e.posts.screenLPost;else var i=e.posts.screenRPost;return i>s?!0:!1},this.getBallSteps=function(t){var l=e.getDistance()/e.world.flightFrames;if(e.getBallHeightAtX(l*e.ball.curFF)<0)e.ball.curFF=e.world.flightFrames;else{var o=e.ballLenghtAtX(l*e.ball.curFF),a=(o*e.world.ballHfactor,e.getTradScreenV(l*e.ball.curFF,e.getBallHeightAtX(l*e.ball.curFF))),r=e.getTradScreenH(l*e.ball.curFF);e.ball.curX=r,e.ball.curY=a,e.inflight||(e.ball.teebase=a+o/2,e.ball.teeWidth=o/2/2),e.drawTee(),0==t?(e.drawBall(r,a,o,1),e.inflight=!1,e.updateWind()):e.drawBall(r,a,o,0)}},this.drawBall=function(t,l,o,a){var r;context.save(),context.translate(t,l);var s=e.ball.gAngle;e.ball.gDir>0&&(s=-1*s),context.rotate(s*Math.PI/180),e.ball.state>0?(r=.7,e.ball.state=0):(r=1,e.ball.state=1),context.scale(e.world.ballHfactor,r),context.beginPath(),context.arc(0,0,o/2,0,2*Math.PI,!1);var i=context.createRadialGradient(o/2*-.8,o/2*-.8,o/2/10,0,0,o/2*2);i.addColorStop(0,"#eee"),i.addColorStop(1,"#666"),context.fillStyle=i,context.fill(),context.lineWidth=1,context.strokeStyle="#999",context.stroke(),context.beginPath(),context.moveTo(0,0-o/2),context.lineTo(0,0+o/2),context.stroke();1==a?(e.logoImageObj.src="img/ball-logo.png",context.drawImage(e.logoImageObj,.8*o*e.world.ballHfactor/-2,.8*o*e.world.ballHfactor/-2.8,.8*o*e.world.ballHfactor,.8*o*e.world.ballHfactor),context.restore()):context.restore()},this.showIndicator=function(){e.drawIndicator(),kickDisabled=!1},this.drawIndicator=function(){e.kickResult(),e.ball.hitV=!1,e.ball.hitH=!1},this.kickResult=function(){e.score.totalKicks++;var t="MISS!";if(e.ball.hitV&&e.ball.hitH&&(t="GOAL!",e.score.totalOver++),ga("send","event","game stats",t,1),$("#result_container").html("<h2>"+t+"</h2>"),e.level.alive){$("#result_container").fadeIn(200,function(){$("#result_container").delay(500).fadeOut(200)}),$("#score-fraction").html(e.score.totalOver+"/"+e.score.totalKicks);var l=e.score.totalOver/e.score.totalKicks,o="";l<e.level.stage1&&$("#score-percent").hide(),l>=e.level.stage1&&($("#score-percent").show(),o=e.level.multi1Hex),l>e.level.stage2&&($("#score-percent").show(),o=e.level.multi2Hex),l>e.level.stage3&&($("#score-percent").show(),o=e.level.multi3Hex),l==e.level.stage4&&($("#score-percent").show(),o=e.level.multi4Hex),$("#score-percent .fi-star").css("color",o)}else $("#result_container").fadeIn(200,function(){$("#result_container").delay(500).fadeOut(200,function(){e.endLevel()})})},this.getBallHeightAtX=function(t){var l=e.ball.speed*Math.cos(e.ball.angle*Math.PI/180),o=e.ball.speed*Math.sin(e.ball.angle*Math.PI/180),a=t*o/l-.5*e.ball.gravity*(Math.pow(t,2)/Math.pow(l,2));return a},this.getTradScreenV=function(t,l){var o=t+e.world.dToScreen+e.world.dSceenToBall,a=Math.tan(e.world.fov*Math.PI/180)*o,r=(e.world.cameraHeight-l)/a;return ballScreenY=0>r?e.worldHeight/2-e.worldHeight/2*-1*r:e.worldHeight/2+e.worldHeight/2*r,ballScreenY},this.getTradScreenH=function(t){var l=t+e.world.dToScreen+e.world.dSceenToBall;if(mobile)var o=e.ball.curWind*e.world.windCap*e.ball.curFF;else var o=e.ball.curWind*e.ball.curFF;var a,r=Math.tan(e.ball.gAngle*Math.PI/180)*t,s=Math.tan(e.world.fov*Math.PI/180)*l,i=r/(s/2);return a=e.ball.gDir>0?e.midX-e.midX*i:e.midX+e.midX*i,a+o},this.ballLenghtAtX=function(t){var l=t+e.world.dToScreen+e.world.dSceenToBall,o=Math.tan(e.world.fov*Math.PI/180)*l,a=e.world.balllength/o,r=e.worldHeight/2*a;return r},this.getDistance=function(){if(0==e.posts.sideDiff)var t=e.posts.centerAngle-e.ball.gAngle*(Math.PI/180),l=e.world.dToPosts/Math.sin(t);else{if(e.ball.gDir>0)var t=90*(Math.PI/180)-(e.posts.centerAngle-e.ball.gAngle*(Math.PI/180));else var t=90*(Math.PI/180)-(e.posts.centerAngle+e.ball.gAngle*(Math.PI/180));var l=e.world.dToPosts/Math.cos(t)}return 0>l&&(l=-1*l),l},this.launchKick=function(t){if($.logThis("inflight :> "+e.inflight+" :: alive :> "+e.level.alive),!e.inflight&&e.level.alive){ga("send","event","game stats","kick",1),e.inflight=!0;var l;e.ball.gDir=0;var o=0;o=t.angle<0?-1*t.angle:t.angle,o>90?(o-=90,e.ball.gDir=1):o=90-o,o>60&&(o=60),e.ball.gAngle=o,l=t.velocity<0?-1*t.velocity:t.velocity,2.8>l?l=2.8:l>4&&(l=4),e.ball.speed=Number(l)*e.world.vfactor,e.gameLoop()}},this.launchTimer=function(){$("#result_container").html("<h2>GO</h2>"),$("#result_container").fadeIn(200,function(){$("#result_container").delay(500).fadeOut(200,function(){setupHammer(),e.runTimer()})})},this.runTimer=function(){$("#time-secs").html(e.level.curtime);setTimeout(function(){e.updateTime()},1e3)},this.moveSky=function(){curSkyPos+=-1,$("#sky").css("background-position",curSkyPos+"px top"),e.runSkyTimer()},this.stopSkyTimer=function(){clearTimeout(skyTimer),$("#sky").css("background-position","0px top")},this.updateTime=function(){e.level.curtime--,e.level.curtime>0?($("#time-secs").html(e.level.curtime),e.runTimer(e.level.curtime)):(e.level.alive=!1,$("#time-secs").html("END"),e.inflight||e.endLevel())},this.endLevel=function(){$("#time-secs").html("END");var t=e.score.totalOver/e.score.totalKicks,l="0",o="";t>=e.level.stage1&&t<e.level.stage2?(l=e.level.multi1,e.level.levelScore=e.score.totalOver*e.level.multi1):t>=e.level.stage2&&t<e.level.stage3?(l=e.level.multi2,e.level.levelScore=e.score.totalOver*e.level.multi2):t>=e.level.stage3&&t<e.level.stage4?(l=e.level.multi3,e.level.levelScore=e.score.totalOver*e.level.multi3):t==e.level.stage4?(l=e.level.multi4,e.level.levelScore=e.score.totalOver*e.level.multi4):e.level.levelScore=e.score.totalOver,e.score.curScore+=e.level.levelScore,t<e.level.stage1&&$("#score-percent").hide(),t>=e.level.stage1&&($("#score-percent").show(),o=e.level.multi1Hex),t>e.level.stage2&&($("#score-percent").show(),o=e.level.multi2Hex),t>e.level.stage3&&($("#score-percent").show(),o=e.level.multi3Hex),t==e.level.stage4&&($("#score-percent").show(),o=e.level.multi4Hex),$("#score-percent .fi-star").css("color",o),e.level.levelScore<e.level.parScore?($("#endGame").html("<h2>TOO BAD!</h2><p>You got : "+e.score.totalOver+"/"+e.score.totalKicks+" <span class = 'score_multi'><i class='fi-star' id = 'score-star'></i> <small>x</small>"+l+"</span><br />Level score: "+e.level.levelScore+"<br />But you needed at least "+e.level.parScore+" points to pass level "+e.score.curLevel+"<br />You finished with "+e.score.curScore+" total points</p><div class = 'row large-8 medium-12 small-10 large-centered medium-centered small-centered column'><ul class= 'button-group radius even-2'><li><a href='#' class = 'btn share_btn button brag' data-reveal-id='shareModal'>Brag to ya mates</a></li><li><a href='#' class = 'btn replay_btn button'>play again <i class='fi-refresh'></i></a></li></ul></div><div class = 'row large-8 medium-12 small-10 large-centered medium-centered small-centered column'><ul class= 'button-group radius even-2 leaders_btns'><li><a href='#' class = 'tiny leaders_btn secondary button leaders_daily'>Daily<br />Top Ten</a></li><li><a href='#' class = 'tiny leaders_btn button secondary leaders_all'>Overall<br />Top Ten</a></li></ul></div>"),$(".score_multi").css("color",o),loadNextStage("#stage4","#endGame"),$.post("includes/log_score.php",{score:e.score.curScore,level:e.score.curLevel,nonce:nonce},function(e){e.status?($.logThis("successfull score save"),ga("send","event","game stats","end game",1)):$.logThis("failed score save")},"json")):($("#level_screen").html("<h2>NICE!</h1><p>You got : "+e.score.totalOver+"/"+e.score.totalKicks+" <span class = 'score_multi'><i class='fi-star' id = 'score-star'></i> <small>x</small>"+l+"</span><br />Level score: "+e.level.levelScore+"<br />Total score: "+e.score.curScore+"</p><a href='#' class = 'btn next_btn button'>Continue</a>"),$(".score_multi").css("color",o),$("#endLevel").show()),$(".replay_btn").on("click",function(t){t.preventDefault(),ga("send","event","game stats","replay",1),e.startAgain()}),$(".next_btn").on("click",function(t){switch(t.preventDefault(),e.world.curView){case 1:e.world.curView=2,e.posts.sideDiff=201;break;case 2:e.world.curView=3,e.posts.sideDiff=-201;break;case 3:e.world.curView=1,e.posts.sideDiff=0}e.resetLevel()})},this.resetLevel=function(){e.level.levelScore=0,e.level.curtime=40,e.score.totalOver=0,e.score.curLevel++,e.score.totalKicks=0,e.ball.curFF=0,e.ball.state=0,e.curPostsVars={},$("#score-percent").hide(),6!=e.world.windFactor&&(e.world.windFactor+=1),e.level.parScore<70&&(e.level.parScore+=5),e.updateWind(),$(".bg").hide(),$("#bg"+e.world.curView).show(),$(".grass").hide(),$("#grass"+e.world.curView).show(),$(".line").hide(),$("#line"+e.world.curView).show(),$("#endLevel").hide(),$("#score-fraction").html(e.score.totalOver+"/"+e.score.totalKicks),e.runTimer(),e.wipeCanvas(),e.drawWorld(),e.level.alive=!0},this.startAgain=function(){e.world.curView=1,e.posts.sideDiff=0,e.score.curScore=0,e.world.windFactor=0,e.ball.curWind=0,e.score.curLevel=1,e.level.levelScore=0,e.level.curtime=40,e.score.totalOver=0,e.score.totalKicks=0,e.ball.curFF=0,e.ball.state=0,e.curPostsVars={},$("#score-percent").hide(),e.updateWind(),$(".bg").hide(),$("#bg"+e.world.curView).show(),$(".grass").hide(),$("#grass"+e.world.curView).show(),$(".line").hide(),$("#line"+e.world.curView).show(),$("#endLevel").hide(),$("#score-fraction").html(e.score.totalOver+"/"+e.score.totalKicks),$.post("includes/log_play.php",{avartar:players[playerTicker].name,avartarId:playerTicker+1,nonce:nonce},function(t){t.status?(user.pid=t.play_id,$.logThis("pid :> "+user.pid),loadNextStage("#endGame","#stage4"),e.runTimer(),e.wipeCanvas(),e.drawWorld(),e.runSkyTimer(),e.level.alive=!0):($("#alert_text").html("<p>encounted an issue reconecting to the server please refresh your browser ERROR:05</p>"),$("#alertModal").foundation("reveal","open"))},"json")},this.updateWind=function(){if($(".wind").show(),$(".wind-indicator").html(""),e.world.windFactor>2){var t=Math.round(Math.random()*(e.world.windFactor-(e.world.windFactor-2))+(e.world.windFactor-2)),l=2*Math.random()+-1;0>l&&(t=-1*t)}else var t=Math.round(Math.random()*(e.world.windFactor- -1*e.world.windFactor)+-1*e.world.windFactor);e.ball.curWind=t;var o=e.ball.curWind;0==e.ball.curWind?$(".wind-indicator").html(""):e.ball.curWind<0?($(".wind-right").html(""),$(".wind-left").html("<i class='fi-arrow-left'></i>"),o=-1*o):($(".wind-left").html(""),$(".wind-right").html("<i class='fi-arrow-right'></i>")),$(".wind").html(o+"<small>km</small>")},this.gameLoop=function(){if(e.inflight){e.wipeCanvas(),e.refreshWorld();{setTimeout(e.gameLoop,1e3/30)}}else e.showIndicator()}}var kickDisabled=!1,canvas,context,curSkyPos=0;