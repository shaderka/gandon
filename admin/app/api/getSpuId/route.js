import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(req) {
	const link = req.nextUrl.searchParams.get('link')

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

		return NextResponse.json(res.data)
	} catch (error) {
		console.log(error)
	}
}
