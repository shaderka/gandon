'use client'

// With Zod, you can define schemas for your data
// and then use the functions provided by Zod to validate whether
// the data conforms to the specified schema.
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
// use state management (using zustand)
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { signInSchema } from '@/lib/definitions'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export const LoginForm = () => {
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm()
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/profile'
	const [loading, setLoading] = useState(false)

	// define hook
	const form =
		useForm <
		z.infer <
		typeof signInSchema >>
			{
				resolver: zodResolver(signInSchema),
				defaultValues: {
					username: '',
					password: '',
				},
			}

	const onSubmit = async values => {
		console.log(values)
		try {
			setLoading(true)
			const res = await signIn('credentials', {
				redirect: false,
				username: values.username,
				password: values.password,
				callbackUrl,
			})
			setLoading(false)

			console.log(res)

			if (!res?.error) {
				router.push(callbackUrl)
			}

			// Manually set error based on the response
			// Ensure that the message is always a string
			const errorMessage = res?.error || 'Authentication error'
			console.log(errorMessage)
			setError('password', { type: 'manual', message: errorMessage })
		} catch (error) {
			toast.error('Something went wrong.')
		}
	}

	return (
		<div className='space-y-4 p-8'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='username' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type='password' placeholder='Password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={loading} type='submit'>
						Login
					</Button>
				</form>
			</Form>
		</div>
	)
}
