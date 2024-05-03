import { TPeopleForm } from './formSchema'
import { getPeople } from '../../functions'
import { IDBResponse } from '@/types/IDBResponse'
import { MainContainer } from './MainContainer'
import { getPeopleTitles } from '../../titles/functions'
import { TPeopleTitles } from '@/types/TPeopleTitles'
import { getPeopleRoles } from '../../roles/functions'
import { TPeopleRoles } from '@/types/TPeopleRoles'
import { IKinsRelationsSTDTitles, getKinsRelationsSTD } from './functions'

async function getAllPeople() {
  const personData: TPeopleForm[] = [] // Assign a default value

  try {
    await getPeople().then((response) => {
      const data: IDBResponse = response

      if (data.data === undefined) {
        console.error('data.data is undefined')
        throw new Error('data.data is undefined')
      }

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      personData.push(...(data.data as TPeopleForm[]))
    })
  } catch (error) {
    console.error(error)
  }

  return personData
}

async function getSTDTitlesData(): Promise<TPeopleTitles[]> {
  const result: TPeopleTitles[] = []
  try {
    await getPeopleTitles().then((response) => {
      const data: IDBResponse = response

      if (data.data === undefined) {
        console.error('data.data is undefined')
        throw new Error('data.data is undefined')
      }

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      result.push(...(data.data as TPeopleTitles[]))
    })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao carregar os cargos: ' + error)
  }
  return result
}

async function getSTDRolesData(): Promise<TPeopleRoles[]> {
  const result: TPeopleRoles[] = []
  try {
    await getPeopleRoles().then((response) => {
      const data: IDBResponse = response
      if (data.data === undefined) {
        console.error('data.data is undefined')
        throw new Error('data.data is undefined')
      }
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      result.push(...(data.data as TPeopleRoles[]))
    })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao carregar as funções: ' + error)
  }
  return result
}

async function getSTDKinsLabels(): Promise<IKinsRelationsSTDTitles[]> {
  const result: IKinsRelationsSTDTitles[] = []
  try {
    await getKinsRelationsSTD().then((response) => {
      const data: IDBResponse = response
      if (data.data === undefined) {
        console.error('data.data is undefined')
        throw new Error('data.data is undefined')
      }
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      result.push(...(data.data as IKinsRelationsSTDTitles[]))
    })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao carregar os parentescos: ' + error)
  }
  return result
}

export default async function PeopleForm({ params }: { params: { id: string } }) {
  const [allTitles, allRoles, allKinsLabels, allPeople] = await Promise.all([
    getSTDTitlesData(),
    getSTDRolesData(),
    getSTDKinsLabels(),
    getAllPeople(),
  ])

  let data: TPeopleForm = {} as TPeopleForm

  data = allPeople.filter((person) => person.id?.toString() === params.id)[0]

  return (
    <MainContainer
      data={data}
      allTitles={allTitles}
      allRoles={allRoles}
      allKinsLabels={allKinsLabels}
      allPeople={allPeople}
      mode={params.id === '0' ? 'create' : 'edit'}
    />
  )
}
