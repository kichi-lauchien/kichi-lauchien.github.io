

TH.Preloader = function(){
    
};

var loadingBar;

TH.Preloader.prototype = 
{
    init: function()
    {
    },
    preload: function()
    {
        game.stage.backgroundColor = 'f24a41';
        var title = game.add.image(game.world.centerX, 650, 'pre_title');
        title.anchor.set(0.5);
        var preloaderBar = game.add.sprite(game.world.centerX, game.world.centerY, 'preloaderBar');
        preloaderBar.scale.setTo(1, 1);
        preloaderBar.anchor.set(0, 0.5);
        preloaderBar.x = game.world.centerX - preloaderBar.width / 2;
        var loadingText = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'loading');
        loadingText.scale.setTo(1, 1);
        loadingText.anchor.set(0.5);

        this.load.setPreloadSprite(preloaderBar);
        this.load.image('play', 'assets/play.png');
        this.load.image('gun', 'assets/CANON.png');
        this.load.image('bullet', 'assets/bullet.png');

        this.load.image('item1', 'assets/items/item1.png');
        this.load.image('item2', 'assets/items/item2.png');
        this.load.image('item3', 'assets/items/item3.png');
        this.load.image('item4', 'assets/items/item4.png');
        this.load.image('item5', 'assets/items/item5.png');
        this.load.image('item6', 'assets/items/item6.png');
        this.load.image('item7', 'assets/items/item7.png');
        this.load.image('item8', 'assets/items/item8.png');
        this.load.image('item9', 'assets/items/item9.png');
        this.load.image('item10', 'assets/items/item10.png');
        this.load.image('item11', 'assets/items/item11.png');

        this.load.image('item1_open', 'assets/items/item1_open.png');
        this.load.image('item2_open', 'assets/items/item2_open.png');
        this.load.image('item3_open', 'assets/items/item3_open.png');
        this.load.image('item4_open', 'assets/items/item4_open.png');
        this.load.image('item5_open', 'assets/items/item5_open.png');
        this.load.image('item6_open', 'assets/items/item6_open.png');
        this.load.image('item7_open', 'assets/items/item7_open.png');
        this.load.image('item8_open', 'assets/items/item8_open.png');
        this.load.image('item9_open', 'assets/items/item9_open.png');
        this.load.image('item10_open', 'assets/items/item10_open.png');
        this.load.image('item11_open', 'assets/items/item11_open.png');
        this.load.image('bomb', 'assets/items/bomb.png');
        this.load.image('bomb_open', 'assets/items/bomb_open.png');

        this.load.image('fb_login', 'assets/fb_login.png');     
        this.load.image('rules', 'assets/rules.png');
        this.load.image('gift', 'assets/gift.png');
        this.load.image('score_bg', 'assets/score_bg.png');
        this.load.bitmapFont('marvin', 'fonts/Marvin/Marvin_0.png', 'fonts/Marvin/Marvin.xml');
        this.load.bitmapFont('spaceComics', 'fonts/SpaceComics_0.png', 'fonts/SpaceComics.xml');
        this.load.image('ingame_bg', 'assets/ingame_bg.png');
        this.load.image('top_bar', 'assets/top_bar.png');
        this.load.image('live', 'assets/live.png');
        this.load.spritesheet('fire', 'assets/fire.png', 256, 256, 5);
        this.load.spritesheet('boom', 'assets/BOOM.png', 256, 256, 9);

        this.load.image('avatar', 'assets/avatar.png');
        this.load.image('congrat', 'assets/congrat.png');
        this.load.image('footer', 'assets/footer.png');
        this.load.image('get_code', 'assets/get_code.png');
        this.load.image('score_bg', 'assets/congrat.png');
        this.load.image('share_score_fb', 'assets/share_score_facebook.png');
        this.load.image('share_with_friend', 'assets/share_with_friend.png');
        this.load.image('sound_off', 'assets/sound_off.png');
        this.load.image('sound_on', 'assets/sound_on.png');
        this.load.image('result_bg', 'assets/result_bg.png');
        this.load.image('play_again', 'assets/play_again.png');
        this.load.image('khampha_uudai', 'assets/khampha_uudai.png');
        this.load.image('next', "assets/next.png");
        this.load.image('prev', "assets/prev.png");
        this.load.image('chan', "assets/chan.png");
        this.load.image('le', "assets/le.png");
        this.load.image('snow', "assets/snowflake.png");

        this.load.image('btnClose', 'assets/btnClose.png');
        this.load.image('list_gc', 'assets/list_gc.png');

        this.load.image('bg', 'assets/bg.png');
        this.load.image('title', 'assets/title.png');

        this.load.image('blur_bg', 'assets/blur_bg.png');
        this.load.image('buffet_desc', 'assets/buffet_desc.png');
        this.load.image('buffet_title', 'assets/buffet_title.png');
        this.load.image('caramel_desc', 'assets/caramel_desc.png');
        this.load.image('caramel_title', 'assets/caramel_title.png');
        this.load.image('coca_desc', 'assets/coca_desc.png');
        this.load.image('coca_title', 'assets/coca_title.png');
        this.load.image('detox_desc', 'assets/detox_desc.png');
        this.load.image('detox_title', 'assets/detox_title.png');

        this.load.image('cow', 'assets/cow.png');
        this.load.image('gc_popup', 'assets/gc_popup.png');
        this.load.image('rule_popup', 'assets/rule_popup.png');
        this.load.image('snow_ingame', 'assets/snow_ingame.png');
        this.load.image('start_game', 'assets/start_game.png');

        if(this.game.device.iOS)
        {
            this.load.audio('bg_music', 'sound/bg_music.m4a');
            this.load.audio('shoot', 'sound/shoot.m4a');
            this.load.audio('blash', 'sound/wrong.m4a');
            this.load.audio('coin', 'sound/smb_coin.m4a');
        }
        else
        {
            this.load.audio('bg_music', 'sound/bg_music.ogg');
            this.load.audio('shoot', 'sound/shoot.ogg');
            this.load.audio('blash', 'sound/blash.ogg');
            this.load.audio('coin', 'sound/smb_coin.ogg');
        }        
    }, 
    create: function()
    {   
        game.state.start("MainMenu");
    }
};


