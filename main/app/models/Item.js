const { Schema, model, models } = require('mongoose')

const ItemSchema = new Schema(
	{
		url: String,
		spuId: Number,
		title: String,
		description: String,
		imagesUrl: [String],
		logoUrl: String,
		basicParam: [
			{
				key: String,
				value: String,
			},
		],
		category: Number,
		brandRootInfo: {
			brandLogo: String,
			brandName: String,
			brandId: Number,
		},
		sizeDto: [
			{
				sizeKey: String,
				sizeValue: String,
			},
		],
		articleNumber: String,
	},
	{ timestamps: true }
)

export const Item = models?.Item || model('Item', ItemSchema)
