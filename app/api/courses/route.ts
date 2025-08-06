import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { Term } from "@/models/Term";
import { Category } from "@/models/Category";
import { Course } from "@/models/Course";
import mongoose from "mongoose";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const body = await request.json();

		const {
			title,
			languageFrom,
			languageTo,
			author,
			description,
			terms = [],
			categories = [],
		} = body;

		// Validate required fields
		if (!title || !languageFrom || !languageTo || !author) {
			return NextResponse.json(
				{
					error: "title, languageFrom, languageTo, and author are required",
				},
				{ status: 400 }
			);
		}

		// map term.id to mongodb.term._id
		const termIdMap: Record<string, mongoose.Types.ObjectId> = {};

		const savedTerms = await Promise.all(
			terms.map(async (term: any) => {
				const { id, categories, ...rest } = term;

				const termDoc = new Term({
					...rest,
					categories: [],
				});

				const saved = await Term.findOneAndUpdate(
					{
						termFrom: rest.termFrom,
						termTo: rest.termTo,
						languageFrom: rest.languageFrom,
						languageTo: rest.languageTo,
					},
					{
						$set: {
							description:
								rest.description ||
								"",
							categories: [],
						},
					},
					{ new: true, upsert: true }
				);
				termIdMap[id] = saved._id;
				return saved;
			})
		);

		// map category.id to mongodb.category._id
		const categoryIdMap: Record<string, mongoose.Types.ObjectId> =
			{};

		const savedCategories = await Promise.all(
			categories.map(async (category: any) => {
				const {
					id,
					terms: categoryTerms,
					...rest
				} = category;

				const mappedTermIds = categoryTerms.map(
					(t: any) => termIdMap[t.id]
				);

				const categoryDoc = new Category({
					...rest,
					terms: mappedTermIds,
				});

				const saved = await Category.findOneAndUpdate(
					{
						title: rest.title,
						languageFrom: rest.languageFrom,
						languageTo: rest.languageTo,
					},
					{
						$set: {
							description:
								rest.description ||
								"",
							terms: mappedTermIds,
						},
					},
					{ new: true, upsert: true }
				);
				categoryIdMap[id] = saved._id;
				return saved;
			})
		);

		// replace categories with their _id in terms
		await Promise.all(
			terms.map(async (term: any) => {
				const termMongoId = termIdMap[term.id];
				const categoryIds =
					term.categories?.map(
						(cat: any) =>
							categoryIdMap[cat.id]
					) || [];

				await Term.findByIdAndUpdate(termMongoId, {
					$set: { categories: categoryIds },
				});
			})
		);

		const course = await Course.findOneAndUpdate(
			{ title, author, languageFrom, languageTo },
			{
				$set: {
					title,
					description,
					languageFrom,
					languageTo,
					terms: savedTerms.map((t) => t._id),
					categories: savedCategories.map(
						(c) => c._id
					),
				},
			},
			{ new: true, upsert: true }
		);

		return NextResponse.json(
			{ message: "Course created", course },
			{ status: 201 }
		);
	} catch (error: any) {
		console.error("POST /api/courses error:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
