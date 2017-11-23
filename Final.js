//Script da tela de final
function FimJogo(canvas){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 16; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.05; // delta = velocidade do efeito de transição de tela

    //Tecla de interacao
    var BUTTON_A = 65;
    var buttonA = 0;
	
	//ctx.scale(4, 4);

	//Trilha Sonora
	trilha_final = new Audio();
	trilha_final.src = "musicas/Credits theme.mp3";
	trilha_final.volume = 0.5;

	//Introducao
	var intro_scene = ["img/final/1.png","img/final/2.png","img/final/3.png","img/final/4.png","img/final/5.png", "img/final/fim.png"];
	var count_scene = 0;
	//Sprite do Mapa
	var scene = new Image();
	scene.src = intro_scene[count_scene];

	var msgButtonInteract = new Objetos(null);
	msgButtonInteract.setSprite("img/layouts/botoes/button_interact.png");
	msgButtonInteract.transform(0, 0, 100, 28); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	msgButtonInteract.showImg = 1;
	
	//=====================================================================================================================================
	//COMANDOS DA TELA
	

	//funções de reconhecimento de tecla
	addEventListener("keydown",keydownHandler,false);
	addEventListener("keyup",keyupHandler,false);

	//Função que verifica uma tecla que foi apertada
	function keydownHandler(e){
		
		if(gameState == thisScene){
			
			switch(e.keyCode){	
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

				case BUTTON_A:
					buttonA = 0;
					break;
					
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

			trilha_final.load();
			trilha_final.pause();
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
			trilha_final.play();
		}
		else{
			
			this.canvasFade("out");
			console.log("fim do menu!");
		}
	}
	
	
	
	//Função de verificações "in game"
	this.update = function(){

		if(buttonA == 1){
			count_scene++;
			if(count_scene < 6){
				scene.src = intro_scene[count_scene];
				this.canvasFade("out");
			}
		}
		buttonA = 0;

		if(count_scene >= 6)
		{
			nextScene = 2;
			gameState = nextScene;
		}
	}
	
	//Função de renderização das imagens
	this.draw = function (){

		//limpar a tela a cada atualização
		ctx.clearRect(0,0,cnv.width,cnv.height); 
		ctx.drawImage(scene,0,0,scene.width,scene.height,0,0,cnv.width,cnv.height);
		msgButtonInteract.draw(ctx);
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