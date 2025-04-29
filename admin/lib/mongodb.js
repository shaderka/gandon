import mongoose from 'mongoose'

export const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		console.log('База данных подключена')
	} catch (error) {
		console.log('Ошибка при подключении к базе данных: ', error)
	}
}
