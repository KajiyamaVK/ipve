export function getTextColorBasedOnBackground(backgroundHexColor: string) {
  // Converte a cor hexadecimal para RGB
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return { r, g, b }
  }

  // Calcula o brilho usando a fórmula de luminosidade relativa
  const calculateBrightness = (rgb: { r: number; g: number; b: number }) => {
    return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  }

  // Obtém o objeto RGB da cor de fundo
  const backgroundRgb = hexToRgb(backgroundHexColor)

  // Calcula o brilho da cor de fundo
  const backgroundBrightness = calculateBrightness(backgroundRgb)

  // Decide se o texto deve ser preto ou branco com base no brilho
  const textColor = backgroundBrightness > 0.5 ? '#000' : '#fff'

  return textColor
}
