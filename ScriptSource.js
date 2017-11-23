//Classe que será aberta quando a janela do navegador iniciar
window.onload = function(){
	
	//Variaveis de Canvas
	var cnv = document.querySelector("canvas");
	
	
	
	//Variaveis de sprite do personagem
	var spriteSheet = new Image();
	spriteSheet.src = "img/player/chrono_sprite.png";
	
	var player = new Sprite();
	player.setSprite("img/player/chrono_sprite.png");
	player.setBattleAnimationDetails("img/player/chrono_battle_sprites.png", 350, 350, 50, 50, [6,5,4,3,2], ["intro","attack","hability","death","damage"]);  //(sprite, posX, posY, width, height, rangeVector, actionsVector)
	
	
	//Estado do Jogo
	var MENU = 1, CREDITOS = 2, VILA_INICIAL = 3, LOJA = 4, MAPA_MUNDI = 5, ARENA = 6, GAME_OVER = 7, SISTEMA_LOJA = 8,FLORESTA = 9, SISTEMA_INVENTARIO = 10;
	var CASAFERREIRO = 11,CASANPC = 12, CASASERVICOS = 13,  CASAMISSOES = 14, INTRODUCAO = 15, FINAL_JOGO = 16, INSTRUCAO = 17;
	var gameState = MENU;
	
	
	//Instanciação das Classes de Telas
	var menu = new MenuInicial(cnv,player);
	var creditos = new Creditos(cnv);
	var vila = new VilaInicial(cnv,player);
	var loja = new Loja(cnv,player);
	var arena = new ArenaCombate(cnv,player);
	var mapaMundi = new MapaMundi(cnv,arena,player);
	var gameOver = new GameOver(cnv);
	var sisLoja = new SistemaLoja(cnv, player);
	var introFloresta = new Floresta(cnv,player);
	var inventario = new SistemaInventario(cnv, player);
	var casaFerreiro = new CasaFerreiro(cnv,player);
	var casaNpc = new CasaNpc(cnv,player);
	var casaServicos = new CasaServicos(cnv,player);
	var casaMissoes = new CasaMissoes(cnv,player);
	var introducao = new Introducao(cnv);
	var fimJogo = new FimJogo(cnv);
	var instrucao = new Instrucao(cnv);
	
	
	
	//Ao carregar a pagina, começa o jogo
	spriteSheet.onload = function(){
		menu.updateGameState(gameState);
		
		menu.start();
		creditos.start();
		vila.start();
		loja.start();
		mapaMundi.start();
		arena.start();
		gameOver.start();
		sisLoja.start();
		introFloresta.start();
		inventario.start();
		casaFerreiro.start();
		casaNpc.start();
		casaServicos.start();
		casaMissoes.start();
		introducao.start();
		fimJogo.start();
		instrucao.start();
		
		
		loop();
	}
	 
	
	function loop(){
		window.requestAnimationFrame(loop,cnv);
		
		switch(gameState){
			
			case MENU:
				menu.loop();
				gameState = menu.returnState();
				//console.log("Menu ReturnState: " + gameState);
				break;
				
			case CREDITOS:
				creditos.loop();
				gameState = creditos.returnState();
				//console.log("Creditos ReturnState: " + gameState);
				break;
				
			case VILA_INICIAL:
				vila.loop();
				gameState = vila.returnState();
				//console.log("Vila ReturnState: " + gameState);
				break;
				
			case LOJA:
				loja.loop();
				gameState = loja.returnState();
				//console.log("Loja ReturnState: " + gameState);
				break;
				
			case MAPA_MUNDI:
				mapaMundi.loop();
				gameState = mapaMundi.returnState();
				//console.log("Mapa Mundi ReturnState: " + gameState);
				break;
				
			case ARENA:
				arena.loop();
				gameState = arena.returnState();
				//console.log("Arena ReturnState: " + gameState);
				break;
				
			case GAME_OVER:
				gameOver.loop();
				gameState = gameOver.returnState();
				//console.log("Arena ReturnState: " + gameState);
				break;
				
			case SISTEMA_LOJA:
				sisLoja.loop();
				gameState = sisLoja.returnState();
				//console.log("Sistema Loja ReturnState: " + gameState);
				break;
				
			case FLORESTA:
				introFloresta.loop();
				gameState = introFloresta.returnState();
				break;

			case CASAFERREIRO:
				casaFerreiro.loop();
				gameState = casaFerreiro.returnState();
				break;
			case CASANPC:
				casaNpc.loop();
				gameState = casaNpc.returnState();
				break;
			case CASASERVICOS:
				casaServicos.loop();
				gameState = casaServicos.returnState();
				break;
				
			case SISTEMA_INVENTARIO:
				inventario.loop();
				gameState = inventario.returnState();
				break;

			case CASAMISSOES:
				casaMissoes.loop();
				gameState = casaMissoes.returnState();
				break;
				
				
			case INTRODUCAO:
				introducao.loop();
				gameState = introducao.returnState();
				break;
				
			case FINAL_JOGO:
				fimJogo.loop();
				gameState = fimJogo.returnState();
				break;
				
			case INSTRUCAO:
				instrucao.loop();
				gameState = instrucao.returnState();
				break;
		}
		
		
		//Atualização do gameState nas telas
		menu.updateGameState(gameState);
		creditos.updateGameState(gameState);
		vila.updateGameState(gameState);
		loja.updateGameState(gameState);
		mapaMundi.updateGameState(gameState);
		arena.updateGameState(gameState);
		gameOver.updateGameState(gameState);
		sisLoja.updateGameState(gameState);
		introFloresta.updateGameState(gameState);
		casaFerreiro.updateGameState(gameState);
		casaNpc.updateGameState(gameState);
		casaServicos.updateGameState(gameState);
		inventario.updateGameState(gameState);
		casaMissoes.updateGameState(gameState);
		introducao.updateGameState(gameState);
		fimJogo.updateGameState(gameState);
		instrucao.updateGameState(gameState);
	}
	
}