import mongoose from 'mongoose'

export const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		console.log("успех")

	} catch (error) {
		console.log("ошибка БД",error)

	}
}
