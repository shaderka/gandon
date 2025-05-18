import axios from 'axios'
import { NextResponse } from 'next/server'
import { connectMongoDB } from '@/lib/mongodb'
import { Item } from '@/app/models/Item'

export async function POST(req) {
	const { link } = await req.json()

	try {
		const res = await axios.get(
			process.env.POIZON_API_SERVER + '/convertLinkToSpuId',
			{
				params: { link },
				headers: {
					accept: 'application/json',
					apikey: process.env.POIZON_API_KEY,
				},
			}
		)
		await new Promise(resolve => setTimeout(resolve, 1000))
		await connectMongoDB()
		const gg = await Item.findOne({ spuId: res.data.spuId })
		if (gg) return Response.json({ message: 'exists' }, { status: 444 })
		console.log(res.data)
		return Response.json(res.data)
	} catch (error) {
		console.log(error)
	}
}
