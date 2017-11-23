//Script do MAPA 1 da tela de Jogo
function VilaInicial (canvas,player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 3; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	//Variaveis com os valores das setas do teclado
	var LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40, BUTTON_S = 83, BUTTON_A = 65, BUTTON_D = 68;
	
	
	//Variaveis de controle
	var showColisor = 0; //visualizar colisores
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.1; // delta = velocidade do efeito de transição de tela
	
	
	//Trilha Sonora
	trilha_vila = new Audio();
	trilha_vila.src = "musicas/Peaceful Days.mp3";
	trilha_vila.volume = 0.5;
	
	
	//Variavel como o sprite do mapa
	var scene = new Image();
	scene.src = "img/cenarios/mapa.png";
	

	//objeto colisor
	var collisionController = new Collider(player); //Classe só controla as colisões com o player. Objetos são passados por parametro;
	
	
	//Interação do jogo
	var interacoes = new Interacao(player);
	var buttonA = 0;
	
	
	//Objetos do Cenário
	//O Collider do objeto sempre ira interagir com o FIM DO SPRITE DO PERSONAGEM EM Y, e não com o pé dele.
	//Portanto, o a Altura do colider SEMPRE SERÁ MAIOR que a Altura do objeto, para impedir que o pé do personagem passe por cima do objeto.
	
	var ferreiro = new Objetos(null);
	ferreiro.transform(190, 120, 100, 95); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	ferreiro.collider(190, 120, 100, 103); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	ferreiro.interact(242, 214, 16, 15);   // objeto.area de interacao(Posição X, Posição Y, Largura, Altura);
	
	var loja = new Objetos(null);
	loja.transform(325, 200, 140, 95); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	loja.collider(325, 200, 140, 103); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	loja.interact(418, 294, 16, 15);   // objeto.area de interacao(Posição X, Posição Y, Largura, Altura);
	
	var casa1 = new Objetos(null);
	casa1.transform(465,  73, 140, 95); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	casa1.collider(465,  73, 140, 103); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	casa1.interact(547, 167, 16, 15); 	// objeto.area de interacao(Posição X, Posição Y, Largura, Altura);
	
	var casa2 = new Objetos(null);
	casa2.transform(145, 300,  95, 95); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	casa2.collider(145, 300,  95, 103); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	casa2.interact(194, 394, 16, 15); 	// objeto.area de interacao(Posição X, Posição Y, Largura, Altura);
	
	var gremio = new Objetos(null);
	gremio.transform(162, 425, 140, 95); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	gremio.collider(162, 425, 140, 103); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	gremio.interact(258, 519, 16, 15);   // objeto.area de interacao(Posição X, Posição Y, Largura, Altura);
	
	var cercaEntrada1 = new Objetos(null);
	cercaEntrada1.transform(0, 232,  80,  33); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	cercaEntrada1.collider(0, 232,  80,  37);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var arvoresEsq1 = new Objetos(null);
	arvoresEsq1.transform(0,   0, 110, 238); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	arvoresEsq1.collider(0,   0, 110, 243);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var arvoresEsq2 = new Objetos(null);
	arvoresEsq2.transform(0, 290, 110, 350); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	arvoresEsq2.collider(0, 290, 110, 350);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var arvoresBaixo = new Objetos(null);
	arvoresBaixo.transform(0, 585, 730,  55); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	arvoresBaixo.collider(0, 585, 730,  55);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var arvoresDir = new Objetos(null);
	arvoresDir.transform(610,   0, 120, 640); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	arvoresDir.collider(610,   0, 120, 640);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var arvoresCima = new Objetos(null);
	arvoresCima.transform(0,   0, 730, 108); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	arvoresCima.collider(0,   0, 730, 114);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var glitch = new Objetos(null);
	glitch.transform(0, 266, 30, 40); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	glitch.interact(0, 266, 30, 40);
	
	
	//Arvore
	var arvoreVaso = new Objetos(null);
	arvoreVaso.transform(305, 422, 101, 99); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	arvoreVaso.collider(305, 422, 101, 105);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	
	//Criação de um NPC
	var paken_npc = new Objetos(null);
	paken_npc.setSprite("img/NPCs/paken.png");
	paken_npc.transform(358, 274, 24, 36); 					// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	paken_npc.collider(363, 274, 15, 45);  					// objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	paken_npc.interact(358, 274, 24, 45);
	paken_npc.msgInteract(["img/layouts/falas/npc_paken.png"], 1, 115, 0, 500, 100);
	
	var girl_npc = new Objetos(null);
	girl_npc.setSprite("img/NPCs/girl_npc.png");
	girl_npc.transform(200, 200, 18, 26); 					// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	girl_npc.collider(200, 200, 18, 35);  					// objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	girl_npc.interact(200, 200, 15, 35);
	girl_npc.msgInteract(["img/layouts/falas/girl_msg_1.png"], 1, 115, 0, 500, 100);

	var grandwoman_npc = new Objetos(null);
	grandwoman_npc.setSprite("img/NPCs/grandwoman_npc.png");
	grandwoman_npc.transform(560, 250, 22, 28); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	grandwoman_npc.collider(560, 250, 22, 35);  			// objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	grandwoman_npc.interact(560, 250, 22, 35);
	grandwoman_npc.msgInteract(["img/layouts/falas/grandma_msg_1.png","img/layouts/falas/grandma_msg_2.png"], 2, 115, 0, 500, 100);

	var fiona_npc = new Objetos(null);
	fiona_npc.setSprite("img/NPCs/fiona_npc.png");
	fiona_npc.transform(330, 500, 15, 32); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	fiona_npc.collider(330, 500, 15, 40);  			// objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	fiona_npc.interact(330, 500, 15, 40);
	fiona_npc.msgInteract(["img/layouts/falas/fiona_msg_1.png"], 1, 115, 0, 500, 100);
	
	
	//Imagens de Interação
	var msgButton = new Objetos(null);
	msgButton.setSprite("img/layouts/botoes/button_enter.png");
	msgButton.transform(0, 0, 80, 28); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	msgButton.showImg = 0;
	
	
	var msgButtonInteract = new Objetos(null);
	msgButtonInteract.setSprite("img/layouts/botoes/button_interact.png");
	msgButtonInteract.transform(0, 0, 100, 28); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	msgButtonInteract.showImg = 0;

	
	
	
	
	//=====================================================================================================================================
	//COMANDOS DA TELA

	//funções de reconhecimento de tecla
	addEventListener("keydown",keydownHandler,false);
	addEventListener("keyup",keyupHandler,false);
	

	//Função que verifica uma tecla que foi apertada
	function keydownHandler(e){
		
		if(gameState == thisScene){
			
			switch(e.keyCode){
				case RIGHT:
					player.mvRight = true;
					player.mvLeft = false;
					player.mvUp = false;
					player.mvDown = false;
					break;
					
				case LEFT:
					player.mvRight = false;
					player.mvLeft = true;
					player.mvUp = false;
					player.mvDown = false;
					break;

				case UP:
					player.mvRight = false;
					player.mvLeft = false;
					player.mvUp = true;
					player.mvDown = false;
					break;

				case DOWN:
					player.mvRight = false;
					player.mvLeft = false;
					player.mvUp = false;
					player.mvDown = true;
					break;
					
				case BUTTON_S:
					player.speed = 1.8;
					player.spriteSpeed = 5;
					break;
					
				case BUTTON_A:
					buttonA = 1;
					break;
					
				case BUTTON_D:
					player.mvRight = false;
					player.mvLeft = false;
					player.mvUp = false;
					player.mvDown = false;
					buttonA = 0;
					player.speed = 1;
					player.spriteSpeed = 6;
					player.countAnim = 42;
					player.srcX = 0;
					player.lastScene = thisScene;
					
					nextScene = 10; // Tela de Inventário
					gameState = nextScene;
					break;
			}
		}
	}
	
	//Função que verifica uma tecla que foi solta
	function keyupHandler(e){
		
		if(gameState == thisScene){
			switch(e.keyCode){

				case RIGHT:
					player.mvRight = false;
					break;
				case LEFT:
					player.mvLeft = false;
					break;
				case UP:
					player.mvUp = false;
					break;
				case DOWN:
					player.mvDown = false;
					break;
				case BUTTON_S:
					player.speed = 1;
					player.spriteSpeed = 6;
					player.countAnim = 42;
					break;
					
				case BUTTON_A:
					buttonA = 0;
					break;
					
			}
			player.srcX = 0;
		}
	}
	
	
	
	//=====================================================================================================================================
	//ATUALIZAÇÃO DO GAMESTATE
	
	//Função que atualiza o gameState na classe
	this.updateGameState = function(_gameState){
		
		gameState = _gameState;
	}
	
	
	//Função que retorna o estado da tela
	this.returnState = function(){
		if(gameState == thisScene){
			return thisScene;
		}
		else{
			trilha_vila.load();
			trilha_vila.pause();
			console.log("fim da vila!");
			return nextScene;
		}
	}
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//Função de inicialização do jogo
	this.start = function (){
		player.posX = 150;
		player.posY = 150;
		console.log("Iniciou VILA INICIAL!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_vila.play();
		}
		else{
			this.canvasFade("out");
			console.log("fim da vila!");
		}
	}
	
	
	//Função de verificações "in game"
	this.update = function (){
		
		//Movimentação do player
		player.move();
		
		//Colisores dos objetos
		collisionController.objetos_colide(loja);			//objeto.função de controle do colisor (objeto);
		collisionController.objetos_colide(gremio);
		collisionController.objetos_colide(ferreiro);
		collisionController.objetos_colide(casa1);
		collisionController.objetos_colide(casa2);
		collisionController.objetos_colide(cercaEntrada1);
		collisionController.objetos_colide(arvoresEsq1);
		collisionController.objetos_colide(arvoresEsq2);
		collisionController.objetos_colide(arvoresBaixo);
		collisionController.objetos_colide(arvoresDir);
		collisionController.objetos_colide(arvoresCima);
		collisionController.objetos_colide(arvoreVaso);
		collisionController.objetos_colide(paken_npc);
		collisionController.objetos_colide(girl_npc);
		collisionController.objetos_colide(grandwoman_npc);
		collisionController.objetos_colide(fiona_npc);
		
		
		
		//chama função de interação por contato
		interacoes.objetosInteracao(ferreiro,msgButton,1);
		interacoes.objetosInteracao(loja,msgButton,2);	
		interacoes.objetosInteracao(casa1,msgButton,3);
		interacoes.objetosInteracao(casa2,msgButton,4);
		interacoes.objetosInteracao(gremio,msgButton,5);
		interacoes.objetosInteracao(paken_npc,msgButtonInteract,6);
		interacoes.objetosInteracao(girl_npc,msgButtonInteract,7);
		interacoes.objetosInteracao(grandwoman_npc,msgButtonInteract,8);
		interacoes.objetosInteracao(fiona_npc,msgButtonInteract,9);
		
		
		
		
		//chama função de interação por botão apertado
		interacoes.objetosInteracaoButton(paken_npc,buttonA);
		interacoes.objetosInteracaoButton(girl_npc,buttonA);
		interacoes.objetosInteracaoButton(grandwoman_npc,buttonA);
		interacoes.objetosInteracaoButton(fiona_npc,buttonA);
		
		
		
		
		//Interação para troca de mapa
		//interação.função(objeto de contato, player.posX, player.posY, player.srcX, player.srcY, estado atual, próximo estado, botão de ação)
		nextScene = interacoes.interacaoTeleport(loja, 325, 355, 0, 36, gameState, 4, buttonA); // Vai para LOJA
		gameState = nextScene;
		
		// Se o player apertar a tecla A na porta do ferreiro
		nextScene = interacoes.interacaoTeleport(ferreiro, 325, 355, 0, 36, gameState, 14, buttonA); // Vai para o MAPA MUNDI
		gameState = nextScene;
		
		// Se o player apertar a tecla A na porta do Gremio
		nextScene = interacoes.interacaoTeleport(gremio, 340, 360, 0, 36, gameState, 13, buttonA); //Teleport em trigger. Vai para MENU
		gameState = nextScene;
		
		// Se o player apertar a tecla A na porta da Casa 1
		nextScene = interacoes.interacaoTeleport(casa1, 287, 350, 0, 36, gameState, 11, buttonA);
		gameState = nextScene;
		
		// Se o player apertar a tecla A na porta da Casa 2
		nextScene = interacoes.interacaoTeleport(casa2, 287, 330, 0, 36, gameState, 12, buttonA);
		gameState = nextScene;
		
		//Portão de saida da vila
		nextScene = interacoes.interacaoTeleport(glitch, 360, 580, 0, 36, gameState, 9, 1); //Teleport em trigger. Vai para MENU
		gameState = nextScene;
		
		
		if(gameState != thisScene){
			
			this.canvasFade("out");
		}
		
		buttonA = 0;
		
		
		/*if(gameState != thisScene){
			buttonA = 0;
		}*/
		
		//Atualizações do jogo em caso de game over
		/*window.setTimeout(function(){
			scene.src = "img/Menu.png";
			
		}, 500);*/
	}
	
	
	
	//Função de renderização das imagens
	this.draw = function (){
		
		//limpar a tela a cada atualização
		ctx.clearRect(0,0,cnv.width,cnv.height); 
		ctx.drawImage(scene,0,0,scene.width,scene.height,0,0,cnv.width,cnv.height);
		

		//Desenho das bordas de colisão (Xinicio, Yinicio, Largura, Altura)
		if(showColisor) {
			ctx.strokeRect(ferreiro.colX,ferreiro.colY,ferreiro.colWidth,ferreiro.colHeight);
			ctx.strokeRect(loja.colX,loja.colY,loja.colWidth,loja.colHeight);
			ctx.strokeRect(casa1.colX,casa1.colY,casa1.colWidth,casa1.colHeight);
			ctx.strokeRect(casa2.colX,casa2.colY,casa2.colWidth,casa2.colHeight);
			ctx.strokeRect(gremio.colX,gremio.colY,gremio.colWidth,gremio.colHeight);
			//ctx.strokeRect(490,450,100,100);
			ctx.strokeRect(arvoresEsq1.colX,arvoresEsq1.colY,arvoresEsq1.colWidth,arvoresEsq1.colHeight);
			ctx.strokeRect(arvoresEsq2.colX,arvoresEsq2.colY,arvoresEsq2.colWidth,arvoresEsq2.colHeight);
			ctx.strokeRect(arvoresBaixo.colX,arvoresBaixo.colY,arvoresBaixo.colWidth,arvoresBaixo.colHeight);
			ctx.strokeRect(arvoresDir.colX,arvoresDir.colY,arvoresDir.colWidth,arvoresDir.colHeight);
			ctx.strokeRect(arvoresCima.colX,arvoresCima.colY,arvoresCima.colWidth,arvoresCima.colHeight);
			ctx.strokeRect(cercaEntrada1.colX,cercaEntrada1.colY,cercaEntrada1.colWidth,cercaEntrada1.colHeight);
			
			ctx.strokeRect(ferreiro.intX,ferreiro.intY,ferreiro.intWidth,ferreiro.intHeight);
			ctx.strokeRect(loja.intX,loja.intY,loja.intWidth,loja.intHeight);
			ctx.strokeRect(casa1.intX,casa1.intY,casa1.intWidth,casa1.intHeight);
			ctx.strokeRect(casa2.intX,casa2.intY,casa2.intWidth,casa2.intHeight);
			ctx.strokeRect(gremio.intX,gremio.intY,gremio.intWidth,gremio.intHeight);
			ctx.strokeRect(glitch.posX,glitch.posY,glitch.width,glitch.height);
			ctx.strokeRect(npc.colX,npc.colY,npc.colWidth,npc.colHeight);
			ctx.strokeRect(npc.intX,npc.intY,npc.intWidth,npc.intHeight);
			
			
		}
		
		paken_npc.draw(ctx);
		girl_npc.draw(ctx);
		grandwoman_npc.draw(ctx);
		fiona_npc.draw(ctx);
		msgButton.draw(ctx);
		msgButtonInteract.draw(ctx);
		player.draw(ctx);

	}
	
	
	//Função de efeito de transição
	this.canvasFade = function (escolha){
		
		if(escolha == "in"){
			
			if(alpha <= 1){
				alpha += delta;
				ctx.globalAlpha = alpha;
			}
		}
		
		if(escolha == "out"){
			
			alpha = 0;
			ctx.globalAlpha = alpha;
		}
		
	}
	
	
}