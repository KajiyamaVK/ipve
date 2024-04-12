import { getKinsRelationsLabels } from './functions'

export async function GET() {
  const data = await getKinsRelationsLabels()
  return data
}
