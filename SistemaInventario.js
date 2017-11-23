//Script do MAPA LOJA da tela de Jogo
function SistemaInventario (canvas,player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 10; 	// Tela atual;
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
	scene.src = "img/cenarios/inventory.png";
	

	//objeto colisor
	var collisionController = new Collider(player); //Classe só controla as colisões com o player. Objetos são passados por parametro;
	
	
	//Interação do jogo
	var interacoes = new Interacao(player);
	var buttonA = 0;
	
	
	//Itens de compra
	var POTION = 1, MANA = 2, B_SHIELD = 3, B_SWORD = 4;
	var escolha = 0;
	var confirmar = 0;
	var items = 0, acessories = 0, weapons = 0;
	var qtyItem1 = "", qtyItem2 = "", equipAcessory = "", equipWeapon = "", category = "";
	
	
	//Objetos do Cenário
	
	/*//Imagem de Interação
	var items = new Objetos(null);
	items.setSprite("img/inventory_items.png");
	items.transform(255, 198, 471, 299); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	items.showImg = 0;*/
	
	
	//Itens
	var posicaoItem1 = new Objetos(null);
	posicaoItem1.setSprite("img/layouts/inventario/potionHp.png");
	posicaoItem1.transform(259,256,171,34);
	posicaoItem1.showImg = 0;
	
	var posicaoItem2 = new Objetos(null);
	posicaoItem2.setSprite("img/layouts/inventario/potionMp.png");
	posicaoItem2.transform(498,256,171,34);
	posicaoItem2.showImg = 0;
	
	var posicaoItem3 = new Objetos(null);
	posicaoItem3.setSprite("img/layouts/inventario/potionHp.png");
	posicaoItem3.transform(259,315,171,34);
	posicaoItem3.showImg = 0;
	
	var posicaoItem4 = new Objetos(null);
	posicaoItem4.setSprite("img/layouts/inventario/potionHp.png");
	posicaoItem4.transform(498,315,171,34);
	posicaoItem4.showImg = 0;
	
	var posicaoItem5 = new Objetos(null);
	posicaoItem5.setSprite("img/layouts/inventario/potionHp.png");
	posicaoItem5.transform(259,374,171,34);
	posicaoItem5.showImg = 0;
	
	var posicaoItem6 = new Objetos(null);
	posicaoItem6.setSprite("img/layouts/inventario/potionHp.png");
	posicaoItem6.transform(498,374,171,34);
	posicaoItem6.showImg = 0;
	
	var posicaoItem7 = new Objetos(null);
	posicaoItem7.setSprite("img/layouts/inventario/potionHp.png");
	posicaoItem7.transform(259,433,171,34);
	posicaoItem7.showImg = 0;
	
	var posicaoItem8 = new Objetos(null);
	posicaoItem8.setSprite("img/layouts/inventario/potionHp.png");
	posicaoItem8.transform(498,433,171,34);
	posicaoItem8.showImg = 0;
	
	
	
	var confirmItem = new Objetos(null);
	confirmItem.setSprite("img/layouts/inventario/potionHp.png");
	confirmItem.transform(192,294,171,34);
	confirmItem.showImg = 0;
	
	
	/*var exchangeItem1 = new Objetos(null);
	exchangeItem1.setSprite("img/potionHp.png");
	exchangeItem1.transform(254,250,171,34);
	exchangeItem1.showImg = 0;
	
	var exchangeItem2 = new Objetos(null);
	exchangeItem2.setSprite("img/potionHp.png");
	exchangeItem2.transform(254,250,171,34);
	exchangeItem2.showImg = 0;*/
	
	
	
	
	/*var noMoneyMsg = new Objetos(null);
	noMoneyMsg.setSprite("img/shop_fail.png");
	noMoneyMsg.transform(120, 230, 500, 166); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	noMoneyMsg.showImg = 0;*/
	
	
	var itemConfirmationMsg = new Objetos(null);
	itemConfirmationMsg.setSprite("img/layouts/inventario/item_confirmation.png");
	itemConfirmationMsg.transform(120, 230, 500, 166); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	itemConfirmationMsg.showImg = 0;
	
	
	
	
	
	//=====================================================================================================================================
	//COMANDOS DA TELA
	
	//ativa função de mouseClicked
	addEventListener('click', mouseClicked);

	//função para tratar clicks na tela
	function mouseClicked(e){
		if(gameState == thisScene){
			
			//button for items inventory
			buttonTopItems = 303;
			buttonRightItems = 198;
			buttonDownItems = 346;
			buttonLeftItems = 20;
			
			//button for Acessories
			buttonTopAcessories = 360;
			buttonRightAcessories = 198;
			buttonDownAcessories = 406;
			buttonLeftAcessories = 20;
			
			//button for Weapons
			buttonTopWeapons = 419;
			buttonRightWeapons = 198;
			buttonDownWeapons = 464;
			buttonLeftWeapons = 20;
			
			
			
			
			
			
			//button for Slot1
			buttonTopSlot1 = 250;
			buttonRightSlot1 = 430;
			buttonDownSlot1 = 293;
			buttonLeftSlot1 = 254;
			
			//button for Slot2
			buttonTopSlot2 = 250;
			buttonRightSlot2 = 669;
			buttonDownSlot2 = 293;
			buttonLeftSlot2 = 492;
			
			//button for Slot3
			buttonTopSlot3 = 309;
			buttonRightSlot3 = 430;
			buttonDownSlot3 = 351;
			buttonLeftSlot3 = 254;
			
			//button for Slot4
			buttonTopSlot4 = 309;
			buttonRightSlot4 = 669;
			buttonDownSlot4 = 351;
			buttonLeftSlot4 = 492;
			
			//button for Slot5
			buttonTopSlot5 = 368;
			buttonRightSlot5 = 430;
			buttonDownSlot5 = 410;
			buttonLeftSlot5 = 254;
			
			//button for Slot6
			buttonTopSlot6 = 368;
			buttonRightSlot6 = 669;
			buttonDownSlot6 = 410;
			buttonLeftSlot6 = 492;
			
			//button for Slot7
			buttonTopSlot7 = 426;
			buttonRightSlot7 = 430;
			buttonDownSlot7 = 469;
			buttonLeftSlot7 = 254;
			
			//button for Slot8
			buttonTopSlot8 = 426;
			buttonRightSlot8 = 669;
			buttonDownSlot8 = 469;
			buttonLeftSlot8 = 492;
			
			
			
			

			//button for Cancel
			buttonTopCancel = 347;
			buttonRightCancel  = 360;
			buttonDownCancel  = 379;
			buttonLeftCancel  = 235;
			
			//button for Confirm
			buttonTopConfirm = 347;
			buttonRightConfirm  = 497;
			buttonDownConfirm  = 379;
			buttonLeftConfirm  = 370;
			

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
			if(buttonLeftItems <= mouseX && mouseX <= buttonRightItems && buttonTopItems <= mouseY && mouseY <= buttonDownItems){
				
				items = 1;
				acessories = 0;
				weapons = 0;
				
				category = "ITEMS:";
			}
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftAcessories <= mouseX && mouseX <= buttonRightAcessories && buttonTopAcessories <= mouseY && mouseY <= buttonDownAcessories){
				
				items = 0;
				acessories = 1;
				weapons = 0;
				
				category = "ACESSORIES:";
			}
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftWeapons <= mouseX && mouseX <= buttonRightWeapons && buttonTopWeapons <= mouseY && mouseY <= buttonDownWeapons){
				
				items = 0;
				acessories = 0;
				weapons = 1;
				
				category = "WEAPONS:";
			}
			
			
			
			
			
			
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot1 <= mouseX && mouseX <= buttonRightSlot1 && buttonTopSlot1 <= mouseY && mouseY <= buttonDownSlot1 && posicaoItem1.showImg == 1){
				
				if(items == 1){
					escolha = POTION;
					itemConfirmationMsg.showImg = 1;
					confirmItem.setSprite("img/layouts/inventario/potionHp.png");
					confirmItem.showImg = 1;
				}
				
				if(acessories == 1){
					escolha = B_SHIELD;
					confirmar = 1;
				}
				
				if(weapons == 1){
					escolha = B_SWORD;
					confirmar = 1;
				}
				
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot2 <= mouseX && mouseX <= buttonRightSlot2 && buttonTopSlot2 <= mouseY && mouseY <= buttonDownSlot2 && posicaoItem2.showImg == 1){
				
				if(items == 1){
					escolha = MANA;
					confirmItem.setSprite("img/layouts/inventario/potionMp.png");
					confirmItem.showImg = 1;
				}
				
				itemConfirmationMsg.showImg = 1;
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot3 <= mouseX && mouseX <= buttonRightSlot3 && buttonTopSlot3 <= mouseY && mouseY <= buttonDownSlot3 && posicaoItem3.showImg == 1){
				
				if(items == 1){
					itemConfirmationMsg.showImg = 1;
				}
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot4 <= mouseX && mouseX <= buttonRightSlot4 && buttonTopSlot4 <= mouseY && mouseY <= buttonDownSlot4 && posicaoItem4.showImg == 1){
				
				if(items == 1){
					itemConfirmationMsg.showImg = 1;
				}
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot5 <= mouseX && mouseX <= buttonRightSlot5 && buttonTopSlot5 <= mouseY && mouseY <= buttonDownSlot5 && posicaoItem5.showImg == 1){
				
				if(items == 1){
					itemConfirmationMsg.showImg = 1;
				}
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot6 <= mouseX && mouseX <= buttonRightSlot6 && buttonTopSlot6 <= mouseY && mouseY <= buttonDownSlot6 && posicaoItem6.showImg == 1){
				
				if(items == 1){
					itemConfirmationMsg.showImg = 1;
				}
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot7 <= mouseX && mouseX <= buttonRightSlot7 && buttonTopSlot7 <= mouseY && mouseY <= buttonDownSlot7 && posicaoItem7.showImg == 1){
				
				if(items == 1){
					itemConfirmationMsg.showImg = 1;
				}
			}
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftSlot8 <= mouseX && mouseX <= buttonRightSlot8 && buttonTopSlot8 <= mouseY && mouseY <= buttonDownSlot8 && posicaoItem8.showImg == 1){
				
				if(items == 1){
					itemConfirmationMsg.showImg = 1;
				}
			}
			
			
			
			
			
			
			
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftCancel <= mouseX && mouseX <= buttonRightCancel && buttonTopCancel <= mouseY && mouseY <= buttonDownCancel && itemConfirmationMsg.showImg == 1){
				
				itemConfirmationMsg.showImg = 0;
				confirmItem.showImg = 0;
				
			}
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftConfirm <= mouseX && mouseX <= buttonRightConfirm && buttonTopConfirm <= mouseY && mouseY <= buttonDownConfirm && itemConfirmationMsg.showImg == 1){
				
				itemConfirmationMsg.showImg = 0;
				confirmItem.showImg = 0;
				confirmar = 1;
			}
			
			
			
			//só vai ativar a função se não estiver menuState em  START	
			if(buttonLeftExit <= mouseX && mouseX <= buttonRightExit && buttonTopExit <= mouseY && mouseY <= buttonDownExit){
				
				items = 0;
				acessories = 0;
				weapons = 0;
				
				posicaoItem1.showImg = 0;
				posicaoItem2.showImg = 0;
				posicaoItem3.showImg = 0;
				posicaoItem4.showImg = 0;
				posicaoItem5.showImg = 0;
				posicaoItem6.showImg = 0;
				posicaoItem7.showImg = 0;
				posicaoItem8.showImg = 0;
				confirmItem.showImg = 0;
				
				qtyItem1 = "";
				qtyItem2 = "";
				category = "";
				
				nextScene = player.lastScene;
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
		console.log("Iniciou SISTEMA INVENTARIO!");
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
			console.log("fim do sistema inventario!");
		}
	}
	
	
	//Função de verificações "in game"
	this.update = function (){
		
		if(items == 1){
			
			if(player.inventory.items["potionHp"] > 0){
				posicaoItem1.setSprite("img/layouts/inventario/potionHp.png");  
				posicaoItem1.showImg = 1;
				qtyItem1 = player.inventory.items["potionHp"];
			}
			else{
				posicaoItem1.showImg = 0;
				qtyItem1 = "";
			}
			
			if(player.inventory.items["potionMp"] > 0){
				posicaoItem2.setSprite("img/layouts/inventario/potionMp.png");  
				posicaoItem2.showImg = 1;
				qtyItem2 = player.inventory.items["potionMp"];
			}
			else{
				posicaoItem2.showImg = 0;
				qtyItem2 = "";
			}
			
		}
		
		if(acessories == 1){
			
			if(player.inventory.acessories["bronzeShield"] > 0){
				posicaoItem1.setSprite("img/layouts/inventario/shield.png"); 
				posicaoItem1.showImg = 1;
				qtyItem1 = player.inventory.acessories["bronzeShield"];
			}
			else{
				posicaoItem1.showImg = 0;
				qtyItem1 = "";
			}
			
			
			posicaoItem2.showImg = 0;
			qtyItem2 = "";
			
		}
		
		if(weapons == 1){
			
			if(player.inventory.weapons["bronzeSword"] > 0){
				posicaoItem1.setSprite("img/layouts/inventario/sword.png"); 
				posicaoItem1.showImg = 1;
				qtyItem1 = player.inventory.weapons["bronzeSword"];
			}
			else{
				posicaoItem1.showImg = 0;
				qtyItem1 = "";
			}
			
			
			posicaoItem2.showImg = 0;
			qtyItem2 = "";
		}
		
		
		if(confirmar == 1){
			
			switch(escolha){
				
				case POTION:
				
					player.inventory.items["potionHp"]--;
					if(player.atributos.lifePoints <= 75){
						player.atributos.lifePoints = player.atributos.lifePoints + 25;
					}
					else{
						player.atributos.lifePoints = 100;
					}
					
					console.log("HP: " + player.atributos.lifePoints);
					console.log("QTD Potion: " + player.inventory.items["potionHp"]);
					break;
					
				case MANA:
				
					player.inventory.items["potionMp"]--;
					if(player.atributos.magicPoints <= 75){
						player.atributos.magicPoints = player.atributos.magicPoints + 25;
					}
					else{
						player.atributos.magicPoints = 100;
					}
					
					console.log("MP: " + player.atributos.magicPoints);
					console.log("QTD Potion: " + player.inventory.items["potionMp"]);
					break;
					
					
				case B_SHIELD:
					
					if(player.acessoryEquip != "Bronze Shield"){
						
						player.atributos.defensePoints = player.atributos.defensePoints + 50;
					
						console.log("Bronze Shield Equipado!");
						player.acessoryEquip = "Bronze Shield";
					}
					
					break;
					
				case B_SWORD:
					
					if(player.weaponEquip != "Bronze Sword"){
						player.atributos.attackPoints = player.atributos.attackPoints + 50;
						
						console.log("Bronze Sword Equipada!");
						player.weaponEquip = "Bronze Sword";
					}
					
					break;
				
			}
			
			confirmar = 0;
		}
		
		
	}
	
	
	//Função de renderização das imagens
	this.draw = function (){
		
		//limpar a tela a cada atualização
		ctx.clearRect(0,0,cnv.width,cnv.height); 
		ctx.drawImage(scene,0,0,scene.width,scene.height,0,0,cnv.width,cnv.height);
		
		ctx.font = "bold 18px arial";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("1",240,85); //Level
		ctx.fillText(player.atributos.lifePoints,240,115);//HP
		ctx.fillText(player.atributos.magicPoints,240,145);//MP
		ctx.fillText(player.atributos.money,240,175);//GOLD

		ctx.fillText(player.atributos.attackPoints,440,85);//ATTACK
		ctx.fillText(player.atributos.defensePoints,440,115);//DEFENSE

		ctx.fillText(player.atributos.experience,660,85);//XP
		ctx.fillText("???",660,115);//NEXT LEVEL

		ctx.fillText(player.weaponEquip,140,570);//WEAPON
		ctx.fillText(player.acessoryEquip,140,600);//ACESSORY
		
		

		ctx.fillText(qtyItem1,455,277); //QTY Item 1
		ctx.fillText(qtyItem2,689,277); //QTY Item 2
		
		ctx.fillText(category,280,227); //QTY Item 1
		ctx.fillText(category,515,227); //QTY Item 2
		
		
		posicaoItem1.draw(ctx);
		posicaoItem2.draw(ctx);
		posicaoItem3.draw(ctx);
		posicaoItem4.draw(ctx);
		posicaoItem5.draw(ctx);
		posicaoItem6.draw(ctx);
		posicaoItem7.draw(ctx);
		posicaoItem8.draw(ctx);
		
		
		
		//items.draw(ctx);
		//noMoneyMsg.draw(ctx);
		itemConfirmationMsg.draw(ctx);
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