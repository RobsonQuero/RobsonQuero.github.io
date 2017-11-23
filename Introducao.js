//Script da tela de introducao
function Introducao(canvas){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 15; 	// Tela atual;
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
	trilha_intro = new Audio();
	trilha_intro.src = "musicas/Intro.mp3";
	trilha_intro.volume = 0.5;

	//Introducao
	var intro_scene = ["img/Intro/1.png","img/Intro/2.png","img/Intro/3.png","img/Intro/4.png","img/Intro/5.png","img/Intro/6.png","img/Intro/7.png","img/Intro/8.png","img/Intro/9.png","img/Intro/10.png","img/Intro/11.png","img/Intro/12.png","img/Intro/13.png","img/Intro/14.png","img/Intro/15.png","img/Intro/16.png"];
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

			trilha_intro.load();
			trilha_intro.pause();
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
			trilha_intro.play();
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
			scene.src = intro_scene[count_scene];
			this.canvasFade("out");
		}
		buttonA = 0;

		if(count_scene >= 15)
		{
			nextScene = 3;
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