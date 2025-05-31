import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(req) {
	const spuId = req.nextUrl.searchParams.get('id')

	try {
		const res = await axios.get(
			process.env.POIZON_API_SERVER + '/productDetailWithPrice',
			{
				params: { spuId },
				headers: {
					accept: 'application/json',
					apikey: process.env.POIZON_API_KEY,
				},
			}
		)
		await new Promise(resolve => setTimeout(resolve, 1000))
		return NextResponse.json(res.data)
	} catch (error) {
		console.log(error)
	}
}
