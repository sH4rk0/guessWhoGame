// JavaScript Document
var protoGame = protoGame || {};

	/*hideSettings
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.hideSettings=function(_sprite){
		protoGame.Game.settings.inputEnabled=false;
		protoGame.Game.battery.inputEnabled=false;
		ptween= this.game.add.tween(SettingsGroup);
		ptween.to({ alpha:0 }, 300, Phaser.Easing.Cubic.Out,true,0);
		
		};
	
	/*showSettings
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.showSettings=function(_sprite){
		ptween= this.game.add.tween(SettingsGroup);
		ptween.to({ alpha:1 }, 300, Phaser.Easing.Cubic.Out,true,0);
		ptween.onComplete.add(function(){protoGame.Game.settings.inputEnabled=true;
		protoGame.Game.battery.inputEnabled=true;},this)
		
		};
		
	/*setLevel
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.setLevel=function(){
		
		protoGame.Game.level++;
		
		if(protoGame.Game.level>3) protoGame.Game.level=0;
		
		
		switch(protoGame.Game.level){
			
			case 0:
			anim = protoGame.Game.battery.animations.add('level0',[0]);
			
			break;
			
			case 1:
			anim = protoGame.Game.battery.animations.add('level1',[1]);
			break;
			
			case 2:
			anim = protoGame.Game.battery.animations.add('level2',[2]);
			break;
			
			case 3:
			anim = protoGame.Game.battery.animations.add('level3',[3]);
			break;
			
			
			}
		anim.play(protoGame.Game.battery, false);
		
		
		};