export const PETAL_COLORS = ['#f9d3dc', '#f3b9c6', '#f7c6d1', '#fbe3e8', '#eaa0b3']
export const BARK_COLORS = { thick: '#3a2e2a', thin: '#2a2220' }
export const STAMEN_COLOR = '#c8372d'

export const pickColor = (rand = Math.random) =>
  PETAL_COLORS[Math.floor(rand() * PETAL_COLORS.length)]
