import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";

await mongoose.connect(connectionStr);

export async function GET() {
  try {
    const data = await restaurantSchema.find();
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return NextResponse.error("Error fetching restaurant data");
  }
}

export async function POST(req) {
  try {
    const payload = await req.json();
    let result;
    let success = false;
    if (payload.login) {
      result = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      if (result) {
        success = true;
      }
    } else {
      const restaurant = new restaurantSchema(payload);
      result = await restaurant.save();
      if (result) {
        success = true;
      }
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error saving restaurant data:", error);
    return NextResponse.error("Error saving restaurant data");
  }
}
