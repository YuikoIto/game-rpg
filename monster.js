const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
class Monster {
  constructor(posX, posY, image) {
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
    ctx.drawImage(this.img, this.posX, this.posY, this.sizeX, this.sizeY)
  }
}

new Monster(100, 200, "./img/bone_ape.png")
new Monster(250, 200, "./img/jacklantern.png")
new Monster(400, 200, "./img/poltergeist.png")
