import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TableLoader({ className }) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center h-[400px] gap-4 animate-in fade-in',
				className
			)}
		>
			<Loader2 className='w-10 h-10 animate-spin text-muted-foreground' />
			<p className='text-sm text-muted-foreground'>
				Загрузка данных таблицы...
			</p>
		</div>
	)
}
