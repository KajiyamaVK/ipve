import { getLocations } from '../functions'
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) return new Response(JSON.stringify({ message: `Invalid ID: ${id}` }), { status: 400 })

  return await getLocations(Number(id))
}
