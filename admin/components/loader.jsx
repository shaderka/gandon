import { Loader2 } from 'lucide-react'

export default function FullScreenLoader() {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md'>
			<Loader2 className='w-16 h-16 text-blue-500 animate-spin' />
		</div>
	)
}
