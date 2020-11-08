class GameManager {
  constructor() {
    const canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d")
    this.characterList = []; // キャラのHP/MPなど...
    this.monsterList = []; // 敵のHP/MPなど...
  }
  addMonster(character) {
    this.characterList.push(character);
  }

  showCharacterStatus() {
    this.ctx.clearRect(0,0,640,480)
    this.ctx.font = `28px serif`;
    this.ctx.fillStyle = "black"
    this.ctx.fillText("HP", 20, 50)
    this.ctx.fillText("MP", 20, 90)
    this.ctx.fillText("名前", 20, 130)
    this.characterList.forEach((chara, index) => {
      this.ctx.fillText(chara.hp, 190 * index + 140, 50)
      this.ctx.fillText(chara.mp, 190 * index + 140, 90)
      this.ctx.fillText(chara.name, 190 * index + 140, 130)
    })
  }
}

class Monster {
  constructor(posX, posY, image) {
    const canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d")
    const img = new Image()
    img.src = image
    this.img = img
    this.posX = posX
    this.posY = posY
    this.sizeX = 100
    this.sizeY = 100
    img.onload = () => this.drawImage()
  }
  drawImage() {
    this.ctx.drawImage(this.img, this.posX, this.posY, this.sizeX, this.sizeY)
  }
}

new Monster(100, 200, "./img/bone_ape.png")
new Monster(260, 200, "./img/jacklantern.png")
new Monster(420, 200, "./img/poltergeist.png")

class MonsterDescription {
  constructor(name, hp, mp, speed, attack, defense) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
  }
}

var chara1 = new PlayerCharacter("アベル", 100, 0, 70, 100, 100);
var chara2 = new PlayerCharacter("カイン", 100, 10, 60,100, 100);
var chara3 = new PlayerCharacter("プリン", 100, 30, 50, 100, 100);

var gameManager = new GameManager();
gameManager.addMonster(moster1);
gameManager.addMonster(moster2);
gameManager.addMonster(moster3);
gameManager.showCharacterStatus()