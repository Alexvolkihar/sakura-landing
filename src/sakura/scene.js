import { BRANCH_PADDING, buildBranch } from './branch'
import { drawPetal, isOffscreen, spawnPetal, updatePetal } from './petal'

const MAX_DPR = 2
const MAX_FRAME_TIME = 0.05
const MIN_PETALS = 30
const MAX_PETALS = 90
const PIXELS_PER_PETAL = 16000
/** Vertical-only resizes smaller than this (mobile address bar) are ignored. */
const RESIZE_HEIGHT_TOLERANCE = 140

const WIND_RANGE = 140
const WIND_EASING = 2.5
const BASE_DRIFT = 14
const GUST_AMPLITUDE = 18
const GUST_PERIOD = 4200
const SCROLL_PARALLAX = 0.25

/**
 * Falling-petal scene drawn on a canvas: a static branch, drifting petals,
 * and a wind that follows the pointer. Returns a handle to tear it down.
 */
export function createSakuraScene(canvas) {
  const ctx = canvas.getContext('2d')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const view = { width: 0, height: 0, dpr: 1 }
  let branch = null
  let petals = []
  let frameId = 0
  let lastTime = 0
  let wind = 0
  let windTarget = 0
  let scrollY = 0

  function drawBranch(offsetX = 0, offsetY = 0, tilt = 0) {
    ctx.save()
    ctx.translate(offsetX, offsetY)
    ctx.rotate(tilt)
    ctx.drawImage(branch, -BRANCH_PADDING, 0, view.width + BRANCH_PADDING * 2, branch.height / view.dpr)
    ctx.restore()
  }

  function renderStill() {
    ctx.clearRect(0, 0, view.width, view.height)
    drawBranch()
    petals.forEach((p) => drawPetal(ctx, p))
  }

  function resize() {
    const { innerWidth, innerHeight } = window
    const heightOnly = innerWidth === view.width && Math.abs(innerHeight - view.height) < RESIZE_HEIGHT_TOLERANCE
    if (heightOnly) return

    view.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    view.width = innerWidth
    view.height = innerHeight
    canvas.width = innerWidth * view.dpr
    canvas.height = innerHeight * view.dpr
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0)

    branch = buildBranch(view)
    const count = Math.round(
      Math.min(MAX_PETALS, Math.max(MIN_PETALS, (innerWidth * innerHeight) / PIXELS_PER_PETAL)),
    )
    petals = Array.from({ length: count }, () => spawnPetal({}, { ...view, scattered: true }))

    if (reducedMotion) renderStill()
  }

  function frame(time) {
    const dt = Math.min((time - lastTime) / 1000 || 0.016, MAX_FRAME_TIME)
    lastTime = time

    ctx.clearRect(0, 0, view.width, view.height)
    drawBranch(
      Math.sin(time / 2600) * 3 + wind * 0.04,
      -scrollY * SCROLL_PARALLAX,
      Math.sin(time / 3400) * 0.0025,
    )

    wind += (windTarget - wind) * Math.min(dt * WIND_EASING, 1)
    const horizontalWind = Math.sin(time / GUST_PERIOD) * GUST_AMPLITUDE + wind + BASE_DRIFT

    for (const petal of petals) {
      updatePetal(petal, dt, horizontalWind)
      if (isOffscreen(petal, view)) spawnPetal(petal, view)
      drawPetal(ctx, petal)
    }
    frameId = requestAnimationFrame(frame)
  }

  const onPointerMove = (e) => {
    windTarget = (e.clientX / view.width - 0.5) * WIND_RANGE
  }
  const onScroll = () => {
    scrollY = window.scrollY
  }

  resize()
  window.addEventListener('resize', resize)
  if (!reducedMotion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    frameId = requestAnimationFrame(frame)
  }

  return {
    destroy() {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    },
  }
}
