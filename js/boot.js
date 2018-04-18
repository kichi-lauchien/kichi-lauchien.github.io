var TH = {
    score : 0,
    achievement: [],
    hashKey: '',
    live: 3,
    isGameOver: false,
    isPlayAgain: false,
    fbAccessToken : null,
    fbUserName : null,
    userId : '',
    sound: true
};

TH.Boot = function()
{
    
};

TH.Boot.prototype = 
{
    init: function()
    {
        game.load.crossOrigin = 'anonymous';
        this.input.maxPointers = 1;
        game.time.advancedTiming = true;
        this.scale.pageAlignHorizontally = true;
        // Maintain aspect ratio
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;      
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMaximum();
        game.scale.refresh();
        
        gamesparks = new GameSparks();
        gamesparks['\x69\x6e\x69\x74\x4c\x69\x76\x65']({'\x6b\x65\x79':'\x6f\x33\x35\x32\x31\x34\x32\x4b\x59\x6f\x63\x37','\x73\x65\x63\x72\x65\x74':'\x71\x66\x77\x74\x73\x46\x57\x4a\x70\x44\x46\x66\x6f\x65\x50\x72\x32\x64\x64\x4c\x50\x74\x75\x32\x38\x34\x34\x37\x6c\x63\x66\x33','\x6f\x6e\x4e\x6f\x6e\x63\x65':this['\x6f\x6e\x4e\x6f\x6e\x63\x65'],'\x6f\x6e\x49\x6e\x69\x74':this['\x6f\x6e\x49\x6e\x69\x74'],'\x6f\x6e\x4d\x65\x73\x73\x61\x67\x65':this['\x6f\x6e\x4d\x65\x73\x73\x61\x67\x65'],'\x6c\x6f\x67\x67\x65\x72':console['\x6c\x6f\x67']});
    },
    preload: function()
    {
        this.load.image('preloaderBar', 'assets/progress.png');
        this.load.image('loading', 'assets/loading.png');
        this.load.image('pre_title', 'assets/pre_title.png');
    }, 
    create: function()
    {    
        game.stage.backgroundColor = 'f24a41';
        game.state.start('Preloader');
    },
    onNonce: function(nonce)
    {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(nonce, "qfwtsFWJpDFfoePr2ddLPtu28447lcf3"));
    },
    onInit: function()
    {
        console.log("Initialized");
    },
    onMessage: function(message)
    {
        console.log(JSON.stringify(message));
    }
};