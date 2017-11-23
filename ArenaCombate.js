//Script da arena de combate
function ArenaCombate(canvas, player){
	
	//Estados das telas do Jogo
	var gameState = 0;
	var thisScene = 6; 	// Tela atual;
	var nextScene = thisScene;	// Seleciona a proxima tela do jogo;
	
	
	
	//Variaveis de Canvas
	var cnv = canvas;
	var ctx = cnv.getContext("2d");
	var alpha = 0;   // controle do alpha do canvas
    var delta = 0.1; // delta = velocidade do efeito de transição de tela
	
	
	//Trilha Sonora
	trilha_batalha = new Audio();
	
	
	//Sprite do Mapa
	var scene = new Image();
	
	
	//Variaveis de controle de combate
	var atacar = 0, usarHabilidade = 0, usarItem = 0;
	var turno = 1; //1 = PLAYER, 2 = INIMIGO
	var acaoInimigo = 0; // 0 = NADA, 1 = ATAQUE, 2 = MAGIA
	var enemyWait = 0, playerWait = 0;
	var waitDeathAnimation = 0;
	var danoInimigo = "", danoPlayer = "", healingInimigo = "", healingPlayer = "", manaPlayer = "";
	var usarPotion = 0;
	var usarPotionMana = 0;
	

	var currentTurn = "";
	var enemyAction = "";
	var jewel = "";
	
	var qtyPotionHp = "";
	var qtyPotionMp = "";
	
	
	//Objetos
	var inimigo = new Objetos(null);

	
	
	//Barra de Status
	var barraStatus = new Objetos(null);
	barraStatus.setSprite("img/layouts/batalha/barra_status.png");
	barraStatus.transform(140, 480, 450, 150); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);

	//Barra de Itens
	var barraItens = new Objetos(null);
	barraItens.setSprite("img/layouts/batalha/barra_itens.png");
	barraItens.transform(400, 87, 250, 543); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	barraItens.showImg = 0;
	
	//Barra de turnos
	var turn_box = new Objetos(null);
	turn_box.setSprite("img/layouts/batalha/turn_box.png");
	turn_box.transform(5, 23, 158, 20); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	turn_box.showImg = 1;

	//Barra de ações do inimigo
	var enemy_box = new Objetos(null);
	enemy_box.setSprite("img/layouts/batalha/enemy_box_action.png");
	enemy_box.transform(254, 75, 220, 20); 			// objeto.tamanho do objeto(Posição X, Posição Y, Largura, Altura);
	enemy_box.showImg = 0;
	
	
	
	

	
	
	//Setar parametros para a cena
	this.setParametros = function(background, track1, track2, _enemies, joia){
		
		scene = background;
		trilha_batalha = track1;
		inimigo = _enemies;
		jewel = joia;
	}
	
	
	//Resetar modo de batalha
	this.resetBattleArena = function(){
	
		inimigo.enableBattleMode();
	}
	
	
	//=====================================================================================================================================
	//COMANDOS DA TELA
	
	//ativa função de mouseClicked
	addEventListener('click', mouseClicked);

	//função para tratar clicks na tela
	function mouseClicked(e){
		if(gameState == thisScene){
			
			//button for Attack
			buttonTopAttack = 493;
			buttonRightAttack = 565;
			buttonDownAttack = 520;
			buttonLeftAttack = 417;

			//button for Habillities
			buttonTopHabil = 539;
			buttonRightHabil  = 565;
			buttonDownHabil  = 565;
			buttonLeftHabil = 417;

			//button for Itens
			buttonTopItens = 584;
			buttonRightItens  = 565;
			buttonDownItens  = 610;
			buttonLeftItens  = 417;
			
			//button for Potion
			buttonTopPotion = 133;
			buttonRightPotion  = 595;
			buttonDownPotion  = 178;
			buttonLeftPotion  = 414;
			
			//button for Mana
			buttonTopMana = 186;
			buttonRightMana  = 595;
			buttonDownMana  = 231;
			buttonLeftMana  = 414;
			
			//button for Return Select
			buttonTopReturn = 566;
			buttonRightReturn  = 593;
			buttonDownReturn  = 606;
			buttonLeftReturn  = 449;
			

			mouseX = e.pageX - cnv.offsetLeft;
			mouseY = e.pageY - cnv.offsetTop;

			//alert("X: " + mouseX);
			//alert("Y: " + mouseY);
			
			
			if(player.runAnimation == false && inimigo.runAnimation == false){
				
				//só vai ativar a função se não estiver menuState em  START	
				if(0 <= mouseX && mouseX <= 50 && 0 <= mouseY && mouseY <= 50){
					//alert("VILA");
					
					player.posX = 238;
					player.posY = 200;
					player.srcX = 0;
					player.srcY = 0;
					
					nextScene = 3; // gameState = VILA
					gameState = nextScene;
					//console.log("PASSOU PELO fim do menu!");
				}
				
				if(turno == 1 && atacar == 0 && usarHabilidade == 0 && usarItem == 0){
					
					if(buttonLeftAttack <= mouseX && mouseX <= buttonRightAttack && buttonTopAttack <= mouseY && mouseY <= buttonDownAttack){

						atacar = 1;
						player.selectAction("attack"); //Atacar
						inimigo.selectAction("damage"); //Dano
						
					}
					if(buttonLeftHabil <= mouseX && mouseX <= buttonRightHabil && buttonTopHabil <= mouseY && mouseY <= buttonDownHabil){
						
						if(player.atributos.magicPoints < 40){
							
							//alert("Mana Insuficiente!");
							console.log("Mana Insuficiente!");
						}
						else{
							usarHabilidade = 1;
							player.selectAction("hability"); //Magia
							inimigo.selectAction("damage"); //Dano
						}
						
					}
					
					if(buttonLeftItens <= mouseX && mouseX <= buttonRightItens && buttonTopItens <= mouseY && mouseY <= buttonDownItens){

						usarItem = 1;
						barraItens.showImg = 1;
						mouseX = 0;
						mouseY = 0;
					}
				}
				
				
				if(usarItem == 1){
					
					qtyPotionHp = player.inventory.items["potionHp"];
					qtyPotionMp = player.inventory.items["potionMp"];
					
					if(buttonLeftPotion <= mouseX && mouseX <= buttonRightPotion && buttonTopPotion <= mouseY && mouseY <= buttonDownPotion){
						
						usarPotion = 1;
						barraItens.showImg = 0;
						usarItem = 0;
					}
					
					if(buttonLeftMana <= mouseX && mouseX <= buttonRightMana && buttonTopMana <= mouseY && mouseY <= buttonDownMana){
						
						usarPotionMana = 1;
						barraItens.showImg = 0;
						usarItem = 0;
					}
					
					if(buttonLeftReturn <= mouseX && mouseX <= buttonRightReturn && buttonTopReturn <= mouseY && mouseY <= buttonDownReturn){
						
						qtyPotionHp = "";
						qtyPotionMp = "";
						barraItens.showImg = 0;
						usarItem = 0;
					}
					
					
				}
				
				
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
			trilha_batalha.load();
			trilha_batalha.pause();
			return nextScene;
		}
	}
	
	
	
	//=====================================================================================================================================
	//FUNÇÕES DO JOGO
	
	//função de inicialização do jogo
	this.start = function (){
		
		console.log("Iniciou ARENA!");
	}
	
	
	//Função de atualização do jogo
	this.loop = function (){
		if(gameState == thisScene)
		{
			this.canvasFade("in");
			this.update();
			this.draw();
			trilha_batalha.play();
		}
		else{
			
			console.log("fim da Arena Combate!");
		}
	}
	
	
	
	//Função de verificações "in game"
	this.update = function(){
		
		
		//Turno do PLAYER - Aguarda fim da animação do inimigo
		if(inimigo.runAnimation == false){
			
			playerWait++;
			
			if(turno == 1 && playerWait >= 10){
				currentTurn = "***PLAYER TURN***";
				
				danoPlayer = "";
				healingInimigo = "";
				enemyAction = "";
				enemy_box.showImg = 0;
			}
			
			//PLAYER aguarda um tempo extra entre o fim da animação do INIMIGO e o inicio de sua jogada
			if(playerWait >= 10){
				
				playerWait = 0;
				
				
				//Turno do PLAYER
				if(turno == 1 && (atacar == 1 || usarHabilidade == 1 || usarPotion == 1 || usarPotionMana == 1) && player.atributos.lifePoints > 0){
					
					console.log("----------------- PLAYER TURN ---------------------");
					
					
					if(atacar == 1){
						
						//alert("Player Atacou!!!");
						console.log("Player Atacou!");
						
						if(player.atributos.attackPoints - inimigo.atributos.defensePoints >= 0){
							inimigo.atributos.lifePoints = inimigo.atributos.lifePoints - (player.atributos.attackPoints - inimigo.atributos.defensePoints);
							danoInimigo = -(player.atributos.attackPoints - inimigo.atributos.defensePoints);
						}
						else{
							danoInimigo = 0;
						}
						
						console.log("HP Inimigo: " + inimigo.atributos.lifePoints);
						//alert("HP Inimigo: " + inimigo.atributos.lifePoints);
					}
					
					if(usarHabilidade == 1){
						
						//alert("Player utilizou Magia!!!");
						console.log("Player utilizou Magia!!!");
						
						if(player.atributos.abilityPower - inimigo.atributos.magicDefense >= 0){
							inimigo.atributos.lifePoints = inimigo.atributos.lifePoints - (player.atributos.abilityPower - inimigo.atributos.magicDefense);
							player.atributos.magicPoints = player.atributos.magicPoints - 40;
							danoInimigo = -(player.atributos.abilityPower - inimigo.atributos.magicDefense);
						}
						else{
							danoInimigo = 0;
						}
						
						
						console.log("HP Inimigo: " + inimigo.atributos.lifePoints);
						//alert("HP Inimigo: " + inimigo.atributos.lifePoints);
					}
					
					if(usarPotion == 1){
						
						if(player.inventory.items["potionHp"] <= 0){
							
							//alert("Nao ha potions.");
							console.log("Nao ha potions.");
						}
						else{
							
							//alert("Utilizou Potion!!!");
							console.log("Utilizou Potion!!!");
							player.inventory.items["potionHp"]--;
							
							if(player.atributos.lifePoints <= 75){
								player.atributos.lifePoints = player.atributos.lifePoints + 25;
								healingPlayer = "+25";
							}
							else{
								player.atributos.lifePoints = 100;
							}
							
							
							healingPlayer = "+25";
							
							
							console.log("HP Player: " + player.atributos.lifePoints);
							console.log("Potion Restantes: " + player.inventory.items["potionHp"]);
							//alert("HP Player: " + player.atributos.lifePoints);
							
						}
					}
					
					if(usarPotionMana == 1){
						
						if(player.inventory.items["potionMp"] <= 0){
							
							//alert("Nao ha potion-mana.");
							console.log("Nao ha potion-mana.");
						}
						else{
							
							//alert("Utilizou Potion-Mana!!!");
							console.log("Utilizou Potion-Mana!!!");
							player.inventory.items["potionMp"]--;
							
							if(player.atributos.magicPoints <= 75){
								player.atributos.magicPoints = player.atributos.magicPoints + 25;
							}
							else{
								player.atributos.magicPoints = 100;
							}
							
							manaPlayer = "+25";
							
							console.log("MP Player: " + player.atributos.magicPoints);
							console.log("Potion-Mana Restantes: " + player.inventory.items["potionMp"]);
							//alert("MP Player: " + player.atributos.magicPoints);
							
						}
					}
					
					
					qtyPotionHp = "";
					qtyPotionMp = "";
					turno = 2; //Turno INIMIGO
					atacar = 0;
					usarHabilidade = 0;
					usarItem = 0;
					usarPotion = 0;
					usarPotionMana = 0;
					enemyWait = 0;
				}
			}
		}
		
		
		
		
		//Turno do INIMIGO - Aguarda fim da animação do PLAYER
		if(player.runAnimation == false){	
			
			enemyWait++;
			
			if(turno == 2 && enemyWait >= 40){
				currentTurn = "***ENEMY TURN***";
				
				danoInimigo = "";
				healingPlayer = "";
				manaPlayer = "";
			}
			
			//INIMIGO aguarda um tempo extra entre o fim da animação do PLAYER e o inicio de sua jogada
			if(enemyWait >= 80){
				
				enemyWait = 0;
				
				//Turno do INIMIGO
				if(turno == 2 && inimigo.atributos.lifePoints > 0){
					
					console.log("----------------- ENEMY TURN ---------------------");
					
					acaoInimigo = Math.floor(Math.random() * 10 + 1);
					
					if(acaoInimigo >= 1 && acaoInimigo <= 6){
						
						inimigo.selectAction("attack"); //Atacar
						player.selectAction("damage"); //Dano
						enemyAction = "Enemy: Attack";
						enemy_box.showImg = 1;
						
						console.log("Inimigo Atacou!");
						//alert("Inimigo Atacou!");
						
						if(inimigo.atributos.attackPoints - player.atributos.defensePoints >= 0){
							player.atributos.lifePoints = player.atributos.lifePoints - (inimigo.atributos.attackPoints - player.atributos.defensePoints);
							danoPlayer = -(inimigo.atributos.attackPoints - player.atributos.defensePoints);
						}
						else{
							danoPlayer = 0;
						}
						

						console.log("HP Player: " + player.atributos.lifePoints);
						//alert("HP Player: " + player.atributos.lifePoints);
					}
					
					if(acaoInimigo == 7 || acaoInimigo == 8){
						
						inimigo.selectAction("hability"); //Magia
						player.selectAction("damage"); //Dano
						enemyAction = "Enemy: Hability!";
						enemy_box.showImg = 1;
						
						console.log("Inimigo Utilizou Magia!");
						//alert("Inimigo Utilizou Magia!");
						
						
						if((inimigo.atributos.abilityPower - player.atributos.magicDefense) >= 0){
							player.atributos.lifePoints = player.atributos.lifePoints - (inimigo.atributos.abilityPower - player.atributos.magicDefense);
							danoPlayer = - (inimigo.atributos.abilityPower - player.atributos.magicDefense);
						}
						else{
							danoPlayer = 0;
						}
						
						
						console.log("HP Player: " + player.atributos.lifePoints);
						//alert("HP Player: " + player.atributos.lifePoints);
					}
					
					if(acaoInimigo == 9 || acaoInimigo == 10){
						console.log("Inimigo Utilizou Healing!");
						//alert("Inimigo Utilizou Healing!");
						enemyAction = "Enemy: Heal";
						enemy_box.showImg = 1;
						
						if(inimigo.atributos.lifePoints <= 175){
							inimigo.atributos.lifePoints = inimigo.atributos.lifePoints + 20;
						}
						else{
							inimigo.atributos.lifePoints = 200;
						}
						
						healingInimigo = "+25";
						
						console.log("HP Inimigo: " + inimigo.atributos.lifePoints);
						//alert("HP Inimigo: " + inimigo.atributos.lifePoints);
					}
					
					
					turno = 1; //Turno PLAYER
					
				}
				
			}
			
		}
		
		
		//Vitoria do INIMIGO
		if(player.atributos.lifePoints <= 0 && player.runAnimation == false && inimigo.runAnimation == false){
			
			if(waitDeathAnimation == 0){
				
				player.atributos.lifePoints = 0;
				waitDeathAnimation = 1;
				player.selectAction("death");
				
				
			}
			else{
				
				waitDeathAnimation = 0;
			
				player.disableBattleMode();
				inimigo.disableBattleMode();
				
				danoPlayer = "";
				healingPlayer = "";
				manaPlayer = "";
				danoInimigo = "";
				healingInimigo = "";
				currentTurn = "";
				enemyAction = "";
				enemy_box.showImg = 0;
				
				console.log("Fim do Combate!");
				console.log("GameOver");
				//alert("GameOver.");
				nextScene = 7; // gameState = GAME OVER
				gameState = nextScene;
				
				
				this.resetBattleArena();
				
				player.yellowJewelLevel = 0;
				player.redJewelLevel = 0;
				player.greenJewelLevel = 0;
				player.blueJewelLevel = 0;
				
				
				player.atributos.defensePoints = 10;
				player.atributos.attackPoints = 20;
				player.acessoryEquip = "";
				player.weaponEquip = "";
				
				
				
				turno = 1;
				console.log("**************** BATTLE END ******************");
				
			}
		}
		
		
		//Vitoria do PLAYER
		if(inimigo.atributos.lifePoints <= 0 && player.runAnimation == false && inimigo.runAnimation == false){
			
			if(waitDeathAnimation == 0){
				
				waitDeathAnimation = 1;
				inimigo.selectAction("death");
				
			}
			else{
				
				waitDeathAnimation = 0;
				
				player.disableBattleMode();
				inimigo.disableBattleMode();
				
				danoPlayer = "";
				healingPlayer = "";
				manaPlayer = "";
				danoInimigo = "";
				healingInimigo = "";
				currentTurn = "";
				enemyAction = "";
				
				
				player.atributos.money =  player.atributos.money + inimigo.atributos.money;
				player.atributos.experience =  player.atributos.experience + inimigo.atributos.experience;
				
				console.log("Fim do Combate!");
				console.log("Inimigo Derrotado!");
				//alert("Inimigo Derrotado!");
				//alert("Money Ganho: " + inimigo.atributos.money + "  /  XP Ganho: " + inimigo.atributos.experience);
				console.log("Player-Money: " + player.atributos.money + "  /  Player-XP: " + player.atributos.experience);
				
				
				this.resetBattleArena();
				
				if(jewel == "yellow"){
					player.yellowJewelLevel++;
				}
				if(jewel == "red"){
					player.redJewelLevel++;
				}
				if(jewel == "green"){
					player.greenJewelLevel++;
				}
				if(jewel == "blue"){
					player.blueJewelLevel++;
				}
				
				
				player.posX = 238;
				player.posY = 200;
				player.srcX = 0;
				player.srcY = 0;
				
				
				if(player.redJewelLevel >= 4){
					nextScene = 16; // gameState = FIM DE JOGO
					gameState = nextScene;
				}
				else{
					nextScene = 3; // gameState = VILA
					gameState = nextScene;
				}
				
				turno = 1;
				console.log("**************** BATTLE END ******************");
				
			}
			
		}
		
		
		if(gameState != thisScene){
			
			this.canvasFade("out");
		}
		
	}
	
	
	//Função de renderização das imagens
	this.draw = function (){
		
		//limpar a tela a cada atualização
		ctx.clearRect(0,0,cnv.width,cnv.height); 
		ctx.drawImage(scene,0,0,scene.width,scene.height,0,0,cnv.width,cnv.height);
		
				
		player.draw(ctx);
		inimigo.draw(ctx);
		barraStatus.draw(ctx);
		barraItens.draw(ctx);
		turn_box.draw(ctx);
		enemy_box.draw(ctx);
		
		
		
		//Numeros de dano
		ctx.font = "bold 16px arial";
		ctx.fillStyle = "#ff0000";
		ctx.fillText(danoPlayer,320,380);
		ctx.fillText(danoInimigo,inimigo.battlePosX,inimigo.battlePosY);
		
		//Numeros de healing
		ctx.font = "bold 16px arial";
		ctx.fillStyle = "#33ff33";
		ctx.fillText(healingPlayer,320,380);
		ctx.fillText(healingInimigo,inimigo.battlePosX,inimigo.battlePosY);
		
		
		//Numeros de mana
		ctx.font = "bold 16px arial";
		ctx.fillStyle = "#4D4DFF";
		ctx.fillText(manaPlayer,320,380);
		

		//contadores de vida e mp
		ctx.font = "bold 16px arial";
		ctx.fillStyle = "#000000";
		ctx.fillText(player.atributos.lifePoints+"/100",320,530);
		ctx.fillText(player.atributos.magicPoints+"/100",320,565);
		

		ctx.font = "bold 16px arial";
		ctx.fillStyle = "#ffffff";
		ctx.fillText(currentTurn, 10, 40);
		ctx.fillText(enemyAction, 310, 90);
		
		ctx.fillText(qtyPotionHp, 620, 160);
		ctx.fillText(qtyPotionMp, 620, 215);
		

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