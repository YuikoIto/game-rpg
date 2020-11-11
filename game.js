class GameManager {
  constructor() {
    const canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d")
    this.setAction = 350;
    this.characterList = []; 
    this.message = null;
    this.monsterList = []; // 敵のHP/MPなど...
    this.defeatedMonsterNames = null;
    this.defeateCharacterNames = null;
  }
  addCharacter(character) {
    this.characterList.push(character);
  }
  addMonsterCharacter(monster) {
    this.monsterList.push(monster);
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
  showCommand() {
    this.actions = [
      { name: "たたかう" },
      { name: "ぼうぎょ" },
      { name: "まほう" },
      { name: "どうぐ" },
    ]
    this.actions.forEach((action, index) => {
      this.ctx.fillText(action.name, 50, index * 30 + 350)
    })
    this.ctx.font = `28px serif`;
    this.ctx.fillText("▷", 20, this.setAction)
    this.ctx.strokeRect(250, 330, 350, 120);
  }
  showMessage(message) {
    this.ctx.font = `18px serif`;
    this.ctx.clearRect(255, 335, 330, 100);
    this.ctx.fillText(message, 260, 360);
  }

  gameFinish(charactor) {
    if (charactor.hp < 0) {
      return true;
    } else {
      return false;
    }
  }
  chooseCommand(e) {
    if (e.key === "ArrowDown" && this.setAction < 440) {
      this.setAction += 30;
      this.ctx.clearRect(20, 300, 25, 480)
      this.ctx.font = `28px serif`;
      this.ctx.fillText("▷", 20, this.setAction)
    }
    if (e.key === "ArrowUp" && this.setAction > 350) {
      this.setAction -= 30;
      this.ctx.clearRect(20, 300, 25, 480)
      this.ctx.font = `28px serif`;
      this.ctx.fillText("▷", 20, this.setAction)
    }
    if (e.key === "Enter") {
      if (this.setAction === 350) {
        this.message = "ゆうしゃはこうげきした";
        this.showMessage(this.message);

        for (var i = 0; i < this.monsterList.length; i++) {
          this.monsterList[i].hp -= this.characterList[i].mp;
          if (this.monsterList.every(this.gameFinish)) {
            this.message = "ゆうしゃのかち";
            setTimeout(() => {
              this.showMessage(this.message);
            }, 500)
            break;
          }
          if (this.monsterList[i].hp <= 0) {
            if (this.defeatedMonsterNames === null) {
              this.defeatedMonsterNames = this.monsterList[i].name
            } else if (this.defeatedMonsterNames.indexOf(this.monsterList[i].name) === -1){
              this.defeatedMonsterNames = this.defeatedMonsterNames + "と" + this.monsterList[i].name
            }
            this.message = this.defeatedMonsterNames + "はまけた";
          } else {
            this.message = "まだモンスターはげんきだ";
          }
        }
        setTimeout(() => {
          this.showMessage(this.message);
        }, 500)

        if (this.message !== "ゆうしゃのかち") {
          this.message = "こうげきをうけた";
          setTimeout(() => {
            this.showMessage(this.message);
          }, 1000)
          for (var i = 0; i < this.characterList.length; i++) {
            this.characterList[i].hp -= this.monsterList[i].mp;
            if (this.characterList.every(this.gameFinish)) {
              this.message = "ゆうしゃのまけ";
              setTimeout(() => {
                this.showMessage(this.message);
              }, 1500)
              break;
            }
            if (this.characterList[i].hp < 0) {
              if (this.defeateCharacterNames === null) {
                this.defeateCharacterNames = this.characterList[i].name
              } else if (this.defeateCharacterNames.indexOf(this.characterList[i].name) === -1) {
                this.defeateCharacterNames = this.defeateCharacterNames + "と" + this.characterList[i].name
              }
              this.message = this.defeatedMonsterNames + "はまけた";
            } else {
              this.message = "まだゆうしゃはげんきだ";
            }
          }
          setTimeout(() => {
            this.showMessage(this.message);
          }, 1500)
        }
      }
      if (this.setAction === 380) {
        this.message = "ゆうしゃはぼうぎょした";
        this.showMessage(this.message);
      }
      if (this.setAction === 410) {
        this.message = "ゆうしゃはまほうをかけた";
        this.showMessage(this.message);
      }
      if (this.setAction === 440) {
        this.message = "ゆうしゃはどうぐをとりだした";
        this.showMessage(this.message);
      }
    }
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

new Monster(100, 200, "./img/bone_ape.png");
new Monster(260, 200, "./img/jacklantern.png");
new Monster(420, 200, "./img/poltergeist.png");


class PlayerCharacter {
  constructor(name, hp, mp) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
  }
}
class MonsterCharacter {
  constructor(name, hp, mp) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
  }
}

var moster1 = new MonsterCharacter("がいこつ", 100, 60);
var moster2 = new MonsterCharacter("パンプキン", 100, 30);
var moster3 = new MonsterCharacter("おばけ", 100, 160);
var chara1 = new PlayerCharacter("アベル", 100, 80);
var chara2 = new PlayerCharacter("カイン", 100, 55);
var chara3 = new PlayerCharacter("プリン", 100, 45);


var gameManager = new GameManager();
gameManager.addCharacter(chara1);
gameManager.addCharacter(chara2);
gameManager.addCharacter(chara3);
gameManager.addMonsterCharacter(moster1);
gameManager.addMonsterCharacter(moster2);
gameManager.addMonsterCharacter(moster3);
gameManager.showCharacterStatus();
gameManager.showCommand();

window.addEventListener("keydown", (e) => {
  gameManager.chooseCommand(e);
})