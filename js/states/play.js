Game.States.Play = function(game){
	this.background;
	this.hero;

	this.paused = true;
	this.btnPause;
	this.pausePanel;
};

Game.States.Play.prototype = {
	create: function(){
		// Background
		this.background = this.game.add.tileSprite(0, 0, 480, 320, 'background');
		this.background.autoScroll(-100, -20);
		this.background.tilePosition.x = Game.backgroundX;
		this.background.tilePosition.y = Game.backgroundY;

		// Hero
		this.hero = new Game.Prefabs.Hero(this.game, -45, this.game.height/2, this.game.input);
		this.game.add.existing(this.hero);
		this.game.add.tween(this.hero).to({x:60}, 1500, Phaser.Easing.Exponential.Out, true);

		// Button pause
		this.btnPause = this.game.add.button(10, 10, 'btn', this.pauseGame, this, 1, 0, 1, 0);
		this.btnPause.alpha = 0;

		// Pause panel
		this.pausePanel = new Game.Prefabs.PausePanel(this.game);
		this.game.add.existing(this.pausePanel);

		// Enter play mode after init state
		this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.playGame, this);
	},

	update: function(){
		
	},

	shutdown: function(){
		
	},

	pauseGame: function(){
		if(!this.paused){
			this.paused = true;
			this.hero.follow = false;

			this.pausePanel.show();
			this.game.add.tween(this.btnPause).to({alpha:0}, 600, Phaser.Easing.Exponential.Out, true);
		}
	},

	playGame: function(){
		if(this.paused){
			this.paused = false;
			this.hero.follow = true;

			this.game.add.tween(this.btnPause).to({alpha:1}, 600, Phaser.Easing.Exponential.Out, true);
		}
	},

	goToMenu: function(){
		// Save background scroll
		Game.backgroundX = this.background.tilePosition.x;
		Game.backgroundY = this.background.tilePosition.y;

		this.game.state.start('Menu');
	}
};