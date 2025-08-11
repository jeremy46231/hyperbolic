export function randomColor() {
  const angle = Math.floor(Math.random() * 360)
  return `hsl(${angle}, 100%, 50%)`
}
