'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import FullScreenLoader from '@/components/loader'
import AppSidebar from '@/components/appSidebar'

export default function HomePage() {
	const session = useSession()
	const { status } = session

	if (status === 'unauthenticated') {
		redirect('login')
	}

	return status === 'loading' ? (
		<FullScreenLoader />
	) : (
		<div className='pl-[22rem] w-screen pr-15'>
			<AppSidebar />
			<h1 className='my-7 text-2xl font-semibold'>Категории</h1>
		</div>
	)
}
