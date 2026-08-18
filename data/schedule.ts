// Seed schedule data — demo only. Real air times were not published anywhere
// findable on ln247.news, so these are reasonably invented for a realistic
// broadcast day. Show titles/categories are pulled from the confirmed
// LN247 TV Shows list (see HANDOVER.md).
export type Show = {
  id: string;
  title: string;
  category: string;
  startTime: string; // "HH:mm" in Africa/Lagos (WAT, UTC+1) local time
  endTime: string; // "HH:mm" in Africa/Lagos local time
  description: string;
};

export const TIMEZONE = "Africa/Lagos";

export const schedule: Show[] = [
  {
    id: "this-morning-show",
    title: "This Morning Show",
    category: "Lifestyle",
    startTime: "06:00",
    endTime: "08:00",
    description: "Start the day with news headlines, faith and lifestyle segments.",
  },
  {
    id: "news-focus",
    title: "News Focus",
    category: "Global",
    startTime: "08:00",
    endTime: "09:00",
    description: "A close-up look at the top global and Nigerian headlines.",
  },
  {
    id: "state-of-the-nation",
    title: "State Of The Nation",
    category: "Politics",
    startTime: "09:00",
    endTime: "10:00",
    description: "Analysis and debate on Nigeria's political landscape.",
  },
  {
    id: "business-daily",
    title: "Business Daily",
    category: "Business",
    startTime: "10:00",
    endTime: "11:00",
    description: "Markets, companies and the numbers driving the economy.",
  },
  {
    id: "educonnect",
    title: "Educonnect",
    category: "Education",
    startTime: "11:00",
    endTime: "12:30",
    description: "Education news, policy and opportunities for students.",
  },
  {
    id: "on-the-front-burner",
    title: "On The Front Burner",
    category: "Politics",
    startTime: "12:30",
    endTime: "13:30",
    description: "The day's most pressing issues, discussed in depth.",
  },
  {
    id: "health-and-lifestyle",
    title: "Health and Lifestyle",
    category: "Health",
    startTime: "13:30",
    endTime: "14:30",
    description: "Wellness, medical insight and healthy-living tips.",
  },
  {
    id: "spotlight-africa",
    title: "Spotlight Africa",
    category: "Global",
    startTime: "14:30",
    endTime: "16:00",
    description: "Stories and developments from across the African continent.",
  },
  {
    id: "the-agenda",
    title: "The Agenda",
    category: "Politics",
    startTime: "16:00",
    endTime: "17:30",
    description: "Setting the agenda on governance and public policy.",
  },
  {
    id: "total-football",
    title: "Total Football",
    category: "Sports",
    startTime: "17:30",
    endTime: "19:00",
    description: "Football news, results and analysis from home and abroad.",
  },
  {
    id: "wide-angle",
    title: "Wide Angle",
    category: "Global",
    startTime: "19:00",
    endTime: "20:30",
    description: "A wide-angle evening review of the day's biggest stories.",
  },
  {
    id: "developing-stories",
    title: "Developing Stories",
    category: "Nigeria",
    startTime: "20:30",
    endTime: "22:00",
    description: "Late-evening coverage of Nigeria's unfolding stories.",
  },
];
