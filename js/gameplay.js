TH.Gameplay = function(){
    var spawnAllowed = true;
    var items;
    var bullets, gun;    
    var fireRate;
    var nextFire; 
    var spacebarKey;
    var isReversing = false;
    var scoreText;
    var itemSpawnSpeed = 1000;
    var currentTimer;
    var bombs;
    var live1, live2, live3;
    var effects;
    var shoot, coin, blash;
    var emitter;
};

TH.Gameplay.prototype = 
{
    init: function()
    {
        var timer, timerEvent, text;         
        TH.Gameplay.spawnAllowed = true;  
        TH.Gameplay.currentTimer = 0;
    },
    preload: function()
    {
        
    }, 
    create: function()
    {      
        game.sound.remove(TH.bgMusic);
        shoot = game.add.audio('shoot');
        coin = game.add.audio('coin');
        blash = game.add.audio('blash');
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'ingame_bg');
        bg.anchor.set(0.5);
        nextFire = 0;
        fireRate = 400;
        
        // Create a custom timer
        timer = game.time.create();        
        // Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE * 20, this.endTimer, this);        
        // Start the timer
        timer.start();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        items = this.game.add.group(); // create group
        items.enableBody = true;
        items.physicsBodyType = Phaser.Physics.ARCADE;
        items.createMultiple(50, 'item1');
        items.setAll('checkWorldBounds', true);
        items.setAll('outOfBoundsKill', true);

        bombs = this.game.add.group(); // create group
        bombs.enableBody = true;
        bombs.physicsBodyType = Phaser.Physics.ARCADE;
        bombs.createMultiple(50, 'bomb');
        bombs.setAll('checkWorldBounds', true);
        bombs.setAll('outOfBoundsKill', true);

        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        gun = game.add.sprite(35, game.world.height, 'gun');
        gun.x += gun.width / 2 + 30;
        gun.y -= gun.height/2 + 70;
        gun.anchor.set(0.5);
        game.physics.enable(gun, Phaser.Physics.ARCADE);
        gun.body.allowRotation = false;
        game.physics.arcade.enable([bullets, items]);
        game.physics.arcade.enable([bullets, bombs]);

        this.createEnemy();

        var top_bar = game.add.image(game.world.centerX, 0, 'top_bar');
        top_bar.anchor.set(0.5);
        top_bar.y += top_bar.height/2;

        live1 = game.add.image(game.world.centerX+300, 95, 'live');
        live1.anchor.set(0.5);
        live1.scale.setTo(1, 1);
        live1.x -= (live1.width/2 + 65);
        live2 = game.add.image(game.world.centerX+300, 95, 'live');
        live2.anchor.set(0.5);
        live2.scale.setTo(1, 1);
        live3 = game.add.image(game.world.centerX+300, 95, 'live');
        live3.anchor.set(0.5);
        live3.scale.setTo(1, 1);
        live3.x += (live3.width/2 + 65);        

        spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //text = game.add.bitmapText(game.world.width, 95, 'spaceComics', 'Kichi', 108);
        //text.anchor.set(1, 0.5);
        //text.x -= 45;
        scoreText = game.add.bitmapText(45, 95, 'spaceComics', TH.score, 108);
        scoreText.setText(TH.score);
        scoreText.anchor.set(0, 0.5);

        emitter = game.add.emitter(game.world.centerX, -50, 50);
        emitter.makeParticles('snow_ingame');
        emitter.width = game.world.width;
        emitter.minParticleSpeed.setTo(10, 30);
        emitter.maxParticleSpeed.setTo(85, 100);
        emitter.minParticleScale = 0.5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 150;
        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        emitter.start(false, 5000, 250);
        emitter.setAlpha(1, 0, 5000);
    },
    update: function () {
        if(TH.isGameOver)
        {
            return;
        }
        TH.Gameplay.currentTimer = 1200 - (Math.round((timerEvent.delay - timer.ms) / 1000));
        //text.setText(this.formatTime(currentTimer));
        if (game.input.activePointer.isDown)
        {
            this.fire();        
        }

        if(spacebarKey.isDown)
        {
            var allTweens = game.tweens.getAll();  
            allTweens.forEach(element => {
                element.reverse = !element.reverse;
            });
        }

        game.physics.arcade.overlap(bullets, items, this.collisionHandler, null, this);
        game.physics.arcade.overlap(bullets, bombs, this.bombCollisionHandler, null, this);
    },
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        timer.stop();
    },
    formatTime: function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },
    fire: function(){
        if(TH.isGameOver)
        {
            return;
        }
        if (this.time.now > nextFire && bullets.countDead() > 0)
        {
            if(TH.sound == true)
            {
                shoot.play();
            }            
            nextFire = this.time.now + fireRate;
            var bullet = bullets.getFirstDead();

            bullet.reset(gun.x - 8, gun.y - 8);
            bullet.scale.setTo(1);

            game.physics.arcade.moveToXY(bullet, game.world.width, -50, 1200, 500);
        }
    }, 
    createEnemy: function(){
        if (TH.Gameplay.spawnAllowed) {
            //dish.play();
            var randomNo = game.rnd.integerInRange(0,1);
            var item;
            if(randomNo == 0)
            {
                item = items.getFirstDead();
                var itemType = game.rnd.integerInRange(1, 11);           
                item.loadTexture('item' + itemType);
                item.name = 'item' + itemType;
                item.scale.setTo(1);
            }                
            else
            {
                item = bombs.getFirstDead();
                item.name = 'bomb';
                item.scale.setTo(1);
            }                

            item.reset(0, 0);
            item.anchor.set(0.5);            
            
            var tween = this.game.add.tween(item).to({
            x: [0, 22,33,50,72,94,122,159,220,267,334,399,440,477,524,619,706,759,814,865,895,920,926,920,904,853,789,722,655,611,552,488,415,354,309,251,231,214,237,270,306,343,399,457,516,572,636,669,728,778,828,876,898,920,940,926,918,912,893,859, 859],
            y: [0, 70,98,151,199,235,277,296,319,330,347,347,349,349,344,333,330,338,360,391,425,478,534,589,651,707,746,757,768,771,782,796,818,838,868,907,963,1039,1075,1134,1167,1187,1203,1223,1242,1242,1259,1270,1295,1318,1360,1418,1480,1560,1653,1717,1798,1845,1881,1907, 2050],
            }, this.getItemSpeed(),Phaser.Easing.Linear.In, true).interpolation(function(v, k){
                return Phaser.Math.bezierInterpolation(v, k);
            });
            tween.onComplete.add(function() {
                item.kill();
                if(item.name.startsWith('item'))
                {
                    TH.live -= 1;
                    if(TH.live === 2)
                        live3.visible = false;
                    else if(TH.live === 1)
                        live2.visible = false;
                    else if(TH.live <= 0)
                    {
                        live1.visible = false;    
                        game.state.start('Result');        
                    }
                }                
            }, this);
            this.game.time.events.add(this.getItemSpawnTime(), this.createEnemy, this);
       }
    },
    collisionHandler: function(bullet, item)
    {
        if(item.name.startsWith('item'))
        {
            if(TH.sound == true)
            {
                coin.play();
            }            
            var sprite = game.add.sprite(item.centerX, item.centerY, 'fire');
            sprite.scale.setTo(1.75, 1.75);
            sprite.anchor.set(0.5);
            var anim = sprite.animations.add('explosion');
            sprite.animations.play('explosion', 24, false);
            anim.killOnComplete = true;

            TH.score += 5;
            this.processAchievement(item.name);
            scoreText.setText(TH.score);
            bullet.kill();
            item.loadTexture(item.name + '_open');
            item.name = 'collected';
        }        
        else if(item.name.startsWith('collected'))
        {
            bullet.kill();
        }
    },
    processAchievement: function(itemName)
    {
        TH['\x61\x63\x68\x69\x65\x76\x65\x6d\x65\x6e\x74']['\x70\x75\x73\x68'](itemName);TH['\x68\x61\x73\x68\x4b\x65\x79']=md5(TH['\x61\x63\x68\x69\x65\x76\x65\x6d\x65\x6e\x74']['\x74\x6f\x53\x74\x72\x69\x6e\x67']());
    },
    bombCollisionHandler: function(bullet, item)
    {   
        item.loadTexture(item.name + '_open');
        var sprite = game.add.sprite(item.centerX, item.centerY, 'boom');
        sprite.scale.setTo(1.75, 1.75);
        sprite.anchor.set(0.5);
        var anim = sprite.animations.add('blash');
        sprite.animations.play('blash', 16, false);
        anim.killOnComplete = true;
        bullet.kill();
        item.kill();
        this.gameOver();        
    },
    getItemSpawnTime: function(){
        if(TH.Gameplay.currentTimer <= 10)
        {
            return game.rnd.integerInRange(650, 750);
        }
        if(TH.Gameplay.currentTimer > 10 && TH.Gameplay.currentTimer <= 20)
        {
            return game.rnd.integerInRange(550, 650);
        }
        else if(TH.Gameplay.currentTimer <= 30 && TH.Gameplay.currentTimer > 20)
        {
            return game.rnd.integerInRange(450, 550);
        }
        else if(TH.Gameplay.currentTimer <= 40 && TH.Gameplay.currentTimer > 30)
        {
            return game.rnd.integerInRange(450, 550);
        }
        else if(TH.Gameplay.currentTimer <= 50 && TH.Gameplay.currentTimer > 40)
        {
            return game.rnd.integerInRange(350, 450);
        }
        else if(TH.Gameplay.currentTimer <= 60 && TH.Gameplay.currentTimer > 50)
        {
            return game.rnd.integerInRange(250, 350);
        }
        else if(TH.Gameplay.currentTimer <= 70 && TH.Gameplay.currentTimer > 60)
        {
            return game.rnd.integerInRange(230, 250);
        }
        else if(TH.Gameplay.currentTimer <= 80 && TH.Gameplay.currentTimer > 70)
        {
            return game.rnd.integerInRange(200, 230);
        }
        else if(TH.Gameplay.currentTimer <= 90 && TH.Gameplay.currentTimer > 80)
        {
            return game.rnd.integerInRange(180, 200);
        }
        else if(TH.Gameplay.currentTimer <= 100 && TH.Gameplay.currentTimer > 90)
        {
            return game.rnd.integerInRange(160, 180);
        }
        else if(TH.Gameplay.currentTimer > 100)
        {
            return game.rnd.integerInRange(140, 160);
        }
        else
        {
            return game.rnd.integerInRange(650, 750);
        }
    },
    getItemSpeed: function(){
        if(TH.Gameplay.currentTimer <= 10)
        {
            return 3000;
        }
        else if(TH.Gameplay.currentTimer <= 20 && TH.Gameplay.currentTimer > 10)
        {
            return 2800;
        }
        else if(TH.Gameplay.currentTimer <= 30 && TH.Gameplay.currentTimer > 20)
        {
            return 2600;
        }
        else if(TH.Gameplay.currentTimer <= 40 && TH.Gameplay.currentTimer > 30)
        {
            return 2400;
        }
        else if(TH.Gameplay.currentTimer <= 50 && TH.Gameplay.currentTimer > 40)
        {
            return 2200;
        }
        else if(TH.Gameplay.currentTimer <= 60 && TH.Gameplay.currentTimer > 50)
        {
            return 2000;
        }
        else if(TH.Gameplay.currentTimer <= 70 && TH.Gameplay.currentTimer > 60)
        {
            return 1900;
        }
        else if(TH.Gameplay.currentTimer <= 80 && TH.Gameplay.currentTimer > 70)
        {
            return 1800;
        }
        else if(TH.Gameplay.currentTimer > 80)
        {
            return 1700;
        }
        else
        {
            return 3000;
        }
    },
    goToResult: function()
    {
        game.state.start('Result');
    },
    gameOver: function()
    {
        if(TH.sound == true)
        {
            blash.play();
        }
        
        TH.isGameOver = true;
        game.tweens.removeAll();
        this.game.time.events.removeAll();
        this.game.time.events.add(2000, this.goToResult, this);
    }
};
