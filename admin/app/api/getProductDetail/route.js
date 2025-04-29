import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(req) {
	const spuId = req.nextUrl.searchParams.get('id')

	try {
		const res = await axios.get(
			process.env.POIZON_API_SERVER + '/productDetail',
			{
				params: { spuId },
				headers: {
					accept: 'application/json',
					apikey: process.env.POIZON_API_KEY,
				},
			}
		)

		return NextResponse.json(res.data)
	} catch (error) {
		console.log(error)
	}
}
