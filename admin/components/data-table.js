'use client'

import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	flexRender,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function DataTable({ columns, data, globalFilter, setGlobalFilter }) {
	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: (row, columnId, filterValue) =>
			row.original.title?.toLowerCase().includes(filterValue.toLowerCase()),

		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 8,
			},
		},
	})

	const pageCount = table.getPageCount()
	const currentPage = table.getState().pagination.pageIndex

	const renderPageButtons = () => {
		const totalPages = table.getPageCount()
		const currentPage = table.getState().pagination.pageIndex
		const buttons = []

		const maxShownPages = 5

		const createButton = page => (
			<Button
				key={page}
				variant={page === currentPage ? 'default' : 'outline'}
				size='sm'
				className='mx-1'
				onClick={() => table.setPageIndex(page)}
			>
				{page + 1}
			</Button>
		)

		if (totalPages <= maxShownPages + 2) {
			for (let i = 0; i < totalPages; i++) {
				buttons.push(createButton(i))
			}
		} else {
			buttons.push(createButton(0))

			if (currentPage > 2) {
				buttons.push(
					<span
						key='start-ellipsis'
						className='px-1 text-sm text-muted-foreground'
					>
						...
					</span>
				)
			}

			const startPage = Math.max(1, currentPage - 1)
			const endPage = Math.min(totalPages - 2, currentPage + 1)

			for (let i = startPage; i <= endPage; i++) {
				buttons.push(createButton(i))
			}

			if (currentPage < totalPages - 3) {
				buttons.push(
					<span
						key='end-ellipsis'
						className='px-1 text-sm text-muted-foreground'
					>
						...
					</span>
				)
			}

			buttons.push(createButton(totalPages - 1))
		}

		return buttons
	}

	return (
		<div>
			<div className='rounded-md border'>
				<table className='w-full'>
					<thead>
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

			<div className='flex items-center justify-center gap-2 mt-4 flex-wrap'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					←
				</Button>

				{renderPageButtons()}

				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					→
				</Button>
			</div>
		</div>
	)
}
