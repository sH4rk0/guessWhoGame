// JavaScript Document
var protoGame = protoGame || {};

/*restart
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.restart=function(){ 
	this.disableBtnInput();
		protoGame.Game.questionsPropertiesCmp=protoGame.Game.questionsProperties.slice(0);
		protoGame.Game.questionsValuesCmp=protoGame.Game.questionsValues.slice(0);
		
		protoGame.Game.questionsPropertiesUser=protoGame.Game.questionsProperties.slice(0);
		protoGame.Game.questionsValuesUser=protoGame.Game.questionsValues.slice(0);
		
		tweenIntro = this.game.add.tween(IntroGroup);
   		tweenIntro.to({ alpha:1 }, 500, "Linear",true);
		
		this.closePopup();
		ScrollerGroup.alpha=0;
		protoGame.Game.gameState.status=protoGame.Game.gameState.gameIntro;
		this.repositionHI();
		protoGame.Game.scrollerPosition=0;
		protoGame.Game.scrollerEnabled=false;
		protoGame.Game.characterInput=false;
		protoGame.Game.characterSelected=false;
		ScrollerGroupText.x=0;
		protoGame.Game.play.inputEnabled = true;
		protoGame.Game.creditsBtn.inputEnabled=true;
		protoGame.Game.settingsBtn.inputEnabled=true;
		protoGame.Game.musicBtn.inputEnabled=true;
		protoGame.Game.characterSprite.alpha=0;
		
		for(_c=0; _c<protoGame.Game.gridProfiles.length; _c++){
			
			protoGame.Game.gridProfiles[_c].getChildAt(2).alpha=0;
			protoGame.Game.gridProfiles[_c].guessed=false;
			}
		
		
	 };
	 
	/*selectQuestion
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.selectQuestion=function(){
		this.disableBtnInput();
		
		protoGame.Game.helpText.text="It's your turn, choose a question and click select.";	
		ScrollerGroup.alpha=1;
		protoGame.Game.computer.alpha=1;
		protoGame.Game.computer.bringToTop();

	ptween = this.game.add.tween( PopupGroup);
	ptween.to({ alpha:0 }, 300, Phaser.Easing.Cubic.Out,true,0);
	ptween.onComplete.add(function(){  protoGame.Game.scrollerEnabled=true;  },this);
		
	
		
		};
	/*createPopup
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.createPopup=function(_type,_name){
		
			
			protoGame.Game.popup.refreshBtn.alpha=0;
			protoGame.Game.popup.selectBtn.alpha=0;
			protoGame.Game.popup.okBtn.alpha=0;
			protoGame.Game.popup.restartBtn.alpha=0;
			protoGame.Game.popup.noBtn.alpha=0;
			protoGame.Game.popup.yesBtn.alpha=0;
			
			ScrollerGroup.alpha=0;
			
			this.disableBtnInput();
			
			protoGame.Game.scrollerEnabled=false;
		
		switch (_type)
		{
			case "first": //select or refresh
			protoGame.Game.helpText.text="";
			//protoGame.Game.popup.text.text="Please,\nclick SELECT to choose the character that I (computer) should guess,\nor click REFRESH to update the characters list.";
			protoGame.Game.popup.text.text="Please, click SELECT to choose the character that I (computer) should guess, or click REFRESH to update the characters list.";
			protoGame.Game.popup.refreshBtn.inputEnabled=true;
			protoGame.Game.popup.refreshBtn.alpha=1;
			protoGame.Game.popup.selectBtn.inputEnabled=true;
			protoGame.Game.popup.selectBtn.alpha=1;
			
			break;
			
			case "second": //choose question
				
				protoGame.Game.popup.text.text="OK human, now is your first turn!!!\nChoose a question in the box below and then click select.";
				protoGame.Game.popup.okBtn.alpha=1;
				protoGame.Game.popup.okBtn.inputEnabled=true;
			
			break;
			
			case "third": //computer turn
				
					protoGame.Game.helpText.text="It's Computer turn, answer correctly to his question.";
				if(protoGame.Game.level<2){
					
					var _random=this.game.rnd.integerInRange(0, protoGame.Game.questionsPropertiesCmp.length-1);
					var _prop=protoGame.Game.questionsPropertiesCmp.splice(_random,1);
					var _val=protoGame.Game.questionsValuesCmp.splice(_random,1);
					protoGame.Game.questionsLastPropertiesCmp=_prop[0];
					protoGame.Game.popup.text.text="Human, it's my turn, answer correctly to my question!!!\n\n"+_val[0];
					
				}else if(protoGame.Game.level==2){
					//
					protoGame.Game.popup.text.text="Human, it's my turn, answer correctly to my question!!!\n\n"+this.rightQuestion();
					
					}else if(protoGame.Game.level==3){
					//
					protoGame.Game.popup.text.text="Human, it's my turn, answer correctly to my question!!!\n\n"+this.veryRightQuestion();
					
					}
					
				
				protoGame.Game.computer.alpha=0;
				
				protoGame.Game.popup.noBtn.inputEnabled=true;
				protoGame.Game.popup.noBtn.alpha=1;
				protoGame.Game.popup.yesBtn.inputEnabled=true;
				protoGame.Game.popup.yesBtn.alpha=1;
				
			break;
			
			
			case "fourth": //congratulation
				//protoGame.Game.helpText.text="";
				protoGame.Game.popup.text.text="Congratulation,\nyou beat me! I have chosen " + _name +" as guess character. Damn you!! :D";
				protoGame.Game.popup.restartBtn.inputEnabled=true;
				protoGame.Game.popup.restartBtn.alpha=1;
			
			break;
			
			case "fifth": //lose
				//protoGame.Game.helpText.text="";
				protoGame.Game.popup.text.text="Human, you lose!\nYou have chosen " + _name +" as guess character.\nResistance is futile!!!... :D";
				protoGame.Game.popup.restartBtn.inputEnabled=true;
				protoGame.Game.popup.restartBtn.alpha=1;
			
			break;
			
			
			}
		ptween= this.game.add.tween( PopupGroup);
		ptween.to({ alpha:1 }, 300, Phaser.Easing.Cubic.Out,true,0);
		
	};
	
	/*closePopup
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.closePopup=function(){
		
		ptween= this.game.add.tween( PopupGroup);
		ptween.to({ alpha:0 }, 300, Phaser.Easing.Cubic.Out,true,0);
		ptween.onComplete.add(function(){protoGame.Game.scrollerEnabled=true;},this)
		
		
		};
		
	/*viewRoundScore
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/		
	protoGame.Game.prototype.viewRoundScore=function(_roundScore){
		RoundGroup.alpha=1;
		protoGame.Game.scrollerEnabled=false;
		
		protoGame.Game.roundPopup.text.text="You match "+ _roundScore + " characters!!";
		
		ptween= this.game.add.tween(protoGame.Game.roundPopup.popup);
		ptween.to({ y:90 }, 500, Phaser.Easing.Cubic.Out,true,0);
		ptween.onComplete.add(function(){
			
			ptween= this.game.add.tween( protoGame.Game.roundPopup.popup);
			ptween.to({ y:600 }, 300, Phaser.Easing.Cubic.Out,true,2000);
			ptween.onComplete.add(function(){ protoGame.Game.roundPopup.popup.y=-300; RoundGroup.alpha=0; this.createPopup("third"); },this)
		
			
			},this)
		
		
		};
		
		
	