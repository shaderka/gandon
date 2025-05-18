'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import DeleteProductDialog from '../ConfirmDeleteDialog'

export const columns = ({ refreshItems }) => [
	{
		accessorKey: 'logoUrl',
		header: 'Фото',
		cell: ({ row }) => {
			const url = row.original.logoUrl || row.original.imagesUrl?.[0]
			return (
				<img
					src={url}
					alt='product'
					className='w-12 h-12 object-cover rounded'
				/>
			)
		},
		enableSorting: false,
	},
	{
		accessorKey: 'title',
		header: 'Название',
	},
	{
		accessorKey: 'spuId',
		header: 'ID',
	},
	{
		accessorKey: 'catName',
		header: 'Категория',
	},
	{
		accessorKey: 'brandRootInfo.brandName',
		header: 'Бренд',
		cell: ({ row }) => row.original.brandRootInfo?.brandName || '—',
	},
	{
		id: 'actions',
		header: '',
		cell: ({ row }) => {
			const product = row.original

			const handleDelete = async () => {
				await fetch(`/api/items/${product.spuId}`, {
					method: 'DELETE',
				})
				window.location.reload()
				//refreshProducts()
			}
			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='icon' type='button'>
								<Ellipsis />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Редактировать</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<DeleteProductDialog
									product={product}
									onDelete={handleDelete}
								/>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			)
		},
	},
]
