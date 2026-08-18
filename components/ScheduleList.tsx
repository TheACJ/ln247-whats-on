import { Show } from "@/data/schedule";
import { minutesToClock, timeStringToMinutes } from "@/lib/time";

export default function ScheduleList({
  shows,
  currentShowId,
}: {
  shows: Show[];
  currentShowId: string | null;
}) {
  return (
    <div className="rounded-xl bg-card p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-muted">
        Today&apos;s Schedule
      </h3>
      <ol className="flex flex-col">
        {shows.map((show) => {
          const isLive = show.id === currentShowId;
          return (
            <li
              key={show.id}
              className={`flex items-start gap-3 border-l-2 py-3 pl-4 ${
                isLive
                  ? "border-brand-red"
                  : "border-transparent"
              }`}
            >
              <span className="w-16 shrink-0 pt-0.5 text-xs font-medium text-brand-muted sm:w-20 sm:text-sm">
                {minutesToClock(timeStringToMinutes(show.startTime))}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className={`text-sm font-semibold sm:text-base ${
                      isLive ? "text-brand-red" : "text-brand-navy"
                    }`}
                  >
                    {show.title}
                  </p>
                  {isLive && (
                    <span className="flex items-center gap-1 rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-red">
                      <span className="live-dot h-1 w-1 rounded-full bg-brand-red" />
                      Live
                    </span>
                  )}
                  <span className="rounded-full bg-brand-grey px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-muted">
                    {show.category}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-brand-muted sm:text-sm">
                  {show.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
