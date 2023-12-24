import { TRoles } from '@/types/TRoles'
import { ColumnDef } from '@tanstack/react-table'

export type TColumns = ColumnDef<TRoles> & {
  searchInputOptionLabel?: string
}
