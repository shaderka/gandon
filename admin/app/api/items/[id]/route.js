import { connectMongoDB } from '@/lib/mongodb'
import { Item } from '@/app/models/Item'

export async function DELETE(_, { params }) {
	await connectMongoDB()
	const { id } = params
	await Item.findOneAndDelete({ spuId: id })
	return Response.json(true)
}
