import { foodsSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";

const { connectionStr } = require("@/app/lib/db");
const { default: mongoose } = require("mongoose");

await mongoose.connect(connectionStr);

export async function GET(request, content) {
  const id = content.params.id;

  const details = await restaurantSchema.findOne({ _id: id });
  console.log(details);

  const foodItems = await foodsSchema.find({ resto_id: id });
  return NextResponse.json({ success: true, details, foodItems });
}
