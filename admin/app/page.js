'use client'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import FullScreenLoader from '@/components/loader'

export default function HomePage() {
	const session = useSession()
	const { status } = session
	const router = useRouter()
	const [link, setLink] = useState('')
	const [loading, setLoading] = useState(false)

	if (status === 'unauthenticated') {
		redirect('login')
	}

	const getID = async url => {
		setLoading(true)
		try {
			const res = await axios.get('/api/getSpuId', {
				params: {
					link: url,
				},
			})
			const res2 = await axios.get('/api/getProductDetail', {
				params: {
					id: res.data.spuId,
				},
			})
			console.log(res2.data)
		} catch (error) {
			console.log(error)
		}
		setLoading(false)
	}

	return status === 'loading' ? (
		<FullScreenLoader />
	) : (
		<div className='m-10 text-5xl'>
			{loading && <FullScreenLoader />}
			<Button
				variant={'secondary'}
				className={'text-xl cursor-pointer'}
				size={'lg'}
				onClick={() => signOut()}
			>
				Разлогин нах
			</Button>
			<br />
			<div className='max-w-60 flex flex-col mx-auto'>
				<Button onClick={() => getID(link)} className='w-20 self-center mb-4'>
					Запрос
				</Button>
				<Input onChangeCapture={e => setLink(e.target.value)} />
			</div>
		</div>
	)
}
