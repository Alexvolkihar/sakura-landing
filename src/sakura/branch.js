import { drawBlossom } from './blossom'
import { BARK_COLORS, pickColor, PETAL_COLORS } from './palette'
import { createRandom } from './random'

const SEED = 7
const MAX_HEIGHT = 720
const HEIGHT_RATIO = 0.8
const REFERENCE_WIDTH = 1400
const MIN_LENGTH_FOR_FORK = 14
const ROOT_Y = 130
const COMPACT_WIDTH = 700
const COMPACT_ROOT_Y = 60
const DEPTH = 6
const COMPACT_DEPTH = 5
/** Extra canvas margin so the sway animation never reveals an edge. */
export const BRANCH_PADDING = 40

/**
 * Paints a cherry branch with blossoms once, on an offscreen canvas,
 * in the spirit of sumi-e ink painting. The result is blitted every frame.
 */
export function buildBranch({ width, height, dpr }) {
  const canvas = document.createElement('canvas')
  canvas.width = (width + BRANCH_PADDING * 2) * dpr
  canvas.height = Math.min(height * HEIGHT_RATIO, MAX_HEIGHT) * dpr

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.translate(BRANCH_PADDING, 0)
  ctx.lineCap = 'round'

  const rand = createRandom(SEED)
  const tips = []

  function grow(x, y, angle, length, thickness, depth) {
    const endX = x + Math.cos(angle) * length
    const endY = y + Math.sin(angle) * length
    const ctrlX = (x + endX) / 2 + (rand() - 0.5) * length * 0.25
    const ctrlY = (y + endY) / 2 + (rand() - 0.5) * length * 0.25

    ctx.strokeStyle = depth > 2 ? BARK_COLORS.thin : BARK_COLORS.thick
    ctx.lineWidth = thickness
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY)
    ctx.stroke()

    if (depth === 0 || length < MIN_LENGTH_FOR_FORK) {
      tips.push([endX, endY])
      return
    }

    const forks = depth > 3 ? 2 : rand() > 0.4 ? 3 : 2
    for (let i = 0; i < forks; i++) {
      const spread = (rand() - 0.35) * 0.9
      grow(endX, endY, angle + spread, length * (0.68 + rand() * 0.14), thickness * 0.68, depth - 1)
    }

    if (rand() > 0.5) {
      const side = rand() > 0.5 ? 1 : -1
      grow(ctrlX, ctrlY, angle + side * 0.8, length * 0.5, thickness * 0.5, depth - 2)
    }
  }

  // Blossoms shrink with the viewport so small screens keep readable text.
  const bloomScale = Math.min(Math.max(width / 1000, 0.55), 1)

  function bloomAround([x, y], spread, count, minRadius, maxRadius) {
    for (let i = 0; i < count; i++) {
      drawBlossom(
        ctx,
        x + (rand() - 0.5) * spread * bloomScale,
        y + (rand() - 0.5) * spread * bloomScale,
        (minRadius + rand() * (maxRadius - minRadius)) * bloomScale,
        rand() * Math.PI * 2,
        pickColor(rand),
      )
    }
  }

  // Small screens get a shorter, shallower branch so it stays out of the text.
  const compact = width < COMPACT_WIDTH
  const scale = Math.min(width, REFERENCE_WIDTH) / REFERENCE_WIDTH
  const length = 230 * Math.max(scale, compact ? 0.4 : 0.55)
  const thickness = 15 * Math.max(scale, 0.6)
  grow(
    width + 20,
    compact ? COMPACT_ROOT_Y : ROOT_Y,
    Math.PI * 0.93,
    length,
    thickness,
    compact ? COMPACT_DEPTH : DEPTH,
  )

  // Dense blossoms at the tips, then a fainter second layer for depth.
  tips.forEach((tip) => bloomAround(tip, 70, 3 + Math.floor(rand() * 4), 8, 17))
  ctx.globalAlpha = 0.5
  const hazeCount = Math.round(70 * bloomScale)
  for (let i = 0; i < hazeCount; i++) {
    bloomAround(tips[Math.floor(rand() * tips.length)], 150, 1, 5, 11)
  }

  return canvas
}
