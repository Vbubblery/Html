/**
 * @author
 */

//基本システム用変数
var progressTimer; //タイマー用変数
var btnPush = 0; //ボタン押下を感知
var gameoverFlg = 0; //ゲームオーバーフラグ
//得点
var score = 0;

//地面の移動に関する変数
var moveSpeed = 10; //1フレームあたり移動数
var speedAdjust = 4; //スピード調整値
var maxSpeed = 60; //最大移動数
var movePx = 0; //移動ピクセル数インスタンス
var positionNow = 0; //次読み込み位置
var tmpGround = 0; //主人公の足元の地面の高さ
var speedupSpan = 0; //スピードアップ計測用変数
//地面配置パターン
var groundLine = [];
groundLine[0] = 260;
groundLine[1] = 260;
groundLine[2] = 260;
groundLine[3] = 260;
groundLine[4] = 260;
groundLine[5] = 260;
groundLine[6] = 260;
groundLine[7] = 260;
groundLine[8] = 260;
groundLine[9] = 260;
groundLine[10] = 0;
groundLine[11] = 0;
groundLine[12] = 0;
groundLine[13] = 240;
groundLine[14] = 240;
groundLine[15] = 240;
groundLine[16] = 240;
groundLine[17] = 240;
groundLine[18] = 0;
groundLine[19] = 0;
groundLine[20] = 0;
groundLine[21] = 280;
groundLine[22] = 280;
groundLine[23] = 280;
groundLine[24] = 0;
groundLine[25] = 0;
groundLine[26] = 0;
groundLine[27] = 0;
groundLine[28] = 0;
groundLine[29] = 260;
groundLine[30] = 260;
groundLine[31] = 260;
groundLine[32] = 260;
groundLine[33] = 260;
groundLine[34] = 260;
groundLine[35] = 260;
groundLine[36] = 0;
groundLine[37] = 0;
groundLine[38] = 220;
groundLine[39] = 220;
groundLine[40] = 220;
groundLine[41] = 220;
groundLine[42] = 220;
groundLine[43] = 220;
groundLine[44] = 220;
groundLine[45] = 0;
groundLine[46] = 0;
groundLine[47] = 0;
groundLine[48] = 0;
groundLine[49] = 0;
groundLine[50] = 260;
groundLine[51] = 260;
groundLine[52] = 260;
groundLine[53] = 260;
groundLine[54] = 260;
groundLine[55] = 0;
groundLine[56] = 0;
groundLine[57] = 260;
groundLine[58] = 260;
groundLine[59] = 260;
groundLine[60] = 260;
groundLine[61] = 260;
groundLine[62] = 0;
groundLine[63] = 0;

//プレイヤー基本情報
var playerX = 60; //プレイヤー立ち位置
var playerWidth = 60; //プレイヤー幅
var playerHeight = 60; //プレイヤー高さ
var playerAnime = 0; //プレイヤーアニメーション用変数
//ジャンプに関する変数
var jumpState = 0; //ジャンプ中かどうか
var jumpMax = 36; //最大ジャンプ力
var jumpMinus = 2; //減衰ジャンプ力
var jumpNow = jumpMax; //現在ジャンプ力
var gravity = 6; //重力加速度
var playerLine = 260; //プレイヤー縦位置
//画像に関する変数
var playerImg = [];
playerImg[0] = './img/player0.png'; //プレイヤーPNGファイル指定（ダッシュ1）
playerImg[1] = './img/player1.png'; //プレイヤーPNGファイル指定（ダッシュ2）
playerImg[2] = './img/player2.png'; //プレイヤーPNGファイル指定（ジャンプ）
var groundImg = './img/ground.png'; //地面PNGファイル指定
var gameoverImg = './img/gameover.png'; //ゲームオーバーPNGファイル指定
var player = []; //プレイヤーイメージ格納オブジェクト
var ground; //地面イメージ格納オブジェクト
var gameover; //ゲームオーバーイメージ格納オブジェクト
var imgMaxNum = 5; //最大読込画像数
var imgLoadCheck = 0; //現在読込済画像数
//document.getElementById簡易化
function $(id) {
    return document.getElementById(id);
}
function $$(className){
	return document.getElementsByClassName(className);
}
//マウスクリックの感知
function bPush(event) {
    if (jumpState == 0) {
        btnPush = 1;
    }
}

//タッチの感知
function bTouch(event) {
    if (jumpState == 0) {
        btnPush = 1;
    }
}

//タッチやマウスクリックから離れた場合の感知
function bOut(event) {
    btnPush = 0;
}

window.onload = function() {
	//循环创建img
    for(var i=0;i<7;i++){
    	var e = document.createElement("img");
    	e.setAttribute('class', 'objBase qiang');
    	e.src = "./img/space.gif";
    	e.id = "qiang"+i;
    $("main_view").appendChild(e);
}
    for(var i=0;i<3;i++){
    	var e = document.createElement("img");
    	e.setAttribute('class', 'objBase SpeedUp');
    	e.src = "./img/space.gif";
    	e.id = "SpeedUp"+i;
    $("main_view").appendChild(e);
}
  for(var i=0;i<3;i++){
    	var e = document.createElement("img");
    	e.setAttribute('class', 'objBase SpeedDown');
    	e.src = "./img/space.gif";
    	e.id = "SpeedDown"+i;
    $("main_view").appendChild(e);
}
    if (('createTouch' in document) || ('ontouchstart' in document)) {
        // スマートフォンからのアクセス
        document.addEventListener('touchstart', bTouch, false);
        document.addEventListener('touchend', bOut, false);
    } else {
        // スマートフォン以外のアクセス
        document.addEventListener('mousedown', bPush, false);
        document.addEventListener('mouseup', bOut, false);
    }
    //画像ローディング処理
    for (var i = 0; i < 3; i++) {
        player[i] = new Image();
        player[i].src = playerImg[i];
        player[i].onload = function() {
            imgLoadCheck++;
        };
    }
    ground = new Image();
    ground.src = groundImg;
    ground.onload = function() {
        imgLoadCheck++;
    };
    gameover = new Image();
    gameover.src = gameoverImg;
    gameover.onload = function() {
        imgLoadCheck++;
    };
    renderCanvas();
};
var renderCanvas = function() {

    if (imgLoadCheck >= imgMaxNum) { // 画像ロード完了待ち
        if (gameoverFlg == 0) {
            //ジャンプ処理
            if (btnPush == 1) {
                jumpNow = jumpNow - jumpMinus; // ジャンプ量低減
                if (jumpNow > 0) {
                    playerLine = playerLine - jumpNow; // プレイヤー高さ計算
                } else { // ジャンプ量0以下のときリセット
                    btnPush = 0;
                    jumpNow = jumpMax;
                }
            } else { // ボタンはなれたらリセット
                jumpNow = jumpMax;
            }

            //地面接触判定
            jumpState = 1; // ジャンプステータスをセット
            tmpGround = 380;
            for (var x = 1; x < 3; x++) {
                if ((positionNow + x) >= groundLine.length) {
                    var tmpPosition = (positionNow + x) - groundLine.length;
                } else {
                    var tmpPosition = (x + positionNow);
                }

                if (groundLine[tmpPosition] != 0) {
                    if (movePx != (60 - ((x - 1) * 60))) {
                        if (playerLine == groundLine[tmpPosition]) {
                            jumpState = 0;
                        } else {
                            tmpGround = groundLine[tmpPosition];
                        }
                    }
                }
            }

            //重力処理
            if (jumpState == 1) {
                playerLine = playerLine + gravity;
                if (playerLine > tmpGround) {
                    playerLine = tmpGround;
                    jumpState = 0;
                } else if (playerLine >= 320) {
                    gameoverFlg = 1;
                }
            }

            //スコア表示
            $("score_view").innerHTML = 'SCORE:' + score;

            //プレイヤーアニメーション
            if (jumpState == 1) {
                $("player").src = player[2].src;
            } else {
                if (playerAnime < 3) {
                    $("player").src = player[0].src;
                } else {
                    $("player").src = player[1].src;
                }
            }
            $("player").style.top = playerLine - playerHeight + 'px';
            $("player").style.left = playerX + 'px';
            if (playerAnime < 6) {
                playerAnime++;
            } else {
                playerAnime = 0;
            }

            //地面の描画
            for (var x = 0; x < 9; x++) {
                var tmpId = "ground" + x;
                if ((positionNow + x) >= groundLine.length) {
                    var tmpPosition = (positionNow + x) - groundLine.length;
                } else {
                    var tmpPosition = (x + positionNow);
                }
                if (groundLine[tmpPosition] == 0) {
                    $(tmpId).src = './img/space.gif';
                } else {
                    $(tmpId).src = ground.src;
                }

                if (tmpPosition == 0) {
                    $("qiang0").src = './img/qiang.jpg';
                    $("qiang0").style.top = groundLine[tmpPosition] - 30 + 'px';
                    $("qiang0").style.width = 40 + 'px';
                    $("qiang0").style.left = (x * 60) - movePx + 'px';
                    $("qiang4").src = './img/qiang.jpg';
                    $("qiang4").style.top = groundLine[tmpPosition] - 40 + 'px';
                    $("qiang4").style.width = 40 + 'px';
                    $("qiang4").style.left = (x * 60) - movePx + 'px';
                    
                }
                if (tmpPosition == 11) {
 					$("SpeedDown0").src = './img/jiansu.png';
                    $("SpeedDown0").style.top = 100 + 'px';
                    $("SpeedDown0").style.width = 40 + 'px';
                    $("SpeedDown0").style.left = (x * 60) - movePx + 'px';
                }
                 if (tmpPosition == 8) {
                    $("qiang5").src = './img/qiang.jpg';
                    $("qiang5").style.top = groundLine[tmpPosition] - 30 + 'px';
                    $("qiang5").style.width = 40 + 'px';
                    $("qiang5").style.left = (x * 60) - movePx + 'px';
                } 
                    if (tmpPosition == 26) {
 					$("SpeedUp0").src = './img/jiasu.png';
                    $("SpeedUp0").style.top = 80 + 'px';
                    $("SpeedUp0").style.width = 40 + 'px';
                    $("SpeedUp0").style.left = (x * 60) - movePx + 'px';
                }
                if (tmpPosition == 30) {
                    $("qiang6").src = './img/qiang.jpg';
                    $("qiang6").style.top = groundLine[tmpPosition] - 30 + 'px';
                    $("qiang6").style.width = 40 + 'px';
                    $("qiang6").style.left = (x * 60) - movePx + 'px';
                } 
                if (tmpPosition == 39) {
                    $("qiang1").src = './img/qiang.jpg';
                    $("qiang1").style.top = groundLine[tmpPosition] - 30 + 'px';
                    $("qiang1").style.width = 40 + 'px';
                    $("qiang1").style.left = (x * 60) - movePx + 'px';
                }
                if (tmpPosition == 40) {
                    $("qiang2").src = './img/qiang.jpg';
                    $("qiang2").style.top = groundLine[tmpPosition] - 30 + 'px';
                    $("qiang2").style.width = 40 + 'px';
                    $("qiang2").style.left = (x * 60) - movePx + 'px';
                }
                if (tmpPosition == 52) {
                    $("qiang3").src = './img/qiang.jpg';
                    $("qiang3").style.top = groundLine[tmpPosition] - 30 + 'px';
                    $("qiang3").style.width = 40 + 'px';
                    $("qiang3").style.left = (x * 60) - movePx + 'px';
                }
                $(tmpId).style.top = groundLine[tmpPosition] - 30 + 'px';
                $(tmpId).style.left = (x * 60) - movePx + 'px';
                $(tmpId).style.width = 60 + 'px';

            }
            movePx = movePx + moveSpeed;
            if (movePx > 60) {
                movePx = movePx - 60;
                positionNow = positionNow + 1;
                if (positionNow >= groundLine.length) {
                    positionNow = positionNow - groundLine.length;
                }
                score++;
                speedupSpan++;
            }

            if (moveSpeed < maxSpeed) {
                if (speedupSpan > 100) {
                    moveSpeed = moveSpeed + speedAdjust;
                    speedupSpan = 0;
                    console.log("hel")
                }
            } else {
                moveSpeed = maxSpeed;
            }
            Wallcollision();
            BuffcollisionUp();
            BuffcollisionDown();
            console.log(moveSpeed);
        } else {
            //ゲームオーバー画面
             for(var i=0;i<$$("qiang").length;i++)
       			 {
        	 		$$("qiang")[i].src='./img/space.gif';
               	 	$$("qiang")[i].style.width = 0;
               	 	$$("qiang")[i].style.left = 0;
               	 	$$("qiang")[i].style.top = 0;
               	 }
             for( i=0;i<$$("SpeedUp").length;i++)
       			 {
        	 		$$("SpeedUp")[i].src='./img/space.gif';
               	 	$$("SpeedUp")[i].style.width = 0;
               	 	$$("SpeedUp")[i].style.left = 0;
               	 	$$("SpeedUp")[i].style.top = 0;
               	 }
             for( i=0;i<$$("SpeedUp").length;i++)
       			 {
        	 		$$("SpeedDown")[i].src='./img/space.gif';
               	 	$$("SpeedDown")[i].style.width = 0;
               	 	$$("SpeedDown")[i].style.left = 0;
               	 	$$("SpeedDown")[i].style.top = 0;
               	 }
            $("gameover").src = gameover.src;
            $("gameover").style.top = 0 + 'px';
            $("gameover").style.left = 0 + 'px';
            jumpState = 0;
            if (btnPush == 1) {
                //再プレイ用変数初期化処理
                positionNow = 0;
                btnPush = 0;
                gameoverFlg = 0;
                score = 0;
                moveSpeed = 10;
                movePx = 0;
                tmpGround = 0;
                playerLine = 260;
                speedupSpan = 0;
                $("gameover").src = './img/space.gif';
            }
        }
    }
    progressTimer = setTimeout("renderCanvas()", 15);
}
function Wallcollision(){
	 for(var i=0;i<$$("qiang").length;i++)
        {
        	 if (impact($("player"), $$("qiang")[i]))	
        	 {
        	 	gameoverFlg = 1;
        	 }
        }
}
function BuffcollisionUp(){
	for(var i=0;i<$$("SpeedUp").length;i++)
        {
        	 if (impact($("player"), $$("SpeedUp")[i]))	
        	 {
        	 		moveSpeed+=0.3;

        	 		player[0].src='./img/playerup.jpg';
        	 		player[1].src='./img/playerup.jpg';
        	 }
        }
}
function BuffcollisionDown(){
	for(var i=0;i<$$("SpeedDown").length;i++)
        {
        	 if (impact($("player"), $$("SpeedDown")[i]))	
        	 {
        	 		moveSpeed=10;
        	 		player[0].src='./img/playerdown.png';
        	 		player[1].src='./img/playerdown.png';

        	 }
        }
}
function getDefaultStyle(obj, attribute) {
    return parseInt(obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj, false)[attribute]);
}
function impact(obj, dobj) {
    var o = {
        x: getDefaultStyle(obj, 'left'),
        y: getDefaultStyle(obj, 'top'),
        w: getDefaultStyle(obj, 'width'),
        h: getDefaultStyle(obj, 'height')
    }

    var d = {
        x: getDefaultStyle(dobj, 'left'),
        y: getDefaultStyle(dobj, 'top'),
        w: getDefaultStyle(dobj, 'width'),
        h: getDefaultStyle(dobj, 'height')
    }

    var px, py;

    px = o.x <= d.x ? d.x: o.x;
    py = o.y <= d.y ? d.y: o.y;

    // 判断点是否都在两个对象中
    if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {
        return true;
    } else {
        return false;
    }
}
function RandomNumber(under, over) {
    switch (arguments.length) {
    case 1:
        return parseInt(Math.random() * under + 1);
    case 2:
        return parseInt(Math.random() * (over - under + 1) + under);
    default:
        return 0;
    }
}
function deleteDiv() {
    var my = document.getElementById("qiang");
    if (my != null) my.parentNode.removeChild(my);
}