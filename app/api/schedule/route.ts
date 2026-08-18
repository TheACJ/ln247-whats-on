import { NextResponse } from "next/server";
import { schedule } from "@/data/schedule";

export async function GET() {
  return NextResponse.json({ shows: schedule });
}
