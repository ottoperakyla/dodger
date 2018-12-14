let gameRunning = true
let score = 0
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const playerSize = 10
const playerSpeed = 20
const canvasSize = canvas.width
const player = {
  x: canvasSize / 2 - playerSize,
  y: canvasSize - playerSize * 2,
  size: playerSize
}
const random = (from, to) => Math.random() * to + from
const enemies = []
const isCollision = (object, randomPosition) => {
  const horizontalCollision = object.x < randomPosition.x + randomPosition.size && object.x + object.size > randomPosition.x
  const verticalCollision = object.y < randomPosition.y + randomPosition.size && object.size + object.y > randomPosition.y
  return horizontalCollision && verticalCollision
}
const getRandomPosition = size => {
  const randomCoord = () => Math.max(0, Math.floor(Math.random() * canvasSize - size))
  const randomPosition = {
    x: randomCoord(),
    y: Math.floor(random(0, canvas.height / 4)),
    size
  }
  for (let object of [...enemies, player]) {
    if (isCollision(randomPosition, object)) {
      return getRandomPosition(size)
    }
  }
  return randomPosition
}

const Enemy = () => {
  const size = random(playerSize / 2, playerSize)
  const {x, y} = getRandomPosition(size)
  const vy = random(1, 2)
  const color = vy > 1.75 ? 'red' : 'green'
  return {x, y, size, vy, color}
}

let enemyCount = 20
while (enemyCount--) enemies.push(Enemy())

const renderPlayer = () => {
  ctx.fillStyle = 'gray'
  ctx.fillRect(player.x, player.y, playerSize, playerSize)
  for (let enemy of enemies) {
    if (isCollision(player, enemy)) {
      gameRunning = false
    }
  }
}

const renderEnemies = () => {
    for (let enemy of enemies) {
      const {x, y, vy, size, color} = enemy
      ctx.fillStyle = color
      ctx.fillRect(x, y, size, size)
      enemy.y += vy
      if (enemy.y > canvasSize - enemy.size) {
        const {x, y} = getRandomPosition(enemy.size)
        enemy.x = x
        enemy.y = y
        if (Math.random() < .1) enemies.push(Enemy())
    }
  }
}

const renderScore = () => {
  ctx.font = `normal bold 32px Helvetica`
  ctx.fillStyle = 'white'
  ctx.fillText((score++).toString(), 0, 32)
}

const render = () => {
  if (!gameRunning) {
    alert('Game over')
    return
  }
  ctx.clearRect(0, 0, canvasSize, canvasSize)
  renderPlayer()
  renderEnemies()
  renderScore()
  requestAnimationFrame(render)
}
requestAnimationFrame(render)

document.addEventListener('keydown', ({key}) => {
  if (key === 'ArrowUp') {
    player.y = Math.max(0, player.y - playerSpeed)
  } else if (key === 'ArrowDown') {
    player.y = Math.min(canvasSize - playerSize, player.y + playerSpeed)
  } else if (key === 'ArrowLeft') {
    player.x = Math.max(0, player.x - playerSpeed)
  } else if (key === 'ArrowRight') {
    player.x = Math.min(canvasSize - playerSize, player.x + playerSpeed)
  }
})
