class GameManager {
  constructor() {
    const canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d")
    this.setAction = 320;
    this.characterList = []; 
    this.monsterList = []; // 敵のHP/MPなど...
  }
  addCharacter(character) {
    this.characterList.push(character);
  }
  move(e) {
    if (e.key === "ArrowDown" && this.setAction < 415) {
      this.setAction += 30;
      this.ctx.fillText("▷", 20, this.setAction)
    }
    if (e.key === "ArrowUp" && this.setAction > 320) {
      this.setAction -= 30;
      this.ctx.fillText("▷", 20, this.setAction)
    }
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
      chara.actions.forEach((action, index) => {
        this.ctx.fillText(action.name, 50, index * 30 + 350)
      })
      
      // this.ctx.moveTo(35, this.setAction + 15);
      // this.ctx.lineTo(20, this.setAction);
      // this.ctx.lineTo(20, this.setAction + 30);
      // this.ctx.fill();
    })
  }
  // move(e) {
  //   this.ctx.clearRect(20, 20, 325, 500);
  //   if (e.key === "ArrowDown" && setAction <= 440) {
  //     this.setAction += 30;
  //   }
  //   if (e.key === "ArrowUp" && this.setAction >= 325) {
  //     this.setAction -= 30;
  //   }
  //   this.showCharacterStatus();
  // }
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

const BATTLE_TYPE_ATTACK = "attack"
const BATTLE_TYPE_DEFENSE = "defense" // "defense" === "defence"
const BATTLE_TYPE_MAGIC = "magic"
const BATTLE_TYPE_ITEM = "item"

class PlayerCharacter {
  constructor(name, hp, mp) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.actions = [
      { name: "たたかう", type: BATTLE_TYPE_ATTACK },
      { name: "ぼうぎょ", type: BATTLE_TYPE_DEFENSE },
      { name: "まほう", type: BATTLE_TYPE_MAGIC },
      { name: "どうぐ", type: BATTLE_TYPE_ITEM },
    ]
  }
}

// var moster1 = new MonsterDescription("がいこつ", 100, 80, 0, 100, 100);
// var moster2 = new MonsterDescription("パンプキン", 100, 55, 0, 100, 100);
// var moster3 = new MonsterDescription("おばけ", 100, 45, 50, 100, 100);
var chara1 = new PlayerCharacter("アベル", 100, 80);
var chara2 = new PlayerCharacter("カイン", 100, 55);
var chara3 = new PlayerCharacter("プリン", 100, 45);


var gameManager = new GameManager();
gameManager.addCharacter(chara1);
gameManager.addCharacter(chara2);
gameManager.addCharacter(chara3);
gameManager.showCharacterStatus();

window.addEventListener("keydown", (e) => {
  gameManager.move(e);
})