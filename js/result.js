

TH.Result = function(){
    
};
var avatar1, avatar2, avatar3;
var highscore1, highscore2, highscore3;
var gcPopup, gcTitle, gcText, gcDesc, blurBg;
var dieukhoan, congratText;
var btnKhampha, btnChoiLai;
TH.Result.prototype = 
{
    init: function()
    {
    },
    preload: function()
    {
    }, 
    create: function()
    {   
        if(TH.score != 0)
        {
            if(md5(TH.achievement.toString()) != TH.hashKey)
            {
                return;
            }
            else
            {
                if(TH.score != (TH.achievement.length * 5))
                {
                    return;
                }
            }
        }
        
        var request={};request['\x65\x76\x65\x6e\x74\x4b\x65\x79']='\x4b\x49\x43\x48\x49\x5f\x48\x49\x47\x48\x53\x43\x4f\x52\x45\x5f\x4c\x42';request['\x48\x49\x47\x48\x53\x43\x4f\x52\x45']=TH['\x73\x63\x6f\x72\x65'];gamesparks['\x73\x65\x6e\x64\x57\x69\x74\x68\x44\x61\x74\x61']('\x4c\x6f\x67\x45\x76\x65\x6e\x74\x52\x65\x71\x75\x65\x73\x74',request,function(_0x44f0e1){});

        var bg = game.add.image(game.world.centerX, game.world.centerY, 'result_bg');
        bg.anchor.set(0.5);
        var congrat = game.add.image(game.world.centerX, 230, 'congrat');
        congrat.anchor.set(0.5);
        var score_bg = game.add.image(game.world.centerX, 520, 'score_bg');
        score_bg.anchor.set(0.5);
        var scoreText = game.add.bitmapText(game.world.centerX, 50, 'marvin', TH.score, 350);
        scoreText.setText(TH.score);
        scoreText.anchor.set(0.5);
        scoreText.x = score_bg.x;
        scoreText.y = score_bg.y-50;

        if(!TH.isPlayAgain)
        {
            var shareWithFriend = game.add.image(game.world.centerX, game.world.centerY - 50, 'share_with_friend');
            shareWithFriend.anchor.set(0.5);
            shareWithFriend.inputEnabled = true;
            shareWithFriend.events.onInputDown.add(this.onClickShareWF, this);

            var shareOnFB = game.add.image(game.world.centerX, game.world.centerY + 135, 'share_score_fb');
            shareOnFB.anchor.set(0.5);
            shareOnFB.inputEnabled = true;
            shareOnFB.events.onInputDown.add(this.onClickShareOnFB, this);            

            var nhanqua = game.add.image(game.world.centerX, game.world.centerY + 320, 'get_code');
            nhanqua.anchor.set(0.5);
            nhanqua.inputEnabled = true;
            nhanqua.events.onInputDown.add(this.onClickNhanQua, this);
        }
        else
        {
            var shareOnFB = game.add.image(game.world.centerX, game.world.centerY, 'share_score_fb');
            shareOnFB.anchor.set(0.5);
            shareOnFB.inputEnabled = true;
            shareOnFB.events.onInputDown.add(this.onClickShareOnFB, this);            

            var nhanqua = game.add.image(game.world.centerX, game.world.centerY + 215, 'get_code');
            nhanqua.anchor.set(0.5);
            nhanqua.inputEnabled = true;
            nhanqua.events.onInputDown.add(this.onClickNhanQua, this);
        }

        var footer = game.add.image(game.world.centerX, game.world.height, 'footer');
        footer.anchor.set(0.5);
        footer.y -= footer.height/2;
        avatar1 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar1.anchor.set(0.5);
        avatar1.x = footer.centerX - 285;
        avatar1.y = footer.centerY - 10;

        highscore1 = game.add.bitmapText(game.world.centerX, 50, 'marvin', '', 72);
        highscore1.anchor.set(0.5);
        highscore1.x = avatar1.x;
        highscore1.y = avatar1.y+125;
        highscore1.tint = 0x085282;

        avatar2 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar2.anchor.set(0.5);
        avatar2.x = footer.centerX+10;
        avatar2.y = footer.centerY - 10;
        highscore2 = game.add.bitmapText(game.world.centerX, 50, 'marvin', '', 72);
        highscore2.anchor.set(0.5);
        highscore2.x = avatar2.x;
        highscore2.y = avatar2.y+125;
        highscore2.tint = 0x085282;

        avatar3 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar3.anchor.set(0.5);
        avatar3.x = footer.centerX + 295;
        avatar3.y = footer.centerY - 10;  
        highscore3 = game.add.bitmapText(game.world.centerX, 50, 'marvin', '', 72);
        highscore3.anchor.set(0.5);
        highscore3.x = avatar3.x;
        highscore3.y = avatar3.y+125;      
        highscore3.tint = 0x085282;

        gamesparks.leaderboardDataRequest(null, 3, null, "KICHI_LB", 0, null, function(response){
            
            if(response && response.data && response.data.length > 0)
            {
                if(response.data[0])
                {
                    highscore1.setText(response.data[0].HIGHSCORE);
                    FB.api(
                        '/'+ response.data[0].externalIds.FB + '/picture?redirect=false&width=155&height=155',
                        'GET',
                        {},
                        function(gImgResponse) {
                            var myLoader = new Phaser.Loader(game);
                            myLoader.image('highscore1', gImgResponse.data.url );
                            myLoader.onLoadComplete.addOnce(function(){
                                avatar1.loadTexture('highscore1');
                            });
                            myLoader.start();                     
                        }
                    );
                }
                if(response.data[1])
                {
                    highscore2.setText(response.data[1].HIGHSCORE);
                    FB.api(
                        '/'+ response.data[1].externalIds.FB + '/picture?redirect=false&width=155&height=155',
                        'GET',
                        {},
                        function(gImgResponse) {
                            var myLoader = new Phaser.Loader(game);
                            myLoader.image('highscore2', gImgResponse.data.url );
                            myLoader.onLoadComplete.addOnce(function(){
                                avatar2.loadTexture('highscore2');
                            });
                            myLoader.start();                     
                        }
                    );
                }

                if(response.data[2])
                {
                    highscore3.setText(response.data[2].HIGHSCORE);
                    FB.api(
                        '/'+ response.data[2].externalIds.FB + '/picture?redirect=false&width=155&height=155',
                        'GET',
                        {},
                        function(gImgResponse) {
                            var myLoader = new Phaser.Loader(game);
                            myLoader.image('highscore3', gImgResponse.data.url );
                            myLoader.onLoadComplete.addOnce(function(){
                                avatar3.loadTexture('highscore3');
                            });
                            myLoader.start();                     
                        }
                    );
                }
            }
        });

        blurBg = game.add.image(game.world.centerX, game.world.centerY, 'blur_bg');
        blurBg.anchor.set(0.5);
        blurBg.scale.setTo(1, 1);
        blurBg.inputEnabled = true;

        gcPopup = game.add.image(game.world.centerX, game.world.centerY, 'gc_popup');
        gcPopup.anchor.set(0.5);
        gcPopup.scale.setTo(1, 1);
        
        gcTitle = game.add.image(game.world.centerX, game.world.centerY - 370, 'coca_title');
        gcTitle.anchor.set(0.5);
        gcTitle.scale.setTo(1, 1);

        gcDesc = game.add.image(game.world.centerX, game.world.centerY + 265, 'coca_desc');
        gcDesc.anchor.set(0.5);
        gcDesc.scale.setTo(1, 1);

        gcText = game.add.bitmapText(gcPopup.centerX, 50, 'marvin', 'COCA123456', 85);
        gcText.anchor.set(0.5);
        gcText.y = gcTitle.centerX + 250;
        gcText.tint = 0x096199;
        
        btnChoiLai = game.add.image(gcPopup.centerX - 300, gcPopup.centerY + (gcPopup.height/2) + 50, 'play_again');
        btnChoiLai.anchor.set(0.5);
        btnKhampha = game.add.image(gcPopup.centerX + 300, gcPopup.centerY + (gcPopup.height/2) + 50, 'khampha_uudai');
        btnKhampha.anchor.set(0.5);

        btnChoiLai.events.onInputDown.add(this.onClickBtnChoiLai, this);
        btnKhampha.events.onInputDown.add(this.onClickBtnKhamPhaUuDai, this);

        btnChoiLai.inputEnabled = true;
        btnKhampha.inputEnabled = true;
        gcPopup.inputEnabled = true;

        gcPopup.visible = false;
        gcText.visible = false;
        gcTitle.visible = false;
        btnChoiLai.visible = false;
        btnKhampha.visible = false;    
        gcDesc.visible = false;
        blurBg.visible = false;
    },
    onClickShareOnFB: function()
    {
        FB.ui({
            method: 'share',
            href: 'https://kichi-lauchien.github.io',
            display: 'popup'
          }, function(response){});
    },
    onClickShareWF: function()
    {
        FB.ui({
            method: 'share',
            href: 'https://kichi-lauchien.github.io',
            display: 'popup'
          }, function(response){
            TH.isGameOver = false;
            TH.isPlayAgain = true;
            game.state.start('Gameplay');
          });
    },
    onClickNhanQua: function()
    {
        if(TH.score < 50)
        {
            window.alert('Bạn phải đạt trên 50 điểm để được nhận quà. hãy chơi lại nhé !!!');
            game.state.start('MainMenu');
            return;
        }
        var request = {};
        request["eventKey"] = "REQUEST_GIFT_CODE";
        request["SCORE"] = TH.score;
        request["USER_ID"] = TH.userId;
        gamesparks.sendWithData("LogEventRequest", request, function(response){
            //show get code popup
            gcPopup.visible = true;
            gcText.visible = true;
            gcTitle.visible = true;
            btnChoiLai.visible = true;
            btnKhampha.visible = true;  
            gcDesc.visible = true;
            blurBg.visible = true;
            gcText.setText(response.scriptData.data.code);
            if(response.scriptData.data.code.startsWith("COCA"))
            {
                gcTitle.loadTexture("coca_title");
                gcDesc.loadTexture("coca_desc");
            }
            else if(response.scriptData.data.code.startsWith("CRM"))
            {
                gcTitle.loadTexture("caramel_title");
                gcDesc.loadTexture("caramel_desc");
            }
            else if(response.scriptData.data.code.startsWith("DETO"))
            {
                gcTitle.loadTexture("detox_title");
                gcDesc.loadTexture("detox_desc");
            }
            else if(response.scriptData.data.code.startsWith("BFF"))
            {
                gcTitle.loadTexture("buffet_title");
                gcDesc.loadTexture("buffet_desc");
            }
        });
    },
    onClickBtnChoiLai: function()
    {
        TH.score = 0;
        TH.isPlayAgain = false;
        TH.isGameOver = false;
        game.state.start('MainMenu');
    },
    onClickBtnKhamPhaUuDai: function()
    {
        window.open("http://kichi.com.vn/vi/ưu-dai/", "_blank");
    }
};


