import { connectMongoDB } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

import Admin from '@/app/models/Admin'
import bcrypt from 'bcryptjs'

export async function POST(req) {
	try {
		const { email, password } = await req.json()
		const hashedPass = await bcrypt.hash(password, 10)
		await connectMongoDB()
		await Admin.create({ email, password: hashedPass })

		return NextResponse.json(
			{ message: 'Пользователь зарегистрирован' },
			{ status: 201 }
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ message: 'Ошибка при регистрации пользователя: ', error },
			{ status: 500 }
		)
	}
}
