import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

await mongoose.connect(connectionStr);

export async function GET(req, content) {
  const id = content.params.id;
  let success = false;
  const result = await foodsSchema.findOne({ _id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function PUT(req, content) {
  const id = content.params.id;
  const payload = await req.json();
  let success = false;
  const result = await foodsSchema.findOneAndUpdate({ _id: id }, payload);
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
