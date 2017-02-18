// JavaScript Document
var protoGame = protoGame || {};

/*showCredits
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.showCredits=function(_sprite){
		
		ptween= this.game.add.tween( CreditsGroup);
		ptween.to({ alpha:1 }, 300, Phaser.Easing.Cubic.Out,true,0);
		ptween.onComplete.add(function(){protoGame.Game.credits.inputEnabled=true;},this)
		
		
		};
		
	/*hideCredits
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.hideCredits=function(_sprite){
		protoGame.Game.credits.inputEnabled=false;
		ptween= this.game.add.tween( CreditsGroup);
		ptween.to({ alpha:0 }, 300, Phaser.Easing.Cubic.Out,true,0);
		
		
		
		};
	
	