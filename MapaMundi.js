//Script da tela de Menu
function MapaMundi(canvas, arena, player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 5; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.1; // delta = velocidade do efeito de transição de tela
	
	
	//Trilha Sonora
	trilha_mapa = new Audio();
	trilha_mapa.src = "musicas/Courage and Pride.mp3";
	trilha_mapa.volume = 0.5;


	//Trilha dos inimigos e batalha
	trilha_batalha_1 = new Audio();
	trilha_batalha_1.src = "musicas/Battle.mp3";
	trilha_batalha_1.volume = 0.5;

	trilha_batalha_2 = new Audio();
	trilha_batalha_2.src = "musicas/Battle 2.mp3";
	trilha_batalha_2.volume = 0.5;
	
	trilha_batalha_boss1 = new Audio();
	trilha_batalha_boss1.src = "musicas/Boss Battle 1.mp3";
	trilha_batalha_boss1.volume = 0.5;

	trilha_batalha_boss2 = new Audio();
	trilha_batalha_boss2.src = "musicas/Boss Battle 2.mp3";
	trilha_batalha_boss2.volume = 0.5;
	
	trilha_batalha_boss3 = new Audio();
	trilha_batalha_boss3.src = "musicas/Last Battle.mp3";
	trilha_batalha_boss3.volume = 0.5;
	
	trilha_batalha_magus = new Audio();
	trilha_batalha_magus.src = "musicas/Battle with Magus.mp3";
	trilha_batalha_magus.volume = 0.5;

	
	//Sprite do Mapa
	var scene = new Image();
	scene.src = "img/cenarios/mapa_selecao.png";
	
	var countImage1 = 0;
	var countImage2 = 0;
	var animDelta = 0.05;
	var i = 0;
	
	
	//Inimigos
	//Joia Verde
	var inimigoVerde1 = new Objetos(null);
	inimigoVerde1.transform(318, 282, 116, 160); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoVerde1.setBattleAnimationDetails("img/inimigos/joiaVerde/inimigo1/inimigoVerde1.png", 358, 300, 29, 40, [4,3,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoVerde1.atributos = new AtributosGerais(100,100,20,5,10,10,40,25); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoVerde1.enableBattleMode();
	
	var inimigoVerde2 = new Objetos(null);
	inimigoVerde2.transform(318, 282, 36, 58); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoVerde2.setBattleAnimationDetails("img/inimigos/joiaVerde/inimigo2/inimigoVerde2.png", 353, 280, 36, 58, [4,4,2,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoVerde2.atributos = new AtributosGerais(140,100,30,10,15,10,60,40); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoVerde2.enableBattleMode();
	
	var inimigoVerde3 = new Objetos(null);
	inimigoVerde3.transform(318, 282, 116, 136); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoVerde3.setBattleAnimationDetails("img/inimigos/joiaVerde/inimigo3/inimigoVerde3.png", 355, 280, 29, 34, [4,4,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoVerde3.atributos = new AtributosGerais(160,100,45,25,15,10,80,50); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoVerde3.enableBattleMode();
	
	
	//Joia Amarela
	var inimigoAmarela1 = new Objetos(null);
	inimigoAmarela1.transform(318, 282, 108, 136); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoAmarela1.setBattleAnimationDetails("img/inimigos/joiaAmarela/inimigo1/inimigoAmarela1.png", 353, 280, 27, 34, [4,4,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoAmarela1.atributos = new AtributosGerais(100,100,20,5,10,10,40,25); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoAmarela1.enableBattleMode();
	
	var inimigoAmarela2 = new Objetos(null);
	inimigoAmarela2.transform(318, 282, 116, 128); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoAmarela2.setBattleAnimationDetails("img/inimigos/joiaAmarela/inimigo2/inimigoAmarela2.png", 353, 280, 29, 32, [4,4,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoAmarela2.atributos = new AtributosGerais(140,100,30,10,15,10,60,40); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoAmarela2.enableBattleMode();
	
	var inimigoAmarela3 = new Objetos(null);
	inimigoAmarela3.transform(318, 282, 36, 58); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoAmarela3.setBattleAnimationDetails("img/inimigos/joiaAmarela/inimigo3/inimigoAmarela3.png", 353, 280, 36, 58, [4,4,2,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoAmarela3.atributos = new AtributosGerais(160,100,45,25,15,10,80,50); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoAmarela3.enableBattleMode();
		
	
	
	//Joia Vermelha
	var inimigoVermelha1 = new Objetos(null);
	inimigoVermelha1.transform(318, 282, 132, 132); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoVermelha1.setBattleAnimationDetails("img/inimigos/joiaVermelha/inimigo1/inimigoVermelha1.png", 353, 280, 33, 33, [4,4,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoVermelha1.atributos = new AtributosGerais(100,100,20,5,10,10,40,25); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoVermelha1.enableBattleMode();
	
	var inimigoVermelha2 = new Objetos(null);
	inimigoVermelha2.transform(318, 282, 36, 58); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoVermelha2.setBattleAnimationDetails("img/inimigos/joiaVermelha/inimigo2/inimigoVermelha2.png", 353, 280, 36, 58, [4,4,2,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoVermelha2.atributos = new AtributosGerais(140,100,30,10,15,10,60,40); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoVermelha2.enableBattleMode();
	
	var inimigoVermelha3 = new Objetos(null);
	inimigoVermelha3.transform(318, 282, 152, 136); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	inimigoVermelha3.setBattleAnimationDetails("img/inimigos/joiaVermelha/inimigo3/inimigoVermelha3.png", 353, 280, 38, 34, [4,4,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	inimigoVermelha3.atributos = new AtributosGerais(160,100,45,25,15,10,80,50); //LP, MP, AD, DP, AP, MD, Money, XP
	inimigoVermelha3.enableBattleMode();
	
	
	
	//Chefes
	var boss1 = new Objetos(null);
	boss1.transform(318, 282, 43, 55); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	boss1.setBattleAnimationDetails("img/inimigos/joiaVerde/boss/bossVerde.png", 325, 200, 86, 110, [4,3,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	boss1.atributos = new AtributosGerais(200,100,70,45,20,15,100,100); //LP, MP, AD, DP, AP, MD, Money, XP
	boss1.enableBattleMode(); 
	
	
	var boss2 = new Objetos(null);
	boss2.transform(318, 282, 43, 55); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	boss2.setBattleAnimationDetails("img/inimigos/joiaAmarela/boss/bossAmarela.png", 325, 250, 81, 64, [4,4,3,2], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector)
	boss2.atributos = new AtributosGerais(200,100,75,50,25,20,150,150); //LP, MP, AD, DP, AP, MD, Money, XP
	boss2.enableBattleMode();   
	
	
	var boss3 = new Objetos(null);
	boss3.transform(318, 282, 1225, 680); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	boss3.setBattleAnimationDetails("img/inimigos/joiaVermelha/finalBoss/bossVermelha.png", 253, 200, 245, 170, [4,4,5,3], ["attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	boss3.atributos = new AtributosGerais(200,100,80,55,30,20,300,300); //LP, MP, AD, DP, AP, MD, Money, XP
	boss3.enableBattleMode();
	
	
	var magus = new Objetos(null);
	magus.transform(318, 282, 240, 300); 	 // objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	magus.setBattleAnimationDetails("img/inimigos/joiaAzul/magus/magus.png", 353, 280, 40, 60, [4,6,6,3,2], ["intro","attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	magus.atributos = new AtributosGerais(375,100,85,45,40,30,500,500); //LP, MP, AD, DP, AP, MD, Money, XP
	magus.enableBattleMode();
	
	
	
	
	
	//=====================================================================================================================================
	//COMANDOS DA TELA
	
	//ativa função de mouseClicked
	addEventListener('click', mouseClicked);

	//função para tratar clicks na tela
	function mouseClicked(e){
		if(gameState == thisScene){
			
			//Joia verde: width = 18 height = 32 	x = 216  y = 478
			greenJewelTop = 478;
			greenJewelRight = 216 + 18;
			greenJewelDown = 478 + 32;
			greenJewelLeft = 216;

			//Joia amarela: width = 18 height = 32	x = 595  y = 477
			yellowJewelTop = 477;
			yellowJewelRight = 595 + 18;
			yellowJewelDown  = 477 + 32;
			yellowJewelLeft  = 595;

			//Joia vermelha: width = 18 height = 32	x = 389  y = 326
			redJewelTop = 326;
			redJewelRight = 389 + 18;
			redJewelDown  = 326 + 32;
			redJewelLeft  = 389;

			//Joia azul: width = 18 height = 32	x = 407  y = 33
			blueJewelTop = 33;
			blueJewelRight = 407 + 18;
			blueJewelDown  = 33 + 32;
			blueJewelLeft  = 407;

			//Vila: width = 32 height = 30	x = 133  y = 220
			vilaJewelTop = 220;
			vilaJewelRight = 133 + 18;
			vilaJewelDown  = 220 + 32;
			vilaJewelLeft  = 133;

			mouseX = e.pageX - cnv.offsetLeft;
			mouseY = e.pageY - cnv.offsetTop;

			//alert("X: " + mouseX);
			//alert("Y: " + mouseY);
			
			
			//Quando clicado na Joia Verde
			if(greenJewelLeft <= mouseX && mouseX <= greenJewelRight && greenJewelTop <= mouseY && mouseY <= greenJewelDown){
				
				var background1 = new Image();
				background1.src = "img/cenarios/bg1.png";
				
				if(player.greenJewelLevel == 0){
					inimigoVerde1.atributos = new AtributosGerais(100,100,20,5,10,10,40,25); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background1, trilha_batalha_1, null, inimigoVerde1, "green");
				}
				
				if(player.greenJewelLevel == 1){
					inimigoVerde2.atributos = new AtributosGerais(140,100,30,10,15,10,60,40); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background1, trilha_batalha_1, null, inimigoVerde2, "green");
				}
				
				if(player.greenJewelLevel == 2){
					inimigoVerde3.atributos = new AtributosGerais(160,100,45,15,15,10,80,50); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background1, trilha_batalha_2, null, inimigoVerde3, "green");
				}
				
				if(player.greenJewelLevel >= 3){
					boss1.atributos = new AtributosGerais(200,100,70,45,20,15,100,100); //LP, MP, AD, DP, AP, MD, Money, XP
					arena.setParametros(background1, trilha_batalha_boss1, null, boss1, "green");
				}
				
				nextScene = 6;
				gameState = nextScene;
			}
			
			//Quando clicado na Joia Amarela
			if(yellowJewelLeft <= mouseX && mouseX <= yellowJewelRight && yellowJewelTop <= mouseY && mouseY <= yellowJewelDown){
				
				var background2 = new Image();
				background2.src = "img/cenarios/bg2.png";
				
				if(player.yellowJewelLevel == 0){
					inimigoAmarela1.atributos = new AtributosGerais(100,100,20,5,10,10,40,25); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background2, trilha_batalha_1, null, inimigoAmarela1, "yellow");
				}
				
				if(player.yellowJewelLevel == 1){
					inimigoAmarela2.atributos = new AtributosGerais(140,100,30,10,15,10,60,40); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background2, trilha_batalha_1, null, inimigoAmarela2, "yellow");
				}
				
				if(player.yellowJewelLevel == 2){
					inimigoAmarela3.atributos = new AtributosGerais(160,100,45,15,15,10,80,50); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background2, trilha_batalha_2, null, inimigoAmarela3, "yellow");
				}
				
				if(player.yellowJewelLevel >= 3){
					boss2.atributos = new AtributosGerais(200,100,75,50,25,20,150,150); //LP, MP, AD, DP, AP, MD, Money, XP
					arena.setParametros(background2, trilha_batalha_boss2, null, boss2, "yellow");
				}
				
				
				
				nextScene = 6;
				gameState = nextScene;
			}

			//Quando clicado na Joia Vermelha
			if(redJewelLeft <= mouseX && mouseX <= redJewelRight && redJewelTop <= mouseY && mouseY <= redJewelDown){
				
				var background3 = new Image();
				background3.src = "img/cenarios/bg3.png";
				
				if(player.redJewelLevel == 0){
					inimigoVermelha1.atributos = new AtributosGerais(100,100,20,5,10,10,40,25); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background3, trilha_batalha_1, null, inimigoVermelha1, "red");
				}
				
				if(player.redJewelLevel == 1){
					inimigoVermelha2.atributos = new AtributosGerais(140,100,30,10,15,10,60,40); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background3, trilha_batalha_1, null, inimigoVermelha2, "red");
				}
				
				if(player.redJewelLevel == 2){
					inimigoVermelha3.atributos = new AtributosGerais(160,100,45,15,15,10,80,50); //LP, MP, AP, DP, Money, XP
					arena.setParametros(background3, trilha_batalha_2, null, inimigoVermelha3, "red");
				}
				
				if(player.redJewelLevel == 3){
					boss3.atributos = new AtributosGerais(200,100,75,55,25,20,300,300); //LP, MP, AD, DP, AP, MD, Money, XP
					arena.setParametros(background3, trilha_batalha_boss3, null, boss3, "red");
				}
				
				nextScene = 6;
				gameState = nextScene;
			}

			//Quando clicado na Joia Azul
			if(blueJewelLeft <= mouseX && mouseX <= blueJewelRight && blueJewelTop <= mouseY && mouseY <= blueJewelDown){
				
				var background4 = new Image();
				background4.src = "img/cenarios/bg4.png";
				
				
				if(player.blueJewelLevel >= 3){
					magus.atributos = new AtributosGerais(375,100,85,45,40,30,500,500); //LP, MP, AD, DP, AP, MD, Money, XP
					arena.setParametros(background4, trilha_batalha_magus, null, magus, "blue");
					
					
					nextScene = 6;
					gameState = nextScene;
				}
				
			}

			//Quando clicado na Vila
			if(vilaJewelLeft <= mouseX && mouseX <= vilaJewelRight && vilaJewelTop <= mouseY && mouseY <= vilaJewelDown){
				
				player.srcX = 0;
				
				nextScene = 14;
				gameState = nextScene;
			}

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
			trilha_mapa.load();
			trilha_mapa.pause();
			return nextScene;
		}
	}
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//função de inicialização do jogo
	this.start = function (){
		
		console.log("Iniciou MAPA MUNDI!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_mapa.play();
		}
		else{
			
			this.canvasFade("out");
			console.log("fim do Mapa Mundi!");
			if(gameState == 6){
				
				console.log("**************** BATTLE BEGIN ******************");
				player.enableBattleMode();
			}
		}
	}
	
	
	
	//Função de verificações "in game"
	this.update = function(){
				
		
		if(gameState != thisScene){
			
			this.canvasFade("out");
		}
	}
	
	
	//Função de renderização das imagens
	this.draw = function (){
		
		//limpar a tela a cada atualização
		ctx.clearRect(0,0,cnv.width,cnv.height); 
		ctx.drawImage(scene,0,0,scene.width,scene.height,0,0,cnv.width,cnv.height);
		
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