import { getKinsRelations } from './functions'

export function GET(req: Request, { params }: { params: { id: number } }) {
  return getKinsRelations(params.id)
}
