import { revalidatePath } from 'next/cache'
import { deletePeopleRole, getPeopleRoles, savePeopleRole, updatePeopleRole } from '../../../(layout)/people/roles/functions'

export async function GET() {
  const data = await getPeopleRoles()
  return data
}

export async function POST(req: Request) {
  const { name, description, tailwindColor } = await req.json()
  const data = await savePeopleRole(name, description, tailwindColor)
  revalidatePath('/people/roles')
  return data
}

export async function PUT(req: Request) {
  const { id, name, description, tailwindColor } = await req.json()
  const data = await updatePeopleRole(id, name, description, tailwindColor)
  revalidatePath('/people/roles')
  return data
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const data = await deletePeopleRole(id)
  revalidatePath('/people/roles')
  return data
}
