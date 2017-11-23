//Script da tela de Creditos
function Instrucao(canvas){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 17; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.1; // delta = velocidade do efeito de transição de tela
	
	
	//Trilha Sonora
	trilha_creditos = new Audio();
	trilha_creditos.src = "musicas/Credits theme.mp3";
	trilha_creditos.volume = 0.5;

	
	//Sprite do Mapa
	var scene = new Image();
	scene.src = "img/cenarios/instrucoes.png";
	
	
	
	//=====================================================================================================================================
	//COMANDOS DA TELA
	
	//ativa função de mouseClicked
	addEventListener('click', mouseClicked);

	//função para tratar clicks na tela
	//função para tratar clicks na tela
	function mouseClicked(e){
		
		if(gameState == thisScene){
			nextScene = 1; //MENU INICIAL
			gameState = nextScene;
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
			trilha_creditos.load();
			trilha_creditos.pause();
			return nextScene;
		}
	}
	
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//função de inicialização do jogo
	this.start = function (){
		console.log("Iniciou CREDITOS!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_creditos.play();
		}
		else{
			this.canvasFade("out");
			console.log("fim dos creditos!");
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