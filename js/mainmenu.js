window.fbAsyncInit = function() {
    FB.init({
      appId            : '158000174877255',
      autoLogAppEvents : true,
      xfbml            : false,
      version          : 'v2.12',
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/vi_VN/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

TH.MainMenu = function(game){
    var playButton;
    var helloText;
    var fbBtn;
    var listGcButton = [];
    var listGcText = [];
    var giftCodePopup;
    var btnClose;
    var btnPrev;
    var btnNext;
    var gcData = [];
    var btnSound;
    var gcPopup;
    var gcTitle;
    var gcText;
    var gcDesc;
    var blurBg;
    var data;
    var gcpBlur;
    var rule_bg;
    var rule_close;
    var rule_blur;
};

var paging;
var currentPageIndex;
var totalPage;
var instance;

TH.MainMenu.prototype = 
{
    init: function()
    {
        TH.MainMenu.listGcButton = [];
        TH.MainMenu.listGcText = [];
        instance = this;
    },
    preload: function()
    {
        
    }, 
    create: function()
    {         
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
        bg.scale.setTo(1, 1);
        bg.anchor.set(0.5);
        var title = game.add.image(game.world.centerX, 450, 'title');
        title.anchor.set(0.5);

        fbBtn = this.add.image(game.world.centerX, game.world.centerY - 15, 'fb_login');
        fbBtn.anchor.set(0.5);
        fbBtn.scale.setTo(1, 1);
        fbBtn.inputEnabled = true;
        fbBtn.events.onInputDown.add(this.onClickOnBtnFB, this);

        TH.MainMenu.playButton = this.add.image(game.world.centerX, game.world.centerY, 'play');
        TH.MainMenu.playButton.anchor.set(0.5);
        TH.MainMenu.playButton.scale.setTo(1, 1);
        TH.MainMenu.playButton.inputEnabled = true;
        TH.MainMenu.playButton.events.onInputDown.add(this.onClickOnBtnPlay, this);
        TH.MainMenu.playButton.visible = false;

        var rulesBtn = this.add.image(game.world.centerX + 350, game.world.height - 95, 'rules');
        rulesBtn.anchor.set(0.5);
        rulesBtn.scale.setTo(1, 1);
        rulesBtn.inputEnabled = true;
        rulesBtn.events.onInputDown.add(this.onClickOnBtnRules, this);

        var giftBtn = this.add.image(game.world.centerX - 350, game.world.height - 95, 'gift');
        giftBtn.anchor.set(0.5);
        giftBtn.scale.setTo(1, 1);
        giftBtn.inputEnabled = true;
        giftBtn.events.onInputDown.add(this.onClickOnBtnGift, this);

        //#region  show gift code popup
        TH.MainMenu.gcpBlur = game.add.image(game.world.centerX, game.world.centerY, 'blur_bg');
        TH.MainMenu.gcpBlur.anchor.set(0.5);
        TH.MainMenu.gcpBlur.scale.setTo(1, 1);
        TH.MainMenu.gcpBlur.inputEnabled = true;
        TH.MainMenu.giftCodePopup = this.add.image(game.world.centerX, game.world.centerY, 'list_gc');
        TH.MainMenu.giftCodePopup.anchor.set(0.5);
        TH.MainMenu.giftCodePopup.scale.setTo(1, 1);   
        TH.MainMenu.btnClose = game.add.image(TH.MainMenu.giftCodePopup.centerX + TH.MainMenu.giftCodePopup.width/2 - 60, TH.MainMenu.giftCodePopup.centerY - TH.MainMenu.giftCodePopup.height/2 + 75, 'btnClose');
        TH.MainMenu.btnClose.anchor.set(0.5);
        TH.MainMenu.btnClose.scale.setTo(1, 1);     
        TH.MainMenu.btnClose.inputEnabled = true;
        TH.MainMenu.btnClose.events.onInputDown.add(this.onClickToTitle, this);
        TH.MainMenu.btnPrev = game.add.image(game.world.centerX - 300, game.world.centerY + (TH.MainMenu.giftCodePopup.height/2) + 60, 'prev');
        TH.MainMenu.btnPrev.scale.setTo(0.75, 0.75);
        TH.MainMenu.btnPrev.anchor.set(0.5);
        TH.MainMenu.btnNext = this.add.image(game.world.centerX + 300, game.world.centerY + (TH.MainMenu.giftCodePopup.height/2) + 60, 'next');
        TH.MainMenu.btnNext.anchor.set(0.5);
        TH.MainMenu.btnNext.scale.setTo(0.75, 0.75);
        TH.MainMenu.btnPrev.events.onInputDown.add(this.onClickBtnPrev, this);
        TH.MainMenu.btnNext.events.onInputDown.add(this.onClickBtnNext, this);        
        TH.MainMenu.btnPrev.inputEnabled = true;
        TH.MainMenu.btnNext.inputEnabled = true;
        TH.MainMenu.giftCodePopup.inputEnabled = true;

        var startPoint = TH.MainMenu.giftCodePopup.centerX - 70;
        for(var i=0;i<9;i++)
        {
            var gc_text;
            gc_text = game.add.bitmapText(game.world.centerX, startPoint + (i * 130), 'marvin', '', 75);
            gc_text.anchor.set(0.5);
            gc_text.inputEnabled = true;
            gc_text.events.onInputDown.add(this.onClickToGCItem, this);
            TH.MainMenu.listGcText.push(gc_text);
        }       
        paging = game.add.bitmapText(TH.MainMenu.giftCodePopup.centerX + TH.MainMenu.giftCodePopup.width/2 - 125, 
        TH.MainMenu.giftCodePopup.centerY + TH.MainMenu.giftCodePopup.height/2 - 125, 'marvin', '1/3', 90);
        paging.anchor.set(0.5);        
        btnSound = game.add.image(game.world.width, 0, 'sound_on');
        btnSound.anchor.set(0.5);
        btnSound.x -= btnSound.width - 50;
        btnSound.y += btnSound.height / 2;
        if(localStorage.getItem('soundSetting'))
        {
            if(localStorage.getItem('soundSetting') == 's_on')
            {
                TH.sound = true;
                btnSound.loadTexture('sound_on');
                TH.bgMusic = game.add.audio('bg_music', 1, true);
                TH.bgMusic.play();
            }
            else
            {
                TH.sound = false;
                btnSound.loadTexture('sound_off');
            }
        }
        else
        {
            localStorage.setItem('soundSetting', 's_on');
            btnSound.loadTexture('sound_on');
            TH.sound = true;
            TH.bgMusic = game.add.audio('bg_music', 1, true);
            TH.bgMusic.play();
        }
        btnSound.inputEnabled = true;
        btnSound.events.onInputDown.add(this.onClickBtnSound, this);

        var emitter = game.add.emitter(game.world.centerX, -50, 50);
        emitter.makeParticles('snow');
        emitter.width = game.world.width;
        emitter.minParticleSpeed.setTo(10, 30);
        emitter.maxParticleSpeed.setTo(85, 100);
        emitter.minParticleScale = 0.5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 150;
        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        emitter.start(false, 5000, 850);
        emitter.setAlpha(1, 0, 5000);
        //#endregion
        TH.MainMenu.blurBg = game.add.image(game.world.centerX, game.world.centerY, 'blur_bg');
        TH.MainMenu.blurBg.anchor.set(0.5);
        TH.MainMenu.blurBg.scale.setTo(1, 1);
        TH.MainMenu.blurBg.inputEnabled = true;
        TH.MainMenu.blurBg.events.onInputDown.add(this.onCloseGCPopup, this);

        TH.MainMenu.gcPopup = game.add.image(game.world.centerX, game.world.centerY, 'gc_popup');
        TH.MainMenu.gcPopup.anchor.set(0.5);
        TH.MainMenu.gcPopup.scale.setTo(1, 1);
        
        TH.MainMenu.gcTitle = game.add.image(game.world.centerX, game.world.centerY - 370, 'coca_title');
        TH.MainMenu.gcTitle.anchor.set(0.5);
        TH.MainMenu.gcTitle.scale.setTo(1, 1);

        TH.MainMenu.gcDesc = game.add.image(game.world.centerX, game.world.centerY + 265, 'coca_desc');
        TH.MainMenu.gcDesc.anchor.set(0.5);
        TH.MainMenu.gcDesc.scale.setTo(1, 1);

        TH.MainMenu.gcText = game.add.bitmapText(TH.MainMenu.gcPopup.centerX, 50, 'marvin', 'COCA123456', 85);
        TH.MainMenu.gcText.anchor.set(0.5);
        TH.MainMenu.gcText.y = TH.MainMenu.gcTitle.centerX + 250;
        TH.MainMenu.gcText.tint = 0x096199;
        TH.MainMenu.gcPopup.inputEnabled = true;

        TH.MainMenu.gcPopup.visible = false;
        TH.MainMenu.gcText.visible = false;
        TH.MainMenu.gcTitle.visible = false;    
        TH.MainMenu.gcDesc.visible = false;
        TH.MainMenu.blurBg.visible = false;
        this.onClickToTitle();

        instance.rule_blur = game.add.image(game.world.centerX, game.world.centerY, 'blur_bg');
        instance.rule_blur.anchor.set(0.5);
        instance.rule_blur.scale.setTo(1, 1);
        instance.rule_blur.inputEnabled = true;

        instance.rule_bg = game.add.image(game.world.centerX, game.world.centerY, 'rule_popup');
        instance.rule_bg.anchor.set(0.5);
        instance.rule_bg.scale.setTo(1, 1);
        
        instance.rule_close = game.add.image(game.world.centerX + instance.rule_bg.width / 2 - 75, game.world.centerY - instance.rule_bg.height / 2 + 100, 'btnClose');
        instance.rule_close.anchor.set(0.5);
        instance.rule_close.scale.setTo(1, 1);
        
        instance.rule_close.inputEnabled = true;
        instance.rule_close.events.onInputDown.add(instance.onCloseRulePopup, instance);
        instance.onCloseRulePopup();
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                // Logged into your app and Facebook.
                TH.fbAccessToken = response.authResponse.accessToken;
                fbBtn.visible = false;
                TH.MainMenu.playButton.visible = true;
                FB.api(
                    '/me',
                    'GET',
                    {"fields":"id,name"},
                    function(response) {
                        TH.fbUserName = response.name;
                    }
                );
            }
        });
    },
    onClickOnBtnFB: function(){
        game.sound.unlock();
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                // Logged into your app and Facebook.
                TH.fbAccessToken = response.authResponse.accessToken;
                fbBtn.visible = false;
                TH.MainMenu.playButton.visible = true;
                FB.api(
                    '/me',
                    'GET',
                    {"fields":"id,name"},
                    function(response) {
                        TH.fbUserName = response.name;
                    }
                );
            } else {
                var uri = encodeURI("https://kichi-lauchien.github.io/");
                window.location = encodeURI("https://www.facebook.com/dialog/oauth?client_id=158000174877255&redirect_uri="+uri+"&response_type=token");
            }
        });     
    },
    onClickOnBtnPlay: function(){    
        if(!TH.fbAccessToken)
        {
            FB.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    TH.fbAccessToken = response.authResponse.accessToken;
                    gamesparks.facebookConnectRequest(response.authResponse.accessToken, "", function(response) {
                        TH.userId = response.userId;
                        TH.score = 0;
                        TH.hashKey = '';
                        TH.achievement = [];
                        TH.isPlayAgain = false;
                        TH.isGameOver = false;
                        TH.live = 3;
                        game.state.start('Gameplay');
                    });      
                } else {
                    var uri = encodeURI("https://kichi-lauchien.github.io/");
                    window.location = encodeURI("https://www.facebook.com/dialog/oauth?client_id=158000174877255&redirect_uri="+uri+"&response_type=token");
                }
            });     
        }
        else
        {
            gamesparks.facebookConnectRequest(TH.fbAccessToken, "", function(response) {
                TH.userId = response.userId;
                TH.score = 0;
                TH.hashKey = '';
                TH.achievement = [];
                TH.isPlayAgain = false;
                TH.isGameOver = false;
                TH.live = 3;
                game.state.start('Gameplay');
            });      
        }          
    },
    onClickOnBtnRules: function(){
        instance.rule_bg.visible = true;
        instance.rule_blur.visible = true;
        instance.rule_close.visible = true;
    },
    onClickOnBtnGift: function(){  
        if(!gamesparks.getAuthToken())
        {
            if(!TH.fbAccessToken)
            {
                window.alert('Bạn vui lòng đăng nhập facebook để xem giỏ quà nhé <3');
                return;
            }
            else
            {
                this.gamesparksFacebookAuthenticate(TH.fbAccessToken, TH.fbUserName);
            }
        }
        TH.MainMenu.giftCodePopup.visible = true;
        TH.MainMenu.btnPrev.visible = true;
        TH.MainMenu.btnNext.visible = true;   
        TH.MainMenu.btnClose.visible = true;
        TH.MainMenu.gcpBlur.visible = true;
        TH.MainMenu.listGcText.forEach(element => {
            element.visible = true;
        });
        var request = {};
        request["eventKey"] = "GET_LIST_GC_OF_USER";
        request["USER_ID"] = TH.userId;
        gamesparks.sendWithData("LogEventRequest", request, function(response){
            if(response.scriptData.data)
            {
                TH.MainMenu.data = response.scriptData.data;
                totalPage = Math.ceil(TH.MainMenu.data.length / 9);
                currentPageIndex = 1;
                paging.setText(currentPageIndex + '/' + totalPage);
                var currentPageData = instance.loadGCListByPageIndex(currentPageIndex); 
                for(var i=0;i<9;i++)
                {
                    if(currentPageData[i])
                    {
                        TH.MainMenu.listGcText[i].visible = true;
                        TH.MainMenu.listGcText[i].setText(currentPageData[i].giftCode);
                    }
                    else
                    {
                        TH.MainMenu.listGcText[i].visible = false;
                        TH.MainMenu.listGcText[i].setText('');
                    }
                }
            }
        });
    },
    gamesparksFacebookAuthenticate : function(tokenFB, displayName)
    {
        gamesparks.facebookConnectRequest(tokenFB, "", function(response) {
            TH.userId = response.userId;
        });
    },
    onClickBtnNext: function()
    {
        if(currentPageIndex >= totalPage)
            return;

        if(currentPageIndex < totalPage)
            currentPageIndex ++;

        if(currentPageIndex == totalPage)
            TH.MainMenu.btnNext.visible = false;   
        if(currentPageIndex > 1)
            TH.MainMenu.btnPrev.visible = true;    
        
        paging.setText(currentPageIndex + '/' + totalPage);
        var currentPageData = this.loadGCListByPageIndex(currentPageIndex); 
        for(var i=0;i<9;i++)
        {
            if(currentPageData[i])
            {
                TH.MainMenu.listGcText[i].visible = true;
                TH.MainMenu.listGcText[i].setText(currentPageData[i].giftCode);
            }
            else
            {
                TH.MainMenu.listGcText[i].visible = false;
                TH.MainMenu.listGcText[i].setText('');
            }
        }
    },
    onClickBtnPrev: function()
    {
        if(currentPageIndex <= 1)
            return;

        if(currentPageIndex > 1)
            currentPageIndex --;

        if(currentPageIndex == 1)
            TH.MainMenu.btnPrev.visible = false;    
        
        if(currentPageIndex < totalPage)
            TH.MainMenu.btnNext.visible = true;    

        paging.setText(currentPageIndex + '/' + totalPage);    
        var currentPageData = this.loadGCListByPageIndex(currentPageIndex); 
        for(var i=0;i<9;i++)
        {
            if(currentPageData[i])
            {
                TH.MainMenu.listGcText[i].visible = true;
                TH.MainMenu.listGcText[i].setText(currentPageData[i].giftCode);
            }
            else
            {
                TH.MainMenu.listGcText[i].visible = false;
                TH.MainMenu.listGcText[i].setText('');
            }
        }
    },
    onClickToGCItem: function(item)
    {
        TH.MainMenu.gcPopup.visible = true;
        TH.MainMenu.gcText.visible = true;
        TH.MainMenu.gcTitle.visible = true;
        TH.MainMenu.gcDesc.visible = true;
        TH.MainMenu.blurBg.visible = true;
        TH.MainMenu.gcText.setText(item.text);
        if(item.text.startsWith("COCA"))
        {
            TH.MainMenu.gcTitle.loadTexture("coca_title");
            TH.MainMenu.gcDesc.loadTexture("coca_desc");
        }
        else if(item.text.startsWith("CRM"))
        {
            TH.MainMenu.gcTitle.loadTexture("caramel_title");
            TH.MainMenu.gcDesc.loadTexture("caramel_desc");
        }
        else if(item.text.startsWith("DETO"))
        {
            TH.MainMenu.gcTitle.loadTexture("detox_title");
            TH.MainMenu.gcDesc.loadTexture("detox_desc");
        }
        else if(item.text.startsWith("BFF"))
        {
            TH.MainMenu.gcTitle.loadTexture("buffet_title");
            TH.MainMenu.gcDesc.loadTexture("buffet_desc");
        }
    },
    onClickToTitle: function()
    {
        TH.MainMenu.giftCodePopup.visible = false;
        TH.MainMenu.btnClose.visible = false;
        TH.MainMenu.btnPrev.visible = false;
        TH.MainMenu.btnNext.visible = false;
        TH.MainMenu.gcpBlur.visible = false;
        TH.MainMenu.listGcText.forEach(element => {
            element.visible = false;
        });
    },
    onClickBtnSound: function()
    {
        if(TH.sound)
        {
            btnSound.loadTexture('sound_off');
            localStorage.setItem('soundSetting', 's_off');
            TH.sound = false;
            if(TH.bgMusic)
            {
                TH.bgMusic.stop();
            }
        }
        else
        {
            btnSound.loadTexture('sound_on');
            localStorage.setItem('soundSetting', 's_on');
            TH.sound = true;
            if(!TH.bgMusic)
            {
                TH.bgMusic = game.add.audio('bg_music', 1, true);                
            }
            TH.bgMusic.play();
        }
    },
    loadGCListByPageIndex: function(pageIndex)
    {
        if(pageIndex <= 0 || pageIndex > totalPage)
        {
            return;
        }

        var pageDatas = [];
        var pageStart = (pageIndex - 1) * 9;
        var pageEnd = pageStart + 9;
        for(var i = pageStart; i < pageEnd; i++)
        {
            if(TH.MainMenu.data[i])
            {
                pageDatas.push(TH.MainMenu.data[i]);
            }
        }

        return pageDatas;
    },
    onCloseGCPopup: function()
    {
        TH.MainMenu.gcPopup.visible = false;
        TH.MainMenu.gcText.visible = false;
        TH.MainMenu.gcTitle.visible = false;
        TH.MainMenu.gcDesc.visible = false;
        TH.MainMenu.blurBg.visible = false;
    },
    onCloseRulePopup:function()
    {
        instance.rule_bg.visible = false;
        instance.rule_blur.visible = false;
        instance.rule_close.visible = false;
    }
};