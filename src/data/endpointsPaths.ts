const appURL = process.env.NEXT_PUBLIC_APP_URL

export const endpointsPaths = {
  people: `${appURL}/api/people`,
  roles: `${appURL}/api/people/roles`,
  titles: `${appURL}/api/people/titles`,
  kinsRelations: `${appURL}/api/people/kinsRelations`,
  locations: `${appURL}/api/locations`,
}
