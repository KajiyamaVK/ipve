type TRoles = {
  name: string
  color: string
}
export type TMembersGridHeader = {
  id: string
  memberName: string
  memberTitle: string
  roles: TRoles[] | null
  dateOfBirth?: string
  mainPhone?: string
  email: string | null
}
