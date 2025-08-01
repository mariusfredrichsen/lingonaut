import mongoose from "mongoose";

const TermSchema = new mongoose.Schema(
	{
		_id: String,
		fromLanguage: { type: String, required: true },
		toLanguage: { type: String, required: true },
		fromTerm: { type: String, required: true },
		toTerm: { type: String, required: true },
		description: { type: String },
	},
	{ timestamps: true }
);

export const Term = mongoose.models.Term || mongoose.model("Term", TermSchema);
