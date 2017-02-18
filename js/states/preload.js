// JavaScript Document
var protoGame = protoGame || {};

protoGame.Preload=function(game){}
protoGame.Preload.prototype={
	preload:function(){
		
	
		this.game.load.onLoadStart.add(function(){}, this);
    	this.game.load.onFileComplete.add(this.fileComplete, this);
		
   		this.game.load.onLoadComplete.add(function(){
	   
	 		protoGame.Preload.loadingBar.visible=false;
			protoGame.Preload.loadingPerc.visible=false;
			protoGame.Preload.startBtn.visible=true;
			
			  
	   
	   }, this);
	   
	   protoGame.Preload.loadingContainer=this.add.sprite(0,0,this.game.cache.getBitmapData('loadingContainer'));
	   
	   	//start button
		//--------------------------
	   		protoGame.Preload.startBtn=this.add.sprite(0,0,this.game.cache.getBitmapData('startBtn'));
			protoGame.Preload.startBtn.anchor.setTo(0);
	   			
	   			_spriteText=this.game.add.text(protoGame.Preload.startBtn.width/2,protoGame.Preload.startBtn.height/2, 'START', { fill: '#ffffff'});
			   
			   _spriteText.anchor.set(0.5);
			   protoGame.Preload.startBtn.addChild(_spriteText);
			   
	   		   protoGame.Preload.startBtn.inputEnabled = true;
			   protoGame.Preload.startBtn.events.onInputDown.add(function(){this.game.state.start('Game'); }, this);
			   protoGame.Preload.startBtn.visible=false;
			   protoGame.Preload.loadingContainer.addChild(protoGame.Preload.startBtn);
	   
	   //Loading container
	   //--------------------------
	    
		
		protoGame.Preload.loadingBar=this.add.sprite(0,0,this.game.cache.getBitmapData('loadingBar'));
		protoGame.Preload.loadingBar.anchor.setTo(0);
		protoGame.Preload.loadingBarSize={width:protoGame.Preload.loadingBar.width,height:protoGame.Preload.loadingBar.height};
		
		protoGame.Preload.loadingPerc = this.game.add.text(protoGame.Preload.loadingBarSize.width/2,protoGame.Preload.loadingBarSize.height/2, '0%', { fill: '#ffffff',stroke:'#0096ff',strokeThickness:5 });
		protoGame.Preload.loadingBar.addChild(protoGame.Preload.loadingPerc);
		protoGame.Preload.loadingPerc.anchor.set(0.5);
		
		protoGame.Preload.loadingContainer.addChild(protoGame.Preload.loadingBar);
		this.load.setPreloadSprite(protoGame.Preload.loadingBar);
		
		//Assets List
	   //--------------------------	
			
		for (var _p=0; _p<profiles.length; _p++){  this.game.load.image('profile'+_p, profiles[_p].picture); }
	
	
	 		this.game.load.image('tile', "assets/images/tile.png");
			this.game.load.image('game-bg', "assets/images/game-bg.png");
			this.game.load.image('logo', "assets/images/logo.png");
			
			this.game.load.image('figure', "assets/images/figure.jpg");
			this.game.load.image('bg-popup', "assets/images/bg-popup.png");
			this.game.load.image('btn-blue', "assets/images/btn-blue.png");
			this.game.load.image('btn-red', "assets/images/btn-red.png");
			this.game.load.image('btn-purple', "assets/images/btn-purple.png");
			this.game.load.image('btn-green', "assets/images/btn-green.png");
			this.game.load.image('btn-green-select', "assets/images/btn-green-select.png");
			this.game.load.image('btn-scroller', "assets/images/btn-scroller.png");
			this.game.load.image('btn-scroller-right', "assets/images/btn-scroller-right.png");
			this.game.load.image('scroll-bg', "assets/images/scroll-bg.png");
			
			this.game.load.image('popup', "assets/images/popup.png");
			this.game.load.image('computer', "assets/images/computer.png");
			this.game.load.image('popup-green', "assets/images/popup-green.png");
			
			this.game.load.image('bg-white', "assets/images/bg-white.png");
			this.game.load.image('no-thumb', "assets/images/thumbs-down-left.png");
			this.game.load.image('yes-thumb', "assets/images/thumbs-up-right.png");
			this.game.load.image('a-tile', "assets/images/anonymous-tile.png");
			this.game.load.image('selected', "assets/images/selected.png");
			this.game.load.image('cross', "assets/images/cross.png");
			this.game.load.image('bg-transparent', "assets/images/bg-transparent.png");
			
			this.game.load.image('icon-settings', "assets/images/icon-settings.png");
			this.game.load.image('icon-credits', "assets/images/icon-credits.png");
			
			this.game.load.image('francesco', "assets/images/francesco-raimondo.png");
			
			this.game.load.image('beard', "assets/images/profileIcons/beard.png");
			this.game.load.image('black', "assets/images/profileIcons/black.png");
			this.game.load.image('blonde', "assets/images/profileIcons/blonde.png");
			this.game.load.image('brown', "assets/images/profileIcons/brown.png");
			this.game.load.image('earrings', "assets/images/profileIcons/earrings.png");
			this.game.load.image('eyeblue', "assets/images/profileIcons/eyeblue.png");
			this.game.load.image('eyebrown', "assets/images/profileIcons/eyebrown.png");
			this.game.load.image('eyegreen', "assets/images/profileIcons/eyegreen.png");
			this.game.load.image('glasses', "assets/images/profileIcons/glasses.png");
			this.game.load.image('grey', "assets/images/profileIcons/grey.png");
			this.game.load.image('mustache', "assets/images/profileIcons/mustache.png");
			this.game.load.image('red', "assets/images/profileIcons/red.png");
			this.game.load.image('closeup', "assets/images/profileIcons/closeup.png");
			this.game.load.image('smile', "assets/images/profileIcons/smile.png");
			this.game.load.image('elsewhere', "assets/images/profileIcons/elsewhere.png");
			
			this.game.load.spritesheet('icon-music', 'assets/images/icon-music.png', 35, 35, 2);
			this.game.load.spritesheet('battery', 'assets/images/ai-level.png', 257, 153, 4);
			
			this.game.load.audio('maintheme', ['assets/sound/gameold.mp3']);
			this.game.load.audio('incorrect', ['assets/sound/incorrect.mp3']);
		
		this.position();
			
		},
		
	fileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles){ protoGame.Preload.loadingPerc.text=progress+"%";},
	
	position:function(){ 
		
		var _x=parseInt((protoGame.Preload.loadingContainer.width/2)-(protoGame.Preload.loadingBarSize.width/2));
		var _y=parseInt((protoGame.Preload.loadingContainer.height/2)-(protoGame.Preload.loadingBarSize.height/2));
		protoGame.Preload.loadingBar.x=_x;
		protoGame.Preload.loadingBar.y=_y;
		
		_x=parseInt((protoGame.Preload.loadingContainer.width/2)-(protoGame.Preload.startBtn.width/2));
		_y=parseInt((protoGame.Preload.loadingContainer.height/2)-(protoGame.Preload.startBtn.height/2));
		protoGame.Preload.startBtn.x=_x;
		protoGame.Preload.startBtn.y=_y;
		
	}
	
	
	
	}