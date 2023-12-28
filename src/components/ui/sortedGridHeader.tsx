import { Column } from '@tanstack/react-table'
import { Button } from './button'
import { CaretUpDown, CaretDown, CaretUp } from '@phosphor-icons/react'

export function SortedGridHeader({
  column,
  label,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>
  label: string
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <span className="">{label}</span>
      {column.getIsSorted() === 'asc' ? (
        <CaretUp size={10} />
      ) : column.getIsSorted() === 'desc' ? (
        <CaretDown size={10} />
      ) : (
        <CaretUpDown size={15} />
      )}
    </Button>
  )
}
