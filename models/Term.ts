import mongoose from "mongoose";

const TermSchema = new mongoose.Schema(
	{
		languageFrom: { type: String, required: true },
		languageTo: { type: String, required: true },
		termFrom: { type: String, required: true },
		termTo: { type: String, required: true },
		description: { type: String, required: false },
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Category",
			},
		],
	},
	{ timestamps: true }
);

export const Term = mongoose.models.Term || mongoose.model("Term", TermSchema);
