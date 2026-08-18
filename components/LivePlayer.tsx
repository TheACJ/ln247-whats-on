"use client";

import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";

// LN247's actual live HLS feed, served via CeFlix's CDN (LoveWorld's
// streaming infrastructure). Playback still depends on that stream being up
// and reachable from the viewer's browser (CORS, geo, etc.) — the
// "unavailable" state below covers it if the feed can't be reached.
const LIVE_STREAM_URL =
  "https://vcpout-lw-wdc-01-sp.ceflixcdn.com/ln247/stream6/playlist.m3u8";

type PlayerStatus = "loading" | "playing" | "unavailable";

export default function LivePlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("loading");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    async function setup() {
      if (!video) return;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari / iOS)
        video.src = LIVE_STREAM_URL;
        video.addEventListener("loadedmetadata", () => {
          if (!cancelled) setStatus("playing");
        });
        video.addEventListener("error", () => {
          if (!cancelled) setStatus("unavailable");
        });
        return;
      }

      const { default: HlsLib } = await import("hls.js");
      if (cancelled) return;

      if (!HlsLib.isSupported()) {
        setStatus("unavailable");
        return;
      }

      hls = new HlsLib({ enableWorker: true });
      hls.loadSource(LIVE_STREAM_URL);
      hls.attachMedia(video);
      hls.on(HlsLib.Events.MANIFEST_PARSED, () => {
        if (!cancelled) setStatus("playing");
      });
      hls.on(HlsLib.Events.ERROR, (_event, data) => {
        if (data.fatal && !cancelled) setStatus("unavailable");
      });
    }

    setup();

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-brand-navy-dark shadow-lg">
      <video
        ref={videoRef}
        className={`h-full w-full ${status === "playing" ? "block" : "hidden"}`}
        controls
        playsInline
        muted
        autoPlay
      />

      {status !== "playing" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-white">
          {status === "loading" ? (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <p className="text-sm text-white/70">Connecting to stream…</p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold">Stream unavailable</p>
              <p className="max-w-xs text-sm text-white/70">
                We couldn&apos;t reach LN247&apos;s live feed right now.
                Check back shortly.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
