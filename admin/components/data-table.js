'use client'

import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

export function DataTable({ columns, data, getData }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 8,
			},
		},
	})

	return (
		<div>
			<div className='rounded-md border'>
				<table className='w-full'>
					<thead className=''>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th
										key={header.id}
										className='p-2 text-left text-sm font-medium'
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id} className='border-t'>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className='p-2 text-sm'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='flex items-center justify-between mt-4'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Назад
				</Button>
				<span className='text-sm'>
					Страница {table.getState().pagination.pageIndex + 1} из{' '}
					{table.getPageCount()}
				</span>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Далее
				</Button>
			</div>
		</div>
	)
}
