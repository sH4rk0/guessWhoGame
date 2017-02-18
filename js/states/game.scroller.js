// JavaScript Document
var protoGame = protoGame || {};


	
/*scrollRight
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.scrollRight=function(){
			
		
		if(!protoGame.Game.scrollerEnabled) return;
		
		if((protoGame.Game.scrollerPosition+1)==questions.length) return;
		protoGame.Game.scrollerPosition++;
		this.game.add.tween(ScrollerGroupText).to( {x: protoGame.Game.scrollerPosition*-500}, 500, Phaser.Easing.Back.InOut, true, 0, 0);
		
		};
	
	/*scrollLeft
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	
	protoGame.Game.prototype.scrollLeft=function(){
			
		
		if(!protoGame.Game.scrollerEnabled) return;
		
		if((protoGame.Game.scrollerPosition-1)==-1) return;
		protoGame.Game.scrollerPosition--;
		this.game.add.tween(ScrollerGroupText).to( {x: protoGame.Game.scrollerPosition*-500}, 500, Phaser.Easing.Back.InOut, true, 0, 0);
		
		};
	/*chooseQuestion
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
 	protoGame.Game.prototype.chooseQuestion=function(){
		
		
		if(!protoGame.Game.scrollerEnabled) return;
		
		
		var _arr=protoGame.Game.gridObjectTrue[protoGame.Game.questionsProperties[protoGame.Game.scrollerPosition]];
		var _arr2=protoGame.Game.gridObjectFalse[protoGame.Game.questionsProperties[protoGame.Game.scrollerPosition]];
		
		var _firstCounter=0;
		for(var _i=0; _i<protoGame.Game.randomGrid.length; _i++){
			if(protoGame.Game.randomGrid[_i].guessed){_firstCounter++;}
			
			}
		
		
		for(var _i=0; _i<protoGame.Game.randomGrid.length; _i++){
			
				if(!protoGame.Game.computerSelection.profile[protoGame.Game.questionsProperties[protoGame.Game.scrollerPosition]]){
				for (var _x=0; _x<_arr.length; _x++){
					
					if(protoGame.Game.randomGrid[_i].key==_arr[_x]) { protoGame.Game.randomGrid[_i].alpha=0.5;  protoGame.Game.randomGrid[_i].getChildAt(2).alpha=1; protoGame.Game.randomGrid[_i].guessed=true; }
					}
				}else{
				for (var _x=0; _x<_arr2.length; _x++){
					
					if(protoGame.Game.randomGrid[_i].key==_arr2[_x]) { protoGame.Game.randomGrid[_i].alpha=0.5;   protoGame.Game.randomGrid[_i].getChildAt(2).alpha=1;protoGame.Game.randomGrid[_i].guessed=true;}
					}
				}
			
			}
		var _name;
		var _counter=0;
		for(var _i=0; _i<protoGame.Game.randomGrid.length; _i++){
			if(protoGame.Game.randomGrid[_i].guessed){_counter++;}
			
			if(!protoGame.Game.randomGrid[_i].guessed){_name=protoGame.Game.randomGrid[_i].profile.name;}
			
			}
			
			
		if(_counter==23){ 
		
			this.win(_name);
		
		}else{
			
			this.viewRoundScore(_counter-_firstCounter);
			
			}	
		
		
		};