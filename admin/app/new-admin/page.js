'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function NewAdminPage() {
	const [email, setEmail] = useState('')
	const [password, setPass] = useState('')
	const router = useRouter()

	const handleSubmit = async e => {
		e.preventDefault()

		const res = await fetch('api/regAdmin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		if (res.ok) {
			const form = e.target
			form.reset()
			router.push('/')
		} else {
			console.log('Регистрация пользователя не удалась')
		}
	}

	return (
		<div className=' rounded-xl py-8 px-10 mx-auto font-medium text-center border-4 border-dashed max-w-md mt-10'>
			<form onSubmit={handleSubmit}>
				<div className='input font-medium mb-5'>
					<label htmlFor='email'>Email</label>
					<Input id='email' onChange={e => setEmail(e.target.value)}></Input>
				</div>
				<div className='input font-medium mb-5'>
					<label htmlFor='pass'>Пароль</label>
					<Input id='pass' onChange={e => setPass(e.target.value)}></Input>
				</div>

				<Button type='submit' className='cursor-pointer'>
					Создать
				</Button>
			</form>
		</div>
	)
}
