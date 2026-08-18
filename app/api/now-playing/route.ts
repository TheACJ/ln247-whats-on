import { NextResponse } from "next/server";
import { schedule } from "@/data/schedule";
import { getNowPlaying } from "@/lib/nowPlaying";
import { nowMinutesInBroadcastTz } from "@/lib/time";

export const dynamic = "force-dynamic";

export async function GET() {
  const nowMinutes = nowMinutesInBroadcastTz();
  const result = getNowPlaying(schedule, nowMinutes);
  return NextResponse.json(result);
}
