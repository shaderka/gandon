const { Schema, model, models } = require('mongoose')

const CategorySchema = new Schema(
	{
		id: Number,
		name: String,
		level: Number,
		pid: Number,
		rootId: Number,
		exists: Boolean,
	},
	{ timestamps: true }
)

export const Category = models?.Category || model('Category', CategorySchema)
