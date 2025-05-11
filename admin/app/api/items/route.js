import { connectMongoDB } from '@/lib/mongodb'
import { Item } from '@/app/models/Item'
import { Category } from '@/app/models/Category'

export async function POST(req) {
	await connectMongoDB()
	const data = await req.json()
	const itemDoc = await Item.create(data)
	await Category.updateOne({ id: data.category }, { exists: true })
	return Response.json(itemDoc)
}
