function Collider (player){

	this.objetos_colide = function(objeto){
		
		var objetoCima = objeto.colY, objetoBaixo = (objeto.colY + objeto.colHeight), objetoEsquerda = objeto.colX, objetoDireita = (objeto.colX + objeto.colWidth);
		
		//		   (Yinicio,   Altura,     Xinicio, 	  Largura      ) 
		this.colide(objetoCima,objetoBaixo,objetoEsquerda,objetoDireita);
		
		
		//Colider Camera
		//this.colide_interno(cenarioCima,cenarioBaixo,cenarioEsquerda,cenarioDireita);

	}

	//Funcao de colisao
	this.colide = function(cima, baixo, esquerda, direita){

		//Colisão Cima
		if ((player.posX + player.width > esquerda && player.posX < direita) && (player.posY + player.height > cima && player.posY + player.height < (cima+3))) {
			player.posY = cima - player.height;
		}
		//Colisão Baixo
		if ((player.posX + player.width > esquerda && player.posX < direita) && (player.posY + player.height < baixo && player.posY + player.height > (baixo-3))) {
			player.posY = baixo - player.height;
		}
		//Colisão Esquerda
		if ((player.posY + player.height > cima && player.posY + player.height < baixo) && (player.posX + player.width > esquerda && player.posX + player.width < (esquerda+3))) {
			player.posX = esquerda - player.width;
		}
		//Colisão Direita
		if ((player.posY + player.height > cima && player.posY + player.height < baixo) && (player.posX < direita && player.posX > (direita-3))) {
			player.posX = direita;
		}
	}

	//Funcao de colisao interna
	this.colide_interno = function(cima, baixo, esquerda, direita){

		//Colisão Cima
		if ((player.posX + player.width >= esquerda && player.posX <= direita) && (player.posY < cima && player.posY > (cima-3))) {
			player.posY = cima;
		}
		//Colisão Baixo
		if ((player.posX + player.width >= esquerda && player.posX <= direita) && (player.posY + player.height > baixo && player.posY + player.height < (baixo+3))) {
			player.posY = baixo - player.height;
		}
		//Colisão Esquerda
		if ((player.posY + player.height >= cima && player.posY + player.height <= baixo) && (player.posX < esquerda && player.posX > (esquerda-3))) {
			player.posX = esquerda;
		}
		//Colisão Direita
		if ((player.posY + player.height >= cima && player.posY + player.height <= baixo) && (player.posX + player.width > direita && player.posX + player.width < (direita+3))) {
			player.posX = direita - player.width;
		}
	}
}
	