//Script do MAPA LOJA da tela de Jogo
function CasaMissoes (canvas,player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 14; 	// Tela atual;
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
    trilha_casaMissoes = new Audio();
	trilha_casaMissoes.src = "musicas/InsideHouse.mp3";
	trilha_casaMissoes.volume = 0.5;
	
	
	
	//Variavel como o sprite do mapa
	var scene = new Image();
	scene.src = "img/cenarios/casa_missoes.png";
	

	//objeto colisor
	var collisionController = new Collider(player); //Classe só controla as colisões com o player. Objetos são passados por parametro;
	
	
	//Interação do jogo
	var interacoes = new Interacao(player);
	var buttonA = 0;
	
	
	//Objetos do Cenário
	//O Collider do objeto sempre ira interagir com o FIM DO SPRITE DO PERSONAGEM, e não com o pé dele.
	//Portanto, o a Altura do colider SEMPRE SERÁ MAIOR que a Altura do objeto, para impedir que o pé do personagem passe por cima do objeto.
	
	var cenarioBaixo1 = new Objetos(null);
	cenarioBaixo1.transform(270, 396, 48, 40); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	cenarioBaixo1.collider(270, 396, 48, 40);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var cenarioBaixo2 = new Objetos(null);
	cenarioBaixo2.transform(351, 396, 97, 40); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	cenarioBaixo2.collider(351, 396, 97, 40);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var cenarioCima = new Objetos(null);
	cenarioCima.transform(250, 234, 198, 63); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	cenarioCima.collider(250, 234, 198, 68);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var cenarioDir = new Objetos(null);
	cenarioDir.transform(448, 205, 40, 231); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	cenarioDir.collider(432, 205, 40, 231);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var cenarioEsq = new Objetos(null);
	cenarioEsq.transform(250, 363, 20, 73); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	cenarioEsq.collider(250, 363, 20, 73);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var saida = new Objetos(null);
	saida.transform(318, 400, 33, 36); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	saida.collider(318, 400, 33, 36);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var balcao = new Objetos(null);
	balcao.transform(250, 267, 100, 96); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	balcao.collider(250, 267, 100, 102); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	
	var portaSaida = new Objetos(null);
	portaSaida.transform(310, 395, 30, 25); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	portaSaida.interact(310, 395, 30, 25);
	
	
	
	
	//Criação de um NPC
	var chancellor_npc = new Objetos(null);
	chancellor_npc.setSprite("img/NPCs/chancellor_npc.png");
	chancellor_npc.transform(312, 297, 24, 28); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	chancellor_npc.interact(250, 267, 105, 107);
	chancellor_npc.msgInteract(["img/layouts/falas/chancellor_msg_1.png"], 1, 115, 0, 500, 100);
	
	
	
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
			
			
			console.log("fim da loja!");
			if(gameState == 8){
				
				console.log("**************** MISSION TIME ******************");
			}
			trilha_casaMissoes.load();
			trilha_casaMissoes.pause();
			return nextScene;
		}
	}
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//função de inicialização do jogo
	this.start = function (){
		console.log("Iniciou LOJA!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_casaMissoes.play();
		}
		else{
			
			this.canvasFade("out");
			console.log("fim da missao!");
			if(gameState == 8){
				
				console.log("**************** MISSION TIME ******************");
			}
		}
	}
	
	
	//Função de verificações "in game"
	this.update = function (){
		player.move();
		
		//chama metodo da classe colide
		collisionController.objetos_colide(cenarioBaixo1);
		collisionController.objetos_colide(cenarioBaixo2);
		collisionController.objetos_colide(saida);
		collisionController.objetos_colide(cenarioDir);
		collisionController.objetos_colide(cenarioCima);
		collisionController.objetos_colide(balcao);
		collisionController.objetos_colide(cenarioEsq);
		
		
		//chama função de interação por contato
		interacoes.objetosInteracao(portaSaida,msgButton,1);
		interacoes.objetosInteracao(chancellor_npc,msgButtonInteract,2);
		
		
		//chama função de interação por botão apertado
		interacoes.objetosInteracaoButton(chancellor_npc,buttonA);
		
		
		// Se o player apertar a tecla A na porta da Loja
		nextScene = interacoes.interacaoTeleport(portaSaida, 238, 200, 0, 0, gameState, 3, buttonA);
		gameState = nextScene;
		
		
		nextScene = interacoes.fimMsgTeleport(chancellor_npc, player.posX, player.posY, player.srcX, player.srcY, gameState, 5);
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
		
		
		//ctx.strokeRect(250, 267, 105, 107);
		
		
		chancellor_npc.draw(ctx);
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