// JavaScript Document
var protoGame = protoGame || {};


	
	
/*setMusic
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.setMusic=function(_sprite){
		
		if(_sprite.on==undefined || _sprite.on==true){
			
				_sprite.on=false;
				anim = _sprite.animations.add('off',[0]);
				anim.play(_sprite, false);
				protoGame.Game.maintheme.pause();
				
			}else{
				
				_sprite.on=true;
				anim = _sprite.animations.add('on',[1]);
		    	anim.play(_sprite, false);
				protoGame.Game.maintheme.play();
				
				}
		
		};
	
	