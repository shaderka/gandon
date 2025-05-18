'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function DeleteProductDialog({ product, onDelete }) {
	const [open, setOpen] = useState(false)

	const handleDelete = async () => {
		await onDelete(product.spuId)
		setOpen(false)
	}

	return (
		<>
			<div
				className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-accent"
				onClick={() => setOpen(true)}
			>
				Удалить
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Удалить товар?</DialogTitle>
					</DialogHeader>
					<p className='text-sm text-gray-500'>
						Вы уверены, что хотите удалить <b>{product.title}</b>?
					</p>
					<DialogFooter className='mt-4'>
						<DialogClose asChild>
							<Button variant='outline'>Отмена</Button>
						</DialogClose>
						<Button variant='destructive' onClick={handleDelete}>
							Удалить
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
