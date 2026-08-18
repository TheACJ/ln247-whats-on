import { Show } from "@/data/schedule";
import { timeStringToMinutes } from "@/lib/time";

export type NowPlayingResult =
  | {
      status: "live";
      show: Show;
      minutesRemaining: number;
      nextShow: Show | null;
    }
  | {
      status: "upcoming";
      show: Show;
      minutesUntilStart: number;
    }
  | {
      status: "offline";
      nextShow: Show | null;
      minutesUntilStart: number | null;
    };

// Given the day's schedule and the current minute-of-day (in broadcast tz),
// derive what's live, what's about to start, or whether we're off-air.
export function getNowPlaying(
  schedule: Show[],
  nowMinutes: number
): NowPlayingResult {
  const sorted = [...schedule].sort(
    (a, b) => timeStringToMinutes(a.startTime) - timeStringToMinutes(b.startTime)
  );

  const live = sorted.find((show) => {
    const start = timeStringToMinutes(show.startTime);
    const end = timeStringToMinutes(show.endTime);
    return nowMinutes >= start && nowMinutes < end;
  });

  if (live) {
    const end = timeStringToMinutes(live.endTime);
    const currentIndex = sorted.indexOf(live);
    return {
      status: "live",
      show: live,
      minutesRemaining: end - nowMinutes,
      nextShow: sorted[currentIndex + 1] ?? null,
    };
  }

  const next = sorted.find((show) => timeStringToMinutes(show.startTime) > nowMinutes);

  if (next) {
    return {
      status: "upcoming",
      show: next,
      minutesUntilStart: timeStringToMinutes(next.startTime) - nowMinutes,
    };
  }

  // Past the last show of the day — off-air until tomorrow's first show.
  const first = sorted[0] ?? null;
  const minutesUntilStart = first
    ? 1440 - nowMinutes + timeStringToMinutes(first.startTime)
    : null;

  return { status: "offline", nextShow: first, minutesUntilStart };
}
