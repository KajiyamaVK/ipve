import { revalidatePath } from 'next/cache'
import { deletePeople, getPeople, savePeople, updatePeople } from './functions'

export async function GET() {
  const data = await getPeople()
  return data
}

export async function POST(req: Request) {
  const {
    fullName,
    titleIdFK,
    dateOfBirth,
    gender,
    address,
    complement,
    city,
    suburb,
    uf,
    cep,
    phone1,
    phone1IsWhatsapp,
    phone2,
    photoUrl,
    email,
    isActive,
    isActiveEBD,
    ebdClassroom,
    society,
    isMember,
    isUser,
    addressNumber,
    hasFamilyInChurch,
  } = await req.json()
  const data = await savePeople(
    fullName,
    titleIdFK,
    dateOfBirth,
    gender,
    address,
    complement,
    city,
    suburb,
    uf,
    cep,
    phone1,
    phone1IsWhatsapp,
    phone2,
    photoUrl,
    email,
    isActive,
    isActiveEBD,
    ebdClassroom,
    society,
    isMember,
    isUser,
    addressNumber,
    hasFamilyInChurch,
  )
  revalidatePath('/people')
  return data
}

export async function PUT(req: Request) {
  const {
    id,
    fullName,
    titleIdFK,
    dateOfBirth,
    gender,
    address,
    complement,
    city,
    suburb,
    uf,
    cep,
    phone1,
    phone1IsWhatsapp,
    phone2,
    photoUrl,
    email,
    isActive,
    isActiveEBD,
    ebdClassroom,
    society,
    isMember,
    isUser,
    addressNumber,
    hasFamilyInChurch,
  } = await req.json()
  const data = await updatePeople(
    id,
    fullName,
    titleIdFK,
    dateOfBirth,
    gender,
    address,
    complement,
    city,
    suburb,
    uf,
    cep,
    phone1,
    phone1IsWhatsapp,
    phone2,
    photoUrl,
    email,
    isActive,
    isActiveEBD,
    ebdClassroom,
    society,
    isMember,
    isUser,
    addressNumber,
    hasFamilyInChurch,
  )
  revalidatePath('/people')
  return data
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const data = await deletePeople(id)
  revalidatePath('/people')
  return data
}
