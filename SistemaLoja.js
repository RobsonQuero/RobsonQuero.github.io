//Script do MAPA LOJA da tela de Jogo
function SistemaLoja (canvas,player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 8; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	//Variaveis de controle
	var showColisor = 1; //visualizar colisores
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.1; // delta = velocidade do efeito de transição de tela
	 
	
	//Variavel como o sprite do mapa
	var scene = new Image();
	scene.src = "img/cenarios/shop.png";
	

	//objeto colisor
	var collisionController = new Collider(player); //Classe só controla as colisões com o player. Objetos são passados por parametro;
	
	
	//Interação do jogo
	var interacoes = new Interacao(player);
	var buttonA = 0;
	
	
	//Itens de compra
	var POTION = 1, MANA = 2, B_SHIELD = 3, B_SWORD = 4;
	var escolha = 0;
	var confirmarCompra = 0;
	var price = "";
	var owned = "";
	
	
	//Objetos do Cenário
	var confirmItem = new Objetos(null);
	confirmItem.setSprite("img/layouts/shop/potionHp.png");
	confirmItem.transform(183,291,171,34);
	confirmItem.showImg = 0;
	
	
	//Imagem de Interação
	var confirmMsg = new Objetos(null);
	confirmMsg.setSprite("img/layouts/shop/shop_confirmation.png");
	confirmMsg.transform(120, 230, 500, 166); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	confirmMsg.showImg = 0;
	
	
	var noMoneyMsg = new Objetos(null);
	noMoneyMsg.setSprite("img/layouts/shop/shop_fail.png");
	noMoneyMsg.transform(120, 230, 500, 166); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	noMoneyMsg.showImg = 0;
	
	
	
	
	
	//=====================================================================================================================================
	//COMANDOS DA TELA
	
	//ativa função de mouseClicked
	addEventListener('click', mouseClicked);

	//função para tratar clicks na tela
	function mouseClicked(e){
		if(gameState == thisScene){
			
			//button for Potion
			buttonTopPotion = 175;
			buttonRightPotion = 250;
			buttonDownPotion = 218;
			buttonLeftPotion = 35;
			
			//button for Mana Potion
			buttonTopMana = 228;
			buttonRightMana = 250;
			buttonDownMana = 271;
			buttonLeftMana = 35;
			
			//button for Bronze Shield
			buttonTopBShield = 280;
			buttonRightBShield = 250;
			buttonDownBShield = 323;
			buttonLeftBShield = 35;
			
			//button for Bronze Sword
			buttonTopBSword = 335;
			buttonRightBSword = 250;
			buttonDownBSword = 378;
			buttonLeftBSword = 35;

			//button for Cancel Buy
			buttonTopCancel = 347;
			buttonRightCancel  = 360;
			buttonDownCancel  = 379;
			buttonLeftCancel  = 235;
			
			//button for Confirm Buy
			buttonTopConfirm = 347;
			buttonRightConfirm  = 497;
			buttonDownConfirm  = 379;
			buttonLeftConfirm  = 370;
			
			//button for No Money Buy
			buttonTopFail = 342;
			buttonRightFail  = 428;
			buttonDownFail  = 375;
			buttonLeftFail  = 301;

			//button for Exit Shop
			buttonTopExit = 552;
			buttonRightExit  = 690;
			buttonDownExit  = 610;
			buttonLeftExit = 550;

			mouseX = e.pageX - cnv.offsetLeft;
			mouseY = e.pageY - cnv.offsetTop;

			//alert("X: " + mouseX);
			//alert("Y: " + mouseY);
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftPotion <= mouseX && mouseX <= buttonRightPotion && buttonTopPotion <= mouseY && mouseY <= buttonDownPotion && confirmMsg.showImg == 0){
				
				confirmMsg.showImg = 1;
				confirmMsg.msgDialogoLoja = 1;
				confirmItem.setSprite("img/layouts/shop/potionHp.png");
				confirmItem.showImg = 1;
				escolha = POTION;
				price = "20,00";
				owned = player.inventory.items["potionHp"].toString();
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftMana <= mouseX && mouseX <= buttonRightMana && buttonTopMana <= mouseY && mouseY <= buttonDownMana && confirmMsg.showImg == 0){
				
				confirmMsg.showImg = 1;
				confirmItem.setSprite("img/layouts/shop/potionMp.png");
				confirmItem.showImg = 1;
				escolha = MANA;
				price = "30,00";
				owned = player.inventory.items["potionMp"].toString();
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftBShield <= mouseX && mouseX <= buttonRightBShield && buttonTopBShield <= mouseY && mouseY <= buttonDownBShield && confirmMsg.showImg == 0){
				
				confirmMsg.showImg = 1;
				confirmItem.setSprite("img/layouts/shop/shield.png");
				confirmItem.showImg = 1;
				escolha = B_SHIELD;
				price = "200,00";
				owned = player.inventory.acessories["bronzeShield"].toString();
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftBSword <= mouseX && mouseX <= buttonRightBSword && buttonTopBSword <= mouseY && mouseY <= buttonDownBSword && confirmMsg.showImg == 0){
				
				confirmMsg.showImg = 1;
				confirmItem.setSprite("img/layouts/shop/sword.png");
				confirmItem.showImg = 1;
				escolha = B_SWORD;
				price = "200,00";
				owned = player.inventory.weapons["bronzeSword"].toString();
			}
			
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftCancel <= mouseX && mouseX <= buttonRightCancel && buttonTopCancel <= mouseY && mouseY <= buttonDownCancel && confirmMsg.showImg == 1){
				
				confirmMsg.showImg = 0;
				confirmItem.showImg = 0;
			}
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftConfirm <= mouseX && mouseX <= buttonRightConfirm && buttonTopConfirm <= mouseY && mouseY <= buttonDownConfirm && confirmMsg.showImg == 1){
				
				confirmMsg.showImg = 0;
				confirmItem.showImg = 0;
				confirmarCompra = 1;
			}
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftFail <= mouseX && mouseX <= buttonRightFail && buttonTopFail <= mouseY && mouseY <= buttonDownFail && noMoneyMsg.showImg == 1){
				
				noMoneyMsg.showImg = 0;
			}
			
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftExit <= mouseX && mouseX <= buttonRightExit && buttonTopExit <= mouseY && mouseY <= buttonDownExit && confirmMsg.showImg == 0){
				
				player.srcX = 0;
				
				nextScene = 4;
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
			return nextScene;
		}
	}
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//função de inicialização do jogo
	this.start = function (){
		console.log("Iniciou SISTEMA LOJA!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
		}
		else{
			this.canvasFade("out");
			console.log("**************** SHOP END ******************");
			console.log("fim do sistema loja!");
		}
	}
	
	
	//Função de verificações "in game"
	this.update = function (){
		
		if(confirmarCompra == 1){
			
			switch(escolha){
				
				case POTION:
					if(player.atributos.money >= 20){
						
						
						player.inventory.items["potionHp"]++;
						player.atributos.money = player.atributos.money - 20;
						console.log("Potion comprado!");
						console.log("QTD Potion: " + player.inventory.items["potionHp"]);
						
					}
					else{
						console.log("Dinheiro Insuficiente.");
						noMoneyMsg.showImg = 1;
					}
					break;
					
					
				case MANA:
					if(player.atributos.money >= 30){
							
						player.inventory.items["potionMp"]++;
						player.atributos.money = player.atributos.money - 30;
						console.log("Mana Potion comprado!");
						console.log("QTD Mana-Potion: " + player.inventory.items["potionMp"]);
					}
					else{
						console.log("Dinheiro Insuficiente.");
						noMoneyMsg.showImg = 1;
					}
					break;
				
				
				case B_SHIELD:
					if(player.atributos.money >= 200){
							
						player.inventory.acessories["bronzeShield"]++;
						player.atributos.money = player.atributos.money - 50;
						console.log("Bronze Shield comprado!");
						console.log("QTD Bronze Shield: " + player.inventory.acessories["bronzeShield"]);
					}
					else{
						console.log("Dinheiro Insuficiente.");
						noMoneyMsg.showImg = 1;
					}
					break;
					
					
				case B_SWORD:
					if(player.atributos.money >= 200){
							
						player.inventory.weapons["bronzeSword"]++;
						player.atributos.money = player.atributos.money - 50;
						console.log("Bronze Sword comprado!");
						console.log("QTD Bronze Sword: " + player.inventory.weapons["bronzeSword"]);
					}
					else{
						console.log("Dinheiro Insuficiente.");
						noMoneyMsg.showImg = 1;
					}
					break;
					
					
				default:
					break;
			}
			
			
			console.log("Dinheiro Atual: " + player.atributos.money);
			confirmarCompra = 0;
			escolha = 0;
		}
	}
	
	
	//Função de renderização das imagens
	this.draw = function (){
		
		//limpar a tela a cada atualização
		ctx.clearRect(0,0,cnv.width,cnv.height); 
		ctx.drawImage(scene,0,0,scene.width,scene.height,0,0,cnv.width,cnv.height);
		
		//contadores de vida e mp
		ctx.font = "bold 20px arial";
		ctx.fillStyle = "#ffffff";
		
		//Precos
		ctx.fillText("20,00",280,210);
		ctx.fillText("30,00",280,260);
		ctx.fillText("200,00",280,310);
		ctx.fillText("200,00",280,360);

		//Status
		ctx.fillText("HP: " + player.atributos.lifePoints,180,520);
		ctx.fillText("MP: " + player.atributos.magicPoints,180,550);
		ctx.fillText("Gold: " + player.atributos.money,180,580);
		ctx.fillText("ATK: " + player.atributos.attackPoints,300,520);
		ctx.fillText("DEF: " + player.atributos.defensePoints,300,550);
		ctx.fillText("XP: " + player.atributos.experience,300,580);

		confirmMsg.draw(ctx);
		
		
		
		if(confirmMsg.showImg == 1){
			
			ctx.fillText(price,445,303);
			ctx.fillText(owned,460,330);
		}
		
		
		
		
		noMoneyMsg.draw(ctx);
		confirmItem.draw(ctx);
		
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