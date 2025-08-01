// app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Term } from "@/models/Term";

export async function GET() {
	await connectDB();
	const terms = await Term.find();
	return NextResponse.json(terms);
}

export async function POST(req: Request) {
	await connectDB();
	const body = await req.json();
	const term = await Term.create(body);
	return NextResponse.json(term);
}
