import { NowPlayingResult } from "@/lib/nowPlaying";
import { formatDuration } from "@/lib/time";

export default function NowPlayingBanner({ data }: { data: NowPlayingResult }) {
  if (data.status === "live") {
    return (
      <div className="rounded-xl bg-brand-navy px-5 py-4 text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-brand-red px-2.5 py-1 text-xs font-bold uppercase tracking-wide">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
            Live
          </span>
          <span className="text-xs text-white/60">Now Playing</span>
        </div>
        <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">
          {data.show.title}
        </h2>
        <p className="mt-1 text-sm text-white/70">
          {formatDuration(data.minutesRemaining)} remaining
          {data.nextShow ? ` · Up next: ${data.nextShow.title}` : ""}
        </p>
      </div>
    );
  }

  if (data.status === "upcoming") {
    return (
      <div className="rounded-xl bg-brand-navy px-5 py-4 text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white/80">
            Starting Soon
          </span>
        </div>
        <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">
          {data.show.title}
        </h2>
        <p className="mt-1 text-sm text-white/70">
          Starts in {formatDuration(data.minutesUntilStart)}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-brand-navy px-5 py-4 text-white shadow-md">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white/80">
          Off Air
        </span>
      </div>
      <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">
        We&apos;ll be back soon
      </h2>
      <p className="mt-1 text-sm text-white/70">
        {data.nextShow && data.minutesUntilStart != null
          ? `${data.nextShow.title} starts in ${formatDuration(data.minutesUntilStart)}`
          : "Check back for today's schedule"}
      </p>
    </div>
  );
}
