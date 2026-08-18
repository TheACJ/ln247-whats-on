# LN247 What's On

A portfolio demo built for an interview for the Web Programmer role at **LN247
Television**. It's a small, single-page "what's on now" experience — a gap on
[ln247.news/live](https://ln247.news/live/), which currently has no schedule
or now-playing info, just a static poster grid.

Not affiliated with or endorsed by LN247 Television.

## What it does

- **Now Playing banner** — the current show, a pulsing LIVE badge, and time
  remaining (or "starts in X" between shows / "off air" overnight).
- **Today's schedule** — a vertical timeline of the day's shows, with the
  currently-airing one highlighted.
- **Live player** — a real HLS player (`hls.js`) driving a standard
  `<video>` element, not a YouTube iframe embed.
- **Mobile-first layout** — built and tested at 375px first, since LN247's
  audience is majority mobile.

## Stack

- **Next.js (App Router) + TypeScript**, deployed to Vercel.
- **Tailwind CSS v4** for mobile-first styling.
- **Two Next.js Route Handlers** as the "backend":
  - `GET /api/schedule` — today's shows.
  - `GET /api/now-playing` — derives the live/upcoming/off-air state from
    the schedule and the current time in `Africa/Lagos` (WAT).
  - The schedule data is a static TypeScript file (`data/schedule.ts`)
    rather than a database or a separate Django REST Framework service. The
    handover doc explicitly allows this fallback when time is short — the
    point of the demo is the frontend UX and the now-playing logic, not
    backend complexity, and it keeps the whole thing a single Vercel
    deployment.
- **`hls.js`** for the live player, with a native-HLS fallback for Safari.

## What's faked / placeholder

- **Stream URL** — the player now points at LN247's actual live HLS feed
  (served via CeFlix's CDN, LoveWorld's streaming infrastructure), not a
  test stream. It's a real production endpoint the team uses, not something
  this project stood up, so playback still depends on that feed being live
  and reachable from the viewer's browser — the player's "stream
  unavailable" fallback state covers it if the feed can't be reached.
- **Schedule times** — LN247's actual air times aren't published anywhere
  found. Show titles and categories are real (from the confirmed 18-show
  TV Shows list on ln247.news), but the 12 shows and their start/end times
  were invented for a realistic single broadcast day.
- **Brand colors** — pulled from ln247.news's actual CSS (the site runs the
  tagDiv "Newspaper" WordPress theme): navy `#131F49` as the primary color,
  with a red accent for LIVE badges. Not officially confirmed as LN247's
  brand guidelines, just what's live on their site today.
- **Logo** — used a text wordmark ("LN247") instead of the real logo image,
  to keep the deploy self-contained with no external asset dependencies.

## Next steps (explicitly out of scope for this demo)

- Admin/CMS UI for editing the schedule.
- Multi-day schedule or calendar view.
- User accounts, login, or push notifications.
- Real integration with LN247's WordPress backend (the schedule itself is
  still static demo data; only the video feed is the real stream).

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
