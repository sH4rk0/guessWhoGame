// JavaScript Document
var protoGame = protoGame || {};
	
protoGame.Game.prototype.createHI=function(){
		
		var _positions=HIpositions.slice(0);
		protoGame.Game.profilesIntro=protoGame.Game.profiles.slice(0);
		protoGame.Game.profilesIntroReposition=[];
		_limit=HIpositions.length-protoGame.Game.profilesIntro.length;
		var _profile;
		for (var _i=0; _i<(_limit); _i++){ 
		
		_profile=this.game.add.sprite(-200, -200, 'tile')
		protoGame.Game.profilesIntro.push(_profile); 
		
		HiGroup.add(_profile); 
		}
		
		_profiles=protoGame.Game.profilesIntro.slice(0);
		
		while (_positions.length>0) {
    //code block to be executed
	
	_item=_positions.splice((Math.floor(Math.random()*_positions.length)),1);
	_profile=_profiles.splice((Math.floor(Math.random()*_profiles.length)),1);
	
	protoGame.Game.profilesIntroReposition.push(_profile[0]);
	
	_profile[0].x=_item[0][0]+this.game.rnd.integerInRange(-500, +500);
	_profile[0].y=_item[0][1]+this.game.rnd.integerInRange(-500, +500);
	_profile[0].scale.set(.25);
	_profile[0].alpha=0;
	
	tween = this.game.add.tween(_profile[0]);
	
	if(_positions.length==0){ 
	
	tween.to({ x: _item[0][0], y: _item[0][1], alpha:1 }, 1500, Phaser.Easing.Cubic.In,true,1000);
	tween.onComplete.add(function(){
		
	tweenOptions = this.game.add.tween(OptionsGroup);
    tweenOptions.to({ alpha:1 }, 500, "Linear",true);
	tweenOptions.onComplete.add(function(){
		
		protoGame.Game.play.inputEnabled=true;
		protoGame.Game.creditsBtn.inputEnabled=true;
		protoGame.Game.settingsBtn.inputEnabled=true;
		protoGame.Game.musicBtn.inputEnabled=true;
		
		},this);
		
		this.repositionHI();
		
		}, this); 
		
		
		}
		
		else{
			
		tween.to({ x: _item[0][0], y: _item[0][1], alpha:1 }, this.game.rnd.integerInRange(800, 1500), Phaser.Easing.Cubic.In,true,this.game.rnd.integerInRange(0, 1000));
		
			}
	
}
		};
		
/*repositionHI
---------------------------------------------------------------------------
---------------------------------------------------------------------------*/	
protoGame.Game.prototype.repositionHI=function(){
		
		
		if(protoGame.Game.gameState.status==protoGame.Game.gameState.gameIntro){
		
		var _positions=HIpositions.slice(0);
		var _i=0;
		
		
		var tweens=[];
		while (_positions.length>0) {
  
	_item=_positions.splice((Math.floor(Math.random()*_positions.length)),1);
	
	tweens.push(this.game.add.tween(protoGame.Game.profilesIntroReposition[_i]));

if(_positions.length==0){ 

tweens[tweens.length-1].to({ x: _item[0][0], y: _item[0][1] }, 1500, Phaser.Easing.Cubic.In,true,3000);
tweens[tweens.length-1].onComplete.add(this.repositionHI, this); } 

else {
	
tweens[tweens.length-1].to({ x: _item[0][0], y: _item[0][1] }, this.game.rnd.integerInRange(800, 1400), Phaser.Easing.Cubic.In,true,this.game.rnd.integerInRange(1000, 3000));
	
	
	}
_i++;	
}
		}
		
		};	
		
/*startGame
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.startGame=function(){ 
	
	//console.log("start game")
	this.randomGrid()
	protoGame.Game.gameState.status=protoGame.Game.gameState.gameChoose;
	protoGame.Game.play.inputEnabled=false;
	protoGame.Game.creditsBtn.inputEnabled=false;
		protoGame.Game.settingsBtn.inputEnabled=false;
		protoGame.Game.musicBtn.inputEnabled=false;
	
	tweenIntro = this.game.add.tween(IntroGroup);
    tweenIntro.to({ alpha:0 }, 500, "Linear",true);
	
	
	};