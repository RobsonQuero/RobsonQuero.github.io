function Objetos (_img){

	//Forma do objeto
	this.posX = 0;
	this.posY = 0;
	this.width = 0;
	this.height = 0;
	
	
	//Colisor
	this.colX = 0;
	this.colY = 0;
	this.colWidth = 0;
	this.colHeight = 0;
	
	
	//Area de Interação
	this.intX = 0;
	this.intY = 0;
	this.intWidth = 0;
	this.intHeight = 0;
	
	
	//Mensagens do objeto
	var msg = new Image();
	this.msgX = 0;
	this.msgY = 0;
	this.msgWidth = 0;
	this.msgHeight = 0;
	
	this.vetorSprites = [];
	this.maxMsg = 0;
	this.atualMsg = 0;
	this.showMsg = 0
	
	this.fimMsgInteracao = 0;

	//Sprites do objeto
	var img = new Image();
	this.battleSprite = new Image();
	this.showImg = 1;
	
	
	//recorte das imagens
	this.srcX = 0;
	this.srcY = 0;
	
	
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
	
	
	
	
	//Atributos Gerais(INIMIGOS)
	this.atributos = new AtributosGerais(100,100,20,5,50,25); //LP, MP, AP, DP, Money, XP
	
	

	//atributos de movimentos (NÃO UTILIZADO NO MOMENTO)
	this.mvRight = false;
	this.mvLeft = false;
	this.mvUp = false;
	this.mvDown = false;

	
	//velocidade do personagem	(NÃO UTILIZADO NO MOMENTO)
	this.speed = 1;
	
	
	//Variaveis de animação	(NÃO UTILIZADO NO MOMENTO)
	this.spriteSpeed = 6;
	this.countAnim = 0;
	

	//Metodos
	
	//Insere a imagem no objeto
	this.setSprite = function(sprite){
		img.src = sprite;
	}
	
	
	//Declarar atributos do objeto
	this.transform = function(x,y,_width,_height){
		this.posX = x;
		this.posY = y;
		this.width = _width;
		this.height = _height;
	}
	
	
	//Declarar colisor do objeto
	this.collider = function(x,y,width,height){
		this.colX = x;
		this.colY = y;
		this.colWidth = width;
		this.colHeight = height;
	}
	
	
	//Declarar area de interação do objeto
	this.interact = function(x,y,width,height){
		this.intX = x;
		this.intY = y;
		this.intWidth = width;
		this.intHeight = height;
	}
	
	
	//Declarar mensagens de interação do objeto
	this.msgInteract = function(sprites,max,x,y,width,height){
		this.vetorSprites = sprites;
		this.maxMsg = max;
		this.msgX = x;
		this.msgY = y;
		this.msgWidth = width;
		this.msgHeight = height;
		
		msg.src = this.vetorSprites[0];
	}
	
	
	//Troca de mensagem
	this.trocarMsg = function(){
		
		this.atualMsg++;
		if(this.atualMsg >= this.maxMsg)
		{
			this.showMsg = 0;
			this.atualMsg = 0;
			msg.src = this.vetorSprites[this.atualMsg];
			
			this.fimMsgInteracao = 1;
		}
		else
		{
			this.fimMsgInteracao = 0;
			msg.src = this.vetorSprites[this.atualMsg];
		}
		
	}
	
	this.resetMsg = function(){
		this.showMsg = 0;
		this.atualMsg = 0;
		msg.src = this.vetorSprites[this.atualMsg];
	}
	
	
	
	//desenho
	this.draw = function(ctx){
		if(img.src != null){
			
			if(this.battleMode == 0){
				if(this.showImg == 1){
					ctx.drawImage(img,this.srcX,this.srcY, this.width, this.height, this.posX,this.posY,this.width,this.height);
					//this.animation();
				}
				
				if(this.showMsg == 1){
					ctx.drawImage(msg,this.srcX,this.srcY, this.msgWidth, this.msgHeight, this.msgX,this.msgY,this.msgWidth,this.msgHeight);
				}

				
			}
			else{
				
				ctx.drawImage(this.battleSprite,this.srcX,this.srcY, this.battleWidth, this.battleHeight, this.battlePosX, this.battlePosY,this.battleWidth,this.battleHeight);
				this.battleAnimation();
			}
			
		}
	}

	
	
	//movimentacao (NÃO UTILIZADO NO MOMENTO)
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

	
	//animacao	(NÃO UTILIZADO NO MOMENTO)
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