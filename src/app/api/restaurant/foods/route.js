import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

await mongoose.connect(connectionStr);

export async function POST(req) {
  const payload = await req.json();
  let success = false;
  const food = new foodsSchema(payload);
  const result = food.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
