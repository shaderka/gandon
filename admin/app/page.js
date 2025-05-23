'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

import FullScreenLoader from '@/components/loader'
import AppSidebar from '@/components/appSidebar'

export default function HomePage() {
	const session = useSession()
	const { status } = session
	const router = useRouter()

	if (status === 'unauthenticated') {
		redirect('login')
	}

	return status === 'loading' ? (
		<FullScreenLoader />
	) : (
		<div className='m-10'>
			<AppSidebar />
			<img
				src='https://sun9-34.userapi.com/impg/jnogiHG2YxJr3MSbAVcRJH9zaheCY7fJ0c_-JA/6ulWbs5R-TI.jpg?size=1000x462&quality=95&sign=d9ba0b5ab9d61f8781227e6145b8a80a&type=album'
				className='ml-70 w-[80vw]'
			/>
		</div>
	)
}
