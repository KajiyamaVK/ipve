import { revalidatePath } from 'next/cache'
import { deletePeopleTitle, getPeopleTitles, savePeopleTitle, updatePeopleTitle } from './functions'

export async function GET() {
  const data = await getPeopleTitles()
  return data
}

export async function POST(req: Request) {
  const { name } = await req.json()
  const data = await savePeopleTitle(name)
  revalidatePath('/people/titles')
  return data
}

export async function PUT(req: Request) {
  const { id, name } = await req.json()
  const data = await updatePeopleTitle(id, name)
  revalidatePath('/people/titles')
  return data
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const data = await deletePeopleTitle(id)
  revalidatePath('/people/titles')
  return data
}
