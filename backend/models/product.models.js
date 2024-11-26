import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
	},
	imageUrl: {
		type: String,
	},
    address: {
        type: String
    },
}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);