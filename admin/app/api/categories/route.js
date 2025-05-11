import { connectMongoDB } from '@/lib/mongodb'
import { Category } from '@/app/models/Category'

export async function POST(req) {
	const { catId } = await req.json()
	await connectMongoDB()
	const cat = await Category.findOne({ id: catId })

	if (cat.level == 3) {
		const supCat = await Category.findOne({ id: cat.pid })
		const supSupCat = await Category.findOne({ id: supCat.pid })
		return Response.json([cat, supCat, supSupCat])
	} else {
		if (cat.level == 2) {
			const supCat = await Category.findOne({ id: cat.pid })
			return Response.json([cat, supCat])
		} else return Response.json([cat])
	}
}
export async function PUT(req) {
	const { catId, name } = await req.json()
	await connectMongoDB()
	await Category.updateOne({ id: catId }, { name })
	return Response.json(true)
}
