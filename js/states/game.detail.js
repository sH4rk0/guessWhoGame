// JavaScript Document
var protoGame = protoGame || {};

/*showCredits
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.showDetail=function(_sprite){
		
		console.log(_sprite.profile)
		DetailGroupIcons.forEach(function(_child){_child.kill();});
		
		_details=[];
		
		
		if(_sprite.profile.profile.eyeblue){_details.push("eyeblue");}
		if(_sprite.profile.profile.eyegreen){_details.push("eyegreen");}
		if(!_sprite.profile.profile.eyegreen && !_sprite.profile.profile.eyeblue){ _details.push("eyebrown");}
		
		if(_sprite.profile.profile.black){_details.push("black");}
		if(_sprite.profile.profile.blonde){_details.push("blonde");}
		if(_sprite.profile.profile.brown){_details.push("brown");}
		if(_sprite.profile.profile.red){_details.push("red");}
		if(_sprite.profile.profile.grey){_details.push("grey");}
		
		
		if(_sprite.profile.profile.earrings){_details.push("earrings");}
		if(_sprite.profile.profile.glasses){_details.push("glasses");}
		
		if(_sprite.profile.profile.mustache){_details.push("mustache");}
		if(_sprite.profile.profile.beard){_details.push("beard");}
		
		if(_sprite.profile.profile.foregroung){_details.push("closeup");}
		
		if(_sprite.profile.profile.smile){_details.push("smile");}
		if(_sprite.profile.profile.elsewhere){_details.push("elsewhere");}
		
		
		var _icon;
		for(var _d=0; _d<_details.length; _d++){
			
			_x=parseInt(_d % 3);
			_y=parseInt(_d / 3);
			
			_icon=this.game.add.sprite((_x*68)+320,(_y*68)+100, _details[_d]);
			DetailGroupIcons.add(_icon);
			
			
			}
		
		
		//console.log(_details);
		
		protoGame.Game.detail.name.text=_sprite.profile.name+ " " +_sprite.profile.surname;
		protoGame.Game.detail.signature.text=_sprite.profile.role;
		protoGame.Game.detail.agency.text=_sprite.profile.agency;
		
		if(protoGame.Game.detail.characterSprite!=undefined){ protoGame.Game.detail.characterSprite.kill(); }
		protoGame.Game.detail.characterSprite=this.game.add.sprite(80,100, _sprite.key);
		DetailGroup.add(protoGame.Game.detail.characterSprite);
		
		ptween= this.game.add.tween( DetailGroup);
		ptween.to({ alpha:1 }, 300, Phaser.Easing.Cubic.Out,true,0);
		ptween.onComplete.add(function(){  protoGame.Game.detail.bg.inputEnabled = true; },this)
		
		
		};
		
	/*hideCredits
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.hideDetail=function(_sprite){
		
		protoGame.Game.detail.bg.inputEnabled = false;
		ptween= this.game.add.tween( DetailGroup);
		ptween.to({ alpha:0 }, 300, Phaser.Easing.Cubic.Out,true,0);
		
		
		
		};
	
	