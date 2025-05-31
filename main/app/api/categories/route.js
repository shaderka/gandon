import { connectMongoDB } from '@/lib/mongodb'
import { Category } from '@/app/models/Category'

export async function POST(req) {
	try {
		const { catId } = await req.json()
		console.log("catId:", catId)

		await connectMongoDB()
		console.log("Connected to MongoDB")

		const cat = await Category.findOne({ id: catId })
		console.log("Category found:", cat)

		if (!cat) {
			return new Response(JSON.stringify({ error: "Категория не найдена" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			})
		}

		if (cat.level == 3) {
			const supCat = await Category.findOne({ id: cat.pid })
			const supSupCat = await Category.findOne({ id: supCat.pid })
			return Response.json([cat, supCat, supSupCat])
		} else if (cat.level == 2) {
			const supCat = await Category.findOne({ id: cat.pid })
			return Response.json([cat, supCat])
		} else {
			return Response.json([cat])
		}
	} catch (error) {
		console.error("API POST error:", error)
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}
