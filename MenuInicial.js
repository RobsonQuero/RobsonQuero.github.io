//Script da tela de Menu
function MenuInicial(canvas, player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 1; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.1; // delta = velocidade do efeito de transição de tela
	
	
	//ctx.scale(4, 4);
	
	
	//Trilha Sonora
	trilha_menu = new Audio();
	trilha_menu.src = "musicas/A Premonition.mp3";
	trilha_menu.volume = 0.5;
	
	
	
	//Código Especial;
	var codigoEspecial = [];
	var contadorCliques = 0;

	var joiaVerdeLeft = 76;
	var joiaVerdeRight = 121;
	var joiaVerdeUp = 387;
	var joiaVerdeDown = 467;

	var joiaAmarelaLeft = 619;
	var joiaAmarelaRight = 664;
	var joiaAmarelaUp = 387;
	var joiaAmarelaDown = 467;

	var joiaVermelhaLeft = 351;
	var joiaVermelhaRight = 396;
	var joiaVermelhaUp = 152;
	var joiaVermelhaDown = 232;
	
	
	//Sprite do Mapa
	var scene = new Image();
	scene.src = "img/cenarios/menu.png";
	
	
	
	//=====================================================================================================================================
	//COMANDOS DA TELA
	
	//ativa função de mouseClicked
	addEventListener('click', mouseClicked);

	//função para tratar clicks na tela
	function mouseClicked(e){
		if(gameState == thisScene){
			
			//button for play
			buttonTopPlay = 455;
			buttonRightPlay = 325;
			buttonDownPlay = 525;
			buttonLeftPlay = 150;

			//button for creditos
			buttonTopCred = 455;
			buttonRightCred  = 580;
			buttonDownCred  = 525;
			buttonLeftCred  = 400;

			//button for Instruções
			buttonTopInstrucao = 574;
			buttonRightInstrucao  = 459;
			buttonDownInstrucao  = 610;
			buttonLeftInstrucao  = 273;

			mouseX = e.pageX - cnv.offsetLeft;
			mouseY = e.pageY - cnv.offsetTop;

			//alert("X: " + mouseX);
			//alert("Y: " + mouseY);
			
			
			//Validação do Codigo Especial
			if(contadorCliques >= 6)
			{
				contadorCliques = 0;
			}
			if(joiaVerdeLeft <= mouseX && mouseX <= joiaVerdeRight && joiaVerdeUp <= mouseY && mouseY <= joiaVerdeDown){

				codigoEspecial[contadorCliques] = "verde";
				contadorCliques++;
			}

			if(joiaAmarelaLeft <= mouseX && mouseX <= joiaAmarelaRight && joiaAmarelaUp <= mouseY && mouseY <= joiaAmarelaDown){

				codigoEspecial[contadorCliques] = "amarelo";
				contadorCliques++;
			}

			if(joiaVermelhaLeft <= mouseX && mouseX <= joiaVermelhaRight && joiaVermelhaUp <= mouseY && mouseY <= joiaVermelhaDown){
				
				codigoEspecial[contadorCliques] = "vermelho";
				contadorCliques++;
			}
			
			console.log("Codigo inserido = ",codigoEspecial[0],codigoEspecial[1],codigoEspecial[2],codigoEspecial[3],codigoEspecial[4],codigoEspecial[5]);
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftPlay <= mouseX && mouseX <= buttonRightPlay && buttonTopPlay <= mouseY && mouseY <= buttonDownPlay){
				
				player.atributos = new AtributosGerais(100,100,20,10,50,0,50,0); //LP, MP, AD, DP, AP, MD, Money, XP

				if (codigoEspecial[0] == "verde" && codigoEspecial[1] == "amarelo" && codigoEspecial[2] == "vermelho" && codigoEspecial[3] == "amarelo" && codigoEspecial[4] == "vermelho" && codigoEspecial[5] == "vermelho") {

					//alert("Codigo vida infinita");
					player.atributos = new AtributosGerais(999999,100,20,10,50,0,50,0); //LP, MP, AD, DP, AP, MD, Money, XP
				}
				

				if (codigoEspecial[0] == "vermelho" && codigoEspecial[1] == "verde" && codigoEspecial[2] == "verde" && codigoEspecial[3] == "amarelo" && codigoEspecial[4] == "vermelho" && codigoEspecial[5] == "amarelo") {

					//alert("Codigo mana infinita");
					player.atributos = new AtributosGerais(100,999999,20,10,50,0,50,0); //LP, MP, AD, DP, AP, MD, Money, XP
				}

				player.inventory.items["potionHp"] = 0;
				player.inventory.items["potionMp"] = 0;
				player.inventory.acessories["bronzeShield"] = 0;
				player.inventory.weapons["bronzeSword"] = 0;
				player.greenJewelLevel = 0;
				player.redJewelLevel = 0;
				player.yellowJewelLevel = 0;
				player.blueJewelLevel = 0;
				player.posX = 544;
				player.posY = 150;
				player.srcX = 0;
				player.srcY = 0;
				//alert("PLAY");
				nextScene = 15; // gameState = VILA
				gameState = nextScene;
				//console.log("PASSOU PELO fim do menu!");
			}
			
			if(buttonLeftCred <= mouseX && mouseX <= buttonRightCred && buttonTopCred <= mouseY && mouseY <= buttonDownCred){
				//alert("CREDITOS");
				nextScene = 2; // gameState = CREDITOS
				gameState = nextScene;
				//console.log("PASSOU PELO fim do menu!");
			}
			
			
			if(buttonLeftInstrucao <= mouseX && mouseX <= buttonRightInstrucao && buttonTopInstrucao <= mouseY && mouseY <= buttonDownInstrucao){
				//alert("CREDITOS");
				nextScene = 17; // gameState = CREDITOS
				gameState = nextScene;
				//console.log("PASSOU PELO fim do menu!");
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
			trilha_menu.load();
			trilha_menu.pause();
			return nextScene;
		}
	}
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//função de inicialização do jogo
	this.start = function (){
		
		console.log("Iniciou MENU!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_menu.play();
		}
		else{
			
			this.canvasFade("out");
			console.log("fim do menu!");
		}
	}
	
	
	
	//Função de verificações "in game"
	this.update = function(){
		
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