import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

await mongoose.connect(connectionStr);

export async function GET() {
  let result = await restaurantSchema.find();

  if (result && result.length > 0) {
    result = result.map((item) => {
      if (item.city) {
        return item.city.charAt(0).toUpperCase() + item.city.slice(1);
      }
      return item.city;
    });
    result = [...new Set(result.map((item) => item))];
    return NextResponse.json({ success: true, result });
  }
}
