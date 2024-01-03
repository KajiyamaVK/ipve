export type TMembers = {
  id: string
  memberFirstName: string
  memberLastName: string
  memberTitle: string
  roles: string[]
  dateOfBirth: string
  address: string
  complement: string
  city: string
  suburb: string
  uf: string
  cep: string
  phones: {
    phone: string
    phoneType: string
    phoneObs: string
    phoneIsWhatsapp: boolean
  }[]
  mainPhoneId: string
  photoUrl: string
  email: string
}
