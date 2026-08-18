"use client";

import { useEffect, useState } from "react";
import { Show } from "@/data/schedule";
import { NowPlayingResult } from "@/lib/nowPlaying";
import NowPlayingBanner from "@/components/NowPlayingBanner";
import ScheduleList from "@/components/ScheduleList";
import LivePlayer from "@/components/LivePlayer";

const POLL_INTERVAL_MS = 30_000;

export default function WhatsOnApp({
  shows,
  initialNowPlaying,
}: {
  shows: Show[];
  initialNowPlaying: NowPlayingResult;
}) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingResult>(initialNowPlaying);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        if (!res.ok) return;
        const data: NowPlayingResult = await res.json();
        if (!cancelled) setNowPlaying(data);
      } catch {
        // Network hiccup — keep showing the last known state and try again
        // on the next interval rather than surfacing an error to the user.
      }
    }

    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const currentShowId = nowPlaying.status === "live" ? nowPlaying.show.id : null;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <NowPlayingBanner data={nowPlaying} />
      <LivePlayer />
      <ScheduleList shows={shows} currentShowId={currentShowId} />
    </div>
  );
}
