function Interacao (player){
	
	var ultimoId = 0;
	
	
	
	this.objetosInteracao = function (objetoA, objetoB, id){
		this.x = objetoA.intX;
		this.y = objetoA.intY;
		this.largura = (objetoA.intX + objetoA.intWidth);
		this.altura = (objetoA.intY + objetoA.intHeight);
		
		
		this.interagir(this.x, this.y, this.largura, this.altura, id, objetoB);
		
	}
	
	
	this.interagir = function(posX, posY, largura, altura, id, objetoB){
		if(player.posX + player.width >= posX && player.posX <= largura && player.posY + player.height >= posY && player.posY + player.height <= altura){
			if(objetoB.showImg == 0){
				
				objetoB.showImg = 1;
				ultimoId = id;
			}
		}
		else{
			if(objetoB.showImg == 1 && id == ultimoId){
				
				objetoB.showImg = 0;
			}
				
		}
		
	}
	
	
	
	
	this.objetosInteracaoButton = function (objetoA, buttonA){
		this.x = objetoA.intX;
		this.y = objetoA.intY;
		this.largura = (objetoA.intX + objetoA.intWidth);
		this.altura = (objetoA.intY + objetoA.intHeight);
		
		
		this.interagirButton(this.x, this.y, this.largura, this.altura, objetoA, buttonA);
		
	}	
	
	
	this.interagirButton = function(posX, posY, largura, altura, objetoA, buttonA){
		if(player.posX + player.width >= posX && player.posX <= largura && player.posY + player.height >= posY && player.posY + player.height <= altura){
			
			if(buttonA == 1){
				switch(objetoA.showMsg){
				
					case 0:
						objetoA.showMsg = 1;
						break;
						
					case 1:
						objetoA.trocarMsg();
						break;
				}
			}
			
		}
		else{
			
			if(objetoA.showMsg == 1){
				
				objetoA.resetMsg();
				
			}
			
		}
		
	}
	
	
	
	this.interacaoTeleport = function (objetoA, _posX, _posY, srcX, srcY, thisScene, nextScene, ativar){
		this.posX = objetoA.intX;
		this.posY = objetoA.intY;
		this.largura = (objetoA.intX + objetoA.intWidth);
		this.altura = (objetoA.intY + objetoA.intHeight);
		
		
		if(ativar == 1){
			if(player.posX + player.width >= this.posX && player.posX <= this.largura && player.posY + player.height >= this.posY && player.posY + player.height <= this.altura){
				
				player.posX = _posX;
				player.posY = _posY;
				player.srcX = srcX;
				player.srcY = srcY;
				
				player.mvRight = false;
				player.mvLeft = false;
				player.mvUp = false;
				player.mvDown = false;
				player.speed = 1;
				player.spriteSpeed = 6;
				player.countAnim = 42;
				
				return nextScene;
			}
		}
		
		return thisScene;
	}
	
	
	this.fimMsgTeleport = function (objeto, _posX, _posY, srcX, srcY, thisScene, nextScene){
		
		if(objeto.fimMsgInteracao == 1){
			
			objeto.fimMsgInteracao = 0;
			
			player.posX = _posX;
			player.posY = _posY;
			player.srcX = srcX;
			player.srcY = srcY;
			
			player.mvRight = false;
			player.mvLeft = false;
			player.mvUp = false;
			player.mvDown = false;
			player.speed = 1;
			player.spriteSpeed = 6;
			player.countAnim = 42;
			
			return nextScene;
			
		}
		
		return thisScene;
	}
	
}