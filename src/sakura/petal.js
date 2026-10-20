import { pickColor } from './palette'

/** Resets a petal object in place (no allocation when recycling). */
export function spawnPetal(petal, { width, height, scattered }) {
  const size = 7 + Math.random() * 9
  return Object.assign(petal, {
    x: Math.random() * (width + 200) - 100,
    y: scattered ? Math.random() * height : -20 - Math.random() * 200,
    size,
    fallSpeed: 22 + Math.random() * 38 + size * 1.2,
    swayAmplitude: 20 + Math.random() * 50,
    swaySpeed: 0.6 + Math.random() * 1.2,
    swayPhase: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    spinSpeed: (Math.random() - 0.5) * 2.2,
    flip: Math.random() * Math.PI * 2,
    flipSpeed: 1 + Math.random() * 2.4,
    color: pickColor(),
    alpha: 0.7 + Math.random() * 0.3,
  })
}

/** Advances one petal. `wind` is a horizontal speed in px/s. */
export function updatePetal(p, dt, wind) {
  p.swayPhase += p.swaySpeed * dt
  p.x += (Math.sin(p.swayPhase) * p.swayAmplitude * 0.5 + wind) * dt
  p.y += p.fallSpeed * dt
  p.rotation += p.spinSpeed * dt
  p.flip += p.flipSpeed * dt
}

export function isOffscreen(p, { width, height }) {
  return p.y > height + 30 || p.x > width + 120 || p.x < -160
}

/** Heart-shaped petal with the notch typical of sakura, squashed to fake a 3D flip. */
export function drawPetal(ctx, p) {
  const squash = Math.abs(Math.cos(p.flip)) * 0.8 + 0.2
  const s = p.size

  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.scale(1, squash)
  ctx.globalAlpha = p.alpha
  ctx.fillStyle = p.color
  ctx.beginPath()
  ctx.moveTo(0, -s)
  ctx.bezierCurveTo(s * 0.9, -s * 0.9, s * 0.8, s * 0.5, 0, s)
  ctx.bezierCurveTo(-s * 0.8, s * 0.5, -s * 0.9, -s * 0.9, 0, -s)
  ctx.moveTo(0, s)
  ctx.lineTo(s * 0.13, s * 0.72)
  ctx.lineTo(-s * 0.13, s * 0.72)
  ctx.fill()
  ctx.restore()
}
