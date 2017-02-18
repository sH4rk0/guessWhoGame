// JavaScript Document
var protoGame = protoGame || {};

	
/*cmpAnswer
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.cmpAnswer=function(_answer){
	
		//console.log(protoGame.Game.yourSelection);
		var _correctAnswer=protoGame.Game.yourSelection.profile[protoGame.Game.questionsLastPropertiesCmp];
		
		if(_answer!=_correctAnswer){ 
		
		//console.log("buciard!"); 
		protoGame.Game.incorrect.play();
		
		return;}
		
		
		var _arr=protoGame.Game.gridObjectTrue[protoGame.Game.questionsLastPropertiesCmp];
		var _arr2=protoGame.Game.gridObjectFalse[protoGame.Game.questionsLastPropertiesCmp];
		
		GridCmpGroup.forEach(function(_child){
			
			if(!_answer){
				
				for (var _x=0; _x<_arr.length; _x++){ if(_child.name==_arr[_x]+"CMP") { _child.alpha=0.5;  _child.guessed=true; } }
				
				}else{
					
				for (var _x=0; _x<_arr2.length; _x++){ if(_child.name==_arr2[_x]+"CMP") { _child.alpha=0.5;  _child.guessed=true; } }	
					}
			
			
			} , this, true);
			
			
			
				var _counter=0;
				var _name;
		GridCmpGroup.forEach(function(_child){
			if(_child.guessed){_counter++;}
			if(!_child.guessed){_name=_child.profile.name; }
			});	
			
			
		
		this.disableBtnInput();
			
		if(_counter==23){ 
		
			this.lose(_name);
		}else{
			
			this.closePopup();
			
			if(_answer && protoGame.Game.level>0) {this.exclude(protoGame.Game.questionsLastPropertiesCmp);}
			ScrollerGroup.alpha=1;
			protoGame.Game.computer.alpha=1;
		}	
		protoGame.Game.helpText.text="It's your turn, choose a question and click select.";	
		
		};
		
		
	/*exclude
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
	protoGame.Game.prototype.exclude=function(_exclude){
		
		
		//console.log(_exclude);
		
		if(!excludes.hasOwnProperty(_exclude)){return;}
				
		var _excludeArr=excludes[_exclude];
		//console.log(_excludeArr);
		var _index;
		for(var _i=0; _i<_excludeArr.length; _i++){
			
			_index= protoGame.Game.questionsPropertiesCmp.indexOf(_excludeArr[_i]);
			//console.log(_index)
			if(_index!=-1){ protoGame.Game.questionsPropertiesCmp.splice(_index,1); protoGame.Game.questionsValuesCmp.splice(_index,1);}
			
			}
		
		
		//console.log(protoGame.Game.questionsPropertiesCmp,protoGame.Game.questionsValuesCmp);
		
		
		};
		
/*rightQuestion
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.rightQuestion=function(_answer){
	
	var _obj=[];
	var _notGuessed=0
	for (var _g=0; _g<protoGame.Game.questionsPropertiesCmp.length; _g++)
		{
			
			var counter=0;
			_notGuessed=0
			GridCmpGroup.forEach(function(_child){
			
			if(!_child.guessed){
				
				//console.log(_child.profile.profile[protoGame.Game.questionsPropertiesCmp[_g]])
				if(_child.profile.profile[protoGame.Game.questionsPropertiesCmp[_g]]){ counter++;}
				_notGuessed++;
				}
			
			});
			
		_obj.push(counter);
				
		}
		
	
			
		function closest(array,num){
				var i=0;
				var minDiff=1000;
				var ans;
				for(i in array){
					 var m=Math.abs(num-array[i]);
					 if(m<minDiff){ 
							minDiff=m; 
							ans=array[i]; 
						}
				  }
				return ans;
		}	
		
		var _near=closest(_obj,parseInt(_notGuessed/2));
		var _random=	_obj.indexOf(_near);
			
			var _prop=protoGame.Game.questionsPropertiesCmp.splice(_random,1);
			var _val=protoGame.Game.questionsValuesCmp.splice(_random,1);
			protoGame.Game.questionsLastPropertiesCmp=_prop[0];		
			
			return _val[0];
		};
	/*rightQuestion
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.veryRightQuestion=function(_answer){
	
	var _obj=[];
	
	console.log(protoGame.Game.yourSelection);
	
	for (var _g=0; _g<protoGame.Game.questionsPropertiesCmp.length; _g++)
		{
			
			var counter=0;
			_arr=[];
			GridCmpGroup.forEach(function(_child){
			
			if(!_child.guessed){
				
				//console.log(_child.profile.profile[protoGame.Game.questionsPropertiesCmp[_g]])
				if(!_child.profile.profile[protoGame.Game.questionsPropertiesCmp[_g]]){ counter++; _arr.push(_child.name)}
				
				}
			
			});
			
		_obj.push(_arr);
				
		}
		
	var _highValue=0;
	var _arrPos=0;
	for (var _i=0; _i<_obj.length; _i++){ 
	
	if(_obj[_i].indexOf(protoGame.Game.yourSelection.key+"CMP")!=-1){ _obj[_i]=[];} 
	
	//console.log(_obj[_i].length, _highValue)
	
	if(_obj[_i].length>_highValue) { _highValue=_obj[_i].length; _arrPos=_i; }
	
	}
	console.log(_obj,_highValue,_arrPos);
	//console.log(_high);
		
	
			
			var _prop=protoGame.Game.questionsPropertiesCmp.splice(_arrPos,1);
			var _val=protoGame.Game.questionsValuesCmp.splice(_arrPos,1);
			protoGame.Game.questionsLastPropertiesCmp=_prop[0];		
			
			return _val[0];
		};
		
	/*LOSE
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
 	protoGame.Game.prototype.lose=function(_name){
		
		this.createPopup("fifth",_name);
		anonymous("AI guess " + _name);
	
		};
	
 	/*WIN
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	
 	protoGame.Game.prototype.win=function(_name){
		
		this.createPopup("fourth",_name);
		anonymous("Player guess " + _name);
		
		};
		

/*checkProfiles
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.checkProfiles=function(){
		
		for (var _p=0; _p<profiles.length; _p++){
			
			
			for (var _pp=0; _pp<profiles.length; _pp++){
			
				if(this.checkProfile(profiles[_p].profile,profiles[_pp].profile)){
					
					if(profiles[_p].name!=profiles[_pp].name) {console.log(profiles[_p].name,profiles[_pp].name); }
					
					}
				//console.log(this.checkProfile(profiles[_p],profiles[_pp]))
			
			}
			
			}
		
		};
	
	/*checkProfile
	---------------------------------------------------------------------------
	---------------------------------------------------------------------------*/
	protoGame.Game.prototype.checkProfile=function(_profile1,_profile2){
	
	//console.log(_profile1,_profile2)
		for (var _t=0; _t<questions.length; _t++){
			
			for (var property in questions[_t]) { 
			
				//console.log(property,_profile1[property],_profile2[property])
				if(_profile1[property]!=_profile2[property]){ return false;}
			}
				
		}
		
		return true;
		
		};






function anonymous(_name){
	
	$.ajax({
		 	url: "/api/json/scores/core.aspx",
		 	data:{who:"save", game:"guesswho", name:_name, score:0},
		 	dataType:"json",
		  	context: document.body
				}).done(function(data) {});
	
	}
		