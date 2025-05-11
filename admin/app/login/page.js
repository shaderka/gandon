'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import FullScreenLoader from '@/components/loader'
import { redirect } from 'next/navigation'

const formSchema = z.object({
	emailAddress: z.string().email({
		message: 'Неверный формат email',
	}),
	password: z.string().nonempty({
		message: 'Заполните поле',
	}),
})

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [OTP, setOTP] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [isValid, setIsValid] = useState(false)
	const session = useSession()
	const { status } = session

	if (status === 'authenticated') {
		redirect('/')
	}

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			emailAddress: '',
			password: '',
		},
	})

	const genOTP = () => {
		let otp = ''
		for (let i = 0; i < 6; i++) {
			otp += Math.floor(Math.random() * 10)
		}
		fetch('/api/send-email', {
			method: 'POST',
			cache: 'no-cache',
			body: JSON.stringify({
				email,
				otp,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
			})
		setOTP(otp)
	}

	const onComplete = async () => {
		if (inputValue === OTP) {
			setIsValid(true)
			try {
				const res = await signIn('credentials', {
					email,
					password,
					redirect: false,
				})
				//	if (!res.error) router.push('/')
			} catch (error) {
				console.log(error)
			}
		}
	}

	const handleSubmit = async values => {
		setInputValue('')
		setIsValid(false)
		setLoading(true)
		try {
			const res = await fetch('/api/authAdminExists', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: values.emailAddress,
					password: values.password,
				}),
			})
			if (!res.ok) {
				form.setError('password', {
					message: 'Неверный email или пароль',
				})
				form.setError('emailAddress')
				setLoading(false)
				return
			}
			genOTP()
			setIsDialogOpen(true)
		} catch (error) {
			console.log(error)
		}
		setLoading(false)
	}

	return status === 'loading' ? (
		<FullScreenLoader />
	) : (
		<div className='w-screen'>
			<div className='mt-10 w-md mx-auto shadow-2xl/20 shadow-[#08d4ec] rounded-xl p-7'>
				<div className='flex justify-center items-center mb-6'>
					<img
						src='logo.png'
						className='select-none drag-none w-10 rounded-md border-2 border-[#08d4ec] mr-4'
					/>
					<h1 className=' text-3xl font-bold'>POIZON IS</h1>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='flex flex-col gap-6'
					>
						<FormField
							control={form.control}
							name='emailAddress'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												onChangeCapture={e => setEmail(e.target.value)}
												placeholder='example@gmail.com'
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Пароль</FormLabel>
										<FormControl>
											<Input
												onChangeCapture={e => setPassword(e.target.value)}
												placeholder='Пароль'
												type='password'
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<Button type='submit' className='cursor-pointer' disabled={loading}>
							{loading && <Loader2 className='animate-spin' />}
							Вход
						</Button>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Подтверждение личности</DialogTitle>
									<DialogDescription>
										Код верификации отправлен на адрес{' '}
										<span className=' text-green-300'>{email}</span>. Чтобы
										продолжить, введите этот код.
									</DialogDescription>
								</DialogHeader>
								<div className={'mx-auto '}>
									<InputOTP
										maxLength={6}
										pattern={REGEXP_ONLY_DIGITS}
										value={inputValue}
										onChange={e => setInputValue(e)}
										onComplete={onComplete}
										disabled={isValid}
									>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										{isValid ? (
											<Loader2 className='animate-spin' />
										) : (
											<InputOTPSeparator />
										)}
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</div>
								<DialogFooter>
									<DialogClose asChild disabled={isValid}>
										<Button type='button' variant='secondary'>
											Отмена
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</form>
				</Form>
			</div>
		</div>
	)
}
