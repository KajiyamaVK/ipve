import { TResponsabilities } from '@/types/TResponsabilities'
import { ColumnDef } from '@tanstack/react-table'

export type TColumns = ColumnDef<TResponsabilities, any> & {
  searchInputOptionLabel?: string
}
