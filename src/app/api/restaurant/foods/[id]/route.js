import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

await mongoose.connect(connectionStr);

export async function GET(req, content) {
  const id = content.params.id;
  let success = false;
  const result = await foodsSchema.find({ resto_id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function DELETE(req, content) {
  const id = content.params.id;
  let success = false;
  const result = await foodsSchema.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
