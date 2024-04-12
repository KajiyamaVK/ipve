import { getPeopleTitles } from '../functions'

interface IGET {
  id: number
}

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const data = await getPeopleTitles(params.id)
  return data
}
