const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const playerSize = 20
const playerSpeed = 20
const canvasSize = canvas.width
const player = {
  x: canvasSize / 2 - playerSize,
  y: canvasSize - playerSize*2
}
const enemyCount = 25
const random = (from: number, to: number) => Math.floor(Math.random() * to) + from
const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value))
const enemies = []
for (let i = 0; i < enemyCount; i++) {
  const size = random(playerSize / 2, playerSize)
  // TODO: check that randomPos does not place on top of existing enemies or player
  const randomPos = () => clamp(0, canvasSize - size, Math.floor(Math.random() * canvasSize - size))
  enemies.push({
    x: randomPos(),
    y: randomPos(),
    size,
    vy: 2
  })
}

const renderPlayer = () => {
  ctx.fillStyle = 'gray'
  ctx.fillRect(player.x, player.y, playerSize, playerSize)
}

const renderEnemies = () => {
  ctx.fillStyle = 'rgb(146,250,122)'
  enemies.forEach(({x, y, vx, vy, size}, index) => {
    ctx.fillRect(x, y, size, size)
    enemies[index].y += vy
  })
}

const render = () => {
  ctx.clearRect(0, 0, canvasSize, canvasSize)
  renderPlayer()
  renderEnemies()
  requestAnimationFrame(render)
}

requestAnimationFrame(render)

document.addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    player.y = Math.max(0, player.y - playerSpeed)
    break
    case 'ArrowDown':
    case 's':
    player.y = Math.min(canvasSize - playerSize, player.y + playerSpeed)
    break
    case 'ArrowLeft':
    case 'a':
    player.x = Math.max(0, player.x - playerSpeed)
    break
    case 'ArrowRight':
    case 'd':
    player.x = Math.min(canvasSize - playerSize, player.x + playerSpeed)
    break

  }
})
