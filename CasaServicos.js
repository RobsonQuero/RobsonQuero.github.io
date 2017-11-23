//Script do MAPA LOJA da tela de Jogo
function CasaServicos (canvas,player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 13; 	// Tela atual;
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
	trilha_casaServicos = new Audio();
	trilha_casaServicos.src = "musicas/InsideHouse.mp3";
	trilha_casaServicos.volume = 0.5;
	

	//Variavel como o sprite do mapa
	var scene = new Image();
	scene.src = "img/cenarios/casa_servicos.png";
	

	//objeto colisor
	var collisionController = new Collider(player); //Classe só controla as colisões com o player. Objetos são passados por parametro;
	
	
	//Interação do jogo
	var interacoes = new Interacao(player);
	var buttonA = 0;
	
	
	//Objetos do Cenário
	//O Collider do objeto sempre ira interagir com o FIM DO SPRITE DO PERSONAGEM, e não com o pé dele.
	//Portanto, o a Altura do colider SEMPRE SERÁ MAIOR que a Altura do objeto, para impedir que o pé do personagem passe por cima do objeto.
	
	var colisao1Esquerda = new Objetos(null);
	colisao1Esquerda.transform(0, 0, 139, 640); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Esquerda.collider(0, 0, 139, 640);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao1Inferior  = new Objetos(null);
	colisao1Inferior .transform(0, 398, 331, 242); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Inferior .collider(0, 398, 331, 242);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao2Inferior = new Objetos(null);
	colisao2Inferior.transform(0, 400, 730, 240); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao2Inferior.collider(0, 400, 730, 240);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao3Inferior = new Objetos(null);
	colisao3Inferior.transform(380, 380, 350, 260); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao3Inferior.collider(380, 380, 350, 260);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	
	var colisao1Direita = new Objetos(null);
	colisao1Direita.transform(588, 0, 142, 640); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Direita.collider(588, 0, 142, 640);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	

	var colisao1Superior = new Objetos(null);
	colisao1Superior.transform(553, 0, 177, 319); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Superior.collider(553, 0, 177, 319);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao2Superior = new Objetos(null);
	colisao2Superior.transform(419, 0, 128, 353); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao2Superior.collider(419, 0, 128, 353);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao3Superior = new Objetos(null);
	colisao3Superior.transform(395, 0, 335, 303); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao3Superior.collider(395, 0, 335, 303);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao4Superior = new Objetos(null);
	colisao4Superior.transform(299, 0, 94, 353); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao4Superior.collider(299, 0, 94, 353);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao5Superior = new Objetos(null);
	colisao5Superior.transform(0, 0, 316, 287); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao5Superior.collider(0, 0, 316, 287);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao6Superior = new Objetos(null);
	colisao6Superior.transform(171, 0, 110, 353); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao6Superior.collider(171, 0, 110, 353);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao7Superior = new Objetos(null);
	colisao7Superior.transform(0, 0, 152, 293); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao7Superior.collider(0, 0, 152, 293);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	
	var balcao = new Objetos(null);
	balcao.transform(250, 267, 100, 96); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	balcao.collider(250, 267, 100, 102); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	
	var portaSaida = new Objetos(null);
	portaSaida.transform(332, 398, 51, 242); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	portaSaida.interact(332, 398, 51, 242);
	
	
	//Criação de um NPC
	var barman_npc = new Objetos(null);
	barman_npc.setSprite("img/NPCs/barman_npc.png");
	barman_npc.transform(215, 285, 19, 33); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	barman_npc.interact(215, 320, 19, 33);
	barman_npc.collider(215, 280, 19, 33);
	barman_npc.msgInteract(["img/layouts/falas/barman_msg_1.png"], 1, 115, 0, 500, 100);

	//recepcionista
	recepcionista_npc = new Objetos(null);
	recepcionista_npc.setSprite("img/NPCs/recepcionista_npc.png");
	recepcionista_npc.transform(345,285,16, 33);
	recepcionista_npc.interact(345,325,16, 33);
	recepcionista_npc.collider(345,285,16, 33);
	recepcionista_npc.msgInteract(["img/layouts/falas/sophie_msg_1.png"], 1, 115, 0, 500, 100);

	man_npc = new Objetos(null);
	man_npc.setSprite("img/NPCs/man_npc.png");
	man_npc.transform(395,320,22, 34);
	man_npc.interact(395,325,22, 34);
	man_npc.collider(395,325,22, 34);
	man_npc.msgInteract(["img/layouts/falas/rufus_msg_1.png", "img/layouts/falas/rufus_msg_2.png"], 2, 115, 0, 500, 100);
	
	
	
	//Imagem de Interação
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
			trilha_casaServicos.load();
			trilha_casaServicos.pause();
			return nextScene;
		}
	}
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//função de inicialização do jogo
	this.start = function (){
		console.log("Iniciou Casa Personagem!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_casaServicos.play();
		}
		else{
			this.canvasFade("out");
			console.log("fim da vila!");
		}
	}
	
	
	//Função de verificações "in game"
	this.update = function (){
		player.move();
		
		//chama metodo da classe colide
		collisionController.objetos_colide(colisao1Esquerda);
		collisionController.objetos_colide(colisao1Inferior);
		collisionController.objetos_colide(colisao2Inferior);
		collisionController.objetos_colide(colisao3Inferior);
		collisionController.objetos_colide(colisao1Direita);
		collisionController.objetos_colide(colisao1Superior);
		collisionController.objetos_colide(colisao2Superior);
		collisionController.objetos_colide(colisao3Superior);
		collisionController.objetos_colide(colisao4Superior);
		collisionController.objetos_colide(colisao5Superior);
		collisionController.objetos_colide(colisao6Superior);
		collisionController.objetos_colide(colisao7Superior);

		collisionController.objetos_colide(barman_npc);
		collisionController.objetos_colide(recepcionista_npc);
		collisionController.objetos_colide(man_npc);
		
		//chama função de interação por contato
		interacoes.objetosInteracao(portaSaida,msgButton,1);
		interacoes.objetosInteracao(barman_npc,msgButtonInteract,2);
		interacoes.objetosInteracao(recepcionista_npc,msgButtonInteract,3);
		interacoes.objetosInteracao(man_npc,msgButtonInteract,4);
		
		//chama função de interação por botão apertado
		interacoes.objetosInteracaoButton(barman_npc,buttonA);
		interacoes.objetosInteracaoButton(recepcionista_npc,buttonA);
		interacoes.objetosInteracaoButton(man_npc,buttonA);
		
		// Se o player apertar a tecla A na porta da Loja
		nextScene = interacoes.interacaoTeleport(portaSaida, 254, 500, 0, 0, gameState, 3, buttonA);
		gameState = nextScene;
		
		

		if(gameState != thisScene){
			
			this.canvasFade("out");
		}
		
		buttonA = 0;
	}
	
	
	//Função de renderização das imagens
	this.draw = function (){
		
		//limpar a tela a cada atualização
		ctx.clearRect(0,0,cnv.width,cnv.height); 
		ctx.drawImage(scene,0,0,scene.width,scene.height,0,0,cnv.width,cnv.height);

		if(showColisor) {

			ctx.strokeRect(colisao1Esquerda.colX,colisao1Esquerda.colY,colisao1Esquerda.colWidth,colisao1Esquerda.colHeight);
			ctx.strokeRect(colisao1Inferior.colX,colisao1Inferior.colY,colisao1Inferior.colWidth,colisao1Inferior.colHeight);
			ctx.strokeRect(colisao2Inferior.colX,colisao2Inferior.colY,colisao2Inferior.colWidth,colisao2Inferior.colHeight);
			ctx.strokeRect(colisao3Inferior.colX,colisao3Inferior.colY,colisao3Inferior.colWidth,colisao3Inferior.colHeight);
			ctx.strokeRect(colisao1Direita.colX,colisao1Direita.colY,colisao1Direita.colWidth,colisao1Direita.colHeight);
			ctx.strokeRect(colisao1Superior.colX,colisao1Superior.colY,colisao1Superior.colWidth,colisao1Superior.colHeight);
			ctx.strokeRect(colisao2Superior.colX,colisao2Superior.colY,colisao2Superior.colWidth,colisao2Superior.colHeight);
			ctx.strokeRect(colisao3Superior.colX,colisao3Superior.colY,colisao3Superior.colWidth,colisao3Superior.colHeight);
			ctx.strokeRect(colisao4Superior.colX,colisao4Superior.colY,colisao4Superior.colWidth,colisao4Superior.colHeight);
			ctx.strokeRect(colisao5Superior.colX,colisao5Superior.colY,colisao5Superior.colWidth,colisao5Superior.colHeight);
			ctx.strokeRect(colisao6Superior.colX,colisao6Superior.colY,colisao6Superior.colWidth,colisao6Superior.colHeight);
			ctx.strokeRect(colisao7Superior.colX,colisao7Superior.colY,colisao7Superior.colWidth,colisao7Superior.colHeight);
			ctx.strokeRect(recepcionista_npc.colX,recepcionista_npc.colY,recepcionista_npc.colWidth,recepcionista_npc.colHeight);

		}
		
		recepcionista_npc.draw(ctx);
		barman_npc.draw(ctx);
		man_npc.draw(ctx);
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