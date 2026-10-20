import { STAMEN_COLOR } from './palette'

const PETAL_COUNT = 5

/** Draws a five-petal cherry blossom with a notched tip, centred on (x, y). */
export function drawBlossom(ctx, x, y, radius, rotation, color) {
  const r = radius
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.fillStyle = color

  for (let i = 0; i < PETAL_COUNT; i++) {
    ctx.rotate((Math.PI * 2) / PETAL_COUNT)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(r * 0.55, -r * 0.2, r * 0.7, -r * 0.95, r * 0.12, -r)
    ctx.lineTo(0, -r * 0.86)
    ctx.lineTo(-r * 0.12, -r)
    ctx.bezierCurveTo(-r * 0.7, -r * 0.95, -r * 0.55, -r * 0.2, 0, 0)
    ctx.fill()
  }

  ctx.fillStyle = STAMEN_COLOR
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}
