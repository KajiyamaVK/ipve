import { TLocations } from '@/types/TLocations'
import { deleteLocations, getLocations, saveLocations, updateLocations } from './functions'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const response = await getLocations()
  return response
}

interface IPostBody {
  id?: number
  data?: TLocations
}
export async function POST(req: Request) {
  const body: IPostBody = await req.json()
  const { id, data } = body
  if (id) {
    const response = await getLocations(id)
    revalidatePath('/locations')
    return response
  } else if (data) {
    const response = await saveLocations(data)
    revalidatePath('/locations')
    return response
  }

  return new Response('Invalid request', { status: 400 })
}

interface IPutBody {
  id: number
  data: TLocations
}

export async function PUT(req: Request) {
  const body: IPutBody = await req.json()
  const { id, data } = body

  const response = await updateLocations(id, data)
  revalidatePath('/locations')
  return response
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const response = await deleteLocations(id)
  revalidatePath('/locations')
  return response
}
