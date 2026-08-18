import { schedule } from "@/data/schedule";
import { getNowPlaying } from "@/lib/nowPlaying";
import { nowMinutesInBroadcastTz } from "@/lib/time";
import WhatsOnApp from "@/components/WhatsOnApp";

export default function Home() {
  const initialNowPlaying = getNowPlaying(schedule, nowMinutesInBroadcastTz());

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <WhatsOnApp shows={schedule} initialNowPlaying={initialNowPlaying} />
    </main>
  );
}
