import axios from 'axios'
import { NextResponse } from 'next/server'
import { Category } from '@/app/models/Category'
import { connectMongoDB } from '@/lib/mongodb'

export async function GET(req) {
	const lang = 'RU'
	try {
		const res = await axios.get(
			process.env.POIZON_API_SERVER + '/getCategories',
			{
				params: { lang },
				headers: {
					accept: 'application/json',
					apikey: process.env.POIZON_API_KEY,
				},
			}
		)
		// await connectMongoDB()
		// const trueCats = res.data.map(cat => {
		// 	return {
		// 		id: cat.id,
		// 		name: cat.name,
		// 		level: cat.level,
		// 		pid: cat.pid,
		// 		rootId: cat.rootId,
		// 		exists: false,
		// 	}
		// })
		// trueCats.map(async cat => await Category.create(cat))
		await new Promise(resolve => setTimeout(resolve, 1000))
		return Response.json(true)
	} catch (error) {
		console.log(error)
	}
}
