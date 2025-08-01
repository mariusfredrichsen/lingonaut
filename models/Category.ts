import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
	{
		_id: String,
		languageFrom: { type: String, required: true },
		languageTo: { type: String, required: true },
		description: { type: String },
		terms: [{ type: String, ref: "Term" }],
	},
	{ timestamps: true }
);

export const Category =
	mongoose.models.Category || mongoose.model("Category", CategorySchema);
