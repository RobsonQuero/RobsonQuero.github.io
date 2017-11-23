//Script do MAPA 1 da tela de Jogo
function Floresta (canvas,player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 9; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	//Variaveis com os valores das setas do teclado
	var LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40, BUTTON_S = 83, BUTTON_A = 65;
	
	
	//Variaveis de controle
	var showColisor = 0; //visualizar colisores
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.1; // delta = velocidade do efeito de transição de tela
	
	
	//Trilha sonora
	trilha_floresta = new Audio();
	trilha_floresta.src = "musicas/TheSky.mp3";
	trilha_floresta.volume = 0.5;
	
	
	//Variavel como o sprite do mapa
	var scene = new Image();
	scene.src = "img/cenarios/floresta.png";

	//Posicionando o player

	//objeto colisor
	var collisionController = new Collider(player); //Classe só controla as colisões com o player. Objetos são passados por parametro;
	
	
	//Interação do jogo
	var interacoes = new Interacao(player);
	var buttonA = 0;
	
	
	//Objetos do Cenário
	//O Collider do objeto sempre ira interagir com o FIM DO SPRITE DO PERSONAGEM EM Y, e não com o pé dele.
	//Portanto, o a Altura do colider SEMPRE SERÁ MAIOR que a Altura do objeto, para impedir que o pé do personagem passe por cima do objeto.
	
	var entradaEsquerda = new Objetos(null);
	entradaEsquerda.transform(0, 500, 345, 152); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	entradaEsquerda.collider(0, 500, 345, 152); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var entradaDireita = new Objetos(null);
	entradaDireita.transform(405,  480, 325, 160); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	entradaDireita.collider(405,  480, 325, 160); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao1Direita = new Objetos(null);
	colisao1Direita.transform(485, 390,  245, 250); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Direita.collider(485, 390,  245, 250); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao2Direita = new Objetos(null);
	colisao2Direita.transform(500, 0, 230, 640); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao2Direita.collider(500, 0, 230, 640); // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao3Direita = new Objetos(null);
	colisao3Direita.transform(470, 0,  260,  325); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao3Direita.collider(470, 0,  260,  325);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	
	var colisao4Direita = new Objetos(null);
	colisao4Direita.transform(445, 0,  285,  250); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao4Direita.collider(445, 0,  285,  250);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	

	var colisao5Direita = new Objetos(null);
	colisao5Direita.transform(375, 0,  355,  235); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao5Direita.collider(375, 0,  355,  235);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao1Centro = new Objetos(null);
	colisao1Centro.transform(275, 0,  455,  220); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Centro.collider(275, 0,  455,  220);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao1Esquerda = new Objetos(null);
	colisao1Esquerda.transform(0, 0,  280,  250); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao1Esquerda.collider(0, 0,  280,  250);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao2Esquerda = new Objetos(null);
	colisao2Esquerda.transform(0, 0,  190,  350); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao2Esquerda.collider(0, 0,  190,  350);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao3Esquerda = new Objetos(null);
	colisao3Esquerda.transform(0, 300,  180,  340); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao3Esquerda.collider(0, 300,  180,  340);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	
	var colisao4Esquerda = new Objetos(null);
	colisao4Esquerda.transform(0, 430,  210,  190); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	colisao4Esquerda.collider(0, 430,  210,  190);  // objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	

	var saida = new Objetos(null);
	saida.transform(345, 620, 60, 40); // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	saida.interact(345, 620, 60, 40);
	saida.collider(345,620,60,40);
	
	
	//Criação de um NPC
	var livro = new Objetos(null);
	livro.setSprite("img/itens/livro.png");
	livro.transform(345, 355, 16, 25); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	livro.collider(345, 355, 16, 25);  	// objeto.tamanho do colisor(Posição X, Posição Y, Largura, Altura);
	livro.interact(345, 355, 16, 28);
	livro.msgInteract(["img/layouts/falas/msg_book.png"], 1, 115, 0, 500, 100);
	
	
	//var cenarioCima = 450, cenarioBaixo = (450+100), cenarioEsquerda = 490, cenarioDireita = (490+100);
	
	
	//Imagens de Interação
	var msgButton = new Objetos(null);
	msgButton.setSprite("img/layouts/botoes/button_enter.png");
	msgButton.transform(0, 0, 80, 28); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	msgButton.showImg = 0;

	var bookSecret = 0;
	
	
	
	
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
			trilha_floresta.load();
			trilha_floresta.pause();
			return nextScene;
		}
	}
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//Função de inicialização do jogo
	this.start = function (){
		player.posX = 360;
		player.posY = 650;
		console.log("Iniciou VILA INICIAL!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_floresta.play();
		}
		else{
			this.canvasFade("out");
			console.log("fim da vila!");			
			console.log("fim da vila!");
		}
	}
	
	
	//Função de verificações "in game"
	this.update = function (){
		
		//Movimentação do player
		player.move();
		
		//Colisores dos objetos
		collisionController.objetos_colide(entradaEsquerda);			//objeto.função de controle do colisor (objeto);
		collisionController.objetos_colide(entradaDireita);
		collisionController.objetos_colide(colisao1Direita);
		collisionController.objetos_colide(colisao2Direita);
		collisionController.objetos_colide(colisao3Direita);
		collisionController.objetos_colide(colisao4Direita);
		collisionController.objetos_colide(colisao5Direita);

		collisionController.objetos_colide(colisao1Centro);

		collisionController.objetos_colide(colisao1Esquerda);
		collisionController.objetos_colide(colisao2Esquerda);
		collisionController.objetos_colide(colisao3Esquerda);
		collisionController.objetos_colide(colisao4Esquerda);
		collisionController.objetos_colide(saida);
		collisionController.objetos_colide(livro);

		//Portão de saida da vila
		nextScene = interacoes.interacaoTeleport(saida, 40, 250, 0, 108, gameState, 3, 1); //Teleport em trigger. Vai para MENU
		gameState = nextScene;

		//Interação button A livro
		interacoes.objetosInteracaoButton(livro,buttonA);

		interacoes.objetosInteracao(livro,msgButton,1);
		
		if(msgButton.showImg == 1 && buttonA == 1){
			bookSecret++;
			if(bookSecret >= 6){
				player.blueJewelLevel = 3;
			}
		}
		
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
		

		//Desenho das bordas de colisão (Xinicio, Yinicio, Largura, Altura)
		if(showColisor) {
			ctx.strokeRect(entradaEsquerda.colX,entradaEsquerda.colY,entradaEsquerda.colWidth,entradaEsquerda.colHeight);

			ctx.strokeRect(entradaDireita.colX,entradaDireita.colY,entradaDireita.colWidth,entradaDireita.colHeight);

			ctx.strokeRect(colisao1Direita.colX,colisao1Direita.colY,colisao1Direita.colWidth,colisao1Direita.colHeight);

			ctx.strokeRect(colisao2Direita.colX,colisao2Direita.colY,colisao2Direita.colWidth,colisao2Direita.colHeight);

			ctx.strokeRect(colisao3Direita.colX,colisao3Direita.colY,colisao3Direita.colWidth,colisao3Direita.colHeight);
			
			ctx.strokeRect(colisao4Direita.colX,colisao4Direita.colY,colisao4Direita.colWidth,colisao4Direita.colHeight);

			ctx.strokeRect(colisao5Direita.colX,colisao5Direita.colY,colisao5Direita.colWidth,colisao5Direita.colHeight);

			ctx.strokeRect(colisao1Centro.colX,colisao1Centro.colY,colisao1Centro.colWidth,colisao1Centro.colHeight);

			ctx.strokeRect(colisao1Esquerda.colX,colisao1Esquerda.colY,colisao1Esquerda.colWidth,colisao1Esquerda.colHeight);
			ctx.strokeRect(colisao2Esquerda.colX,colisao2Esquerda.colY,colisao2Esquerda.colWidth,colisao2Esquerda.colHeight);
			ctx.strokeRect(colisao3Esquerda.colX,colisao3Esquerda.colY,colisao3Esquerda.colWidth,colisao3Esquerda.colHeight);
			ctx.strokeRect(colisao4Esquerda.colX,colisao4Esquerda.colY,colisao4Esquerda.colWidth,colisao4Esquerda.colHeight);
			ctx.strokeRect(saida.colX,saida.colY,saida.colWidth,saida.colHeight);
			
			/*ctx.strokeRect(ferreiro.intX,ferreiro.intY,ferreiro.intWidth,ferreiro.intHeight);
			ctx.strokeRect(loja.intX,loja.intY,loja.intWidth,loja.intHeight);
			ctx.strokeRect(casa1.intX,casa1.intY,casa1.intWidth,casa1.intHeight);
			ctx.strokeRect(casa2.intX,casa2.intY,casa2.intWidth,casa2.intHeight);
			ctx.strokeRect(gremio.intX,gremio.intY,gremio.intWidth,gremio.intHeight);
			ctx.strokeRect(glitch.posX,glitch.posY,glitch.width,glitch.height);*/

			//ctx.strokeRect(npc.colX,npc.colY,npc.colWidth,npc.colHeight);
			//ctx.strokeRect(npc.intX,npc.intY,npc.intWidth,npc.intHeight);
			
			
		}
		
		livro.draw(ctx);
		msgButton.draw(ctx);
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