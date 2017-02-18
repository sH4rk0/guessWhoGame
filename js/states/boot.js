// JavaScript Document
var protoGame = protoGame || {};


protoGame.Boot=function(game){}
protoGame.Boot.prototype={
	
	preload:function(){
		
			var bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);
			
			var bmd = this.game.add.bitmapData(800,600);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 800, 600);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingContainer', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);
		
		},
	
	create:function(){
		
		this.game.stage.backgroundColor = '#ffffff';
		this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
		this.game.stage.smoothed=false;
		this.game.scale.pageAlignHorizontally = true;
    	this.game.scale.pageAlignVertically = true;
		this.game.state.start('Preload');
		
		
		}
		}