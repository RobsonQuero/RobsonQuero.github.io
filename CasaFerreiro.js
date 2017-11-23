//Script do MAPA LOJA da tela de Jogo
function CasaFerreiro (canvas,player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 11; 	// Tela atual;
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
	trilha_casaFerreiro = new Audio();
	trilha_casaFerreiro.src = "musicas/InsideHouse.mp3";
	trilha_casaFerreiro.volume = 0.5;
	
	
	
	//Variavel como o sprite do mapa
	var scene = new Image();
	scene.src = "img/cenarios/casa_ferreiro.png";
	

	//objeto colisor
	var collisionController = new Collider(player); //Classe só controla as colisões com o player. Objetos são passados por parametro;
	
	
	//Interação do jogo
	var interacoes = new Interacao(player);
	var buttonA = 0;
	
	
	//Objetos do Cenário
	//O Collider do objeto sempre ira interagir com o FIM DO SPRITE DO PERSONAGEM, e não com o pé dele.
	//Portanto, o a Altura do colider SEMPRE SERÁ MAIOR que a Altura do objeto, para impedir que o pé do personagem passe por cima do objeto.
	
	var colisao1Esquerda = new Objetos(null);
	colisao1Esquerda.transform(0, 0, 268, 640); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Esquerda.collider(0, 0, 268, 640);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao2Esquerda = new Objetos(null);
	colisao2Esquerda.transform(0, 0, 300, 322); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao2Esquerda.collider(0, 0, 300, 322);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao1Inferior = new Objetos(null);
	colisao1Inferior.transform(0, 375, 275, 265); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Inferior.collider(0, 375, 275, 265);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao2Inferior = new Objetos(null);
	colisao2Inferior.transform(318, 375, 12, 265); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao2Inferior.collider(318, 375, 12, 265);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao3Inferior = new Objetos(null);
	colisao3Inferior.transform(335, 335, 31, 305); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao3Inferior.collider(335, 335, 31, 305);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao4Inferior = new Objetos(null);
	colisao4Inferior.transform(364, 385, 366, 255); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao4Inferior.collider(364, 385, 366, 255);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao5Inferior = new Objetos(null);
	colisao5Inferior.transform(371, 344, 34, 296); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao5Inferior.collider(371, 344, 34, 296);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao6Inferior = new Objetos(null);
	colisao6Inferior.transform(420, 344, 34, 296); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao6Inferior.collider(420, 344, 34, 296);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao7Inferior = new Objetos(null);
	colisao7Inferior.transform(0, 387, 730, 253); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao7Inferior.collider(0, 387, 730, 253);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao1Direita = new Objetos(null);
	colisao1Direita.transform(460, 0, 270, 640); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Direita.collider(460, 0, 270, 640);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	

	var colisao1Superior = new Objetos(null);
	colisao1Superior.transform(363, 0, 367, 293); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Superior.collider(363, 0, 367, 293);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao2Superior = new Objetos(null);
	colisao2Superior.transform(332, 0, 31, 305); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao2Superior.collider(332, 0, 31, 305);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao3Superior = new Objetos(null);
	colisao3Superior.transform(298, 0, 16, 288); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao3Superior.collider(298, 0, 16, 288);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	

	var saida = new Objetos(null);
	saida.transform(318, 400, 33, 36); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	saida.collider(318, 400, 33, 36);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var balcao = new Objetos(null);
	balcao.transform(250, 267, 100, 96); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	balcao.collider(250, 267, 100, 102); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	
	var portaSaida = new Objetos(null);
	portaSaida.transform(280, 367, 30, 25); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	portaSaida.interact(280, 367, 30, 25);
	
	
	//Criação de um NPC
	var npc = new Objetos(null);
	npc.setSprite("img/NPCs/pai_player.png");
	npc.transform(305, 280, 22, 40); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	npc.interact(305, 280, 22, 40);
	npc.collider(305, 280, 22, 40);
	npc.msgInteract(["img/layouts/falas/isen_msg_1.png","img/layouts/falas/isen_msg_2.png","img/layouts/falas/isen_msg_3.png"], 3, 115, 0, 500, 100);

	
	
	
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
			trilha_casaFerreiro.load();
			trilha_casaFerreiro.pause();
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
			trilha_casaFerreiro.play();
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
		collisionController.objetos_colide(colisao2Esquerda);
		collisionController.objetos_colide(colisao1Inferior);
		collisionController.objetos_colide(colisao2Inferior);
		collisionController.objetos_colide(colisao3Inferior);
		collisionController.objetos_colide(colisao4Inferior);
		collisionController.objetos_colide(colisao5Inferior);
		collisionController.objetos_colide(colisao6Inferior);
		collisionController.objetos_colide(colisao7Inferior);
		collisionController.objetos_colide(colisao1Direita);
		collisionController.objetos_colide(colisao1Superior);
		collisionController.objetos_colide(colisao2Superior);
		collisionController.objetos_colide(colisao3Superior);

		collisionController.objetos_colide(npc);
		
		//chama função de interação por contato
		interacoes.objetosInteracao(portaSaida,msgButton,1);
		interacoes.objetosInteracao(npc,msgButtonInteract,2);
		
		
		//chama função de interação por botão apertado
		interacoes.objetosInteracaoButton(npc,buttonA);
		
		// Se o player apertar a tecla A na porta da Loja
		nextScene = interacoes.interacaoTeleport(portaSaida, 544, 150, 0, 0, gameState, 3, buttonA);
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
			ctx.strokeRect(colisao2Esquerda.colX,colisao2Esquerda.colY,colisao2Esquerda.colWidth,colisao2Esquerda.colHeight);
			ctx.strokeRect(colisao1Inferior.colX,colisao1Inferior.colY,colisao1Inferior.colWidth,colisao1Inferior.colHeight);
			ctx.strokeRect(colisao2Inferior.colX,colisao2Inferior.colY,colisao2Inferior.colWidth,colisao2Inferior.colHeight);
			ctx.strokeRect(colisao3Inferior.colX,colisao3Inferior.colY,colisao3Inferior.colWidth,colisao3Inferior.colHeight);
			ctx.strokeRect(colisao4Inferior.colX,colisao4Inferior.colY,colisao4Inferior.colWidth,colisao4Inferior.colHeight);
			ctx.strokeRect(colisao5Inferior.colX,colisao5Inferior.colY,colisao5Inferior.colWidth,colisao5Inferior.colHeight);
			ctx.strokeRect(colisao6Inferior.colX,colisao6Inferior.colY,colisao6Inferior.colWidth,colisao6Inferior.colHeight);

			ctx.strokeRect(colisao1Direita.colX,colisao1Direita.colY,colisao1Direita.colWidth,colisao1Direita.colHeight);

			ctx.strokeRect(colisao1Superior.colX,colisao1Superior.colY,colisao1Superior.colWidth,colisao1Superior.colHeight);
			ctx.strokeRect(colisao2Superior.colX,colisao2Superior.colY,colisao2Superior.colWidth,colisao2Superior.colHeight);
			ctx.strokeRect(colisao3Superior.intX,colisao3Superior.intY,colisao3Superior.intWidth,colisao3Superior.intHeight);		
		}
	
		npc.draw(ctx);
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