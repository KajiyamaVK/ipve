import { getPeople } from '../../../(layout)/people/functions'

export async function GET(req: Request, { params }: { params: { id: number } }) {
  const data = await getPeople(params.id)
  return data
}
