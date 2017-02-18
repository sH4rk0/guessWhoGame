// JavaScript Document
var protoGame = protoGame || {};


	/*overCharacter
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.overCharacter=function(_character){ 
	if(!protoGame.Game.characterInput) return;
	_character.getChildAt(1).alpha=1;
	};
	
	/*outCharacter
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.outCharacter=function(_character){ 
	if(!protoGame.Game.characterInput) return;
	_character.getChildAt(1).alpha=0;
	
	};
		
	/*clickCharacter
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.clickCharacter=function(_character){
		
		//if(protoGame.Game.yourTurn){ protoGame.Game.showDetail(_character); return;}
		
		
		console.log("clickCharacter");
		if(!protoGame.Game.characterInput || protoGame.Game.characterSelected) { this.showDetail(_character); return; }
		
		protoGame.Game.helpText.text="You have selected "+ _character.profile.name + " as your character to guess.";
		
		_character.getChildAt(1).alpha=0;
		protoGame.Game.characterInput=false;
		protoGame.Game.characterSelected=true;
		
		if(protoGame.Game.characterSprite!=undefined){ protoGame.Game.characterSprite.kill(); }
		//your selection
		protoGame.Game.characterSprite=this.game.add.sprite(647,177, _character.key);
		protoGame.Game.characterSprite.scale.set(0.70);
		protoGame.Game.characterSprite.alpha=1;
		protoGame.Game.characterSprite.sendToBack()
		
		ScrollerGroup.alpha=1;
				
		GameGroup.add(protoGame.Game.characterSprite);
		
		
		protoGame.Game.yourSelection=_character.profile;
		protoGame.Game.yourSelection.key=_character.key;
		//computer selection
		
		protoGame.Game.computerSelection=protoGame.Game.randomGrid[this.game.rnd.integerInRange(0, protoGame.Game.randomGrid.length-1)].profile;
		protoGame.Game.computerSelection.key=protoGame.Game.randomGrid[this.game.rnd.integerInRange(0, protoGame.Game.randomGrid.length-1)].key;
			//console.log(" cmp selection", protoGame.Game.computerSelection);
			
			
			this.createPopup("second");
			
		
		
		};
		
			
	/*viewDetail
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.viewDetail=function(_character){
		
		console.log("viewDetail")
		
		};
		
		
	/*refreshGrid
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.refreshGrid=function(){ 
	
		this.disableBtnInput();
		ptween= this.game.add.tween( PopupGroup);
		ptween.to({ alpha:0 }, 300, Phaser.Easing.Cubic.Out,true,0);
		ptween.onComplete.add(function(){ 
		
		this.randomGrid();
		
		},this);
		
		
	};
	
	/*disableBtnInput
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/		
	protoGame.Game.prototype.disableBtnInput=function(){
		
		protoGame.Game.popup.refreshBtn.inputEnabled=false;
		protoGame.Game.popup.selectBtn.inputEnabled=false;
		protoGame.Game.popup.okBtn.inputEnabled=false;
		protoGame.Game.popup.restartBtn.inputEnabled=false;
		protoGame.Game.popup.noBtn.inputEnabled=false;
		protoGame.Game.popup.yesBtn.inputEnabled=false;
		
		
			
		
		};
		
	/*randomGrid
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.randomGrid=function(){
		
		
		var _profiles=protoGame.Game.gridProfiles.slice(0);
		
		var profile;
		protoGame.Game.randomGrid=[];
		protoGame.Game.randomGridComp=[];
		
		
		for (var _p=0; _p<_profiles.length; _p++ ){
			
			_profiles[_p].x=-200;
			_profiles[_p].y=-200;
			
			}
		
		
		for (var _i=0; _i<24; _i++){
			
			_profile=_profiles.splice((Math.floor(Math.random()*_profiles.length)),1);
			
			protoGame.Game.randomGrid.push(_profile[0]);
			protoGame.Game.randomGridComp.push({key:_profile[0].key+"CMP",profile:_profile[0].profile});
			
			
			_x=parseInt(_i % 6);
			_y=parseInt(_i / 6);
			
			_profile[0].x=-100;
			_profile[0].y=(_y*120)+7;
			_profile[0].scale.set(0.5);		
			_profile[0].alpha=1;
			_profile[0].anchor.set(0,0);
			
			tween = this.game.add.tween(_profile[0]);
			tween.to({ x:(_x*105)+7, y: (_y*120)+7, alpha:1 }, 200, Phaser.Easing.Cubic.Out,true,50*_i);
			
					if(_i==23){ 
			
		
								tween.onComplete.add(function(){ 
								
								this.createPopup("first");
								
								
								},this);
					
					
					
					 }
				
				
			}
		
		
		for (var _g=0; _g<questions.length; _g++)
		{
			
			for (var property in questions[_g]) {
				
				protoGame.Game.gridObjectTrue[property]=[];
				protoGame.Game.gridObjectFalse[property]=[];
				
				if (questions[_g].hasOwnProperty(property)) {
					
					for (var _p=0; _p<protoGame.Game.randomGrid.length; _p++){
						
						if(protoGame.Game.randomGrid[_p].profile.profile[property]){ protoGame.Game.gridObjectTrue[property].push(protoGame.Game.randomGrid[_p].key);}
						if(!protoGame.Game.randomGrid[_p].profile.profile[property]){ protoGame.Game.gridObjectFalse[property].push(protoGame.Game.randomGrid[_p].key);}
						
						}
					
					
					
				}
			}
			
			
		}
		
		//create the cmp grid
		
		GridCmpGroup.destroy(true)
		
		GridCmpGroup = this.game.add.group();
		GridCmpGroup.x=640;
		GridCmpGroup.y=490;
		GameGroup.add(GridCmpGroup);

		
		for (var _t=0; _t<protoGame.Game.randomGridComp.length; _t++){
			
			_x=parseInt(_t % 6);
			_y=parseInt(_t / 6);
			_tile=this.game.add.sprite((_x*25)+2,(_y*25)+1, 'a-tile');
			
			_tile.inputEnabled = true;
			//_tile.events.onInputDown.add(function(_sprite){console.log(_sprite.profile.name)}, this);
			
			_tile.name=protoGame.Game.randomGridComp[_t].key;
			_tile.profile=protoGame.Game.randomGridComp[_t].profile;
			GridCmpGroup.add(_tile);
			}
		
		};
		
	/*selectCharacter
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.selectCharacter=function(){
	
	protoGame.Game.helpText.text="Click an image to select him/her as your character to guess.";
	this.disableBtnInput();
	ptween= this.game.add.tween( PopupGroup);
	ptween.to({ alpha:0 }, 300, Phaser.Easing.Cubic.Out,true,0);
	ptween.onComplete.add(function(){ 

	protoGame.Game.characterInput=true;
	
	},this);
		
		
		};
	