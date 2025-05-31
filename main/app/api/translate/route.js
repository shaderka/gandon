export async function POST(request) {
	try {
		const body = await request.json()
		const { text, sourceLang = 'zh', targetLang = 'ru' } = body

		const response = await fetch(
			'https://translate.api.cloud.yandex.net/translate/v2/translate',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Api-Key ${process.env.YANDEX_API_KEY}`,
				},
				body: JSON.stringify({
					texts: [text],
					targetLanguageCode: targetLang,
					sourceLanguageCode: sourceLang,
				}),
			}
		)

		const data = await response.json()

		if (!data.translations || !data.translations[0]) {
			return new Response(JSON.stringify({ error: 'Ошибка перевода' }), {
				status: 500,
			})
		}

		return new Response(
			JSON.stringify({ translatedText: data.translations[0].text }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	} catch (error) {
		return new Response(
			JSON.stringify({ error: 'Ошибка при обращении к Yandex API' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}
}
