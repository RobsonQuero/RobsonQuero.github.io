function Sprite(){

	//Atributos

	//atributos de movimentos
	this.mvRight = false;
	this.mvLeft = false;
	this.mvUp = false;
	this.mvDown = false;

	//recorte das imagens do personagem
	this.srcX = 0;
	this.srcY = 0;

	//para um personagem
	this.width = 24;
	this.height = 36;

	this.posX = 0;
	this.posY = 0;
	
	this.savePosX = 0;
	this.savePosY = 0;
	

	//imagem com os sprites
	this.img = new Image();
	this.battleSprite = new Image();
	
	
	//atributos de combate
	this.atributos = new AtributosGerais(100,100,20,10,50,0,0,0); //LP, MP, AD, DP, AP, MD, Money, XP
	this.acessoryEquip = "";
	this.weaponEquip = "";
	
	
	//Atributos de Inventario
	this.lastScene = 0;
	
	this.inventoryStr = '{' +
		
		'"items": {' +
			'"potionHp": 0,' +
			'"potionMp": 0' +
		'},' +
		
		'"acessories": {' +
			'"bronzeShield": 0' +
		'},' +
		
		'"weapons": {' +
			'"bronzeSword": 0' +
		'}' +
		
	'}';
	
	this.inventory = JSON.parse(this.inventoryStr);
	

	//velocidade do personagem
	this.speed = 1;
	this.spriteSpeed = 6;

	this.countAnim = 0;
	
	
	//Controle de animação de batalha
	this.battleMode = 0;
	this.battlePosX = 0;
	this.battlePosY = 0;
	this.battleWidth = 0;
	this.battleHeight = 0;
	this.rangeAnimation = [];
	this.actions = [];
	this.indiceActions = 0;
	this.battleAction = 0;
	this.runAnimation = false;
	
	var i = 0;
	
	
	
	
	//Controle do nivel das fases e seus inimigos
	this.greenJewelLevel = 0;
	this.redJewelLevel = 0;
	this.yellowJewelLevel = 0;
	this.blueJewelLevel = 0;
	
	

	//Metodos

	//desenho
	this.draw = function(ctx){
		if(this.battleMode == 0){
			ctx.drawImage(this.img,this.srcX,this.srcY, this.width, this.height, this.posX,this.posY,this.width,this.height);
			this.animation();
		}
		else{
			
			ctx.drawImage(this.battleSprite,this.srcX,this.srcY, this.battleWidth, this.battleHeight, this.battlePosX,this.battlePosY,this.battleWidth,this.battleHeight);
			this.battleAnimation();
		}
	}

	//movimentacao
	this.move = function(){
		if(this.mvRight){
			this.posX += this.speed;
			this.srcY = this.height * 3; 
		} else
		if(this.mvLeft){
			this.posX -= this.speed;
			this.srcY = this.height * 2; 
		} else
		if(this.mvUp){
			this.posY -= this.speed;
			this.srcY = this.height * 1; 
		} else
		if(this.mvDown){
			this.posY += this.speed;
			this.srcY = this.height * 0; 
		}
	}

	//animacao
	this.animation = function(){

		if(this.mvUp || this.mvDown || this.mvLeft || this.mvRight == true){

			this.countAnim++;
			if(this.countAnim >= (this.spriteSpeed * 7))
			{
				this.countAnim = this.spriteSpeed;
			}

			this.srcX = Math.floor(this.countAnim/this.spriteSpeed) * this.width;
		}

	}
	
	
	
	
	this.setSprite = function (sprite){
		
		this.img.src = sprite;
	}
	
	
	
	this.setBattleAnimationDetails = function (sprite, posX, posY, width, height, rangeVector, actionsVector){
		
		this.battleSprite.src = sprite;
		this.battlePosX = posX;
		this.battlePosY = posY;
		this.battleWidth = width;
		this.battleHeight = height;
		this.rangeAnimation = rangeVector;
		this.actions = actionsVector;
	}
	
	
	this.resetBattleAnimation = function(){
		
		this.srcX = 0;
		this.srcY = 0;
		this.countAnim = 0;
		this.battleAction = 0;
		this.spriteSpeed = 9;
	}
	
	
	this.enableBattleMode = function (){
		
		this.resetBattleAnimation();
		this.battleMode = 1;
		this.runAnimation = true;
	}
	
	this.disableBattleMode = function (){
		
		this.battleMode = 0;
		this.srcX = 0;
		this.srcY = 0;
		this.countAnim = 0;
		this.spriteSpeed = 6;
	}
	
	
	this.selectAction = function (action){
		
		for(i = 0; i < this.rangeAnimation.length; i++)
		{
			if(this.actions[i] == action){
				this.indiceActions = i;
				break;
			}
		}
		
		this.battleAction = this.indiceActions;
		this.srcY = this.battleHeight * this.indiceActions;
		this.srcX = 0;
		this.runAnimation = true;
	}
	
	
	//animacao de batalha
	this.battleAnimation = function(){
		
		if(this.runAnimation == true){
			this.countAnim++;
			
			if(this.countAnim >= (this.spriteSpeed * this.rangeAnimation[this.battleAction]))
			{
				//this.countAnim = this.spriteSpeed;
				this.countAnim = 0;
				this.battleAction = 0;
				this.srcY = this.battleHeight;
				this.srcX = 0;
				this.runAnimation = false;
			}
			else{
				
				this.srcX = Math.floor(this.countAnim/this.spriteSpeed) * this.battleWidth;
			}
			
		}
		
	}

}