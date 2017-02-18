// JavaScript Document
var protoGame = protoGame || {};


protoGame.Game.prototype.create=function(){
		
		GameGroup = this.game.add.group();
		IntroGroup = this.game.add.group();
		ScrollerGroup = this.game.add.group();
		ScrollerGroupText = this.game.add.group();
		HiGroup = this.game.add.group();
		OptionsGroup= this.game.add.group();
		GridGroup = this.game.add.group();
		CreditsGroup = this.game.add.group();
		SettingsGroup = this.game.add.group();
		PopupGroup = this.game.add.group();
		RoundGroup = this.game.add.group();
		DetailGroup = this.game.add.group();
		DetailGroup.alpha=0;
		
		_gamebg=this.game.add.sprite(0, 0, 'game-bg');
		GameGroup.add(_gamebg);
		
		GameGroup.add(GridGroup);
		GameGroup.add(ScrollerGroup);
		
		_bgIntro=this.game.add.sprite(0, 0, 'bg-white');
		IntroGroup.add(_bgIntro);
		IntroGroup.add(HiGroup);
		IntroGroup.add(OptionsGroup);
		
		GridCmpGroup = this.game.add.group();
		GridCmpGroup.x=640;
		GridCmpGroup.y=490;
		
		GameGroup.add(GridCmpGroup);
		PopupGroup.alpha=0;
		RoundGroup.alpha=0;

		protoGame.Game.profiles=[];
		protoGame.Game.gridProfiles=[];
		protoGame.Game.gameState={};
		
		protoGame.Game.popup={};
		protoGame.Game.detail={};
		
		protoGame.Game.roundPopup={};
		
		protoGame.Game.yourTurn=false;
		
		protoGame.Game.level=2;
		
		protoGame.Game.gridObjectTrue={};
		protoGame.Game.gridObjectFalse={};
		
		protoGame.Game.scrollerPosition=0;
		protoGame.Game.scrollerEnabled=false;
		protoGame.Game.characterInput=false;
		protoGame.Game.characterSelected=false;
		
		protoGame.Game.characterSprite;
		protoGame.Game.yourSelection;
		protoGame.Game.computerSelection;
		
		protoGame.Game.gameState.gameIntro="gameIntro";
		protoGame.Game.gameState.gameChoose="gameChoose";
		protoGame.Game.gameState.status=protoGame.Game.gameState.gameIntro;
		
		protoGame.Game.game=this.game;	
		
		//load profiles and create the sprite
		var _profile;
		var _gprofile;
		for (var _p=0; _p<profiles.length; _p++){ 
			_profile=this.game.add.sprite(-200, -200, 'profile'+_p);
			_gprofile=this.game.add.sprite(-200, -200, 'profile'+_p);
			_profile.anchor.set(0,0);
			_profile.profile=profiles[_p];
			_gprofile.profile=profiles[_p];
			_gprofile.inputEnabled = true;
			_gprofile.events.onInputDown.add(this.clickCharacter, this);
			_gprofile.events.onInputOver.add(this.overCharacter, this);
			_gprofile.events.onInputOut.add(this.outCharacter, this);
			protoGame.Game.profiles.push(_profile);
			
			_name=this.game.add.text(0,200, profiles[_p].name, { fill: '#ffffff' });
			_name.anchor.set(0.5);
    		_name.align = 'center';
    		_name.fontSize = 25;
    		_name.fontWeight = 'bold';
			_name.anchor.set(0,0);
			
			_gprofile.addChild(_name);
			
			_selected=this.game.add.sprite(0,0, 'selected');
			_selected.alpha=0;
			_gprofile.addChild(_selected);
			
			_cross=this.game.add.sprite(0,0, 'cross');
			_cross.alpha=0;
			_gprofile.addChild(_cross);
			
			protoGame.Game.gridProfiles.push(_gprofile);
			HiGroup.add(_profile);
			GridGroup.add(_gprofile);
			
		 }
		 
		 protoGame.Game.computer=this.game.add.sprite(644, 148, 'computer');
		 protoGame.Game.computer.alpha=0;
		 GameGroup.add(protoGame.Game.computer);
		 
		 _aiText=this.game.add.text(660,460, "AI progress", { fill: '#ffffff' });
    	 _aiText.fontSize = 20;
    	GameGroup.add(_aiText);
		
		 protoGame.Game.helpText=this.game.add.text(644,325, "", { fill: '#ffffff' });
    	 protoGame.Game.helpText.fontSize = 14;
		 protoGame.Game.helpText.wordWrap=true;
		 protoGame.Game.helpText.wordWrapWidth=150;
    	GameGroup.add(protoGame.Game.helpText);
			
		 
		//console.log(protoGame.Game.profiles.length);
		protoGame.Game.figure=this.game.add.sprite(this.game.world.width / 2, (this.game.world.height / 2), 'figure');
		protoGame.Game.figure.anchor.set(0.5,0.5);
		
		protoGame.Game.creditsBtn=this.game.add.sprite(500,125, 'icon-credits');
		protoGame.Game.creditsBtn.events.onInputDown.add(this.showCredits, this);
		protoGame.Game.creditsBtn.anchor.set(0.5,0.5);
		
		protoGame.Game.settingsBtn=this.game.add.sprite(540,125, 'icon-settings');
		protoGame.Game.settingsBtn.events.onInputDown.add(this.showSettings, this);
		protoGame.Game.settingsBtn.anchor.set(0.5,0.5);
		
		protoGame.Game.musicBtn=this.game.add.sprite(580,125, 'icon-music');
		protoGame.Game.musicBtn.events.onInputDown.add(this.setMusic, this);
		protoGame.Game.musicBtn.anchor.set(0.5,0.5);
		anim = protoGame.Game.musicBtn.animations.add('on',[1]);
		anim.play(protoGame.Game.musicBtn, false);
		
		
		protoGame.Game.logo=this.game.add.sprite(this.game.world.width / 2, 400, 'logo');
		protoGame.Game.logo.anchor.set(0.5,0.5);
		protoGame.Game.logo.alpha=0.85;
		
		    ltween= this.game.add.tween( protoGame.Game.logo);
			ltween.to({ y:200 }, 1000, Phaser.Easing.Back.inOut, true, 0, false).yoyo(true);
		
		protoGame.Game.play=this.game.add.sprite(this.game.world.width / 2, (this.game.world.height / 2)+160, 'btn-green');
		protoGame.Game.play.events.onInputDown.add(this.startGame, this);
		protoGame.Game.play.anchor.set(0.5,0.5);
		protoGame.Game.play.alpha=1;
			_playText=this.game.add.text(-40,-14, "PLAY", { fill: '#ffffff' });
    		_playText.fontSize = 25;
    		_playText.fontWeight = 'bold';
			
			protoGame.Game.play.addChild(_playText);
		
		/*popup detail
		-----------------*/
		protoGame.Game.detail.bg=this.game.add.sprite(0,0, 'bg-popup');
		protoGame.Game.detail.bg.inputEnabled = false;
		protoGame.Game.detail.bg.events.onInputDown.add(this.hideDetail, this);
		protoGame.Game.detail.bg.alpha=0.3;
		DetailGroup.add(protoGame.Game.detail.bg);
		protoGame.Game.detail.popup=this.game.add.sprite(70,90, 'popup');
		DetailGroup.add(protoGame.Game.detail.popup);
		protoGame.Game.detail.name=this.game.add.text(80,300, "", { fill: '#ffffff' });
    	protoGame.Game.detail.name.fontSize = 25;
    	protoGame.Game.detail.name.fontWeight = 'bold';
		DetailGroup.add(protoGame.Game.detail.name);
		protoGame.Game.detail.signature=this.game.add.text(80,330, "", { fill: '#ffffff' });
    	protoGame.Game.detail.signature.fontSize = 18;
		DetailGroup.add(protoGame.Game.detail.signature);
		protoGame.Game.detail.agency=this.game.add.text(80,355, "", { fill: '#ffffff' });
    	protoGame.Game.detail.agency.fontSize = 18;
		DetailGroup.add(protoGame.Game.detail.agency);
		
		DetailGroupIcons = this.game.add.group();
		DetailGroup.add(DetailGroupIcons);
	
		
		
		
		/*popup
		-----------------*/
		protoGame.Game.popup.bg=this.game.add.sprite(0,0, 'bg-popup');
		protoGame.Game.popup.bg.alpha=0.3;
		PopupGroup.add(protoGame.Game.popup.bg);
		
		protoGame.Game.popup.popup=this.game.add.sprite(70,90, 'popup');
		PopupGroup.add(protoGame.Game.popup.popup);
		
		protoGame.Game.popup.refreshBtn=this.game.add.sprite(100,310, 'btn-red');
		protoGame.Game.popup.refreshBtn.events.onInputDown.add(this.refreshGrid, this);
		PopupGroup.add(protoGame.Game.popup.refreshBtn);
		_refreshText=this.game.add.text(10,11.5, "REFRESH", { fill: '#ffffff' });
    	_refreshText.fontSize = 25;
    	_refreshText.fontWeight = 'bold';
		protoGame.Game.popup.refreshBtn.addChild(_refreshText);
			
		protoGame.Game.popup.selectBtn=this.game.add.sprite(380,310, 'btn-green');
		protoGame.Game.popup.selectBtn.events.onInputDown.add(this.selectCharacter, this);
		_selectText=this.game.add.text(20,11.5, "SELECT", { fill: '#ffffff' });
    	_selectText.fontSize = 25;
    	_selectText.fontWeight = 'bold';
		protoGame.Game.popup.selectBtn.addChild(_selectText);
		PopupGroup.add(protoGame.Game.popup.selectBtn);
		
		protoGame.Game.popup.noBtn=this.game.add.sprite(100,310, 'btn-red');
		protoGame.Game.popup.noBtn.inputEnabled = true;
		protoGame.Game.popup.noBtn.events.onInputDown.add(function(sprite){this.cmpAnswer(false)}, this);
		PopupGroup.add(protoGame.Game.popup.noBtn);
		_noText=this.game.add.sprite(65,10, 'no-thumb');
		protoGame.Game.popup.noBtn.addChild(_noText);
			
		protoGame.Game.popup.yesBtn=this.game.add.sprite(380,310, 'btn-green');
		protoGame.Game.popup.yesBtn.events.onInputDown.add(function(sprite){this.cmpAnswer(true)}, this);
		PopupGroup.add(protoGame.Game.popup.yesBtn);
		_yesText=this.game.add.sprite(65,10, 'yes-thumb');
		protoGame.Game.popup.yesBtn.addChild(_yesText);
			
		protoGame.Game.popup.restartBtn=this.game.add.sprite(240,310, 'btn-green');
		protoGame.Game.popup.restartBtn.events.onInputDown.add(this.restart, this);
		_selectText=this.game.add.text(10,11.5, "RESTART", { fill: '#ffffff' });
    	_selectText.fontSize = 25;
    	_selectText.fontWeight = 'bold';
		protoGame.Game.popup.restartBtn.addChild(_selectText);
		PopupGroup.add(protoGame.Game.popup.restartBtn);
		
		protoGame.Game.popup.okBtn=this.game.add.sprite(240,310, 'btn-green');
		protoGame.Game.popup.okBtn.events.onInputDown.add(this.selectQuestion, this);
		_okText=this.game.add.text(55,11.5, "OK", { fill: '#ffffff' });
    	_okText.fontSize = 25;
    	_okText.fontWeight = 'bold';
		protoGame.Game.popup.okBtn.addChild(_okText);
		PopupGroup.add(protoGame.Game.popup.okBtn);
		
		protoGame.Game.popup.text=this.game.add.text(90,110, "", { fill: '#ffffff' });
    	protoGame.Game.popup.text.fontSize = 25;
    	protoGame.Game.popup.text.fontWeight = 'bold';
		protoGame.Game.popup.text.wordWrap=true;
		protoGame.Game.popup.text.wordWrapWidth=460;
		
		PopupGroup.add(protoGame.Game.popup.text);
		
		/*credits
		---------------------------------------------*/
		
		protoGame.Game.credits=this.game.add.sprite(0,0, 'bg-popup');
		protoGame.Game.credits.events.onInputDown.add(this.hideCredits, this);
		protoGame.Game.credits.alpha=0.9;
		CreditsGroup.add(protoGame.Game.credits);
		
		_francesco=this.game.add.sprite(300,400, 'francesco');
		CreditsGroup.add(_francesco);
		
		creditsTextHeader=this.game.add.text(20,20, "CREDITS", { fill: '#ffffff' });
    	creditsTextHeader.fontSize = 40;
		CreditsGroup.add(creditsTextHeader);
		
		
		var _credText=
		"Idea: Davide Muccioli, Francesco 'Fago' Raimondo, Luca Roberto\n"+ 
		"Coding: Francesco 'Fago' Raimondo\n"+ 
		"GamePlay: Francesco 'Fago' Raimondo\n"+ 
		"Music: 'Guess this Cover' by Friedrik of Hokuto Force\n"+ 
		"GFX: Francesco 'Fago' Raimondo, Google image search\n" + 
		"Photo selection: Alfredo DeSimone\n"+
		"Nonsense activities: Antonietta Pannella";
		
		creditsText=this.game.add.text(20,70, _credText, { fill: '#ffffff' });
    	creditsText.fontSize = 20;
		//creditsText.wordWrap=true;
		//creditsText.wordWrapWidth=1000;
		CreditsGroup.add(creditsText);
		
		CreditsGroup.alpha=0;
		
		
		
		/*settings
		---------------------------------------------*/
		
		protoGame.Game.settings=this.game.add.sprite(0,0, 'bg-popup');
		protoGame.Game.settings.events.onInputDown.add(this.hideSettings, this);
		protoGame.Game.settings.alpha=0.9;
		SettingsGroup.add(protoGame.Game.settings);
		
		_popSett=this.game.add.sprite(150,150, 'popup');
		SettingsGroup.add(_popSett);
		
		protoGame.Game.battery=this.game.add.sprite(270,250, 'battery');
		protoGame.Game.battery.events.onInputDown.add(this.setLevel, this);
		protoGame.Game.musicBtn.anchor.set(0.5,0.5);
		
		anim3 = protoGame.Game.battery.animations.add('level2',[2]);
		anim3.play(protoGame.Game.musicBtn, false);
		
		SettingsGroup.add(protoGame.Game.battery);
		
		aiLevelTextHeader=this.game.add.text(170,170, "Tap the battery to set the AI level,\ntap outside to close.", { fill: '#ffffff' });
    	aiLevelTextHeader.fontSize = 25;
		SettingsGroup.add(aiLevelTextHeader);
		
		aiLevelText=this.game.add.text(320,300, "AI Level", { fill: '#ffffff' });
    	aiLevelText.fontSize = 40;
		SettingsGroup.add(aiLevelText);
		SettingsGroup.alpha=0;
		
		/*round score
		---------------------------------------------*/
		protoGame.Game.roundPopup.bg=this.game.add.sprite(0,0, 'bg-transparent');
		RoundGroup.add(protoGame.Game.roundPopup.bg);
		
		protoGame.Game.roundPopup.popup=this.game.add.sprite(70,-300, 'popup-green');
		protoGame.Game.roundPopup.text=this.game.add.text(20,20, "", { fill: '#ffffff' });
    	protoGame.Game.roundPopup.text.fontSize = 25;
    	protoGame.Game.roundPopup.text.fontWeight = 'bold';
		protoGame.Game.roundPopup.text.wordWrap=true;
		protoGame.Game.roundPopup.text.wordWrapWidth=450;
		protoGame.Game.roundPopup.popup.addChild(protoGame.Game.roundPopup.text);
	
		RoundGroup.add(protoGame.Game.roundPopup.popup);
		
		/*Select bar
		---------------------------------------------*/
		protoGame.Game.popup.scrollbg=this.game.add.sprite(70,523, 'scroll-bg');
		
		protoGame.Game.questionsProperties=[];
		protoGame.Game.questionsValues=[];
		for (var _t=0; _t<questions.length; _t++){
		
			for (var property in questions[_t]) {
			
				protoGame.Game.questionsProperties.push(property);
				protoGame.Game.questionsValues.push( questions[_t][property]);
				bg=this.game.add.sprite(_t*500,0, 'scroll-bg');
				_text=this.game.add.text(0,1, questions[_t][property], { fill: '#000000' });
				_text.fontSize = 20;
				bg.addChild(_text);
				ScrollerGroupText.add(bg);
			
			}
		
		}
		
		protoGame.Game.questionsPropertiesCmp=protoGame.Game.questionsProperties.slice(0);
		protoGame.Game.questionsValuesCmp=protoGame.Game.questionsValues.slice(0);
		
		protoGame.Game.questionsPropertiesUser=protoGame.Game.questionsProperties.slice(0);
		protoGame.Game.questionsValuesUser=protoGame.Game.questionsValues.slice(0);
		
	    protoGame.Game.popup.scrollbg.addChild(ScrollerGroupText);

		mask = this.game.add.graphics(0, 0);
		mask.beginFill(0xffffff);
		mask.drawRect( 70, 520, 500, 30 );
		protoGame.Game.popup.scrollbg.mask = mask;
		ScrollerGroup.add(protoGame.Game.popup.scrollbg);
		
		protoGame.Game.popup.btnLeft=this.game.add.sprite(40,521.5, 'btn-scroller');
		_text=this.game.add.text(9,3, "<", { fill: '#ffffff' });
		_text.fontSize = 20;
		protoGame.Game.popup.btnLeft.addChild(_text);
		protoGame.Game.popup.btnLeft.inputEnabled = true;
		protoGame.Game.popup.btnLeft.events.onInputDown.add(this.scrollLeft, this);
		ScrollerGroup.add(protoGame.Game.popup.btnLeft);
		
		protoGame.Game.popup.btnRight=this.game.add.sprite(570,521.5, 'btn-scroller-right');
		_text=this.game.add.text(9,3, ">", { fill: '#ffffff' });
		_text.fontSize = 20;
		protoGame.Game.popup.btnRight.addChild(_text);
		protoGame.Game.popup.btnRight.inputEnabled = true;
		protoGame.Game.popup.btnRight.events.onInputDown.add(this.scrollRight, this);
		ScrollerGroup.add(protoGame.Game.popup.btnRight);
		
		protoGame.Game.popup.btnSelectQuestion=this.game.add.sprite(245,555, 'btn-green-select');
		_text=this.game.add.text(39,7, "SELECT", { fill: '#ffffff' });
		_text.fontSize = 18;
		protoGame.Game.popup.btnSelectQuestion.addChild(_text);
		protoGame.Game.popup.btnSelectQuestion.inputEnabled = true;
		protoGame.Game.popup.btnSelectQuestion.events.onInputDown.add(this.chooseQuestion, this);
		ScrollerGroup.add(protoGame.Game.popup.btnSelectQuestion);
		ScrollerGroup.alpha=0;
		
		
		_text=this.game.add.text(70,496, "Hey Computer...", { fill: '#000000' });
		_text.fontSize = 20;
		ScrollerGroup.add(_text);
		/*-------------------------------------------------------------------------------------*/
		OptionsGroup.add(protoGame.Game.figure)
		OptionsGroup.add(protoGame.Game.musicBtn);
		OptionsGroup.add(protoGame.Game.settingsBtn);
		OptionsGroup.add(protoGame.Game.creditsBtn);
		OptionsGroup.add(protoGame.Game.logo)
		OptionsGroup.add(protoGame.Game.play)
		OptionsGroup.alpha=0;
		
		this.createHI();
		
		protoGame.Game.maintheme = this.game.add.audio('maintheme',1,true);
		protoGame.Game.maintheme.allowMultiple = true;
		
		protoGame.Game.incorrect = this.game.add.audio('incorrect',1,false);
		protoGame.Game.incorrect.allowMultiple = true;
		
		
		protoGame.Game.maintheme.play();
		
		//to check in console if there are equal profiles
		//this.checkProfiles();
		
		};
	

