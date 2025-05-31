import { connectMongoDB } from '@/lib/mongodb'
import Admin from '@/app/models/Admin'
import bcrypt from 'bcryptjs'

export async function POST(req) {
	const { email, password } = await req.json()
	try {
		await connectMongoDB()
		const user = await Admin.findOne({ email })
		await new Promise(resolve => setTimeout(resolve, 1000))
		if (!user) return null
		const passMatch = await bcrypt.compare(password, user.password)
		if (!passMatch) return null
		return Response.json(true)
	} catch (error) {
		console.log(error)
	}
}
