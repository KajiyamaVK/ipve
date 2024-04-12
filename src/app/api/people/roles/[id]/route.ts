import { getPeopleRoles } from '../functions'

interface IGET {
  id: number
}

export async function GET(request: Request, { params }: { params: IGET }) {
  const data = await getPeopleRoles(params.id)
  return data
}
