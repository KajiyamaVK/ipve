import crypto from 'crypto'

interface IRelativesConnections {
  id: string
  description: string
}

function generateId(relation1: string): string {
  const hash = crypto.createHash('sha256')
  hash.update(relation1)
  return hash.digest('hex')
}

const relativesTitlesList: string[] = [
  'Pai/Mãe',
  'Irmão/Irmã',
  'Primo(a)',
  'Tio(a)',
  'Avô/Avó',
  'Bisavô/Bisavó',
  'Trisavô/Trisavó',
  'Genro/Nora',
  'Esposo(a)',
]

export const relativesTitles: IRelativesConnections[] = relativesTitlesList.map((title) => ({
  id: generateId(title),
  description: title,
}))
